
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Search, Filter, MapPin, ShieldCheck, Star, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Farmers = () => {
  const [activeRegion, setActiveRegion] = useState("All Regions");
  const [activeSpecialty, setActiveSpecialty] = useState("All Specialties");
  const [farmers, setFarmers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFarmers = async () => {
      setIsLoading(true);
      try {
        // Fetch farmers from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'farmer');
        
        if (error) {
          console.error("Error fetching farmers:", error);
          return;
        }
        
        setFarmers(data || []);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  // Sample filter categories
  const regions = ["All Regions", "Asia", "North America", "South America", "Europe", "Africa", "Oceania"];
  const specialties = ["All Specialties", "Grains", "Vegetables", "Fruits", "Herbs", "Fish", "Livestock"];

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
                Our Verified Farmers
              </h1>
              <p className="text-lg text-agri-dark/80 mb-6 text-pretty">
                Discover and connect with natural farmers from around the world. Each farmer is verified for their sustainable practices and commitment to quality.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-lg">
                <input
                  type="text"
                  placeholder="Search for farmers by name, location, or specialty..."
                  className="w-full h-12 pl-12 pr-4 rounded-full border border-agri-dark/10 bg-white/80 focus:outline-none focus:ring-2 focus:ring-agri-primary focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-agri-dark/40" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Filters */}
        <section className="py-8 border-b border-agri-dark/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Filter by:</span>
                <div className="flex items-center space-x-1 overflow-x-auto pb-2 hide-scrollbar">
                  {regions.map((region) => (
                    <Button
                      key={region}
                      variant="ghost"
                      className={`rounded-full px-4 whitespace-nowrap ${
                        activeRegion === region
                          ? "bg-agri-primary/10 text-agri-primary"
                          : "text-agri-dark/70 hover:text-agri-primary"
                      }`}
                      onClick={() => setActiveRegion(region)}
                    >
                      {region}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium">Specialty:</span>
                <div className="flex items-center space-x-1 overflow-x-auto pb-2 hide-scrollbar">
                  {specialties.map((specialty) => (
                    <Button
                      key={specialty}
                      variant="ghost"
                      className={`rounded-full px-4 whitespace-nowrap ${
                        activeSpecialty === specialty
                          ? "bg-agri-primary/10 text-agri-primary"
                          : "text-agri-dark/70 hover:text-agri-primary"
                      }`}
                      onClick={() => setActiveSpecialty(specialty)}
                    >
                      {specialty}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button variant="ghost" className="rounded-full flex items-center gap-2 self-start md:self-auto">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Farmers Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-agri-primary border-t-transparent rounded-full"></div>
              </div>
            ) : farmers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No farmers found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setActiveRegion("All Regions");
                    setActiveSpecialty("All Specialties");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {farmers.map((farmer, index) => (
                  <div
                    key={farmer.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <GlassMorphismCard hoverEffect className="h-full">
                      <div className="flex flex-col h-full">
                        <div className="mb-4 relative">
                          <div className="aspect-square rounded-lg overflow-hidden">
                            <img
                              src={farmer.photo || "https://via.placeholder.com/300?text=No+Photo"}
                              alt={farmer.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {farmer.verified && (
                            <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium flex items-center">
                              <ShieldCheck className="h-3 w-3 mr-1 text-agri-primary" />
                              <span className="text-agri-primary">Verified</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-bold text-xl mb-1">{farmer.name}</h3>
                          <h4 className="text-agri-primary font-medium mb-2">{farmer.farm || "Independent Farmer"}</h4>
                          
                          <div className="flex items-center text-sm text-agri-dark/70 mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            {farmer.location || "Location not specified"}
                          </div>
                          
                          <div className="flex items-center space-x-1 mb-3">
                            <Star className="h-5 w-5 text-agri-tertiary fill-agri-tertiary" />
                            <span className="font-bold">{farmer.rating || "N/A"}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({farmer.reviews || 0} reviews)
                            </span>
                          </div>
                          
                          <p className="text-sm text-agri-dark/80 mb-4 line-clamp-2">{farmer.description || "No description available"}</p>
                          
                          {farmer.specialties && farmer.specialties.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xs font-medium mb-2">Specialties:</p>
                              <div className="flex flex-wrap gap-1">
                                {farmer.specialties.map((specialty: string, i: number) => (
                                  <span key={i} className="px-2 py-1 bg-agri-primary/5 rounded-full text-agri-primary text-xs">
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <Link to={`/farmers/${farmer.id}`}>
                          <Button className="w-full rounded-full mt-2 bg-agri-primary hover:bg-agri-primary/90 text-white">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </GlassMorphismCard>
                  </div>
                ))}
              </div>
            )}
            
            {farmers.length > 0 && (
              <div className="mt-12 text-center">
                <Button className="rounded-full px-6 bg-agri-primary hover:bg-agri-primary/90 text-white">
                  Load More Farmers
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Farmers;
