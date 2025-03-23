import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CartItem, clearCart } from "./cart";
import { updateProduct } from "./products";

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
  product?: {
    name: string;
    image_url: string | null;
    unit: string;
    farmer_id: string;
    farmer?: {
      name: string;
      farm: string;
      verified: boolean;
      photo: string | null;
    };
  };
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  consumer?: {
    name: string;
    email: string;
    photo: string | null;
  };
}

// Process checkout from cart
export const processCheckout = async (): Promise<Order | null> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.error("You must be logged in to checkout");
      return null;
    }
    
    // Fetch cart items
    const { data: cartItems } = await supabase
      .from("cart_items")
      .select(`
        *,
        product:product_id (*)
      `)
      .eq("user_id", userData.user.id);
    
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return null;
    }
    
    // Calculate total amount
    const totalAmount = cartItems.reduce((sum, item) => {
      const itemPrice = item.product ? item.product.price * item.quantity : 0;
      return sum + itemPrice;
    }, 0);
    
    // Start a transaction
    // 1. Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userData.user.id,
        total_amount: totalAmount,
        status: "completed"
      })
      .select()
      .single();
    
    if (orderError) {
      console.error("Error creating order:", orderError);
      toast.error("Failed to process checkout");
      return null;
    }
    
    // 2. Create order items and update product stock
    const orderItems = [];
    for (const item of cartItems) {
      if (!item.product) continue;
      
      // Create order item
      const { data: orderItem, error: itemError } = await supabase
        .from("order_items")
        .insert({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price
        })
        .select()
        .single();
      
      if (itemError) {
        console.error("Error creating order item:", itemError);
        continue;
      }
      
      orderItems.push(orderItem);
      
      // Update product stock
      const newStock = Math.max(0, item.product.stock_quantity - item.quantity);
      await updateProduct(item.product_id, { stock_quantity: newStock });
    }
    
    // 3. Clear the cart
    await clearCart();
    
    toast.success("Order placed successfully!");
    return { ...order, items: orderItems };
  } catch (error) {
    console.error("Failed to process checkout:", error);
    toast.error("Failed to process checkout");
    return null;
  }
};

// Fetch orders for current user (consumer history)
export const fetchUserOrders = async (): Promise<Order[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.error("You must be logged in to view orders");
      return [];
    }
    
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        items:order_items(*, product:product_id(*, farmer:farmer_id(name, farm, verified, photo)))
      `)
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    toast.error("Failed to fetch orders");
    return [];
  }
};

// Fetch orders for a farmer's products
export const fetchFarmerOrders = async (): Promise<Order[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.error("You must be logged in to view orders");
      return [];
    }
    
    // Get all products by this farmer
    const { data: farmerProducts } = await supabase
      .from("products")
      .select("id")
      .eq("farmer_id", userData.user.id);
    
    if (!farmerProducts || farmerProducts.length === 0) {
      return [];
    }
    
    const productIds = farmerProducts.map(product => product.id);
    
    // Get all order items for these products
    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select(`
        *,
        product:product_id(*),
        order:order_id(*, consumer:user_id(name, email, photo))
      `)
      .in("product_id", productIds)
      .order("created_at", { ascending: false });
    
    if (itemsError) {
      console.error("Error fetching order items:", itemsError);
      toast.error("Failed to fetch orders");
      return [];
    }
    
    // Group order items by order
    const orderMap = new Map<string, Order>();
    
    orderItems.forEach(item => {
      if (!item.order) return;
      
      if (!orderMap.has(item.order.id)) {
        orderMap.set(item.order.id, {
          ...item.order,
          items: []
        });
      }
      
      const order = orderMap.get(item.order.id);
      if (order && order.items) {
        order.items.push(item);
      }
    });
    
    return Array.from(orderMap.values());
  } catch (error) {
    console.error("Failed to fetch farmer orders:", error);
    toast.error("Failed to fetch orders");
    return [];
  }
};