
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Product } from "./products";

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

// Fetch cart items for current user
export const fetchCartItems = async (): Promise<CartItem[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.error("You must be logged in to view cart");
      return [];
    }
    
    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        *,
        product:product_id (
          *,
          farmer:farmer_id (
            name,
            farm,
            verified,
            rating,
            photo
          )
        )
      `)
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items");
      return [];
    }

    return (data as any) || [];
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    toast.error("Failed to fetch cart items");
    return [];
  }
};

// Add item to cart
export const addToCart = async (productId: string, quantity: number = 1): Promise<CartItem | null> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.error("You must be logged in to add items to cart");
      return null;
    }
    
    // Check for existing cart item
    const { data: existingItems } = await supabase
      .from("cart_items")
      .select("*")
      .eq("product_id", productId)
      .eq("user_id", userData.user.id);

    if (existingItems && existingItems.length > 0) {
      // Update quantity if item already exists
      const existingItem = existingItems[0];
      const newQuantity = existingItem.quantity + quantity;
      
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq("id", existingItem.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating cart item:", error);
        toast.error("Failed to update cart");
        return null;
      }

      toast.success("Cart updated successfully");
      return data;
    } else {
      // Insert new cart item
      const { data, error } = await supabase
        .from("cart_items")
        .insert({
          product_id: productId,
          quantity: quantity,
          user_id: userData.user.id
        })
        .select()
        .single();

      if (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add to cart");
        return null;
      }

      toast.success("Added to cart successfully");
      return data;
    }
  } catch (error) {
    console.error("Failed to add to cart:", error);
    toast.error("Failed to add to cart");
    return null;
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (itemId: string, quantity: number): Promise<CartItem | null> => {
  try {
    if (quantity <= 0) {
      // Remove item if quantity is zero or less
      return await removeFromCart(itemId);
    }

    const { data, error } = await supabase
      .from("cart_items")
      .update({ 
        quantity,
        updated_at: new Date().toISOString()
      })
      .eq("id", itemId)
      .select()
      .single();

    if (error) {
      console.error("Error updating cart item:", error);
      toast.error("Failed to update cart");
      return null;
    }

    toast.success("Cart updated successfully");
    return data;
  } catch (error) {
    console.error("Failed to update cart item:", error);
    toast.error("Failed to update cart");
    return null;
  }
};

// Remove item from cart
export const removeFromCart = async (itemId: string): Promise<null> => {
  try {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove from cart");
      return null;
    }

    toast.success("Item removed from cart");
    return null;
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    toast.error("Failed to remove from cart");
    return null;
  }
};

// Clear entire cart
export const clearCart = async (): Promise<boolean> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.error("You must be logged in to clear cart");
      return false;
    }
    
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", userData.user.id);

    if (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
      return false;
    }

    toast.success("Cart cleared successfully");
    return true;
  } catch (error) {
    console.error("Failed to clear cart:", error);
    toast.error("Failed to clear cart");
    return false;
  }
};
