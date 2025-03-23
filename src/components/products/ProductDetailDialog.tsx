import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Product, rateFarmer } from "@/services/products";
import { addToCart } from "@/services/cart";
import { useAuth } from "@/contexts/auth";
import { Star, ShoppingCart, Leaf, ShieldCheck, User, MapPin, Mail } from "lucide-react";
import { toast } from "sonner";

interface ProductDetailDialogProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductDetailDialog = ({
  product,
  isOpen,
  onOpenChange,
}: ProductDetailDialogProps) => {
  const { user } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  
  const farmer = product?.farmer;
  
  const handleAddToCart = async () => {
    if (!product) return;
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }
    
    setIsAddingToCart(true);
    try {
      await addToCart(product.id, 1);
      toast.success("Added to cart successfully");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleRateFarmer = async () => {
    if (!selectedRating || !farmer || !product) return;

    setIsSubmittingRating(true);
    try {
      const success = await rateFarmer(product.farmer_id, selectedRating);
      if (success) {
        setIsRatingDialogOpen(false);
        setSelectedRating(null);
        toast.success("Thank you for rating this farmer!");
      }
    } catch (error) {
      console.error("Failed to rate farmer:", error);
      toast.error("Failed to rate farmer");
    } finally {
      setIsSubmittingRating(false);
    }
  };
  
  if (!product) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-4">
            {/* Product Info */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-agri-primary/10 text-agri-primary text-sm rounded-full">
                    {product.category}
                  </span>
                  {product.eco_certified && (
                    <span className="flex items-center px-2 py-1 bg-agri-secondary/10 text-agri-secondary text-sm rounded-full">
                      <Leaf className="h-3 w-3 mr-1" />
                      EcoPassport
                    </span>
                  )}
                </div>
                <div className="text-xl font-bold">
                  ${product.price} <span className="text-sm text-gray-500">/{product.unit}</span>
                </div>
              </div>
              
              <p className="mt-3 text-gray-700">{product.description}</p>
              
              <div className="mt-3">
                <span className="text-sm text-gray-500">
                  {product.stock_quantity > 0 ? (
                    <span className="text-green-600">
                      In Stock: {product.stock_quantity} {product.unit}(s)
                    </span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </span>
              </div>
            </div>
            
            {/* Farmer Details */}
            {farmer && (
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-2">Farmer Information</h3>
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={farmer.photo || undefined} />
                    <AvatarFallback className="bg-agri-primary/10 text-agri-primary">
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center">
                      <Link 
                        to={`/farmers/${product.farmer_id}`}
                        className="font-medium hover:text-agri-primary"
                      >
                        {farmer.name}
                      </Link>
                      {farmer.verified && (
                        <ShieldCheck className="h-4 w-4 ml-1 text-agri-primary" />
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600">{farmer.farm}</div>
                    
                    {farmer.rating && (
                      <div className="flex items-center mt-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto hover:bg-transparent"
                          onClick={() => user && user.role !== "farmer" && setIsRatingDialogOpen(true)}
                        >
                          <Star className="h-4 w-4 text-agri-tertiary fill-agri-tertiary" />
                          <span className="font-medium text-sm ml-1">{farmer.rating.toFixed(1)}</span>
                        </Button>
                        {farmer.reviews && (
                          <span className="text-xs text-gray-500 ml-1">({farmer.reviews} reviews)</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 w-full"
                  asChild
                >
                  <Link to={`/farmers/${product.farmer_id}`}>
                    View Farmer Profile
                  </Link>
                </Button>
              </div>
            )}
            
            {/* Add to Cart Button */}
            <div className="pt-4">
              <Button 
                className="w-full bg-agri-primary hover:bg-agri-primary/90"
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock_quantity <= 0}
              >
                {isAddingToCart ? (
                  <span className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Adding...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Rating Dialog */}
        {isRatingDialogOpen && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">Rate this Farmer</h3>
            <p className="text-sm text-gray-600 mb-3">
              How would you rate your experience with {farmer?.name} from {farmer?.farm}?
            </p>
            
            <div className="flex justify-center gap-2 my-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="ghost"
                  size="sm"
                  className={`h-12 w-12 rounded-full ${
                    selectedRating === rating 
                      ? 'bg-agri-tertiary/20 text-agri-tertiary' 
                      : ''
                  }`}
                  onClick={() => setSelectedRating(rating)}
                >
                  <Star className={`h-6 w-6 ${
                    selectedRating && rating <= selectedRating 
                      ? 'text-agri-tertiary fill-agri-tertiary' 
                      : 'text-gray-300'
                  }`} />
                </Button>
              ))}
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsRatingDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRateFarmer}
                disabled={!selectedRating || isSubmittingRating}
              >
                {isSubmittingRating ? 'Submitting...' : 'Submit Rating'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};