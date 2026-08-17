"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import { createContext } from "react";
import {
  getDonationRequests,
  createDonationRequest as createDonationRequestAction,
} from "@/lib/actions/donationRequests";
import {
  normalizeStatus,
  DONATION_REQUEST_STATUSES,
} from "@/lib/donationRequests";

const buildLocation = (raw) => {
  if (!raw) return { name: "", districtName: "", upazilaName: "" };

  const text = String(raw);
  let districtName = "";
  let upazilaName = "";

  if (text.includes(",")) {
    const parts = text.split(",");
    districtName = parts[parts.length - 1]?.trim() || "";
    upazilaName = parts[parts.length - 2]?.trim() || "";
  } else {
    districtName = text.trim();
  }

  return { name: text, districtName, upazilaName };
};

const normalizeRequest = (req) => {
  if (!req || typeof req !== "object") return null;

  const location = buildLocation(req.location || req.address || "");

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

  const recipientName = req.recipientName || req.name || req.patient || "";
  const hospitalName = req.hospitalName || req.hospital || "";
  const requesterName = req.requesterName || req.contact || req.name || "";
  const requesterEmail = req.requesterEmail || req.email || "";

  const status = normalizeStatus(req.status);

  const districtId = req.districtId || req.district || "";
  const upazilaId = req.upazilaId || req.upazila || "";

  const districtName =
    req.districtName || location.districtName || "";
  const upazilaName =
    req.upazilaName || location.upazilaName || "";

  const id = req.id || req.requestId || req._id || `DR-${Date.now()}`;
  const createdAt = req.createdAt || new Date().toISOString();

  const canonical = {
    id,
    requester: {
      name: requesterName,
      email: requesterEmail,
    },
    recipient: {
      name: recipientName,
      bloodGroup: req.bloodGroup || "",
      units: normalizedUnits,
    },
    hospital: {
      name: hospitalName,
    },
    location: {
      districtId: String(districtId),
      districtName,
      upazilaId: String(upazilaId),
      upazilaName,
      address: req.address || location.name || "",
    },
    requiredDate: rawDate,
    requiredTime: rawTime,
    urgency: req.urgency || "",
    message: req.message || req.description || "",
    status,
    createdAt,
    updatedAt: req.updatedAt || createdAt,
  };

  return {
    ...canonical,
    requesterName,
    requesterEmail,
    recipientName,
    hospitalName,
    district: String(districtId),
    districtName,
    upazila: String(upazilaId),
    upazilaName,
    bloodGroup: req.bloodGroup || "",
    units: normalizedUnits,
    donationDate: rawDate,
    donationTime: rawTime,
    address: req.address || location.name || "",
    contact: req.contact || requesterName,
    description: req.message || req.description || "",
    patient: recipientName,
    location: location.name,
  };
};

const DonationRequestContext = createContext(null);

export function DonationRequestProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchRequests = async () => {
      try {
        const result = await getDonationRequests();
        if (isMounted && result.success && Array.isArray(result.data)) {
          setRequests(result.data.map(normalizeRequest).filter(Boolean));
        }
      } catch (error) {
        console.error("Failed to fetch donation requests:", error);
        setRequests([]);
      } finally {
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    fetchRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const addDonationRequest = useCallback(async (requestData) => {
    console.log("Submitting donation request:", requestData);
    const result = await createDonationRequestAction(requestData);
    console.log("Create donation API response:", result);
    if (!result?.success) {
      throw new Error(result?.message || "Failed to create donation request");
    }
    return result;
  }, []);

  const refreshDonationRequests = useCallback(async () => {
    console.log("Refreshing donation requests...");
    try {
      const result = await getDonationRequests();
      console.log("Donation requests from backend:", result);
      if (result.success && Array.isArray(result.data)) {
        setRequests(result.data.map(normalizeRequest).filter(Boolean));
      }
    } catch (error) {
      console.error("Failed to refresh donation requests:", error);
      throw error;
    }
  }, []);

  const createDonationRequest = useCallback(async (requestData) => {
    const result = await addDonationRequest(requestData);
    await refreshDonationRequests();
    return result;
  }, [addDonationRequest, refreshDonationRequests]);

  const updateDonationRequest = useCallback((id, updates) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, ...updates, updatedAt: new Date().toISOString() }
          : req
      )
    );
  }, []);

  const updateRequestStatus = useCallback((id, status) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: normalizeStatus(status), updatedAt: new Date().toISOString() }
          : req
      )
    );
  }, []);

  const getRequestById = useCallback((id) => {
    return requests.find((req) => req.id === id) || null;
  }, [requests]);

  const removeDonationRequest = useCallback((id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  }, []);

  return (
    <DonationRequestContext.Provider
      value={{
        requests,
        addDonationRequest,
        createDonationRequest,
        refreshDonationRequests,
        updateDonationRequest,
        updateRequestStatus,
        getRequestById,
        removeDonationRequest,
        isInitialized,
        statuses: DONATION_REQUEST_STATUSES,
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
