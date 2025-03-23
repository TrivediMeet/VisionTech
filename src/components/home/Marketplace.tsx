
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShoppingCart } from "lucide-react";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { fetchAllProducts, Product } from "@/services/products";
import { Link } from "react-router-dom";
import { addToCart } from "@/services/cart";
import { useAuth } from "@/contexts/auth";
import { toast } from "sonner";

export const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data.slice(0, 4)); // Only show first 4 products
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      toast.error("Please log in to add items to your cart");
      return;
    }
    
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="bg-grain"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="inline-block px-4 py-1.5 bg-agri-primary/10 rounded-full text-agri-primary text-sm font-medium mb-4">
              Direct Market Connection
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-agri-dark">
              Farm Fresh Products
            </h2>
            <p className="text-lg text-agri-dark/80 mt-2 max-w-xl text-pretty">
              Shop directly from verified natural farmers with full transparency and fair prices.
            </p>
          </div>
          <Link to="/marketplace">
            <Button className="rounded-full px-6 bg-agri-primary hover:bg-agri-primary/90 text-white self-start md:self-auto">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <GlassMorphismCard className="h-full">
                  <div className="aspect-square rounded-lg bg-gray-200 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-5 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-9 w-9 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </GlassMorphismCard>
              </div>
            ))
          ) : (
            products.map((product, index) => (
              <div key={product.id} className="animate-fade-up" style={{animationDelay: `${index * 100}ms`}}>
                <GlassMorphismCard hoverEffect className="h-full">
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
                  </div>

                  <div className="space-y-2">
                    {product.farmer && (
                      <div className="flex items-center text-xs text-agri-dark/70">
                        <Link to={`/farmers/${product.farmer_id}`}>
                          <span>{product.farmer.name}</span>
                          <span className="mx-1">•</span>
                          <span>{product.farmer.farm}</span>
                        </Link>
                      </div>
                    )}
                    
                    <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                    
                    {product.farmer?.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-agri-tertiary fill-agri-tertiary" />
                        <span className="font-medium text-sm">{product.farmer.rating.toFixed(1)}</span>
                        {product.farmer.reviews && (
                          <span className="text-xs text-gray-500">({product.farmer.reviews})</span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-baseline">
                        <span className="text-lg font-bold">${product.price}</span>
                        <span className="text-sm text-agri-dark/70 ml-1">/{product.unit}</span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="rounded-full h-9 w-9 p-0 bg-agri-primary hover:bg-agri-primary/90"
                        onClick={() => handleAddToCart(product.id)}
                        disabled={!user || product.stock_quantity <= 0}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>

                    {product.stock_quantity <= 0 && (
                      <div className="text-red-500 text-sm font-medium mt-2">Out of stock</div>
                    )}
                  </div>
                </GlassMorphismCard>
              </div>
            ))
          )}
        </div>

        <div className="mt-16 bg-agri-beige rounded-2xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-agri-tertiary/10 rounded-l-full"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-agri-tertiary/20 rounded-full text-agri-tertiary text-sm font-medium">
                Zero-Waste Initiative
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-agri-dark">
                "Second Chance" Produce at Special Prices
              </h2>
              <p className="text-agri-dark/80 text-pretty">
                Perfectly imperfect fruits and vegetables at discounted prices. Same nutritional value, less food waste, better for the planet.
              </p>
              <Link to="/marketplace?category=Zero-Waste">
                <Button className="rounded-full px-6 bg-agri-tertiary hover:bg-agri-tertiary/90 text-white">
                  Explore Zero-Waste Market
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="relative h-64 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600&h=400"
                alt="Imperfect produce"
                className="absolute -top-10 right-0 w-4/5 h-auto rounded-lg shadow-lg object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1562114732-32feb94611f6?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400&h=300"
                alt="Organic vegetables"
                className="absolute bottom-0 left-0 w-3/5 h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
