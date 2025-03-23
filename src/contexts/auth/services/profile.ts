
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "../types";

// Fetch user profile from the profiles table
export const fetchUserProfile = async (userId: string) => {
  try {
    console.log("Fetching user profile for ID:", userId);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    if (data) {
      console.log("User profile data:", data);
      return {
        id: data.id,
        email: data.email,
        role: data.role as UserRole,
        name: data.name || "",
        verified: data.verified ?? false,
        photo: data.photo || null,
        location: data.location || "",
        farm: data.farm || "",
        description: data.description || "",
        specialties: data.specialties || [],
        rating: data.rating || 0,
        reviews: data.reviews || 0
      };
    } else {
      console.log("No user profile found");
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, data: Partial<User>) => {
  try {
    console.log("Updating profile for user ID:", userId);
    const { error } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", userId);

    if (error) {
      console.error("Update profile error:", error.message);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};
