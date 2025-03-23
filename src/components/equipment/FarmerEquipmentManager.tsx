
import { useState, useEffect } from "react";
import { PlusCircle, Tractor, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EquipmentForm } from "./EquipmentForm";
import { EquipmentCard } from "./EquipmentCard";
import { Equipment, createEquipment, deleteEquipment, fetchFarmerEquipment } from "@/services/equipment";
import { useAuth } from "@/contexts/auth";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { toast } from "sonner";

export const FarmerEquipmentManager = () => {
  const { user } = useAuth();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadEquipment();
    }
  }, [user?.id]);

  const loadEquipment = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      console.log("Fetching equipment for farmer:", user.id);
      const data = await fetchFarmerEquipment(user.id);
      console.log("Farmer equipment:", data);
      setEquipment(data);
    } catch (error) {
      console.error("Error loading farmer equipment:", error);
      toast.error("Failed to load your equipment");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEquipment = async (formData: any) => {
    if (!user?.id) return;
    
    setIsSubmitting(true);
    try {
      const result = await createEquipment(formData, user.id);
      
      if (result) {
        // Add the new equipment to the state without reloading all equipment
        setEquipment(prev => [result, ...prev]);
        setIsDialogOpen(false);
        toast.success("Equipment added successfully");
      }
    } catch (error) {
      console.error("Error creating equipment:", error);
      toast.error("Failed to add equipment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEquipment = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      try {
        await deleteEquipment(id);
        // Remove the deleted equipment from state without reloading
        setEquipment(prev => prev.filter(item => item.id !== id));
        toast.success("Equipment deleted successfully");
      } catch (error) {
        console.error("Error deleting equipment:", error);
        toast.error("Failed to delete equipment");
      }
    }
  };

  if (!user || user.role !== "farmer") {
    return null;
  }

  return (
    <div className="bg-agri-primary/5 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Tractor className="mr-2 h-6 w-6 text-agri-primary" />
            My Equipment for Sharing
          </h2>
          <p className="text-muted-foreground mt-1">
            List your equipment for other farmers to rent and earn additional income
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-agri-primary hover:bg-agri-primary/90 text-white flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>
          
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Equipment</DialogTitle>
            </DialogHeader>
            <EquipmentForm 
              onSubmit={handleCreateEquipment} 
              isLoading={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : equipment.length === 0 ? (
        <GlassMorphismCard className="py-10 text-center">
          <h3 className="text-xl font-bold mb-2">No Equipment Listed</h3>
          <p className="text-muted-foreground mb-4">
            You haven't listed any equipment for sharing yet.
          </p>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-agri-primary hover:bg-agri-primary/90"
          >
            Add Your First Equipment
          </Button>
        </GlassMorphismCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item) => (
            <EquipmentCard
              key={item.id}
              equipment={item}
              onDelete={handleDeleteEquipment}
              isOwner={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};
