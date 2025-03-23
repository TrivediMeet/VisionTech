import { useState, useEffect } from "react";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Button } from "@/components/ui/button";
import { Order, OrderItem, fetchFarmerOrders } from "@/services/orders";
import { Users, Package, Calendar, Clock, ChevronDown, ChevronUp, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FarmerOrdersProps {
  isEditable?: boolean;
}

export const FarmerOrders = ({ isEditable = false }: FarmerOrdersProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    loadOrders();
  }, []);
  
  const loadOrders = async () => {
    setLoading(true);
    try {
      const farmerOrders = await fetchFarmerOrders();
      setOrders(farmerOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };
  
  if (loading) {
    return (
      <GlassMorphismCard className="p-6">
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-agri-primary border-t-transparent rounded-full"></div>
        </div>
      </GlassMorphismCard>
    );
  }
  
  return (
    <GlassMorphismCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Users className="mr-2 h-5 w-5 text-agri-primary" />
          Customer Orders
        </h3>
        
        {isEditable && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={loadOrders}
          >
            Refresh
          </Button>
        )}
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">You haven't received any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div 
                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                onClick={() => toggleOrderExpand(order.id)}
              >
                <div>
                  <div className="font-medium">Order #{order.id.substring(0, 8)}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(order.created_at).toLocaleDateString()}
                    <Clock className="h-3 w-3 ml-3 mr-1" />
                    {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-4 text-right">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={order.consumer?.photo || undefined} />
                        <AvatarFallback className="bg-agri-primary/10 text-agri-primary text-xs">
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{order.consumer?.name || order.consumer?.email || "Unknown"}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items?.length || 0} item(s)
                    </div>
                  </div>
                  
                  {expandedOrders[order.id] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              {expandedOrders[order.id] && order.items && (
                <div className="p-4 border-t">
                  <div className="space-y-3">
                    {order.items
                      .filter(item => item.product) // Only show items with product data
                      .map((item: OrderItem) => (
                        <div key={item.id} className="flex items-center">
                          <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                            {item.product?.image_url ? (
                              <img 
                                src={item.product.image_url} 
                                alt={item.product?.name} 
                                className="h-10 w-10 object-cover rounded"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          
                          <div className="flex-grow">
                            <div className="font-medium">{item.product?.name}</div>
                            <div className="text-sm text-gray-500">
                              {item.quantity} {item.product?.unit} × ${item.price.toFixed(2)}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-medium">
                              ${(item.quantity * item.price).toFixed(2)}
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </GlassMorphismCard>
  );
};