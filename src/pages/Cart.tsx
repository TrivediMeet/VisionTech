
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartItem as CartItemType, fetchCartItems, clearCart } from "@/services/cart";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { ShoppingCart, ShoppingBasket, ArrowRight } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      loadCartItems();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);
  
  const loadCartItems = async () => {
    setLoading(true);
    try {
      const items = await fetchCartItems();
      setCartItems(items);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      const success = await clearCart();
      if (success) {
        setCartItems([]);
      }
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
            
            <GlassMorphismCard className="p-8 text-center">
              <ShoppingBasket className="h-12 w-12 mx-auto mb-4 text-agri-primary/50" />
              <h2 className="text-2xl font-semibold mb-4">Your Cart is Waiting</h2>
              <p className="text-gray-600 mb-6">
                Please sign in to view your shopping cart.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/signup">Create Account</Link>
                </Button>
              </div>
            </GlassMorphismCard>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-agri-primary border-t-transparent rounded-full"></div>
            </div>
          ) : cartItems.length === 0 ? (
            <GlassMorphismCard className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-agri-primary/50" />
              <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/marketplace">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </GlassMorphismCard>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Your Items ({cartItems.length})
                  </h2>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem 
                      key={item.id} 
                      item={item} 
                      onUpdate={loadCartItems} 
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <CartSummary items={cartItems} />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
