import { createContext, useEffect, useState } from "react";
import config from "../config";

interface User {
  name: string;
  email: string;
  userPhoto?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Check logged-in user (cookie based)
  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await fetch(`${config.api_url}/user/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not logged in");

        const data = await res.json();
        setUser(data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []);

  // 🔐 Logout
  const logout = async () => {
    await fetch(`${config.api_url}/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
