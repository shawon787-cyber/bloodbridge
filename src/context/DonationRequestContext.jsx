"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import { createContext } from "react";
import {
  normalizeStatusForCompare,
  getStatusDisplayLabel,
  DONATION_REQUEST_STATUSES,
} from "@/lib/donationRequests";
import { api, apiFetchJSON } from "@/lib/api";
import { toast } from "sonner";
import { getDistrictName, getUpazilaName } from "@/lib/locationUtils";

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

  const location = buildLocation(
    req.location || req.address || req.fullAddress || ""
  );

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

  const status = req.status || "Pending";

  const districtId = req.districtId || req.district || "";
  const upazilaId = req.upazilaId || req.upazila || "";

  const districtName =
    req.districtName ||
    location.districtName ||
    getDistrictName(req.district || req.districtId) ||
    "";

  const upazilaName =
    req.upazilaName ||
    location.upazilaName ||
    getUpazilaName(req.upazila || req.upazilaId) ||
    "";

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
      address: req.address || req.fullAddress || location.name || "",
    },
    requiredDate: rawDate,
    requiredTime: rawTime,
    urgency: req.urgency || "Urgent",
    message: req.message || req.requestMessage || req.description || "",
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
    address: req.address || req.fullAddress || location.name || "",
    fullAddress: req.fullAddress || req.address || location.name || "",
    contact: req.contact || req.contactNumber || requesterName,
    contactNumber: req.contactNumber || req.contact || "",
    message: req.message || req.requestMessage || req.description || "",
    requestMessage: req.requestMessage || req.message || req.description || "",
    description: req.message || req.requestMessage || req.description || "",
    patient: recipientName,
    location: location.name,
    statusDisplayLabel: getStatusDisplayLabel(status),
  };
};

const DonationRequestContext = createContext(null);

export function DonationRequestProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRequests = async () => {
      try {
        const result = await apiFetchJSON("/api/donation-requests");
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
    const submissionData = {
      ...requestData,
      fullAddress: requestData.fullAddress ?? requestData.address ?? "",
      requestMessage: requestData.requestMessage ?? requestData.message ?? "",
      contactNumber: requestData.contactNumber ?? requestData.phoneNumber ?? "",
      urgency: requestData.urgency || "Urgent",
    };
    console.log("Donation request payload:", submissionData);

    const result = await api.post("/api/donation-requests", submissionData);
    if (result?.blocked) {
      const message = result?.message || "Your account is blocked. You cannot create a donation request.";
      const error = new Error(message);
      error.blocked = true;
      throw error;
    }
    if (!result?.success) {
      throw new Error(result?.message || "Failed to create donation request");
    }
    return result;
  }, []);

  const refreshDonationRequests = useCallback(async () => {
    console.log("Refreshing donation requests...");
    try {
      const result = await apiFetchJSON("/api/donation-requests");
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
          ? { ...req, status, updatedAt: new Date().toISOString(), statusDisplayLabel: getStatusDisplayLabel(status) }
          : req
      )
    );
  }, []);

  const updateDonationRequestStatus = useCallback(async (requestId, newStatus) => {
    setUpdatingStatusId(requestId);
    try {
      const result = await api.patch(`/api/donation-requests/${requestId}/status`, { status: newStatus });
      if (!result?.success) {
        throw new Error(result?.message || "Failed to update request status");
      }
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? { ...req, status: newStatus, updatedAt: new Date().toISOString(), statusDisplayLabel: getStatusDisplayLabel(newStatus) }
            : req
        )
      );
      return result;
    } catch (error) {
      console.error("Failed to update donation request status:", error);
      toast.error(error.message || "Failed to update request status");
      throw error;
    } finally {
      setUpdatingStatusId(null);
    }
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
        updateDonationRequestStatus,
        getRequestById,
        removeDonationRequest,
        isInitialized,
        updatingStatusId,
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
