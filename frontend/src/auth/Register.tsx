import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff, FiUpload } from "react-icons/fi";
import config from "../config";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    country: "",
    contactNumber: "",
  });

  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (userPhoto) data.append("photo", userPhoto);

      const res = await fetch(`${config.api_url}/user/create`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      await Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: "Your account has been created.",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#2563eb",
      });

      navigate("/login");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border rounded-lg px-4 py-2"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border rounded-lg px-4 py-2"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password with icon */}
          <div className="relative">
            <input
              className="w-full border rounded-lg px-4 py-2 pr-12"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <select
            className="w-full border rounded-lg px-4 py-2"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            className="w-full border rounded-lg px-4 py-2"
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />

          <input
            className="w-full border rounded-lg px-4 py-2"
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
          />

          {/* Custom File Upload */}
          <div>
            <label className="block mb-1 font-medium">Profile Photo</label>

            <label className="flex items-center justify-between border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
              <span className="truncate">
                {userPhoto ? userPhoto.name : "Choose a file"}
              </span>

              <div className="flex items-center gap-2 text-blue-600">
                <FiUpload />
                <span>Browse</span>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
