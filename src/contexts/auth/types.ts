
// Define user types
export type UserRole = "farmer" | "consumer";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  verified: boolean;
  photo?: string | null;
  location?: string;
  farm?: string;
  description?: string;
  specialties?: string[];
  rating?: number;
  reviews?: number;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  signup: (email: string, password: string, role: UserRole, name?: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
