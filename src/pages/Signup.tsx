
import { Navigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { SignupForm } from "@/components/signup/SignupForm";
import { useAuth } from "@/contexts/auth";

const Signup = () => {
  const { isAuthenticated, isInitialized } = useAuth();

  // Redirect if already authenticated
  if (isInitialized && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-6 bg-gradient-to-b from-green-50 to-white">
        <div className="w-full max-w-lg">
          <GlassMorphismCard className="px-8 py-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-agri-primary mb-2">Create an Account</h1>
              <p className="text-gray-600">Join AgriTrust's sustainable food ecosystem</p>
            </div>
            
            <SignupForm />
          </GlassMorphismCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
