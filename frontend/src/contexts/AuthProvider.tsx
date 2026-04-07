import { createContext, type ReactNode, useState, useEffect } from "react";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  status?: string;
  isVerified?: boolean;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loginUser: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          { credentials: "include" }
        );

        const result = await res.json();

        if (res.ok && result.success) {
          setUser(result.data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const loginUser = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
