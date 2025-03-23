
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, BarChart3, TreePine, Droplets, Award, Flag } from "lucide-react";

const Sustainability = () => {
  // Sample sustainability data
  const ecoImpactData = [
    {
      title: "Water Saved",
      value: "45.2M",
      unit: "gallons",
      description: "Through water-efficient farming techniques",
      icon: Droplets,
      color: "text-blue-500"
    },
    {
      title: "Carbon Reduced",
      value: "1,250",
      unit: "tons CO₂",
      description: "By supporting local farmers and sustainable practices",
      icon: TreePine,
      color: "text-green-600"
    },
    {
      title: "Land Preserved",
      value: "8,320",
      unit: "acres",
      description: "Through natural farming without chemical degradation",
      icon: Flag,
      color: "text-agri-tertiary"
    },
    {
      title: "Certifications",
      value: "1,450+",
      unit: "farmers",
      description: "Verified sustainable natural farming practitioners",
      icon: Award,
      color: "text-agri-primary"
    }
  ];
  
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
                Sustainability Impact
              </h1>
              <p className="text-lg text-agri-dark/80 mb-6 text-pretty">
                Track our collective progress towards a more sustainable food system. Every purchase on AgriTrust contributes to environmental conservation and supports natural farming practices.
              </p>
            </div>
          </div>
        </section>
        
        {/* Impact Stats */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ecoImpactData.map((stat, index) => (
                <GlassMorphismCard 
                  key={index} 
                  className="animate-fade-up" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-full ${stat.color === "text-agri-primary" ? "bg-agri-primary/10" : "bg-agri-secondary/10"} mb-4`}>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-sm uppercase tracking-wider text-agri-dark/60 mb-2">{stat.unit}</p>
                    <p className="text-agri-dark/80">{stat.description}</p>
                  </div>
                </GlassMorphismCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* Eco Goals */}
        <section className="py-16 bg-agri-primary/5 relative">
          <div className="bg-grain"></div>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-block px-4 py-1.5 bg-agri-primary/10 rounded-full text-agri-primary text-sm font-medium mb-4">
                Our Sustainability Goals
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-agri-dark">
                Committed to a Better Future
              </h2>
              <p className="text-lg text-agri-dark/70 text-pretty">
                We're working with farmers and consumers toward these ambitious goals for the next 5 years.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <GlassMorphismCard className="animate-fade-up" style={{ animationDelay: "100ms" }}>
                <div className="flex flex-col h-full">
                  <div className="p-3 bg-green-500/10 rounded-lg w-fit mb-4">
                    <Leaf className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">100% Chemical-Free</h3>
                  <p className="text-agri-dark/70 mb-4 text-pretty flex-grow">
                    Support 10,000 farmers to transition to completely chemical-free natural farming methods through training and resources.
                  </p>
                  <div className="pt-4 border-t border-agri-dark/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-agri-primary">42%</span>
                    </div>
                    <div className="w-full h-2 bg-agri-dark/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                </div>
              </GlassMorphismCard>
              
              <GlassMorphismCard className="animate-fade-up" style={{ animationDelay: "200ms" }}>
                <div className="flex flex-col h-full">
                  <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-4">
                    <Droplets className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Water Conservation</h3>
                  <p className="text-agri-dark/70 mb-4 text-pretty flex-grow">
                    Reduce agricultural water consumption by 50% through promotion of drip irrigation, rainwater harvesting, and water-efficient crops.
                  </p>
                  <div className="pt-4 border-t border-agri-dark/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-agri-primary">28%</span>
                    </div>
                    <div className="w-full h-2 bg-agri-dark/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "28%" }}></div>
                    </div>
                  </div>
                </div>
              </GlassMorphismCard>
              
              <GlassMorphismCard className="animate-fade-up" style={{ animationDelay: "300ms" }}>
                <div className="flex flex-col h-full">
                  <div className="p-3 bg-amber-500/10 rounded-lg w-fit mb-4">
                    <BarChart3 className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Carbon Neutrality</h3>
                  <p className="text-agri-dark/70 mb-4 text-pretty flex-grow">
                    Achieve carbon neutrality across the entire AgriTrust platform by offsetting delivery emissions and promoting carbon sequestration techniques.
                  </p>
                  <div className="pt-4 border-t border-agri-dark/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-agri-primary">65%</span>
                    </div>
                    <div className="w-full h-2 bg-agri-dark/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>
              </GlassMorphismCard>
            </div>
          </div>
        </section>
        
        {/* Sustainability Report */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block px-4 py-1.5 bg-agri-primary/10 rounded-full text-agri-primary text-sm font-medium mb-4">
                  Annual Sustainability Report
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-agri-dark">
                  Transparent Reporting on Our Impact
                </h2>
                <p className="text-lg text-agri-dark/80 mb-6 text-pretty">
                  Every year, we publish a comprehensive sustainability report that details our environmental impact, farmer welfare initiatives, and progress toward our goals.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-agri-primary"></div>
                    <p>Detailed carbon footprint analysis</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-agri-primary"></div>
                    <p>Water usage and conservation metrics</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-agri-primary"></div>
                    <p>Farmer income improvements</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-agri-primary"></div>
                    <p>Biodiversity enhancement initiatives</p>
                  </div>
                </div>
                <Button className="rounded-full px-6 bg-agri-primary hover:bg-agri-primary/90 text-white">
                  Download 2023 Report
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="order-1 lg:order-2 animate-fade-in">
                <div className="relative rounded-2xl overflow-hidden aspect-square shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1587282063770-fbc75dd51cba?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=800" 
                    alt="Sustainable farming report" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  <GlassMorphismCard className="absolute bottom-6 left-6 right-6 animate-fade-up" style={{animationDelay: "200ms"}}>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-10 w-10 text-agri-primary" />
                      <div>
                        <p className="text-sm text-agri-dark/70">Annual Growth</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">127%</span>
                          <span className="text-sm text-green-500">↑ 23%</span>
                        </div>
                        <p className="text-xs text-agri-dark/60">in verified natural farmers</p>
                      </div>
                    </div>
                  </GlassMorphismCard>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sustainability;
