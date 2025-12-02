
"use client";

import type { User } from "@/lib/types";
import { loginUser, registerUser } from "@/lib/backend-api";
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
  updateUser: (updatedData: Partial<User>) => void;
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
      const storedUser = localStorage.getItem("shopstack_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password?: string) => {
      if (!password) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Password is required.",
        });
        return null;
      }

      try {
        const user = await loginUser(email, password);
        setUser(user);
        localStorage.setItem("shopstack_user", JSON.stringify(user));
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        });
        return user;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error instanceof Error ? error.message : "Invalid credentials.",
        });
        return null;
      }
    },
    [toast]
  );
  
  const register = useCallback(
    async (name: string, email: string, password?: string) => {
      if (!password) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "Password is required.",
        });
        return null;
      }

      try {
        const newUser = await registerUser(name, email, password);
        setUser(newUser);
        localStorage.setItem("shopstack_user", JSON.stringify(newUser));
        toast({
          title: "Registration Successful",
          description: `Welcome, ${newUser.name}!`,
        });
        return newUser;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: error instanceof Error ? error.message : "Registration failed. Please try again.",
        });
        return null;
      }
    },
    [toast]
  );

  const logout = useCallback(() => {
    const userName = user?.name;
    setUser(null);
    try {
        localStorage.removeItem("shopstack_user");
    } catch (error) {
        console.error("Failed to remove user from localStorage", error);
    }
    toast({
        title: "Logged Out",
        description: `Goodbye, ${userName}!`,
    });
  }, [toast, user]);

  const updateUser = useCallback(async (updatedData: Partial<User>) => {
    if (!user) return;
    
    try {
      // In a real app, this would call the backend API
      // For now, update locally with the provided data
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem("shopstack_user", JSON.stringify(updatedUser));
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
      });
    }
  }, [user, toast]);

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
