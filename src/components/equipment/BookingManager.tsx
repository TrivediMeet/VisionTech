
import { useState, useEffect } from "react";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  fetchBorrowerBookings, 
  fetchOwnerBookingRequests, 
  updateBookingStatus,
  EquipmentBooking 
} from "@/services/equipment";
import { useAuth } from "@/contexts/auth";
import { GlassMorphismCard } from "@/components/ui/GlassMorphismCard";
import { format } from "date-fns";
import { toast } from "sonner";

export const BookingManager = () => {
  const { user } = useAuth();
  const [myBookings, setMyBookings] = useState<EquipmentBooking[]>([]);
  const [requestsReceived, setRequestsReceived] = useState<EquipmentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadBookings();
    }
  }, [user?.id]);

  const loadBookings = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // Load bookings made by the current user
      const borrowerBookings = await fetchBorrowerBookings(user.id);
      setMyBookings(borrowerBookings);
      
      // If user is a farmer, also load booking requests for their equipment
      if (user.role === "farmer") {
        const ownerRequests = await fetchOwnerBookingRequests(user.id);
        setRequestsReceived(ownerRequests);
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast.error("Failed to load booking information");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId: string, status: 'approved' | 'rejected' | 'completed') => {
    setProcessingId(bookingId);
    try {
      await updateBookingStatus(bookingId, status);
      await loadBookings();
      toast.success(`Booking ${status} successfully`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center mb-6">
        <Calendar className="mr-2 h-6 w-6 text-agri-primary" />
        <h2 className="text-2xl font-bold">Equipment Bookings</h2>
      </div>

      <Tabs defaultValue="my-bookings">
        <TabsList className="mb-6">
          <TabsTrigger value="my-bookings">My Bookings</TabsTrigger>
          {user.role === "farmer" && (
            <TabsTrigger value="requests">Requests Received</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="my-bookings">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : myBookings.length === 0 ? (
            <GlassMorphismCard className="py-10 text-center">
              <h3 className="text-xl font-bold mb-2">No Bookings</h3>
              <p className="text-muted-foreground mb-4">
                You haven't requested to borrow any equipment yet.
              </p>
              <Button 
                onClick={() => window.location.href = '/equipment-sharing'}
                className="bg-agri-primary hover:bg-agri-primary/90"
              >
                Browse Available Equipment
              </Button>
            </GlassMorphismCard>
          ) : (
            <div className="space-y-4">
              {myBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{booking.equipment?.name}</CardTitle>
                        <CardDescription>
                          {booking.equipment?.owner?.farm || booking.equipment?.owner?.name}
                        </CardDescription>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center text-sm mb-2">
                      <span className="font-medium mr-2">Dates:</span>
                      {format(new Date(booking.start_date), 'MMM dd, yyyy')} - {format(new Date(booking.end_date), 'MMM dd, yyyy')}
                    </div>
                    
                    <div className="flex items-center text-sm mb-4">
                      <span className="font-medium mr-2">Location:</span>
                      {booking.equipment?.location}
                    </div>
                    
                    {booking.status === 'approved' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUpdateStatus(booking.id, 'completed')}
                        disabled={processingId === booking.id}
                      >
                        Mark as Completed
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {user.role === "farmer" && (
          <TabsContent value="requests">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : requestsReceived.length === 0 ? (
              <GlassMorphismCard className="py-10 text-center">
                <h3 className="text-xl font-bold mb-2">No Requests</h3>
                <p className="text-muted-foreground">
                  You haven't received any booking requests for your equipment yet.
                </p>
              </GlassMorphismCard>
            ) : (
              <div className="space-y-4">
                {requestsReceived.map((request) => (
                  <Card key={request.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{request.equipment?.name}</CardTitle>
                          <CardDescription>
                            Requested by: {request.borrower?.name || request.borrower?.farm || "Unknown Farmer"}
                          </CardDescription>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center text-sm mb-2">
                        <span className="font-medium mr-2">Dates:</span>
                        {format(new Date(request.start_date), 'MMM dd, yyyy')} - {format(new Date(request.end_date), 'MMM dd, yyyy')}
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className="flex items-center space-x-2 mt-4">
                          <Button 
                            size="sm" 
                            onClick={() => handleUpdateStatus(request.id, 'approved')}
                            disabled={processingId === request.id}
                            className="flex items-center"
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleUpdateStatus(request.id, 'rejected')}
                            disabled={processingId === request.id}
                            className="flex items-center"
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Decline
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
