"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  getToken,
  getUser,
  setAuth,
  removeAuth,
  apiFetchJSON,
} from "@/lib/api";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    const token = getToken();

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const storedUser = getUser();

    if (!storedUser?.id && !storedUser?._id) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const userId = storedUser.id || storedUser._id;

    try {
      const result = await apiFetchJSON(`/api/user/${userId}`);

      if (result.success && result.data) {
        const data = result.data;

        if (!data.id && data._id) {
          data.id =
            typeof data._id === "string"
              ? data._id
              : data._id.toString();
        }

        setUser(data);

        // Keep localStorage synchronized
        setAuth(token, data);
      } else {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("REFRESH USER ERROR:", error);

      if (error.status === 401) {
        removeAuth();
        setUser(null);
      } else {
        setUser(storedUser);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // LOGIN
  const login = (token, userData) => {
    if (!userData.id && userData._id) {
      userData.id =
        typeof userData._id === "string"
          ? userData._id
          : userData._id.toString();
    }

    setAuth(token, userData);
    setUser(userData);
  };

  // LOGOUT
  const logout = () => {
    removeAuth();
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleAuthClear = () => {
      setUser(null);
    };

    window.addEventListener("auth:logout", handleAuthClear);
    return () =>
      window.removeEventListener("auth:logout", handleAuthClear);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
}