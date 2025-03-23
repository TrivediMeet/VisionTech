import React, { useRef, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MapPin, Star, User, QrCode, Edit, Camera } from "lucide-react";
import QRCode from "react-qr-code";

interface EcoPassportProps {
  isEditable?: boolean;
}

export const EcoPassport = ({ isEditable = false }: EcoPassportProps) => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(user?.photo || null);
  const [farmerName, setFarmerName] = useState(user?.name || "");
  const [location, setLocation] = useState(user?.location || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Only farmers should have access to this
  if (user?.role !== "farmer") {
    return null;
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        name: farmerName,
        location,
        photo,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  // Generate a stable QR code URL based on the user ID
  const qrCodeValue = `${window.location.origin}/farmers/${user?.id}`;

  return (
    <Card className="border border-agri-primary/20">
      <CardHeader className="bg-agri-primary/5">
        <CardTitle className="flex items-center justify-between">
          <span>Farmer EcoPassport</span>
          {isEditable && !isEditing && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(true)}
              className="text-agri-primary"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
          {isEditable && isEditing && (
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleSave}
              className="bg-agri-primary hover:bg-agri-primary/90"
            >
              Save Changes
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="relative">
              {isEditing ? (
                <div className="mb-4">
                  <div 
                    className="relative w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer border-2 border-dashed border-agri-primary/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {photo ? (
                      <img src={photo} alt="Profile" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Camera className="h-8 w-8 text-agri-primary/50" />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-500">Click to upload photo</p>
                </div>
              ) : (
                <Avatar className="w-32 h-32 rounded-lg">
                  <AvatarImage src={photo || undefined} alt={user?.name || "Farmer"} />
                  <AvatarFallback className="rounded-lg bg-agri-primary/10 text-agri-primary text-xl">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            
            <div className="mt-6 hidden md:block">
              <p className="text-sm font-medium mb-2">Scan for details:</p>
              <div className="p-2 bg-white rounded-md shadow-sm">
                <QRCode
                  size={128}
                  value={qrCodeValue}
                  viewBox={`0 0 128 128`}
                />
              </div>
            </div>
          </div>
          
          <div className="flex-grow">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium w-24">Name</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <input
                        type="text"
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your name"
                      />
                    ) : (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-agri-primary" />
                        {user?.name || "Not specified"}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Location</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your location"
                      />
                    ) : (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-agri-primary" />
                        {user?.location || "Not specified"}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rating</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-agri-tertiary fill-agri-tertiary" />
                      <span>{user?.rating || "N/A"}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({user?.reviews || 0} reviews)
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Verified</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {user?.verified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verified Farmer
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Verification Pending
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-4 md:hidden">
              <p className="text-sm font-medium mb-2">Scan for details:</p>
              <div className="p-2 bg-white rounded-md shadow-sm inline-block">
                <QRCode
                  size={128}
                  value={qrCodeValue}
                  viewBox={`0 0 128 128`}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
