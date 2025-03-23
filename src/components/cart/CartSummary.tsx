
import { CartItem } from "@/services/cart";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { processCheckout } from "@/services/orders";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  items: CartItem[];
}

export const CartSummary = ({ items }: CartSummaryProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.product ? item.product.price * item.quantity : 0;
    return sum + itemPrice;
  }, 0);
  
  const shippingFee = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shippingFee;
  
  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsProcessing(true);
    try {
      const order = await processCheckout();
      if (order) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <GlassMorphismCard className="p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping Fee</span>
          {shippingFee === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span>${shippingFee.toFixed(2)}</span>
          )}
        </div>
        
        {subtotal > 0 && subtotal < 50 && (
          <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
            Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping
          </div>
        )}
        
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4" 
          disabled={items.length === 0 || isProcessing}
          onClick={handleCheckout}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isProcessing ? "Processing..." : "Proceed to Checkout"}
        </Button>
        
        <Button variant="outline" className="w-full mt-2" asChild>
          <a href="/marketplace">
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </GlassMorphismCard>
  );
};
