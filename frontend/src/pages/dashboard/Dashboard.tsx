import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiHome, FiUser, FiPlusCircle, FiBarChart2, FiMenu, FiChevronLeft } from "react-icons/fi";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navLinks = [
    { name: "Home", path: "/dashboard", icon: <FiHome />, end: true },
    { name: "Profile", path: "/dashboard/profile", icon: <FiUser /> },
    { name: "Create URL", path: "/dashboard/create", icon: <FiPlusCircle /> },
    { name: "List", path: "/dashboard/list", icon: <FiBarChart2 /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md transition-all duration-300 flex flex-col ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          {!collapsed && <span className="text-xl font-bold">Dashboard</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-gray-600 hover:bg-gray-200 rounded"
          >
            {collapsed ? <FiMenu size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.end || false} // Fix active highlighting
              className={({ isActive }) =>
                `flex items-center justify-center ${
                  collapsed ? "justify-center" : "justify-start"
                } gap-3 px-4 py-3 hover:bg-gray-200 ${
                  isActive ? "bg-blue-100 font-semibold" : ""
                }`
              }
            >
              <span className="text-xl shrink-0">{link.icon}</span>
              {!collapsed && <span>{link.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

