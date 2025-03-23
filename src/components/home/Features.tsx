
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Shield, QrCode, ShoppingBag, ScanBarcode, Sprout, Calendar, Truck, Cpu, Users, Trophy, Mic, MessageSquare } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "Farmer Verification",
      description: "Blockchain-verified certification of natural farming practices for complete transparency.",
      icon: Shield
    },
    {
      title: "EcoPassport Traceability",
      description: "Digital passports with QR codes showing the complete journey from seed to shelf.",
      icon: QrCode
    },
    {
      title: "Direct Marketplace",
      description: "Connect directly with farmers, eliminating middlemen and ensuring fair prices.",
      icon: ShoppingBag
    },
    {
      title: "Zero-Waste Market",
      description: "Purchase discounted 'second chance' produce and reduce food waste.",
      icon: ScanBarcode
    },
    {
      title: "Fair Trade Pricing",
      description: "AI-powered dynamic pricing ensuring fair compensation for sustainable farming.",
      icon: Sprout
    },
    {
      title: "Pre-Order Harvests",
      description: "Book future harvests directly from farms with upfront payments to farmers.",
      icon: Calendar
    },
    {
      title: "Eco-Friendly Delivery",
      description: "Sustainable delivery options with carbon footprint tracking and offsets.",
      icon: Truck
    },
    {
      title: "AI Farming Insights",
      description: "Data-driven recommendations to improve crop yield and sustainability.",
      icon: Cpu
    },
    {
      title: "Community Support",
      description: "Subscribe to farmers' harvests through Community Supported Agriculture.",
      icon: Users
    },
    {
      title: "Sustainability Rewards",
      description: "Earn Green Tokens for sustainable choices redeemable for exclusive products.",
      icon: Trophy
    },
    {
      title: "Voice Marketplace",
      description: "Voice-activated shopping and farmer stories via smart speakers.",
      icon: Mic
    },
    {
      title: "Collaboration Hub",
      description: "Social platform for farmers and consumers to connect and share insights.",
      icon: MessageSquare
    }
  ];

  return (
    <section className="py-20 bg-agri-accent/30 relative">
      <div className="bg-grain"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-agri-dark">
            Revolutionizing Natural Food Systems
          </h2>
          <p className="text-lg text-agri-dark/70 text-pretty">
            Discover how AgriTrust brings together cutting-edge technology and sustainable agriculture to create a transparent and fair ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassMorphismCard 
              key={index} 
              className="animate-fade-up" 
              style={{ animationDelay: `${index * 100}ms` }}
              hoverEffect
            >
              <div className="flex flex-col items-start">
                <div className="p-3 bg-agri-primary/10 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-agri-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-agri-dark/70 text-pretty">{feature.description}</p>
              </div>
            </GlassMorphismCard>
          ))}
        </div>
      </div>
    </section>
  );
};
