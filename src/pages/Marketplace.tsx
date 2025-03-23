
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Filter, Search, ChevronDown, ShoppingCart } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { FarmerProductsManager } from "@/components/products/FarmerProductsManager";
import { fetchAllProducts, Product, fetchFarmerConsumers } from "@/services/products";
import { useAuth } from "@/contexts/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

// Sample categories
const categories = [
  "All Products",
  "Vegetables",
  "Fruits",
  "Grains",
  "Dairy",
  "Herbs",
  "Preserves",
  "Zero-Waste"
];

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConsumersDialogOpen, setIsConsumersDialogOpen] = useState(false);
  const [consumers, setConsumers] = useState<any[]>([]);
  const [isLoadingConsumers, setIsLoadingConsumers] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProducts();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewConsumers = async () => {
    if (!user?.id) {
      toast.error("You need to be logged in as a farmer to view consumers");
      return;
    }
    
    setIsLoadingConsumers(true);
    setIsConsumersDialogOpen(true);
    
    try {
      const consumersData = await fetchFarmerConsumers(user.id);
      setConsumers(consumersData);
    } catch (error) {
      console.error("Error loading consumers:", error);
    } finally {
      setIsLoadingConsumers(false);
    }
  };
  
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (activeCategory !== "All Products" && product.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.farmer?.name?.toLowerCase().includes(query) ||
        product.farmer?.farm?.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative bg-agri-primary/5 py-16">
          <div className="bg-grain"></div>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-agri-dark">
                Digital Marketplace
              </h1>
              <p className="text-lg text-agri-dark/80 mb-6 text-pretty">
                Shop directly from verified natural farmers with full transparency, fair prices, and sustainable options.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-lg">
                <input
                  type="text"
                  placeholder="Search for products, farmers, or farms..."
                  className="w-full h-12 pl-12 pr-4 rounded-full border border-agri-dark/10 bg-white/80 focus:outline-none focus:ring-2 focus:ring-agri-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-agri-dark/40" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="py-8 border-b border-agri-dark/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 overflow-x-auto pb-2 hide-scrollbar">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className={`rounded-full px-4 whitespace-nowrap ${
                      activeCategory === category
                        ? "bg-agri-primary/10 text-agri-primary"
                        : "text-agri-dark/70 hover:text-agri-primary"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-2">
                {user?.role === "farmer" && (
                  <Button 
                    variant="outline" 
                    className="rounded-full flex items-center gap-2"
                    onClick={handleViewConsumers}
                  >
                    View My Consumers
                  </Button>
                )}
                
                <Button variant="ghost" className="rounded-full flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Farmer Products Manager (visible only to farmers) */}
        {user?.role === "farmer" && (
          <section className="py-12 bg-agri-primary/5">
            <div className="max-w-7xl mx-auto px-6">
              <FarmerProductsManager onProductsChange={loadProducts} />
            </div>
          </section>
        )}
        
        {/* Products Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                {activeCategory === "All Products" ? "All Products" : activeCategory}
              </h2>
              
              <Button variant="ghost" className="rounded-full text-sm flex items-center gap-1">
                Sort By: <span className="font-medium">Newest</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="h-80 bg-gray-100 animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <GlassMorphismCard className="py-12 text-center">
                <h3 className="text-xl font-bold mb-4">No Products Found</h3>
                <p className="text-agri-dark/80 mb-6">
                  {searchQuery
                    ? "No products match your search criteria. Try a different search term."
                    : activeCategory !== "All Products"
                    ? `No products found in the ${activeCategory} category.`
                    : "No products available at the moment. Please check back later."}
                </p>
                {(searchQuery || activeCategory !== "All Products") && (
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All Products");
                    }}
                  >
                    View All Products
                  </Button>
                )}
              </GlassMorphismCard>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
            
            {filteredProducts.length > 12 && (
              <div className="mt-12 text-center">
                <Button className="rounded-full px-6 bg-agri-primary hover:bg-agri-primary/90 text-white">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      {/* Consumers Dialog for Farmers */}
      <Dialog open={isConsumersDialogOpen} onOpenChange={setIsConsumersDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>My Consumers</DialogTitle>
          </DialogHeader>
          
          {isLoadingConsumers ? (
            <div className="py-8 flex justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-agri-primary border-t-transparent rounded-full"></div>
            </div>
          ) : consumers.length === 0 ? (
            <div className="py-8 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-agri-primary/50" />
              <h3 className="text-xl font-bold mb-2">No Consumers Yet</h3>
              <p className="text-gray-600">
                You haven't had any purchases from consumers yet.
              </p>
            </div>
          ) : (
            <div className="py-4">
              <div className="divide-y">
                {consumers.map((consumer, index) => (
                  <div key={index} className="py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-agri-primary/20 rounded-full flex items-center justify-center mr-4">
                        <span className="text-agri-primary font-medium">
                          {consumer.name?.[0] || "C"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{consumer.name || "Unnamed Consumer"}</h4>
                        {consumer.location && (
                          <p className="text-sm text-gray-600">{consumer.location}</p>
                        )}
                        {consumer.email && (
                          <p className="text-sm text-gray-500">{consumer.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
