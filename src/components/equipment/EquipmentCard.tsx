
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, Info, MapPin, ThumbsUp, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Equipment, bookEquipment } from "@/services/equipment";
import { useAuth } from "@/contexts/auth";
import { toast } from "sonner";
import { format } from "date-fns";

interface EquipmentCardProps {
  equipment: Equipment;
  onDelete?: (id: string) => void;
  isOwner?: boolean;
}

export const EquipmentCard = ({ equipment, onDelete, isOwner = false }: EquipmentCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Add logging to verify equipment data
  console.log("Rendering EquipmentCard:", { 
    equipmentId: equipment.id, 
    name: equipment.name,
    ownerId: equipment.owner_id,
    owner: equipment.owner,
    currentUserId: user?.id,
    isOwner: isOwner || (user?.id === equipment.owner_id)
  });

  const handleBook = async () => {
    if (!user) {
      toast.error("You must be logged in to book equipment");
      navigate("/login");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    setIsBookingLoading(true);
    try {
      await bookEquipment({
        equipment_id: equipment.id,
        start_date: startDate,
        end_date: endDate,
      }, user.id);
      
      toast.success("Booking request submitted successfully");
      setIsDialogOpen(false);
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Error booking equipment:", error);
      toast.error("Failed to book equipment");
    } finally {
      setIsBookingLoading(false);
    }
  };

  // Get condition badge color
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Fair":
        return "bg-yellow-100 text-yellow-800";
      case "Used":
        return "bg-orange-100 text-orange-800";
      case "Needs Repair":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {equipment.image_url ? (
          <img 
            src={equipment.image_url} 
            alt={equipment.name}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-muted">
            <Package className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        <Badge className={`absolute top-2 right-2 ${getConditionColor(equipment.condition)}`}>
          {equipment.condition}
        </Badge>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-xl line-clamp-1">{equipment.name}</CardTitle>
        {equipment.owner && (
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <ThumbsUp className="h-3.5 w-3.5 mr-1 text-agri-primary" />
            <span>
              {equipment.owner.farm || equipment.owner.name} 
              {equipment.owner.verified && "✓"}
            </span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {equipment.description}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="line-clamp-1">{equipment.location}</span>
        </div>
        
        <div className="mt-2 text-lg font-bold">
          ${equipment.daily_rate}<span className="text-sm font-normal text-muted-foreground"> / day</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {isOwner ? (
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => navigate(`/equipment/${equipment.id}/edit`)}
            >
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              className="flex-1"
              onClick={() => onDelete && onDelete(equipment.id)}
            >
              Delete
            </Button>
          </div>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-agri-primary hover:bg-agri-primary/90">
                Book Now
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book {equipment.name}</DialogTitle>
                <DialogDescription>
                  Select your booking dates to request this equipment.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="start-date" className="text-sm font-medium">
                    Start Date
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      min={format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="end-date" className="text-sm font-medium">
                    End Date
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      min={startDate || format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-muted rounded-md">
                  <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Your booking request will be sent to the owner for approval.
                  </p>
                </div>

                <div className="text-sm">
                  <span className="font-medium">Rate:</span> ${equipment.daily_rate} per day
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleBook} disabled={isBookingLoading}>
                  {isBookingLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Submit Booking Request'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};
