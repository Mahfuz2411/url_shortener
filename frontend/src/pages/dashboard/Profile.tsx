import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FiLogOut, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import config from "../../config";

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
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await logout();
      navigate("/login");
    }
  };

  if (loading || !profile) {
    return (
      <div className="text-center py-20">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

      <div className="flex flex-col items-center space-y-4">
        {/* Profile Photo */}
        <img
          src={profile.userPhoto || "/default.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        {/* User Info */}
        <div className="text-center space-y-1">
          <p className="text-lg font-semibold">{profile.name}</p>
          <p className="text-gray-500">{profile.email}</p>
          {profile.country && <p className="text-gray-500">Country: {profile.country}</p>}
          {profile.contactNumber && (
            <p className="text-gray-500">Contact: {profile.contactNumber}</p>
          )}
          <p className="text-gray-500">Gender: {profile.gender}</p>
          {profile.status && <p className="text-gray-500">Status: {profile.status}</p>}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            <FiLogOut /> Logout
          </button>

          {/* Optional edit button */}
          {/* <button
            onClick={() => navigate("/dashboard/profile/edit")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            <FiEdit /> Edit
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
