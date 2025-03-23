
import { useState } from "react";
import { CartItem as CartItemType } from "@/services/cart";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { updateCartItemQuantity, removeFromCart } from "@/services/cart";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
  onUpdate: () => void;
}

export const CartItem = ({ item, onUpdate }: CartItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const product = item.product;
  
  if (!product) return null;
  
  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true);
    try {
      await updateCartItemQuantity(item.id, newQuantity);
      onUpdate();
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await removeFromCart(item.id);
      onUpdate();
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          <div className="w-20 h-20 rounded overflow-hidden mr-4 flex-shrink-0">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-400">No image</span>
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <h3 className="font-medium">{product.name}</h3>
            {product.farmer && (
              <Link to={`/farmers/${product.farmer_id}`} className="text-sm text-gray-600 hover:text-agri-primary">
                {product.farmer.name} • {product.farmer.farm}
              </Link>
            )}
            
            <div className="flex justify-between items-center mt-2">
              <div className="font-medium">
                ${product.price}/{product.unit}
              </div>
              
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  disabled={isUpdating}
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="mx-2 min-w-[2rem] text-center">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  disabled={isUpdating || item.quantity >= product.stock_quantity}
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="font-semibold">
                ${(product.price * item.quantity).toFixed(2)}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                disabled={isUpdating}
                onClick={handleRemove}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
