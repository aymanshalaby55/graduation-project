"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";
import { useToast } from "@/components/ui/use-toast";

const UserContext = createContext({});
const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast }: any = useToast();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await api.post("/users/login", { email, password });
      setUser(data);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "يرجى التحقق من بيانات الدخول والمحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await api.post("/users/logout");
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserContext };
