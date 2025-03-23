
import { QrCode, ArrowRight, ShieldCheck, Leaf, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";

export const ProductTraceability = () => {
  return (
    <section className="py-20 bg-agri-primary/5 relative">
      <div className="bg-grain"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-block px-4 py-1.5 bg-agri-primary/10 rounded-full text-agri-primary text-sm font-medium">
              Product Traceability
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-agri-dark">
              Every Product Has a Story to Tell
            </h2>
            <p className="text-lg text-agri-dark/80 text-pretty">
              Our EcoPassport technology lets you trace every product from seed to shelf. Just scan the QR code to reveal the complete journey of your food, the farmer behind it, and its environmental impact.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-agri-primary/10 rounded-lg shrink-0">
                  <ShieldCheck className="h-6 w-6 text-agri-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Verified Authenticity</h3>
                  <p className="text-agri-dark/70 text-pretty">
                    Blockchain certification verifies all farming practices and product claims.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-agri-primary/10 rounded-lg shrink-0">
                  <Leaf className="h-6 w-6 text-agri-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Environmental Impact</h3>
                  <p className="text-agri-dark/70 text-pretty">
                    See the water usage, carbon footprint, and sustainability metrics of your purchase.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-agri-primary/10 rounded-lg shrink-0">
                  <Truck className="h-6 w-6 text-agri-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Journey Timeline</h3>
                  <p className="text-agri-dark/70 text-pretty">
                    Follow your food's path from planting to harvesting to delivery, with timestamps for each step.
                  </p>
                </div>
              </div>
            </div>

            <Button className="rounded-full px-6 bg-agri-primary hover:bg-agri-primary/90 text-white">
              Learn More About EcoPassport
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="relative h-[600px] animate-fade-in">
            <div className="absolute top-0 right-0 w-5/6 h-4/6 bg-white rounded-xl shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=600"
                alt="Organic tomatoes"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 p-3 bg-white rounded-lg shadow-md">
                <QrCode className="h-8 w-8 text-agri-primary" />
              </div>
            </div>

            <GlassMorphismCard className="absolute bottom-0 left-0 w-5/6 animate-slide-up" style={{animationDelay: "200ms"}}>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-4">Organic Heirloom Tomatoes</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-agri-dark/10 pb-2">
                    <span className="text-agri-dark/70 text-sm">Farmer</span>
                    <span className="font-medium">Thomas Rodriguez</span>
                  </div>
                  <div className="flex justify-between border-b border-agri-dark/10 pb-2">
                    <span className="text-agri-dark/70 text-sm">Farm Location</span>
                    <span className="font-medium">Sunrise Permaculture, CA</span>
                  </div>
                  <div className="flex justify-between border-b border-agri-dark/10 pb-2">
                    <span className="text-agri-dark/70 text-sm">Harvested</span>
                    <span className="font-medium">June 12, 2023</span>
                  </div>
                  <div className="flex justify-between border-b border-agri-dark/10 pb-2">
                    <span className="text-agri-dark/70 text-sm">Water Used</span>
                    <span className="font-medium">40% less than average</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-agri-dark/70 text-sm">Carbon Footprint</span>
                    <span className="text-agri-primary font-medium">0.8 kg CO₂e (Very Low)</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-agri-dark/10">
                  <h4 className="font-medium mb-3">Journey Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-agri-tertiary"></div>
                      <div className="h-px w-6 bg-agri-dark/20 mx-2"></div>
                      <div className="text-sm">
                        <span className="text-agri-dark/70">May 2:</span> Seeds planted
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-agri-tertiary"></div>
                      <div className="h-px w-6 bg-agri-dark/20 mx-2"></div>
                      <div className="text-sm">
                        <span className="text-agri-dark/70">June 12:</span> Harvested at peak ripeness
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-agri-tertiary"></div>
                      <div className="h-px w-6 bg-agri-dark/20 mx-2"></div>
                      <div className="text-sm">
                        <span className="text-agri-dark/70">June 13:</span> Packed and shipped
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-agri-secondary"></div>
                      <div className="h-px w-6 bg-agri-dark/20 mx-2"></div>
                      <div className="text-sm">
                        <span className="text-agri-dark/70">June 14:</span> Arriving to marketplace
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassMorphismCard>
          </div>
        </div>
      </div>
    </section>
  );
};
