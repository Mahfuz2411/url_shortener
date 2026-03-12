import { useEffect, useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Mail, Phone, MapPin, User, Shield, Edit2, Save, X, Camera, Check, ChevronsUpDown, Crown } from "lucide-react";
import config from "../../config";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Belarus","Belgium","Belize",
  "Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei",
  "Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Chad","Chile",
  "China","Colombia","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic",
  "Denmark","Djibouti","Dominican Republic","Ecuador","Egypt","El Salvador","Estonia",
  "Ethiopia","Fiji","Finland","France","Gabon","Georgia","Germany","Ghana","Greece",
  "Guatemala","Guinea","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran",
  "Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya",
  "Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Libya","Lithuania","Luxembourg",
  "Madagascar","Malaysia","Maldives","Mali","Malta","Mexico","Moldova","Mongolia",
  "Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands",
  "New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan",
  "Palestine","Panama","Paraguay","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Rwanda","Saudi Arabia","Senegal","Serbia","Sierra Leone",
  "Singapore","Slovakia","Slovenia","Somalia","South Africa","South Korea","South Sudan",
  "Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
  "Tanzania","Thailand","Togo","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine",
  "United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

interface UserProfile {
  fullName: string;
  email: string;
  userPhoto?: string;
  country?: string;
  contactNumber?: string;
  gender?: string;
  bio?: string;
  status?: string;
}

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [rawImageSrc, setRawImageSrc] = useState<string>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [formData, setFormData] = useState({
    gender: "",
    country: "",
    contactNumber: "",
    bio: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${config.api_url}/profile/me`, {
        credentials: "include",
      });

      if (res.ok) {
        const result = await res.json();
        const profileData = result.data;

        const mergedProfile = {
          fullName: user?.fullName || "",
          email: user?.email || "",
          status: user?.status || "user",
          gender: profileData?.gender || "",
          userPhoto: profileData?.userPhoto || "",
          country: profileData?.country || "",
          contactNumber: profileData?.contactNumber || "",
          bio: profileData?.bio || "",
        };

        setProfile(mergedProfile);
        setFormData({
          gender: profileData?.gender || "",
          country: profileData?.country || "",
          contactNumber: profileData?.contactNumber || "",
          bio: profileData?.bio || "",
        });
        setPhotoPreview(profileData?.userPhoto || "");
      } else {
        setProfile({
          fullName: user?.fullName || "",
          email: user?.email || "",
          status: user?.status || "user",
          gender: "",
          userPhoto: "",
          country: "",
          contactNumber: "",
          bio: "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    logout();
    navigate("/login");
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRawImageSrc(reader.result as string);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
    // Reset input so the same file can be re-selected
    e.target.value = "";
  };

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const getCroppedImg = (imageSrc: string, pixelCrop: Area): Promise<File> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No canvas context"));
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height,
        );
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Canvas is empty"));
          resolve(new File([blob], "profile_photo.jpg", { type: "image/jpeg" }));
        }, "image/jpeg", 0.92);
      };
      image.onerror = reject;
    });

  const handleCropConfirm = async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedFile = await getCroppedImg(rawImageSrc, croppedAreaPixels);
      setPhotoFile(croppedFile);
      setPhotoPreview(URL.createObjectURL(croppedFile));
      setCropDialogOpen(false);
    } catch (err) {
      console.error("Crop failed:", err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const form = new FormData();
      if (formData.gender) form.append("gender", formData.gender);
      if (formData.country) form.append("country", formData.country);
      if (formData.contactNumber) form.append("contactNumber", formData.contactNumber);
      if (formData.bio) form.append("bio", formData.bio);
      if (photoFile) form.append("photo", photoFile);

      const res = await fetch(`${config.api_url}/profile/update`, {
        method: "PATCH",
        credentials: "include",
        body: form,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully",
      });
      setEditMode(false);
      fetchProfile();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData({
      gender: profile?.gender || "",
      country: profile?.country || "",
      contactNumber: profile?.contactNumber || "",
      bio: profile?.bio || "",
    });
    setPhotoPreview(profile?.userPhoto || "");
    setPhotoFile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings</p>
          </div>
          <Button
            variant="outline"
            className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setLogoutDialogOpen(true)}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="relative pb-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={photoPreview} />
                    <AvatarFallback className="text-2xl">
                      {profile?.fullName?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {editMode && (
                    <label className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                      />
                    </label>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <CardTitle className="text-2xl">{profile?.fullName}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" />
                    {profile?.email}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {profile?.status === "admin" && (
                      <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex items-center gap-1">
                        <Shield className="h-3 w-3" /> Admin
                      </div>
                    )}
                    {profile?.status === "pro-user" && (
                      <div className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 text-xs font-medium rounded-full flex items-center gap-1 border border-yellow-300 dark:border-yellow-700">
                        <Crown className="h-3 w-3" /> Pro User
                      </div>
                    )}
                    {(profile?.status === "user" || !profile?.status) && (
                      <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex items-center gap-1">
                        <Shield className="h-3 w-3" /> Free User
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                {!editMode && (
                  <Button variant="outline" className="gap-2" onClick={() => setEditMode(true)}>
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-8">
              <div className="grid gap-6">
                {/* Gender */}
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  {editMode ? (
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {profile?.gender || "Not specified"}
                    </div>
                  )}
                </div>

                {/* Country */}
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  {editMode ? (
                    <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={countryOpen}
                          className="w-full justify-between font-normal"
                        >
                          {formData.country || "Select country..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search country..." />
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                              {COUNTRIES.map((country) => (
                                <CommandItem
                                  key={country}
                                  value={country}
                                  onSelect={(val) => {
                                    setFormData({ ...formData, country: val });
                                    setCountryOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.country === country ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {country}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {profile?.country || "Not specified"}
                    </div>
                  )}
                </div>

                {/* Contact Number */}
                <div className="grid gap-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  {editMode ? (
                    <Input
                      id="contactNumber"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {profile?.contactNumber || "Not specified"}
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  {editMode ? (
                    <textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {profile?.bio || "No bio added yet"}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                {editMode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 pt-4 border-t"
                  >
                    <Button onClick={handleSave} disabled={saving} className="gap-2">
                      {saving ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="gap-2">
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Image Crop Dialog */}
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Crop Photo</DialogTitle>
            <DialogDescription>
              Drag to reposition · Scroll or use the slider to zoom
            </DialogDescription>
          </DialogHeader>
          <div className="relative w-full h-72 bg-black rounded-md overflow-hidden">
            {rawImageSrc && (
              <Cropper
                image={rawImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-muted-foreground">Zoom</Label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCropDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCropConfirm}>
              <Check className="h-4 w-4 mr-2" />
              Crop &amp; Set
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout?</DialogTitle>
            <DialogDescription>You will be logged out from your account.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
