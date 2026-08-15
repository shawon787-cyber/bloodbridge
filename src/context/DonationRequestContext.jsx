"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { donationRequests as legacyDonationRequests } from "@/data/donationRequests";
import { mockBloodRequests } from "@/data/mockData";

const STORAGE_KEY = "bloodbridge-donation-requests";

const normalizeRequest = (req) => {
  if (!req || typeof req !== "object") return null;

  const rawLocation = req.location || req.address || "";

  let districtName = "";
  let upazilaName = "";

  if (rawLocation.includes(",")) {
    const parts = rawLocation.split(",");
    districtName = parts[parts.length - 1]?.trim() || "";
    upazilaName = parts[parts.length - 2]?.trim() || "";
  } else {
    districtName = rawLocation.trim();
  }

  const rawUnits = req.units;
  let normalizedUnits = "1";
  if (typeof rawUnits === "number") {
    normalizedUnits = String(rawUnits);
  } else if (typeof rawUnits === "string") {
    const match = rawUnits.match(/(\d+)/);
    normalizedUnits = match ? match[1] : "1";
  }

  const rawDate = req.donationDate || req.date || req.requiredDate || "";
  const rawTime = req.donationTime || req.time || "";

  return {
    id: req.id || req.requestId || `DR-${Date.now()}`,
    requesterName: req.requesterName || req.contact || req.name || "",
    requesterEmail: req.requesterEmail || req.email || "",
    recipientName: req.recipientName || req.name || req.patient || "",
    hospitalName: req.hospitalName || req.hospital || "",
    district: req.district || "",
    districtName: districtName,
    upazila: req.upazila || "",
    upazilaName: upazilaName,
    bloodGroup: req.bloodGroup || "",
    units: normalizedUnits,
    donationDate: rawDate,
    donationTime: rawTime,
    urgency: req.urgency || "",
    address: req.address || rawLocation,
    message: req.message || req.description || "",
    status: req.status || "Pending",
    createdAt: req.createdAt || new Date().toISOString(),
  };
};

const loadInitialRequests = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.map(normalizeRequest).filter(Boolean);
      }
    }
  } catch (error) {
    console.error("Failed to load donation requests from localStorage", error);
  }

  const combined = [...legacyDonationRequests, ...mockBloodRequests];
  return combined.map(normalizeRequest).filter(Boolean);
};

const DonationRequestContext = createContext(null);

export function DonationRequestProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initial = loadInitialRequests();
    setRequests(initial);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    } catch (error) {
      console.error("Failed to save donation requests to localStorage", error);
    }
  }, [requests, isInitialized]);

  const addDonationRequest = (request) => {
    const normalized = normalizeRequest({
      ...request,
      id: request.id || `DR-${Date.now()}`,
      createdAt: request.createdAt || new Date().toISOString(),
    });

    if (!normalized) return;

    setRequests((prev) => [normalized, ...prev]);
  };

  const updateDonationRequest = (id, updates) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, ...updates } : req
      )
    );
  };

  const removeDonationRequest = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <DonationRequestContext.Provider
      value={{
        requests,
        addDonationRequest,
        updateDonationRequest,
        removeDonationRequest,
        isInitialized,
      }}
    >
      {children}
    </DonationRequestContext.Provider>
  );
}

export function useDonationRequests() {
  const context = useContext(DonationRequestContext);

  if (!context) {
    throw new Error(
      "useDonationRequests must be used within a DonationRequestProvider"
    );
  }

  return context;
}
