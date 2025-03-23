
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { ArrowRight, ArrowLeft, ShieldCheck, StarIcon, MapPin } from "lucide-react";

// Sample farmer data
const farmers = [
  {
    id: 1,
    name: "Maya Patel",
    farm: "Green Earth Organics",
    location: "Karnataka, India",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=300&h=300",
    description: "Fourth-generation farmer specializing in ancient grain varieties using traditional methods with zero chemicals.",
    specialties: ["Ancient Grains", "Millets", "Pulses"],
    rating: 4.9,
    verified: true
  },
  {
    id: 2,
    name: "Thomas Rodriguez",
    farm: "Sunrise Permaculture",
    location: "California, USA",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=300&h=300",
    description: "Permaculture expert using innovative water conservation techniques and diverse crop rotations.",
    specialties: ["Heirloom Vegetables", "Citrus", "Herbs"],
    rating: 4.8,
    verified: true
  },
  {
    id: 3,
    name: "Leila Nguyen",
    farm: "Harmony Gardens",
    location: "Mekong Delta, Vietnam",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=300&h=300",
    description: "Integrated rice-fish farming system practitioner creating sustainable ecosystems with minimal inputs.",
    specialties: ["Rice Varieties", "Freshwater Fish", "Water Vegetables"],
    rating: 4.7,
    verified: true
  }
];

export const FarmerShowcase = () => {
  const [activeFarmer, setActiveFarmer] = useState(0);

  const nextFarmer = () => {
    setActiveFarmer((prev) => (prev === farmers.length - 1 ? 0 : prev + 1));
  };

  const prevFarmer = () => {
    setActiveFarmer((prev) => (prev === 0 ? farmers.length - 1 : prev - 1));
  };

  const farmer = farmers[activeFarmer];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-agri-secondary/5 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-agri-tertiary/5 rounded-tr-full"></div>
      <div className="bg-grain"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-agri-dark">
            Meet Our Verified Farmers
          </h2>
          <p className="text-lg text-agri-dark/70 text-pretty">
            Every farmer on AgriTrust undergoes rigorous verification to ensure true natural farming practices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="space-y-6 animate-fade-up">
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-agri-primary/10 rounded-full text-agri-primary text-xs font-medium">
                  Blockchain Verified
                </div>
                {farmer.verified && (
                  <div className="flex items-center text-xs text-agri-primary">
                    <ShieldCheck className="h-4 w-4 mr-1" />
                    Certified Natural
                  </div>
                )}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold">{farmer.name}</h3>
              <h4 className="text-xl text-agri-primary font-medium">{farmer.farm}</h4>
              
              <div className="flex items-center text-sm text-agri-dark/70">
                <MapPin className="h-4 w-4 mr-1" />
                {farmer.location}
              </div>
              
              <div className="flex items-center space-x-1">
                <StarIcon className="h-5 w-5 text-agri-tertiary fill-agri-tertiary" />
                <span className="font-bold">{farmer.rating}</span>
                <span className="text-agri-dark/70 text-sm">(120+ reviews)</span>
              </div>
              
              <p className="text-agri-dark/80 text-pretty">{farmer.description}</p>
              
              <div className="pt-2">
                <p className="font-medium mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {farmer.specialties.map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-agri-primary/5 rounded-full text-agri-primary text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-2">
                <Button className="rounded-full px-6 bg-agri-primary hover:bg-agri-primary/90 text-white">
                  View Profile
                </Button>
                <Button className="rounded-full px-6 bg-white border border-agri-primary/20 text-agri-dark hover:bg-agri-primary/5" variant="outline">
                  Shop Products
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 order-1 lg:order-2 animate-fade-in">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200&h=675"
                  alt={`${farmer.name} working on their farm`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Farmer card */}
              <div className="absolute -bottom-12 -right-4 max-w-xs">
                <GlassMorphismCard className="p-4 animate-fade-up" style={{animationDelay: "200ms"}}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={farmer.image}
                        alt={farmer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{farmer.name}</p>
                      <p className="text-sm text-agri-dark/70">{farmer.farm}</p>
                      {farmer.verified && (
                        <div className="flex items-center text-xs text-agri-primary mt-1">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                  </div>
                </GlassMorphismCard>
              </div>
              
              {/* Navigation controls */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2">
                <Button
                  onClick={prevFarmer}
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <Button
                  onClick={nextFarmer}
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Pagination indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {farmers.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeFarmer
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    onClick={() => setActiveFarmer(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
