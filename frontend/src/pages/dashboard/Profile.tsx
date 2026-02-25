import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FiLogOut, FiMail, FiPhone, FiMapPin, FiUser, FiShield } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface UserProfile {
  name: string;
  email: string;
  userPhoto?: string;
  country?: string;
  contactNumber?: string;
  gender: string;
  status?: string;
}

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Map user data from context
    setProfile({
      name: user.name,
      email: user.email,
      userPhoto: user.userPhoto,
      country: user.country,
      contactNumber: user.contactNumber,
      gender: user.gender,
      status: user.status,
    });
    setLoading(false);
  }, [user]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "You will be logged out from your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      await logout();
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/login");
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-base-content/70">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card - Left Side */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body items-center text-center">
                {/* Profile Photo */}
                <div className="avatar">
                  <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={profile.userPhoto || "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.name)}
                      alt="Profile"
                      onError={(e) => {
                        e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.name);
                      }}
                    />
                  </div>
                </div>

                {/* User Name */}
                <h2 className="card-title text-2xl mt-4">{profile.name}</h2>
                
                {/* Status Badge */}
                <div className="badge badge-primary badge-outline gap-2 mt-2">
                  <FiShield size={14} />
                  {profile.status || "User"}
                </div>

                {/* Logout Button */}
                <div className="card-actions mt-6 w-full">
                  <button
                    onClick={handleLogout}
                    className="btn btn-error btn-block gap-2"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Information Card - Right Side */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">Personal Information</h3>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary shrink-0">
                      <FiMail size={24} />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-base-content/60 uppercase font-semibold">Email Address</label>
                      <p className="text-lg break-all">{profile.email}</p>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 text-secondary shrink-0">
                      <FiUser size={24} />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-base-content/60 uppercase font-semibold">Gender</label>
                      <p className="text-lg">{profile.gender}</p>
                    </div>
                  </div>

                  {/* Country */}
                  {profile.country && (
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent shrink-0">
                        <FiMapPin size={24} />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-base-content/60 uppercase font-semibold">Country</label>
                        <p className="text-lg">{profile.country}</p>
                      </div>
                    </div>
                  )}

                  {/* Contact Number */}
                  {profile.contactNumber && (
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-info/10 text-info shrink-0">
                        <FiPhone size={24} />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-base-content/60 uppercase font-semibold">Contact Number</label>
                        <p className="text-lg">{profile.contactNumber}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="divider"></div>

                {/* Account Info */}
                <div className="bg-base-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Account Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-base-content/60">Account Type:</span>
                      <span className="ml-2 font-medium">{profile.status || "Standard User"}</span>
                    </div>
                    <div>
                      <span className="text-base-content/60">Member Since:</span>
                      <span className="ml-2 font-medium">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Future Features Info */}
                <div className="alert alert-info mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div className="text-sm">
                    <p className="font-semibold">Coming Soon</p>
                    <p>Profile editing and photo upload features will be available soon!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
