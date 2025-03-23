
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import Farmers from "./pages/Farmers";
import FarmerDetails from "./pages/FarmerDetails";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import Sustainability from "./pages/Sustainability";
import Cart from "./pages/Cart";
import EquipmentSharing from "./pages/EquipmentSharing";

import { AuthProvider } from "./contexts/auth/AuthContext";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/farmers/:id" element={<FarmerDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/community" element={<Community />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/equipment-sharing" element={<EquipmentSharing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
