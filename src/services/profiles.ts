
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Profile {
  id: string;
  name: string | null;
  email: string;
  role: string;
  farm: string | null;
  location: string | null;
  description: string | null;
  photo: string | null;
  rating: number | null;
  reviews: number | null;
  verified: boolean | null;
  specialties: string[] | null;
  created_at: string;
  updated_at: string;
}

// Get profile by ID
export const getProfileById = async (profileId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", profileId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
};

// Get all farmer profiles
export const getAllFarmers = async (): Promise<Profile[]> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "farmer")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching farmers:", error);
      toast.error("Failed to fetch farmers");
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Failed to fetch farmers:", error);
    toast.error("Failed to fetch farmers");
    return [];
  }
};

// Update profile
export const updateProfile = async (profileId: string, profile: Partial<Profile>): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...profile,
        updated_at: new Date().toISOString()
      })
      .eq("id", profileId)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
      return null;
    }

    toast.success("Profile updated successfully");
    return data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    toast.error("Failed to update profile");
    return null;
  }
};
