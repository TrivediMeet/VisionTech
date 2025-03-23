
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, UserRole } from "./types";
import { 
  loginUser, 
  signupUser, 
  logoutUser, 
  resetPasswordRequest, 
  resetUserPassword, 
  getCurrentSession,
  subscribeToAuthChanges
} from "./services/auth";
import { fetchUserProfile, updateUserProfile } from "./services/profile";

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check for session and initialize user
  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoading(true);
        console.log("Checking for existing session...");
        
        // Get the current session
        const session = await getCurrentSession();
        
        if (session?.user) {
          console.log("Found existing session, user ID:", session.user.id);
          const profile = await fetchUserProfile(session.user.id);
          if (profile) {
            setUser(profile);
          } else {
            console.error("Profile not found for authenticated user");
          }
        } else {
          console.log("No active session found");
        }
      } catch (error) {
        console.error("Session initialization error:", error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    fetchSession();

    // Subscribe to auth changes
    const subscription = subscribeToAuthChanges(
      async (event, session) => {
        console.log("Auth state changed:", event);
        
        if (event === "SIGNED_IN" && session) {
          console.log("User signed in, ID:", session.user.id);
          setIsLoading(true);
          try {
            const profile = await fetchUserProfile(session.user.id);
            if (profile) {
              setUser(profile);
            } else {
              console.error("Profile not found for signed-in user");
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
          } finally {
            setIsLoading(false);
          }
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
          setUser(null);
        } else if (event === "USER_UPDATED" && session) {
          console.log("User updated, refreshing profile");
          try {
            const profile = await fetchUserProfile(session.user.id);
            if (profile) {
              setUser(profile);
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string, remember: boolean) => {
    setIsLoading(true);
    try {
      const profile = await loginUser(email, password);
      setUser(profile);
      toast.success(`Welcome back, ${profile.name || profile.email}!`);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred during login");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, role: UserRole, name?: string) => {
    setIsLoading(true);
    try {
      await signupUser(email, password, role, name);
      toast.success("Account created! Please check your email to verify your account");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred during signup");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      setUser(null);
      toast.success("You have been logged out");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred during logout");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await resetPasswordRequest(email);
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      console.error("Password reset request error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await resetUserPassword(newPassword);
      toast.success("Your password has been reset successfully");
      navigate("/login");
    } catch (error) {
      console.error("Password reset error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("You must be logged in to update your profile");
      }

      await updateUserProfile(user.id, data);
      
      // Update the user state
      setUser({ ...user, ...data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
      if (error instanceof Error) {
        toast.error(`Failed to update profile: ${error.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isInitialized,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
  };
};
