"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { mockDonors } from "@/data/mockData";

const DonorContext = createContext(null);

export function DonorProvider({ children }) {
  const [donors, setDonors] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setDonors(mockDonors);
    setIsInitialized(true);
  }, []);

  const updateDonor = (id, updates) => {
    setDonors((prev) =>
      prev.map((donor) =>
        donor.id === id ? { ...donor, ...updates } : donor
      )
    );
  };

  const addDonor = (donor) => {
    setDonors((prev) => [donor, ...prev]);
  };

  return (
    <DonorContext.Provider
      value={{
        donors,
        addDonor,
        updateDonor,
        isInitialized,
      }}
    >
      {children}
    </DonorContext.Provider>
  );
}

export function useDonors() {
  const context = useContext(DonorContext);

  if (!context) {
    throw new Error(
      "useDonors must be used within a DonorProvider"
    );
  }

  return context;
}
