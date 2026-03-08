import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Mail, Phone, MapPin, User, Shield, Edit2, Save, X, Camera } from "lucide-react";
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

// Create Select component since we haven't created it yet
const SelectComponent = ({ value, onValueChange, children, placeholder }: any) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="">{placeholder}</option>
      {children}
    </select>
  );
};

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
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      if (photoFile) form.append("userPhoto", photoFile);

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
                  <div className="flex items-center gap-2 mt-2">
                    <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {profile?.status === "admin" ? "Admin" : "User"}
                    </div>
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
                    <SelectComponent
                      value={formData.gender}
                      onValueChange={(value: string) => setFormData({ ...formData, gender: value })}
                      placeholder="Select gender"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </SelectComponent>
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
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Enter your country"
                    />
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
