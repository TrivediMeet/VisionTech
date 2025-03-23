
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { useAuth } from "@/contexts/auth";
import { toast } from "sonner";
import { Loader2, User, Mail, BadgeCheck, LogOut } from "lucide-react";
import { EcoPassport } from "@/components/profile/EcoPassport";
import { OrderHistory } from "@/components/profile/OrderHistory";
import { FarmerOrders } from "@/components/profile/FarmerOrders";

const profileFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const { user, isLoading, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect to login if not authenticated
  if (!user && !isLoading) {
    navigate("/login");
    return null;
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
    values: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setIsUpdating(true);
    try {
      await updateProfile({ name: values.name });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-agri-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-24 px-6 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-agri-primary mb-8 text-center">My Account</h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="account">Account Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <GlassMorphismCard>
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-20 h-20 bg-agri-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-agri-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{user?.name || user?.email}</h2>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-1" />
                      {user?.email}
                    </div>
                    <div className="flex items-center mt-1">
                      <Badge variant={user?.role === "farmer" ? "farmer" : "consumer"}>
                        {user?.role === "farmer" ? "Farmer" : "Consumer"}
                      </Badge>
                      {user?.verified && (
                        <div className="flex items-center text-green-600 text-sm ml-2">
                          <BadgeCheck className="h-4 w-4 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto rounded-full"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </GlassMorphismCard>
              
              {user?.role === "farmer" && (
                <div className="mt-8">
                  <EcoPassport isEditable={true} />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="orders">
              {user?.role === "consumer" ? (
                <OrderHistory isEditable={true} />
              ) : (
                <FarmerOrders isEditable={true} />
              )}
            </TabsContent>
            
            <TabsContent value="account">
              <GlassMorphismCard className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Account Security</h3>
                  <p className="text-gray-600 text-sm mb-4">Manage your account security settings</p>
                  
                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto"
                      onClick={() => navigate("/reset-password")}
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2 text-destructive">Danger Zone</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  
                  <div className="flex space-x-4">
                    <Button 
                      variant="destructive" 
                      className="w-full sm:w-auto"
                      onClick={() => {
                        if (confirm("Are you sure you want to log out?")) {
                          logout();
                        }
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </div>
                </div>
              </GlassMorphismCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Role badge component
const Badge = ({ children, variant = "consumer" }: { 
  children: React.ReactNode; 
  variant?: "farmer" | "consumer" 
}) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${variant === "farmer" 
        ? "bg-amber-100 text-amber-800" 
        : "bg-green-100 text-green-800"
      }`}>
      {children}
    </span>
  );
};

export default Profile;
