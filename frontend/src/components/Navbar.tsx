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


import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface NavbarProps {
  isAuthenticated: boolean;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, userName }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown
  const location = useLocation();
  const navigate = useNavigate();

  // Showcase links
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
  ];

  // Dashboard links (user menu)
  const dashboardLinks = [
    { name: "Dashboard Home", path: "/dashboard" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Create URL", path: "/dashboard/create" },
    { name: "Analytics", path: "/dashboard/analytics" },
  ];

  // Hide navbar in dashboard routes? (optional if using dropdown)
  // if (location.pathname.startsWith("/dashboard")) return null;

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      // call logout API
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      Swal.fire("Logged out!", "You have been successfully logged out.", "success");
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / App Name */}
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
            MyApp
          </div>

          {/* Centered Showcase Links (desktop) */}
          <div className="hidden md:flex space-x-6 mx-auto">
            {links.map((link) => {
              const isActive =
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-gray-700 hover:text-blue-600 transition ${
                    isActive ? "font-semibold" : "font-normal"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side: Login or Profile */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 font-semibold"
                >
                  {userName?.charAt(0).toUpperCase() || "U"}
                </button>

                {/* Profile dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                    {dashboardLinks.map((link) => {
                      const isActive =
                        location.pathname === link.path ||
                        location.pathname.startsWith(link.path);
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          className={`block px-4 py-2 text-gray-700 hover:bg-blue-50 ${
                            isActive ? "font-semibold" : "font-normal"
                          }`}
                          onClick={() => setProfileOpen(false)}
                        >
                          {link.name}
                        </Link>
                      );
                    })}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {links.map((link) => {
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`block text-gray-700 hover:text-blue-600 transition py-1 ${
                  isActive ? "font-semibold border-b-2 border-blue-600" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="block bg-blue-600 text-white py-2 px-4 rounded-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          ) : (
            <>
              {dashboardLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-700 hover:bg-blue-50 px-4 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left text-red-600 hover:bg-red-50 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;


