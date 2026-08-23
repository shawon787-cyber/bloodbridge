"use client";

import { createContext, useContext, useEffect, useState } from "react";

const DonorContext = createContext(null);

export const DonorProvider = ({ children }) => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchDonors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${baseUrl}/api/donors`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch donors");
      }

      const data = await response.json();

      setDonors(Array.isArray(data) ? data : data.donors || []);
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