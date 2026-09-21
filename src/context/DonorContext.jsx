"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiFetchJSON } from "@/lib/api";

const DonorContext = createContext(null);

export const DonorProvider = ({ children }) => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDonors = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await apiFetchJSON("/api/donors");

      setDonors(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Failed to fetch donors:", error);
      setDonors([]);
      setError(error.message || "Failed to load donors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <DonorContext.Provider
      value={{
        donors,
        setDonors,
        loading,
        error,
        refetchDonors: fetchDonors,
      }}
    >
      {children}
    </DonorContext.Provider>
  );
};

export const useDonor = () => {
  const context = useContext(DonorContext);

  if (!context) {
    throw new Error("useDonor must be used inside DonorProvider");
  }

  return context;
};