// import { NavLink } from "react-router-dom";
// import type { NavLinkRenderProps } from "react-router-dom";

// const Navbar = () => {
//   const linkClass = (isActive: boolean) =>
//   isActive
//     ? "font-semibold border-b-2 border-blue-500 pb-1"
//     : "pb-1";

//   return (
//     <div className="bg-base-100 shadow-sm">
//       <div className="container mx-auto navbar ">
//         {/* LEFT */}
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />
//               </svg>
//             </div>

//             {/* MOBILE MENU */}
//             <ul
//               tabIndex={-1}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <NavLink to="/" end>
//                   {({ isActive }: NavLinkRenderProps) => (
//                     <a className={linkClass(isActive)}>Home</a>
//                   )}
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/pricing">
//                   {({ isActive }: NavLinkRenderProps) => (
//                     <a className={linkClass(isActive)}>Pricing</a>
//                   )}
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/about">
//                   {({ isActive }: NavLinkRenderProps) => (
//                     <a className={linkClass(isActive)}>About</a>
//                   )}
//                 </NavLink>
//               </li>
//             </ul>
//           </div>

//           <a className="btn btn-ghost text-xl">daisyUI</a>
//         </div>

//         {/* CENTER (DESKTOP) */}
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             <li>
//               <NavLink to="/" end>
//                 {({ isActive }: NavLinkRenderProps) => (
//                   <a className={linkClass(isActive)}>Home</a>
//                 )}
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/pricing">
//                 {({ isActive }: NavLinkRenderProps) => (
//                   <a className={linkClass(isActive)}>Pricing</a>
//                 )}
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/about">
//                 {({ isActive }: NavLinkRenderProps) => (
//                   <a className={linkClass(isActive)}>About</a>
//                 )}
//               </NavLink>
//             </li>
//           </ul>
//         </div>

//         {/* RIGHT */}
//         <div className="navbar-end">
//           <a className="btn">Button</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Click outside menu to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // sweetalert2 confirmation
    import("sweetalert2").then(Swal => {
      Swal.default.fire({
        title: "Are you sure?",
        text: "You want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout",
        cancelButtonText: "Cancel",
      }).then(result => {
        if (result.isConfirmed) {
          logout();
          navigate("/login");
        }
      });
    });
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">MyURLShortener</Link>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "font-semibold border-b-2 border-blue-600" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "font-semibold border-b-2 border-blue-600" : ""}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "font-semibold border-b-2 border-blue-600" : ""}`
          }
        >
          Pricing
        </NavLink>
      </div>

      {/* Right: Login / Profile */}
      <div className="flex items-center space-x-4 relative">
        {!user ? (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition"
          >
            Login
          </Link>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center focus:outline-none"
            >
              {user.userPhoto ? (
                <img
                  src={user.userPhoto}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-3xl text-gray-600" />
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;




