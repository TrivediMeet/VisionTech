
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "../types";
import { fetchUserProfile } from "./profile";

export const loginUser = async (email: string, password: string) => {
  try {
    console.log("Attempting login for:", email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Login error:", error.message);
      throw error;
    }

    if (data.user) {
      console.log("Login successful, user ID:", data.user.id);
      const profile = await fetchUserProfile(data.user.id);
      if (!profile) {
        console.error("Profile not found after login");
        throw new Error("User profile not found. Please contact support.");
      }
      return profile;
    }
    
    throw new Error("Login failed");
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signupUser = async (email: string, password: string, role: UserRole, name?: string) => {
  try {
    console.log("Attempting signup for:", email, "with role:", role);
    // Register the user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          name
        }
      }
    });

    if (error) {
      console.error("Signup error:", error.message);
      throw error;
    }

    if (!data.user) {
      throw new Error("Failed to create user account");
    }

    return data.user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    console.log("Attempting logout");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const resetPasswordRequest = async (email: string) => {
  try {
    console.log("Sending password reset for:", email);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      console.error("Forgot password error:", error.message);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

export const resetUserPassword = async (newPassword: string) => {
  try {
    console.log("Resetting password");
    // Note: When using the reset password flow with redirects,
    // the token is automatically handled by Supabase in the URL
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error("Reset password error:", error.message);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};

export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("Error fetching session:", error);
      throw error;
    }
    
    return session;
  } catch (error) {
    console.error("Session error:", error);
    throw error;
  }
};

export const subscribeToAuthChanges = (callback: (event: string, session: any) => void) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return subscription;
};
