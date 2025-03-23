import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerifiedMark } from "@/components/icons/VerifiedMark";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { Star } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { fetchFarmerProducts, Product } from "@/services/products";
import { getProfileById } from "@/services/profiles";

const FarmerDetails = () => {
  const { id } = useParams();
  const [farmer, setFarmer] = useState<any | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFarmer = async () => {
      setLoading(true);
      try {
        if (id) {
          const farmerData = await getProfileById(id);
          setFarmer(farmerData);

          // Fetch farmer's products
          const farmerProducts = await fetchFarmerProducts(id);
          setProducts(farmerProducts);
        }
      } finally {
        setLoading(false);
      }
    };

    loadFarmer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
              <GlassMorphismCard className="py-24 text-center">
                <h3 className="text-2xl font-bold mb-4">Loading Farmer Details...</h3>
                <div className="animate-pulse h-10 w-48 mx-auto bg-gray-200 rounded-md"></div>
              </GlassMorphismCard>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
              <GlassMorphismCard className="py-24 text-center">
                <h3 className="text-2xl font-bold mb-4">Farmer Not Found</h3>
                <p className="text-agri-dark/80 mb-6">
                  The farmer you are looking for does not exist.
                </p>
                <Button asChild>
                  <Link to="/farmers">Back to Farmers</Link>
                </Button>
              </GlassMorphismCard>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative bg-agri-primary/5 py-16">
          <div className="bg-grain"></div>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Farmer Details */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={farmer.photo} alt={farmer.name || "Farmer"} />
                  <AvatarFallback>{farmer.name?.charAt(0) || "F"}</AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold text-agri-dark mb-2 flex items-center">
                  {farmer.name}
                  {farmer.verified && <VerifiedMark className="ml-2 h-5 w-5 text-agri-primary" />}
                </h1>
                <p className="text-lg text-agri-dark/80 mb-4">
                  {farmer.farm || "Independent Farmer"}
                </p>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="text-xl font-semibold">{farmer.rating || "N/A"}</span>
                  <span className="text-agri-dark/60 ml-1">({farmer.reviews || 0} reviews)</span>
                </div>
                <p className="text-agri-dark/80 text-pretty">
                  {farmer.description || "No description provided."}
                </p>
              </div>

              {/* Contact & Location */}
              <div className="md:border-l md:border-agri-dark/10 md:pl-8">
                <h2 className="text-xl font-bold text-agri-dark mb-4">Contact & Location</h2>
                <p className="text-agri-dark/80 mb-2">
                  <strong>Email:</strong> {farmer.email}
                </p>
                <p className="text-agri-dark/80 mb-2">
                  <strong>Location:</strong> {farmer.location || "N/A"}
                </p>
                <Button asChild className="bg-agri-primary hover:bg-agri-primary/90 text-white mt-4">
                  <Link to={`mailto:${farmer.email}`}>Contact Farmer</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-agri-dark mb-6">
              Products from {farmer.name}
            </h2>
            {products.length === 0 ? (
              <GlassMorphismCard className="py-12 text-center">
                <h3 className="text-xl font-bold mb-4">No Products Available</h3>
                <p className="text-agri-dark/80 mb-6">
                  This farmer does not have any products listed at the moment.
                </p>
              </GlassMorphismCard>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
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

export default FarmerDetails;
