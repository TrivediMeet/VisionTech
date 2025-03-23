
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Equipment {
  id: string;
  name: string;
  description: string;
  condition: string;
  daily_rate: number;
  image_url: string | null;
  location: string;
  availability: boolean;
  owner_id: string;
  created_at: string;
  updated_at: string;
  owner?: {
    name: string;
    farm: string;
    location: string;
    verified: boolean;
    photo: string | null;
  };
}

export interface EquipmentFormData {
  name: string;
  description: string;
  condition: string;
  daily_rate: number;
  image_url?: string;
  location: string;
  availability: boolean;
}

export interface EquipmentBooking {
  id: string;
  equipment_id: string;
  borrower_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  created_at: string;
  updated_at: string;
  equipment?: Equipment;
  borrower?: {
    name: string;
    farm: string;
    location: string;
    verified: boolean;
    photo: string | null;
  };
}

export interface BookingFormData {
  equipment_id: string;
  start_date: string;
  end_date: string;
}

// Fetch all available equipment
export const fetchAllEquipment = async (): Promise<Equipment[]> => {
  try {
    console.log("Fetching all equipment...");
    
    // First, fetch just the equipment data without trying to join with profiles
    const { data, error } = await supabase
      .from("equipment")
      .select("*")
      .eq("availability", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching equipment:", error);
      toast.error("Failed to fetch equipment");
      return [];
    }

    // For each equipment item, try to fetch the owner separately
    const equipmentWithOwners = await Promise.all(
      data.map(async (item) => {
        const { data: ownerData, error: ownerError } = await supabase
          .from("profiles")
          .select("name, farm, location, verified, photo")
          .eq("id", item.owner_id)
          .single();

        if (ownerError) {
          console.log(`No owner found for equipment ${item.id}`);
          return item;
        }

        return {
          ...item,
          owner: ownerData
        };
      })
    );

    console.log("Fetched equipment with owners:", equipmentWithOwners);
    return equipmentWithOwners as Equipment[];
  } catch (error) {
    console.error("Failed to fetch equipment:", error);
    toast.error("Failed to fetch equipment");
    return [];
  }
};

// Fetch equipment by location
export const fetchEquipmentByLocation = async (location: string): Promise<Equipment[]> => {
  try {
    // First, fetch just the equipment data
    const { data, error } = await supabase
      .from("equipment")
      .select("*")
      .eq("availability", true)
      .ilike("location", `%${location}%`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching equipment by location:", error);
      toast.error("Failed to fetch equipment");
      return [];
    }

    // For each equipment item, try to fetch the owner separately
    const equipmentWithOwners = await Promise.all(
      data.map(async (item) => {
        const { data: ownerData, error: ownerError } = await supabase
          .from("profiles")
          .select("name, farm, location, verified, photo")
          .eq("id", item.owner_id)
          .maybeSingle();

        if (ownerError || !ownerData) {
          return item;
        }

        return {
          ...item,
          owner: ownerData
        };
      })
    );

    return equipmentWithOwners as Equipment[];
  } catch (error) {
    console.error("Failed to fetch equipment by location:", error);
    toast.error("Failed to fetch equipment");
    return [];
  }
};

// Fetch equipment by owner (farmer)
export const fetchFarmerEquipment = async (farmerId: string): Promise<Equipment[]> => {
  try {
    const { data, error } = await supabase
      .from("equipment")
      .select("*")
      .eq("owner_id", farmerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching farmer equipment:", error);
      toast.error("Failed to fetch farmer equipment");
      return [];
    }

    return data as Equipment[] || [];
  } catch (error) {
    console.error("Failed to fetch farmer equipment:", error);
    toast.error("Failed to fetch farmer equipment");
    return [];
  }
};

// Get a single equipment by ID
export const getEquipmentById = async (equipmentId: string): Promise<Equipment | null> => {
  try {
    // First, fetch the equipment data
    const { data: equipmentData, error: equipmentError } = await supabase
      .from("equipment")
      .select("*")
      .eq("id", equipmentId)
      .single();

    if (equipmentError) {
      console.error("Error fetching equipment:", equipmentError);
      return null;
    }

    // Fetch the owner data separately
    const { data: ownerData, error: ownerError } = await supabase
      .from("profiles")
      .select("name, farm, location, verified, photo")
      .eq("id", equipmentData.owner_id)
      .maybeSingle();

    if (!ownerError && ownerData) {
      return {
        ...equipmentData,
        owner: ownerData
      } as Equipment;
    }

    return equipmentData as Equipment;
  } catch (error) {
    console.error("Failed to fetch equipment:", error);
    return null;
  }
};

// Create a new equipment
export const createEquipment = async (equipment: EquipmentFormData, ownerId: string): Promise<Equipment | null> => {
  try {
    const { data, error } = await supabase
      .from("equipment")
      .insert({
        ...equipment,
        owner_id: ownerId
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating equipment:", error);
      toast.error("Failed to create equipment listing");
      return null;
    }

    toast.success("Equipment listed successfully");
    return data as Equipment;
  } catch (error) {
    console.error("Failed to create equipment listing:", error);
    toast.error("Failed to create equipment listing");
    return null;
  }
};

// Update an existing equipment
export const updateEquipment = async (id: string, equipment: Partial<EquipmentFormData>): Promise<Equipment | null> => {
  try {
    const { data, error } = await supabase
      .from("equipment")
      .update({
        ...equipment,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating equipment:", error);
      toast.error("Failed to update equipment");
      return null;
    }

    toast.success("Equipment updated successfully");
    return data as Equipment;
  } catch (error) {
    console.error("Failed to update equipment:", error);
    toast.error("Failed to update equipment");
    return null;
  }
};

// Delete equipment
export const deleteEquipment = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("equipment")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting equipment:", error);
      toast.error("Failed to delete equipment");
      return false;
    }

    toast.success("Equipment deleted successfully");
    return true;
  } catch (error) {
    console.error("Failed to delete equipment:", error);
    toast.error("Failed to delete equipment");
    return false;
  }
};

// Book equipment
export const bookEquipment = async (bookingData: BookingFormData, borrowerId: string): Promise<EquipmentBooking | null> => {
  try {
    const { data, error } = await supabase
      .from("equipment_bookings")
      .insert({
        ...bookingData,
        borrower_id: borrowerId,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error("Error booking equipment:", error);
      toast.error("Failed to book equipment");
      return null;
    }

    toast.success("Equipment booking request sent");
    return data as EquipmentBooking;
  } catch (error) {
    console.error("Failed to book equipment:", error);
    toast.error("Failed to book equipment");
    return null;
  }
};

// Get bookings for a borrower
export const fetchBorrowerBookings = async (borrowerId: string): Promise<EquipmentBooking[]> => {
  try {
    // First fetch the bookings
    const { data: bookingsData, error: bookingsError } = await supabase
      .from("equipment_bookings")
      .select("*")
      .eq("borrower_id", borrowerId)
      .order("created_at", { ascending: false });

    if (bookingsError) {
      console.error("Error fetching borrower bookings:", bookingsError);
      toast.error("Failed to fetch your bookings");
      return [];
    }

    // For each booking, fetch the equipment details
    const bookingsWithEquipment = await Promise.all(
      bookingsData.map(async (booking) => {
        const equipment = await getEquipmentById(booking.equipment_id);
        
        return {
          ...booking,
          equipment
        };
      })
    );

    return bookingsWithEquipment as EquipmentBooking[];
  } catch (error) {
    console.error("Failed to fetch borrower bookings:", error);
    toast.error("Failed to fetch your bookings");
    return [];
  }
};

// Get booking requests for an owner
export const fetchOwnerBookingRequests = async (ownerId: string): Promise<EquipmentBooking[]> => {
  try {
    // First, get all equipment owned by this farmer
    const { data: ownerEquipment, error: equipmentError } = await supabase
      .from("equipment")
      .select("id")
      .eq("owner_id", ownerId);

    if (equipmentError) {
      console.error("Error fetching owner equipment:", equipmentError);
      toast.error("Failed to fetch equipment for booking requests");
      return [];
    }

    if (!ownerEquipment.length) {
      // No equipment, therefore no booking requests
      return [];
    }

    // Get equipment IDs
    const equipmentIds = ownerEquipment.map(item => item.id);

    // Fetch bookings for these equipment
    const { data: bookings, error: bookingsError } = await supabase
      .from("equipment_bookings")
      .select("*")
      .in("equipment_id", equipmentIds)
      .order("created_at", { ascending: false });

    if (bookingsError) {
      console.error("Error fetching owner booking requests:", bookingsError);
      toast.error("Failed to fetch booking requests");
      return [];
    }

    // For each booking, fetch the equipment and borrower details
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        // Get equipment details
        const equipment = await getEquipmentById(booking.equipment_id);
        
        // Get borrower details
        const { data: borrower, error: borrowerError } = await supabase
          .from("profiles")
          .select("name, farm, location, verified, photo")
          .eq("id", booking.borrower_id)
          .maybeSingle();
        
        return {
          ...booking,
          equipment,
          borrower: borrowerError ? undefined : borrower
        };
      })
    );

    return bookingsWithDetails as EquipmentBooking[];
  } catch (error) {
    console.error("Failed to fetch owner booking requests:", error);
    toast.error("Failed to fetch booking requests");
    return [];
  }
};

// Update booking status
export const updateBookingStatus = async (
  bookingId: string, 
  status: 'approved' | 'rejected' | 'completed'
): Promise<EquipmentBooking | null> => {
  try {
    const { data, error } = await supabase
      .from("equipment_bookings")
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq("id", bookingId)
      .select()
      .single();

    if (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status");
      return null;
    }

    toast.success(`Booking ${status} successfully`);
    return data as EquipmentBooking;
  } catch (error) {
    console.error("Failed to update booking status:", error);
    toast.error("Failed to update booking status");
    return null;
  }
};
