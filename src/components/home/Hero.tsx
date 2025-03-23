
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Leaf, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="bg-grain"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-agri-primary/5 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-agri-secondary/5 rounded-tr-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-up">
          <div className="inline-block px-4 py-1.5 bg-agri-primary/10 rounded-full text-agri-primary text-sm font-medium">
            Revolutionizing Sustainable Agriculture
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight text-agri-dark">
            Connecting <span className="text-agri-primary">Natural Farmers</span> with Conscious Consumers
          </h1>
          <p className="text-lg text-agri-dark/80 max-w-xl text-pretty">
            AgriTrust creates a transparent ecosystem where farmers showcase sustainable practices and consumers verify the authenticity of natural products.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="rounded-full h-12 px-6 bg-agri-primary hover:bg-agri-primary/90 text-white font-medium" size="lg">
              Explore Marketplace
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button className="rounded-full h-12 px-6 bg-white border border-agri-primary/20 text-agri-dark hover:bg-agri-primary/5" variant="outline" size="lg">
              Register as Farmer
            </Button>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative animate-slide-in-right">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1501808503839-d198990c0407?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1024&h=768"
              alt="Natural farmer harvesting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-6 max-w-xs glass-morphism p-4 rounded-lg shadow-lg animate-fade-up" style={{animationDelay: "200ms"}}>
              <div className="flex items-start gap-3">
                <div className="bg-white/90 p-2 rounded">
                  <ShieldCheck className="h-6 w-6 text-agri-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Verified Natural</h3>
                  <p className="text-xs text-white/80">Blockchain-certified farming practices</p>
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 glass-morphism p-4 rounded-lg shadow-lg max-w-xs animate-fade-in" style={{animationDelay: "400ms"}}>
              <div className="flex items-start gap-3">
                <div className="bg-white/90 p-2 rounded">
                  <Leaf className="h-6 w-6 text-agri-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Eco Passport</h3>
                  <p className="text-xs text-white/80">Complete traceability from seed to shelf</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="absolute -bottom-10 right-10 bg-white rounded-xl shadow-xl p-5 animate-fade-up" style={{animationDelay: "600ms"}}>
            <div className="flex items-center gap-5">
              <div>
                <p className="text-xs text-agri-dark/60 uppercase font-medium">Trusted by</p>
                <p className="text-2xl font-bold text-agri-primary">1,200+</p>
                <p className="text-sm text-agri-dark/80">Farmers</p>
              </div>
              <div className="h-12 w-px bg-agri-dark/10"></div>
              <div>
                <p className="text-xs text-agri-dark/60 uppercase font-medium">Serving</p>
                <p className="text-2xl font-bold text-agri-primary">50,000+</p>
                <p className="text-sm text-agri-dark/80">Consumers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust indicators */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="border-y border-agri-dark/10 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="h-8 w-8 text-agri-primary mb-3" />
              <h3 className="text-lg font-medium mb-1">Verified Farmers</h3>
              <p className="text-sm text-agri-dark/70">100% blockchain certified</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Leaf className="h-8 w-8 text-agri-primary mb-3" />
              <h3 className="text-lg font-medium mb-1">Natural Products</h3>
              <p className="text-sm text-agri-dark/70">No chemicals or pesticides</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="h-8 w-8 text-agri-primary mb-3" />
              <h3 className="text-lg font-medium mb-1">Direct Connection</h3>
              <p className="text-sm text-agri-dark/70">No middlemen markup</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-agri-tertiary rounded-full animate-pulse"></div>
                <svg className="h-8 w-8 text-agri-primary mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 19C8.10457 19 9 18.1046 9 17C9 15.8954 8.10457 15 7 15C5.89543 15 5 15.8954 5 17C5 18.1046 5.89543 19 7 19Z" fill="currentColor"/>
                  <path d="M17 19C18.1046 19 19 18.1046 19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17C15 18.1046 15.8954 19 17 19Z" fill="currentColor"/>
                  <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="currentColor"/>
                  <path d="M7 8.5C7.82843 8.5 8.5 7.82843 8.5 7C8.5 6.17157 7.82843 5.5 7 5.5C6.17157 5.5 5.5 6.17157 5.5 7C5.5 7.82843 6.17157 8.5 7 8.5Z" fill="currentColor"/>
                  <path d="M17 8.5C17.8284 8.5 18.5 7.82843 18.5 7C18.5 6.17157 17.8284 5.5 17 5.5C16.1716 5.5 15.5 6.17157 15.5 7C15.5 7.82843 16.1716 8.5 17 8.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-1">Real-time Updates</h3>
              <p className="text-sm text-agri-dark/70">Track your food's journey</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
