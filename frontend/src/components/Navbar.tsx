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


import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
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
    <div className="bg-base-100/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-base-200">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/pricing" className={({ isActive }) => isActive ? "active" : ""}>
                  Pricing
                </NavLink>
              </li>
            </ul>
          </div>
          
          {/* Logo */}
          <Link to="/" className="btn btn-ghost text-xl font-bold text-primary normal-case">
            QuickShort
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/pricing" className={({ isActive }) => isActive ? "active" : ""}>
                Pricing
              </NavLink>
            </li>
          </ul>
        </div>

        {/* User Menu */}
        <div className="navbar-end">
          {!user ? (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <div className="avatar">
                  <div className="w-10 rounded-full border-2 border-base-300">
                    {user.userPhoto ? (
                      <img src={user.userPhoto} alt="Profile" />
                    ) : (
                      <div className="bg-neutral text-neutral-content rounded-full w-full h-full flex items-center justify-center">
                        <FiUser size={20} />
                      </div>
                    )}
                  </div>
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;



