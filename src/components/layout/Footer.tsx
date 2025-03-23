
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-agri-beige pt-16 pb-8 border-t border-agri-brown/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold text-agri-primary">AgriTrust</h2>
            </Link>
            <p className="text-sm text-agri-dark/80 max-w-xs">
              Bridging the gap between natural farmers and conscious consumers through 
              transparency, sustainability, and trust.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/marketplace" className="text-sm text-agri-dark/80 hover:text-agri-primary transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/farmers" className="text-sm text-agri-dark/80 hover:text-agri-primary transition-colors">
                  Farmers
                </Link>
              </li>
              <li>
                <Link to="/eco-passport" className="text-sm text-agri-dark/80 hover:text-agri-primary transition-colors">
                  Eco Passport
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-agri-dark/80 hover:text-agri-primary transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/pre-order" className="text-sm text-agri-dark/80 hover:text-agri-primary transition-colors">
                  Pre-Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-agri-dark/80 hover:text-agri-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-agri-dark/80 hover:text-agri-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-agri-dark/80 hover:text-agri-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-agri-dark/80 hover:text-agri-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-sm text-agri-dark/80 hover:text-agri-primary transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Subscribe</h3>
            <p className="text-sm text-agri-dark/80 mb-4">
              Stay updated with the latest news, product launches, and farming insights.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-3 pr-12 rounded-full border border-agri-brown/20 bg-white/50 text-sm focus:outline-none focus:border-agri-primary focus:ring-1 focus:ring-agri-primary"
              />
              <Button className="absolute right-1 top-1 rounded-full h-8 w-8 p-0 flex items-center justify-center bg-agri-primary hover:bg-agri-primary/90">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-agri-brown/10 flex flex-col md:flex-row items-center justify-between text-sm text-agri-dark/70">
          <p>© {new Date().getFullYear()} AgriTrust. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-agri-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-agri-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/faq" className="hover:text-agri-primary transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
