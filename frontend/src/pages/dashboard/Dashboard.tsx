import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, PlusCircle, List, Menu, X, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Overview", path: "/dashboard", icon: Home, end: true },
    { name: "Create URL", path: "/dashboard/create", icon: PlusCircle },
    { name: "My URLs", path: "/dashboard/list", icon: List },
    { name: "Profile", path: "/dashboard/profile", icon: User },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="hidden lg:flex flex-col w-64 border-r bg-card"
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Link2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">QuickShort</h2>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={link.path}
                  end={link.end || false}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  <link.icon className="h-5 w-5" />
                  <span className="font-medium">{link.name}</span>
                </NavLink>
              </motion.li>
            ))}
          </ul>

          <div className="my-4 border-t" />

          {/* Home Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <NavLink
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </NavLink>
          </motion.div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <ThemeToggle />
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden border-b bg-card p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Link2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">QuickShort</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-card border-r z-50 lg:hidden"
            >
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Link2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">QuickShort</h2>
                    <p className="text-xs text-muted-foreground">Dashboard</p>
                  </div>
                </Link>
                <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-4">
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.path}
                        end={link.end || false}
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent text-muted-foreground hover:text-foreground"
                          )
                        }
                      >
                        <link.icon className="h-5 w-5" />
                        <span className="font-medium">{link.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <div className="my-4 border-t" />

                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-accent text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Back to Home</span>
                </NavLink>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
