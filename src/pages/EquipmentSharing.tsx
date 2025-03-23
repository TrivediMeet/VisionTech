
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Filter, Search, MapPin } from "lucide-react";
import { Equipment, fetchAllEquipment, fetchEquipmentByLocation } from "@/services/equipment";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { FarmerEquipmentManager } from "@/components/equipment/FarmerEquipmentManager";
import { BookingManager } from "@/components/equipment/BookingManager";
import { useAuth } from "@/contexts/auth";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Equipment types for filtering
const equipmentTypes = [
  "All Equipment",
  "Tractors",
  "Harvesters",
  "Tillers",
  "Planters",
  "Irrigation",
  "Tools",
  "Other"
];

const EquipmentSharing = () => {
  const [activeType, setActiveType] = useState("All Equipment");
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const { user } = useAuth();
  
  useEffect(() => {
    loadEquipment();
  }, [locationFilter]);
  
  const loadEquipment = async () => {
    setLoading(true);
    try {
      let data;
      if (locationFilter) {
        data = await fetchEquipmentByLocation(locationFilter);
      } else {
        data = await fetchAllEquipment();
      }
      console.log("Equipment loaded:", data);
      setEquipment(data);
    } catch (error) {
      console.error("Error loading equipment:", error);
      toast.error("Failed to load equipment listings");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // If searching for a location, update location filter
    setLocationFilter(searchQuery);
  };
  
  const filteredEquipment = equipment.filter(item => {
    // For the main listing, exclude own equipment (farmer sees their equipment in FarmerEquipmentManager)
    if (user && user.id === item.owner_id) {
      return false;
    }
    
    // Filter by type (using the name field)
    if (activeType !== "All Equipment") {
      const type = activeType.toLowerCase();
      const name = item.name.toLowerCase();
      const description = item.description ? item.description.toLowerCase() : "";
      
      if (!name.includes(type) && !description.includes(type)) {
        return false;
      }
    }
    
    // Filter by search query if there's no location filter active
    if (!locationFilter && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        (item.description?.toLowerCase().includes(query) || false) ||
        item.location.toLowerCase().includes(query) ||
        (item.owner?.name?.toLowerCase().includes(query) || false) ||
        (item.owner?.farm?.toLowerCase().includes(query) || false)
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
                Farm Equipment Sharing
              </h1>
              <p className="text-lg text-agri-dark/80 mb-6 text-pretty">
                Share your farm equipment with other farmers or find equipment to rent nearby. Reduce costs and build community.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-lg">
                <div className="flex">
                  <div className="relative flex-grow">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-agri-dark/40" />
                    <Input
                      type="text"
                      placeholder="Search by location..."
                      className="pl-12 pr-4 py-3 rounded-l-full border border-agri-dark/10 bg-white/80 focus:outline-none focus:ring-2 focus:ring-agri-primary focus:border-transparent w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="rounded-r-full bg-agri-primary hover:bg-agri-primary/90">
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="py-8 border-b border-agri-dark/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 overflow-x-auto pb-2 hide-scrollbar">
                {equipmentTypes.map((type) => (
                  <Button
                    key={type}
                    variant="ghost"
                    className={`rounded-full px-4 whitespace-nowrap ${
                      activeType === type
                        ? "bg-agri-primary/10 text-agri-primary"
                        : "text-agri-dark/70 hover:text-agri-primary"
                    }`}
                    onClick={() => setActiveType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
              
              <Button variant="ghost" className="rounded-full flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>
        </section>

        {/* User is logged in - show equipment management */}
        {user && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 gap-8">
                {/* Farmer's Equipment Manager - only for farmers */}
                {user.role === "farmer" && <FarmerEquipmentManager />}
                
                {/* Equipment Booking Manager - for all users (borrowers and farmers) */}
                <BookingManager />
              </div>
            </div>
          </section>
        )}
        
        {/* Available Equipment Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                {locationFilter 
                  ? `Equipment near ${locationFilter}` 
                  : activeType === "All Equipment" 
                    ? "Available Equipment" 
                    : activeType}
              </h2>
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
            ) : filteredEquipment.length === 0 ? (
              <GlassMorphismCard className="py-12 text-center">
                <h3 className="text-xl font-bold mb-4">No Equipment Found</h3>
                <p className="text-agri-dark/80 mb-6">
                  {locationFilter
                    ? `No equipment available near ${locationFilter}. Try a different location.`
                    : searchQuery
                    ? "No equipment matches your search criteria. Try a different search term."
                    : activeType !== "All Equipment"
                    ? `No ${activeType.toLowerCase()} available at the moment.`
                    : "No equipment available at the moment. Please check back later."}
                </p>
                {(searchQuery || locationFilter || activeType !== "All Equipment") && (
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setLocationFilter("");
                      setActiveType("All Equipment");
                      loadEquipment();
                    }}
                  >
                    View All Equipment
                  </Button>
                )}
              </GlassMorphismCard>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredEquipment.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <EquipmentCard equipment={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EquipmentSharing;
