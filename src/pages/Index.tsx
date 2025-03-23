
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { FarmerShowcase } from "@/components/home/FarmerShowcase";
import { ProductTraceability } from "@/components/home/ProductTraceability";
import { Marketplace } from "@/components/home/Marketplace";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <FarmerShowcase />
        <ProductTraceability />
        <Marketplace />
        
        {/* Call to Action */}
        <section className="py-20 bg-agri-primary text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-5"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white opacity-5 rounded-tr-full"></div>
          <div className="bg-grain opacity-10"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Join the Sustainable Food Revolution</h2>
              <p className="text-lg text-white/80 text-pretty">
                Whether you're a natural farmer looking to connect with conscious consumers, or a consumer seeking transparent, sustainable food options, AgriTrust is your platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Button className="rounded-full h-12 px-6 bg-white text-agri-primary hover:bg-white/90" size="lg">
                  Register as Farmer
                </Button>
                <Button className="rounded-full h-12 px-6 bg-transparent border border-white text-white hover:bg-white/10" variant="outline" size="lg">
                  Join as Consumer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
