"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  HeartPulse,
  MapPin,
  Phone,
  Mail,
  User,
  Droplets,
  AlertTriangle,
} from "lucide-react";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";

const urgencyColor = (urgency) => {
  switch (urgency) {
    case "Urgent":
      return "bg-red-50 text-red-600";
    case "High":
      return "bg-orange-50 text-orange-600";
    case "Medium":
      return "bg-amber-50 text-amber-600";
    case "Low":
      return "bg-emerald-50 text-emerald-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const InfoRow = ({ icon: Icon, label, value, className = "" }) => (
  <div className={`flex items-start gap-3 rounded-xl border border-[#F1F5F9] bg-white p-4 ${className}`}>
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FDECEF] text-[#D62839]">
      <Icon size={16} />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#111827] break-words">
        {value}
      </p>
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">
    {children}
  </h3>
);

const normalizeStatus = (status) => {
  if (!status) return "";
  const map = {
    pending: "Pending",
    "in progress": "In Progress",
    inprogress: "In Progress",
    done: "Done",
    completed: "Done",
    cancelled: "Cancelled",
    canceled: "Cancelled",
    rejected: "Rejected",
    urgent: "Urgent",
  };
  const key = String(status).toLowerCase().replace(/\s+/g, "");
  return map[key] || status;
};

const normalizeRequest = (req) => {
  if (!req || typeof req !== "object") return null;

  const rawUnits = req.units;
  let normalizedUnits = "1";
  if (typeof rawUnits === "number") {
    normalizedUnits = String(rawUnits);
  } else if (typeof rawUnits === "string") {
    const match = rawUnits.match(/(\d+)/);
    normalizedUnits = match ? match[1] : "1";
  }

  const recipientName = req.recipientName || req.name || req.patient || "";
  const hospitalName = req.hospitalName || req.hospital || "";
  const requesterName = req.requesterName || req.contact || req.name || "";
  const requesterEmail = req.requesterEmail || req.email || "";

  const status = normalizeStatus(req.status);

  const districtId = req.districtId || req.district || "";
  const upazilaId = req.upazilaId || req.upazila || "";

  const districtName = req.districtName || "";
  const upazilaName = req.upazilaName || "";

  const id = req._id || req.id || req.requestId || "";
  const createdAt = req.createdAt || "";
  const phoneNumber = req.phoneNumber || "";

  return {
    ...req,
    id,
    requester: {
      name: requesterName,
      email: requesterEmail,
      phoneNumber,
    },
    recipientName,
    hospitalName,
    hospital: {
      name: hospitalName,
    },
    district: String(districtId),
    districtName,
    upazila: String(upazilaId),
    upazilaName,
    bloodGroup: req.bloodGroup || "",
    units: normalizedUnits,
    requiredDate: req.donationDate || req.date || req.requiredDate || "",
    requiredTime: req.donationTime || req.time || "",
    donationDate: req.donationDate || req.date || req.requiredDate || "",
    donationTime: req.donationTime || req.time || "",
    address: req.address || "",
    contact: req.contact || "",
    description: req.message || req.description || "",
    patient: recipientName,
    location: {
      districtName: districtName,
      address: req.address || "",
    },
    createdAt,
    phoneNumber,
  };
};

export default function DonationRequestDetailsPage() {
  const params = useParams();
  const [donationRequest, setDonationRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchDonationRequest = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/api/donation-requests/${id}`);

        console.log("Donation Request ID:", id);

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Donation request not found");
          }
          if (res.status === 400) {
            throw new Error("Invalid donation request ID");
          }
          throw new Error("Failed to load donation request");
        }

        const result = await res.json();

        console.log("Donation Request API Response:", result);
        console.log("Donation Request Data:", result.data);

        if (!result.success || !result.data) {
          throw new Error(result.message || "Failed to load donation request");
        }

        if (isMounted) {
          const normalized = normalizeRequest(result.data);
          setDonationRequest(normalized);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load donation request");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDonationRequest();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FFF7F8]">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 h-10 w-40 animate-pulse rounded-lg bg-[#F1F5F9]" />

          <div className="rounded-3xl border border-[#F0DDDF] bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgba(185,28,28,0.045)]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 animate-pulse rounded-2xl bg-[#F1F5F9]" />
                <div className="space-y-3">
                  <div className="h-6 w-32 animate-pulse rounded bg-[#F1F5F9]" />
                  <div className="h-5 w-24 animate-pulse rounded bg-[#F1F5F9]" />
                </div>
              </div>
              <div className="h-8 w-28 animate-pulse rounded-full bg-[#F1F5F9]" />
            </div>

            <div className="my-8 h-px bg-[#F1E5E7]" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 animate-pulse rounded-xl bg-[#F1F5F9]" />
              ))}
            </div>

            <div className="my-8 h-px bg-[#F1E5E7]" />

            <div className="space-y-4">
              <div className="h-5 w-32 animate-pulse rounded bg-[#F1F5F9]" />
              <div className="h-16 w-full animate-pulse rounded-xl bg-[#F1F5F9]" />
            </div>

            <div className="mt-8 h-12 w-full animate-pulse rounded-xl bg-[#F1F5F9]" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !donationRequest) {
    return (
      <main className="min-h-screen bg-[#FFF7F8]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#F0DDDF] bg-white p-8 text-center shadow-[0_8px_30px_rgba(185,28,28,0.045)]">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FDECEF] text-[#D62839]">
              <Droplets size={28} />
            </div>

            <h1 className="text-2xl font-black text-[#111827]">
              Request Not Found
            </h1>

            <p className="mt-3 max-w-md mx-auto text-sm text-[#64748B]">
              {error || "The donation request you are looking for does not exist or may have been removed."}
            </p>

            <Link
              href="/donation-requests"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#D62839] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#B91C2C] hover:shadow-[0_8px_20px_rgba(214,40,57,0.20)]"
            >
              <ArrowLeft size={16} />
              Back to Donation Requests
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const request = donationRequest;

  return (
    <main className="min-h-screen bg-[#FFF7F8]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/donation-requests"
          className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition-colors duration-200 hover:text-[#D62839]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Back to Donation Requests
        </Link>

        <div className="rounded-3xl border border-[#F0DDDF] bg-white shadow-[0_8px_30px_rgba(185,28,28,0.045)] overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-xl font-black text-[#D62839] shadow-[0_8px_20px_rgba(185,28,28,0.10)] ring-1 ring-[#F4E1E3]">
                  {request.bloodGroup}
                </div>
                <div>
                  <p className="text-lg font-black text-[#111827]">
                    #{request.id}
                  </p>
                  <p className="text-sm font-semibold text-[#64748B]">
                    {request.recipientName}
                  </p>
                </div>
              </div>

              <StatusBadge status={request.status.toLowerCase()} />
            </div>

            {/* Urgency Badge */}
            <div className="mt-5">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] ${urgencyColor(
                  request.urgency === "Urgent" ? "Urgent" : request.urgency
                )}`}
              >
                <AlertTriangle size={12} />
                {request.urgency === "Urgent" ? "Urgent" : request.urgency || "Standard"}
              </span>
            </div>

            <div className="my-6 h-px bg-[#F1E5E7]" />

            {/* Patient Information */}
            <SectionTitle>Patient Information</SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow icon={User} label="Patient Name" value={request.recipientName} />
              <InfoRow icon={Droplets} label="Blood Group" value={request.bloodGroup} />
              <InfoRow icon={Droplets} label="Units Required" value={request.units} />
              <InfoRow
                icon={HeartPulse}
                label="Status"
                value={
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${urgencyColor(request.status)}`}>
                    {request.status}
                  </span>
                }
              />
            </div>

            <div className="my-6 h-px bg-[#F1E5E7]" />

            {/* Request Information */}
            <SectionTitle>Request Information</SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow icon={CalendarDays} label="Required Date" value={request.requiredDate} />
              <InfoRow icon={Clock3} label="Required Time" value={request.requiredTime} />
              <InfoRow
                icon={AlertTriangle}
                label="Urgency"
                value={
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${urgencyColor(request.urgency === "Urgent" ? "Urgent" : "Medium")}`}>
                    {request.urgency === "Urgent" ? "Urgent" : "Medium"}
                  </span>
                }
              />
              <InfoRow icon={CalendarDays} label="Request Created" value={new Date(request.createdAt).toLocaleDateString()} />
            </div>

            <div className="my-6 h-px bg-[#F1E5E7]" />

            {/* Hospital Information */}
            <SectionTitle>Hospital Information</SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow icon={HeartPulse} label="Hospital Name" value={request.hospitalName} />
              <InfoRow icon={MapPin} label="District" value={request.districtName} />
              <InfoRow icon={MapPin} label="Upazila" value={request.upazilaName} />
              <InfoRow icon={MapPin} label="Address" value={request.address} className="sm:col-span-2" />
            </div>

            <div className="my-6 h-px bg-[#F1E5E7]" />

            {/* Contact Information */}
            <SectionTitle>Contact Information</SectionTitle>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow icon={User} label="Contact Person" value={request.requesterName} />
              <InfoRow icon={Phone} label="Phone Number" value={request.phoneNumber} />
              <InfoRow icon={Mail} label="Email" value={request.requesterEmail} className="sm:col-span-2" />
            </div>

            <div className="my-6 h-px bg-[#F1E5E7]" />

            {/* Description */}
            <SectionTitle>Description</SectionTitle>
            <div className="rounded-xl border border-[#F1F5F9] bg-white p-4 sm:p-5">
              <p className="text-sm leading-7 text-[#64748B]">
                {request.message || request.description}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D62839] py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#B91C2C] hover:shadow-[0_8px_20px_rgba(214,40,57,0.20)]"
              >
                <Droplets size={18} />
                Respond to Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
