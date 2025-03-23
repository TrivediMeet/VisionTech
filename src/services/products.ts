
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  unit: string;
  category: string;
  stock_quantity: number;
  image_url: string | null;
  farmer_id: string;
  eco_certified: boolean;
  created_at: string;
  updated_at: string;
  // Add profile relation type - this is for JOIN data
  farmer?: {
    name: string;
    farm: string;
    verified: boolean;
    rating: number;
    reviews?: number; // Added reviews as optional property
    photo: string | null;
  };
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  stock_quantity: number;
  image_url?: string;
  eco_certified: boolean;
}

// Fetch all products for marketplace
export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, farmer_id(name, farm, verified, rating, reviews, photo)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
      return [];
    }

    // Restructure data to match Product interface
    const formattedData = data.map(item => ({
      ...item,
      farmer: item.farmer_id,
      farmer_id: item.farmer_id?.id
    }));

    return formattedData || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    toast.error("Failed to fetch products");
    return [];
  }
};

// Fetch products by farmer ID
export const fetchFarmerProducts = async (farmerId: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("farmer_id", farmerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching farmer products:", error);
      toast.error("Failed to fetch farmer products");
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Failed to fetch farmer products:", error);
    toast.error("Failed to fetch farmer products");
    return [];
  }
};

// Get a single product by ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, farmer_id(name, farm, verified, rating, reviews, photo)")
      .eq("id", productId)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      return null;
    }

    // Restructure data to match Product interface
    const formattedData = {
      ...data,
      farmer: data.farmer_id,
      farmer_id: data.farmer_id?.id
    };

    return formattedData;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};

// Create a new product
export const createProduct = async (product: ProductFormData, farmerId: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert({
        ...product,
        farmer_id: farmerId
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
      return null;
    }

    toast.success("Product created successfully");
    return data;
  } catch (error) {
    console.error("Failed to create product:", error);
    toast.error("Failed to create product");
    return null;
  }
};

// Update an existing product
export const updateProduct = async (id: string, product: Partial<ProductFormData>): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .update({
        ...product,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
      return null;
    }

    toast.success("Product updated successfully");
    return data;
  } catch (error) {
    console.error("Failed to update product:", error);
    toast.error("Failed to update product");
    return null;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
      return false;
    }

    toast.success("Product deleted successfully");
    return true;
  } catch (error) {
    console.error("Failed to delete product:", error);
    toast.error("Failed to delete product");
    return false;
  }
};

// Rate a farmer
export const rateFarmer = async (farmerId: string, rating: number): Promise<boolean> => {
  try {
    // First get the current rating and review count
    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("rating, reviews")
      .eq("id", farmerId)
      .single();
      
    if (fetchError) {
      console.error("Error fetching farmer profile:", fetchError);
      toast.error("Failed to rate farmer");
      return false;
    }
    
    // Calculate the new average rating
    const currentRating = profile.rating || 0;
    const currentReviews = profile.reviews || 0;
    
    const totalRatingValue = currentRating * currentReviews;
    const newReviews = currentReviews + 1;
    const newRating = (totalRatingValue + rating) / newReviews;
    
    // Update the farmer's profile with the new rating
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        rating: newRating,
        reviews: newReviews,
        updated_at: new Date().toISOString()
      })
      .eq("id", farmerId);
      
    if (updateError) {
      console.error("Error updating farmer rating:", updateError);
      toast.error("Failed to rate farmer");
      return false;
    }
    
    toast.success("Thank you for rating this farmer!");
    return true;
  } catch (error) {
    console.error("Failed to rate farmer:", error);
    toast.error("Failed to rate farmer");
    return false;
  }
};

// Fetch consumers who have purchased from a specific farmer
export const fetchFarmerConsumers = async (farmerId: string): Promise<any[]> => {
  try {
    // Get unique consumers who have purchased this farmer's products
    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        user_id,
        product:product_id (
          farmer_id
        ),
        consumer:user_id (
          name,
          email,
          location
        )
      `)
      .eq("product.farmer_id", farmerId);
      
    if (error) {
      console.error("Error fetching farmer's consumers:", error);
      toast.error("Failed to fetch consumers");
      return [];
    }
    
    // Filter out duplicates by user_id
    const uniqueConsumers = Array.from(
      new Map(
        data.map(item => [item.user_id, item.consumer])
      ).values()
    );
    
    return uniqueConsumers || [];
  } catch (error) {
    console.error("Failed to fetch farmer's consumers:", error);
    toast.error("Failed to fetch consumers");
    return [];
  }
};
