import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiHome, FiUser, FiPlusCircle, FiList, FiMenu, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const navLinks = [
    { name: "Overview", path: "/dashboard", icon: <FiHome />, end: true },
    { name: "Create URL", path: "/dashboard/create", icon: <FiPlusCircle /> },
    { name: "My URLs", path: "/dashboard/list", icon: <FiList /> },
    { name: "Profile", path: "/dashboard/profile", icon: <FiUser /> },
  ];

  const closeMobileMenu = () => {
    const checkbox = document.getElementById("mobile-drawer") as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  };

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="mobile-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      
      <div className="drawer-content flex flex-col">
        {/* Mobile Header */}
        <div className="navbar bg-base-100 shadow-lg lg:hidden sticky top-0 z-10">
          <div className="flex-none">
            <label
              htmlFor="mobile-drawer"
              className="btn btn-square btn-ghost"
            >
              <FiMenu size={24} />
            </label>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold text-primary">QuickShort</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-base-200">
          <Outlet />
        </div>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side z-20">
        <label
          htmlFor="mobile-drawer"
          aria-label="close sidebar"
          className="drawer-overlay bg-black/50"
        ></label>
        
        <div 
          className={`menu p-0 min-h-full bg-white text-base-content flex flex-col shadow-2xl border-r border-base-300 transition-all duration-300 ${
            collapsed ? "w-80 lg:w-16" : "w-80 lg:w-64"
          }`} 
          style={{ opacity: 1 }}
        >
          {/* Sidebar Header */}
          <div className={`flex items-center justify-between border-b border-base-300 py-4 ${
            collapsed ? "lg:justify-center lg:px-2 px-6" : "px-6"
          }`}>
            <div className={collapsed ? "lg:hidden" : ""}>
              <h2 className="text-2xl font-bold text-primary">QuickShort</h2>
              <p className="text-xs text-base-content/60">Dashboard</p>
            </div>
            
            {/* Mobile close button */}
            <label
              htmlFor="mobile-drawer"
              className="btn btn-ghost btn-sm btn-circle lg:hidden"
            >
              <FiX size={20} />
            </label>
            
            {/* Desktop collapse button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`hidden lg:flex btn btn-ghost btn-sm btn-circle ${collapsed ? "" : "ml-auto"}`}
              title={collapsed ? "Expand" : "Collapse"}
            >
              {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-2 py-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    end={link.end || false}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        collapsed ? "lg:justify-center lg:px-2" : ""
                      } ${
                        isActive
                          ? "bg-primary text-primary-content font-semibold"
                          : "hover:bg-base-200"
                      }`
                    }
                    title={collapsed ? link.name : ""}
                  >
                    <span className="text-xl shrink-0">{link.icon}</span>
                    <span className={collapsed ? "lg:hidden" : ""}>{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            
            {/* Divider */}
            <div className="px-2 my-4">
              <div className="border-t border-base-300"></div>
            </div>
            
            {/* Home Link */}
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-base-200 ${
                    collapsed ? "lg:justify-center lg:px-2" : ""
                  }`}
                  title={collapsed ? "Home" : ""}
                >
                  <span className="text-xl shrink-0"><HiOutlineHome /></span>
                  <span className={collapsed ? "lg:hidden" : ""}>Home</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className={`border-t border-base-300 p-4 ${collapsed ? "lg:hidden" : ""}`}>
            <div className="flex items-center gap-3 px-2">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-10">
                  <FiUser size={20} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">User Dashboard</p>
                <p className="text-xs text-base-content/60">Free Plan</p>
              </div>
            </div>
          </div>
          
          {/* Collapsed Footer (Desktop only) */}
          <div className={`border-t border-base-300 p-4 hidden ${collapsed ? "lg:flex" : ""} justify-center`}>
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-10">
                <FiUser size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

