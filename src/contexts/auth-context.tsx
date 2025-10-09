
"use client";

import type { User } from "@/lib/types";
import { mockUsers } from "@/lib/data";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("shopstack_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    (email: string) => {
      const foundUser = mockUsers.find(u => u.email === email && u.role === 'admin');
      
      if (foundUser) {
        setUser(foundUser);
        try {
            sessionStorage.setItem("shopstack_user", JSON.stringify(foundUser));
        } catch (error) {
            console.error("Failed to save user to sessionStorage", error);
        }
        toast({
          title: "Login Successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid credentials or not an admin user.",
        });
        return false;
      }
    },
    [toast]
  );

  const logout = useCallback(() => {
    setUser(null);
    try {
        sessionStorage.removeItem("shopstack_user");
    } catch (error) {
        console.error("Failed to remove user from sessionStorage", error);
    }
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
  }, [toast]);

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
