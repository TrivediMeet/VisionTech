import { Product, rateFarmer } from "@/services/products";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Leaf, ShieldCheck, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { addToCart } from "@/services/cart";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ProductDetailDialog } from "./ProductDetailDialog";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  isFarmerView?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  className?: string;
}

export const ProductCard = ({ 
  product, 
  isFarmerView = false,
  onEdit,
  onDelete,
  className = ""
}: ProductCardProps) => {
  const { user } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  
  const farmer = product.farmer;
  
  const handleAddToCart = async () => {
    if (!user) {
      // Redirect to login if user is not logged in
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
  
  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      onDelete(product);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRateFarmer = async () => {
    if (!selectedRating || !farmer) return;

    setIsSubmittingRating(true);
    try {
      const success = await rateFarmer(product.farmer_id, selectedRating);
      if (success) {
        setIsRatingDialogOpen(false);
        setSelectedRating(null);
      }
    } finally {
      setIsSubmittingRating(false);
    }
  };
  
  const handleProductClick = () => {
    if (!isFarmerView) {
      setIsDetailDialogOpen(true);
    }
  };

  return (
    <>
      <GlassMorphismCard 
        hoverEffect 
        className={`h-full ${className} ${!isFarmerView ? 'cursor-pointer' : ''}`}
        onClick={handleProductClick}
      >
        <div className="relative">
          <div className="aspect-square rounded-lg overflow-hidden mb-4">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          
          <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium text-agri-primary">
            {product.category}
          </div>
          
          <div className="absolute bottom-6 left-2 flex flex-col gap-1">
            {farmer?.verified && (
              <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium flex items-center">
                <ShieldCheck className="h-3 w-3 mr-1 text-agri-primary" />
                <span className="text-agri-primary">Verified</span>
              </div>
            )}
            {product.eco_certified && (
              <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium flex items-center">
                <Leaf className="h-3 w-3 mr-1 text-agri-secondary" />
                <span className="text-agri-secondary">EcoPassport</span>
              </div>
            )}
          </div>
        </div>
       
        <div className="space-y-2">
          {farmer && (
            <div className="flex items-center text-xs text-agri-dark/70">
              
              <Link to={`/farmers/${product.farmer_id}`} className="hover:text-agri-primary">
                <span>{farmer.name}</span>
                <span className="mx-1">•</span>
                <span>{farmer.farm}</span>
              </Link>
            </div>
          )}
          
          <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
          
          {farmer?.rating && (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-auto hover:bg-transparent"
                onClick={() => user && !isFarmerView && setIsRatingDialogOpen(true)}
              >
                <Star className="h-4 w-4 text-agri-tertiary fill-agri-tertiary" />
                <span className="font-medium text-sm ml-1">{farmer.rating.toFixed(1)}</span>
              </Button>
              {farmer.reviews && (
                <span className="text-xs text-gray-500">({farmer.reviews} reviews)</span>
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-baseline">
              <span className="text-lg font-bold">${product.price}</span>
              <span className="text-sm text-agri-dark/70 ml-1">/{product.unit}</span>
            </div>
            
            {isFarmerView ? (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-9 w-9 p-0" 
                  onClick={() => onEdit?.(product)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-9 w-9 p-0 text-red-500 hover:text-red-700 hover:bg-red-50" 
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                size="sm" 
                className="rounded-full h-9 w-9 p-0 bg-agri-primary hover:bg-agri-primary/90"
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock_quantity <= 0}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {product.stock_quantity <= 0 && (
            <div className="text-red-500 text-sm font-medium mt-2">Out of stock</div>
          )}
          
          {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
            <div className="text-orange-500 text-sm font-medium mt-2">
              Only {product.stock_quantity} left
            </div>
          )}
        </div>
      </GlassMorphismCard>

      {/* Product Detail Dialog */}
      <ProductDetailDialog 
        product={product}
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />

      {/* Rating Dialog */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rate this Farmer</DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            <p className="mb-4 text-sm text-gray-600">
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
          </div>
          
          <DialogFooter>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
