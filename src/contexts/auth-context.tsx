
"use client";

import type { User } from "@/lib/types";
import { mockUsers, addUser } from "@/lib/data";
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
  login: (email: string, password?: string) => User | null;
  logout: () => void;
  register: (name: string, email: string, password?: string) => User | null;
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
    (email: string, password?: string) => {
      // Password is not checked in this mock implementation
      const foundUser = mockUsers.find(u => u.email === email);
      
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
        return foundUser;
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "No user found with that email.",
        });
        return null;
      }
    },
    [toast]
  );
  
  const register = useCallback(
    (name: string, email: string, password?: string) => {
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "A user with this email already exists.",
        });
        return null;
      }

      const newUser = addUser({ name, email });
      setUser(newUser);
       try {
            sessionStorage.setItem("shopstack_user", JSON.stringify(newUser));
        } catch (error) {
            console.error("Failed to save user to sessionStorage", error);
        }
      toast({
          title: "Registration Successful",
          description: `Welcome, ${newUser.name}!`,
      });
      return newUser;
    }, [toast]
  );

  const logout = useCallback(() => {
    const userName = user?.name;
    setUser(null);
    try {
        sessionStorage.removeItem("shopstack_user");
    } catch (error) {
        console.error("Failed to remove user from sessionStorage", error);
    }
    toast({
        title: "Logged Out",
        description: `Goodbye, ${userName}!`,
    });
  }, [toast, user]);

  const value = {
    user,
    login,
    logout,
    register,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
