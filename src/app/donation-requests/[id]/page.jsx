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
  Building2,
  ChevronRight,
  Activity,
} from "lucide-react";

import StatusBadge from "@/Components/dashboard/shared/StatusBadge";

const urgencyColor = (urgency) => {
  switch (urgency) {
    case "Urgent":
      return "bg-red-50 text-red-600 border-red-100";
    case "High":
      return "bg-orange-50 text-orange-600 border-orange-100";
    case "Medium":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "Low":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    default:
      return "bg-slate-50 text-slate-600 border-slate-100";
  }
};

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

  const recipientName =
    req.recipientName || req.name || req.patient || "";

  const hospitalName =
    req.hospitalName || req.hospital || "";

  const requesterName =
    req.requesterName || req.contact || req.name || "";

  const requesterEmail =
    req.requesterEmail || req.email || "";

  const status = normalizeStatus(req.status);

  const districtId =
    req.districtId || req.district || "";

  const upazilaId =
    req.upazilaId || req.upazila || "";

  const districtName =
    req.districtName || "";

  const upazilaName =
    req.upazilaName || "";

  const id =
    req._id || req.id || req.requestId || "";

  const createdAt =
    req.createdAt || "";

  const phoneNumber =
    req.phoneNumber || "";

  return {
    ...req,

    id,

    requester: {
      name: requesterName,
      email: requesterEmail,
      phoneNumber,
    },

    requesterName,
    requesterEmail,

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

    requiredDate:
      req.donationDate ||
      req.date ||
      req.requiredDate ||
      "",

    requiredTime:
      req.donationTime ||
      req.time ||
      "",

    donationDate:
      req.donationDate ||
      req.date ||
      req.requiredDate ||
      "",

    donationTime:
      req.donationTime ||
      req.time ||
      "",

    address: req.address || "",
    contact: req.contact || "",

    description:
      req.message ||
      req.description ||
      "",

    patient: recipientName,

    location: {
      districtName,
      address: req.address || "",
    },

    createdAt,
    phoneNumber,
  };
};

/* ============================================================
   SMALL REUSABLE UI PARTS
============================================================ */

const DetailLine = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-3 py-3">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF1F3] text-[#D62839]">
      <Icon size={15} />
    </div>

    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  </div>
);

const SectionHeading = ({
  title,
  description,
  icon: Icon,
}) => (
  <div className="mb-5 flex items-start gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF1F3] text-[#D62839]">
      <Icon size={17} />
    </div>

    <div>
      <h2 className="text-sm font-black text-[#111827]">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      )}
    </div>
  </div>
);

const SummaryItem = ({
  icon: Icon,
  label,
  value,
  highlight = false,
}) => (
  <div className="relative px-4 py-4 sm:px-5">
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          highlight
            ? "bg-[#D62839] text-white"
            : "bg-[#FFF1F3] text-[#D62839]"
        }`}
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.13em] text-slate-400">
          {label}
        </p>

        <p
          className={`mt-1 truncate text-sm font-black ${
            highlight
              ? "text-[#D62839]"
              : "text-slate-800"
          }`}
        >
          {value || "N/A"}
        </p>
      </div>
    </div>
  </div>
);

/* ============================================================
   PAGE
============================================================ */

export default function DonationRequestDetailsPage() {
  const params = useParams();

  const [donationRequest, setDonationRequest] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchDonationRequest = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL;

        const res = await fetch(
          `${baseUrl}/api/donation-requests/${id}`
        );

        console.log("Donation Request ID:", id);

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(
              "Donation request not found"
            );
          }

          if (res.status === 400) {
            throw new Error(
              "Invalid donation request ID"
            );
          }

          throw new Error(
            "Failed to load donation request"
          );
        }

        const result = await res.json();

        console.log(
          "Donation Request API Response:",
          result
        );

        console.log(
          "Donation Request Data:",
          result.data
        );

        if (!result.success || !result.data) {
          throw new Error(
            result.message ||
              "Failed to load donation request"
          );
        }

        if (isMounted) {
          const normalized =
            normalizeRequest(result.data);

          setDonationRequest(normalized);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.message ||
              "Failed to load donation request"
          );
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

  /* ============================================================
     LOADING
  ============================================================ */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FFF8F9]">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="mb-6 h-9 w-44 animate-pulse rounded-lg bg-slate-200" />

          <div className="overflow-hidden rounded-[28px] border border-[#F0DFE2] bg-white">
            <div className="h-48 animate-pulse bg-[#FFF4F5]" />

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 animate-pulse rounded-xl bg-slate-100"
                  />
                ))}
              </div>

              <div className="my-8 h-px bg-slate-100" />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="h-72 animate-pulse rounded-2xl bg-slate-100 lg:col-span-2" />

                <div className="h-72 animate-pulse rounded-2xl bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (error || !donationRequest) {
    return (
      <main className="min-h-screen bg-[#FFF8F9]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="rounded-[28px] border border-[#F0DDDF] bg-white p-8 text-center shadow-[0_12px_40px_rgba(185,28,28,0.05)]">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0F2] text-[#D62839]">
              <Droplets size={28} />
            </div>

            <h1 className="text-2xl font-black text-[#111827]">
              Request Not Found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              {error ||
                "The donation request you are looking for does not exist or may have been removed."}
            </p>

            <Link
              href="/donation-requests"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#D62839] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#B91C2C]"
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

  const formattedCreatedDate =
    request.createdAt
      ? new Date(
          request.createdAt
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  const urgency =
    request.urgency === "Urgent"
      ? "Urgent"
      : request.urgency || "Standard";

  return (
    <main className="min-h-screen bg-[#FFF8F9]">

      <div className="mx-auto max-w-5xl px-4 py-7 sm:px-6 lg:px-8">

        {/* ======================================================
            BACK
        ======================================================= */}

        <Link
          href="/donation-requests"
          className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#D62839]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all group-hover:border-[#F3CDD2] group-hover:bg-[#FFF4F5]">
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-0.5"
            />
          </span>

          Back to Donation Requests
        </Link>

        {/* ======================================================
            MAIN CONTAINER
        ======================================================= */}

        <div className="overflow-hidden rounded-[30px] border border-[#F0DFE2] bg-white shadow-[0_15px_50px_rgba(185,28,28,0.05)]">

          {/* ====================================================
              HEADER
          ===================================================== */}

          <header className="relative overflow-hidden bg-gradient-to-br from-[#FFF7F8] via-white to-[#FFF0F2] px-6 py-7 sm:px-8 sm:py-8">

            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#FDECEF] opacity-70 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              {/* Identity */}
              <div className="flex items-center gap-4">

                <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(185,28,28,0.10)] ring-1 ring-[#F2DDE0]">

                  <Droplets
                    size={22}
                    className="absolute left-3 top-3 text-[#D62839]/25"
                  />

                  <span className="text-xl font-black text-[#D62839]">
                    {request.bloodGroup || "N/A"}
                  </span>
                </div>

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#D62839]">
                      Blood Donation Request
                    </span>

                    <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-500">
                      #{request.id}
                    </span>
                  </div>

                  <h1 className="mt-1 text-xl font-black tracking-tight text-[#111827] sm:text-2xl">
                    {request.recipientName ||
                      "Patient Name"}
                  </h1>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-400">

                    <span className="inline-flex items-center gap-1.5">
                      <Building2 size={12} />
                      {request.hospitalName ||
                        "Hospital not specified"}
                    </span>

                    <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={12} />
                      {request.districtName ||
                        "Location not specified"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-wrap items-center gap-2 lg:justify-end">

                <StatusBadge
                  status={(request.status || "").toLowerCase()}
                />

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] ${urgencyColor(
                    urgency
                  )}`}
                >
                  <AlertTriangle size={12} />

                  {urgency}
                </span>
              </div>
            </div>
          </header>

          {/* ====================================================
              BODY
          ===================================================== */}

          <div className="p-6 sm:p-8">

            {/* ==================================================
                BLOOD NEED SUMMARY
            =================================================== */}

            <section>

              <div className="mb-4 flex items-center justify-between">

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#D62839]">
                    Quick Overview
                  </p>

                  <h2 className="mt-1 text-base font-black text-[#111827]">
                    Blood Need Summary
                  </h2>
                </div>

                <Activity
                  size={20}
                  className="text-[#D62839]/30"
                />
              </div>

              <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60 sm:grid-cols-4">

                <div className="border-b border-r border-slate-100 sm:border-b-0">
                  <SummaryItem
                    icon={Droplets}
                    label="Blood Group"
                    value={request.bloodGroup}
                    highlight
                  />
                </div>

                <div className="border-b border-slate-100 sm:border-b-0 sm:border-r">
                  <SummaryItem
                    icon={Droplets}
                    label="Units Needed"
                    value={`${request.units} Unit${
                      Number(request.units) > 1
                        ? "s"
                        : ""
                    }`}
                  />
                </div>

                <div className="border-r border-slate-100">
                  <SummaryItem
                    icon={CalendarDays}
                    label="Required Date"
                    value={request.requiredDate}
                  />
                </div>

                <div>
                  <SummaryItem
                    icon={Clock3}
                    label="Required Time"
                    value={request.requiredTime}
                  />
                </div>
              </div>
            </section>

            <div className="my-8 h-px bg-slate-100" />

            {/* ==================================================
                PATIENT + REQUEST OVERVIEW
            =================================================== */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_0.9fr]">

              {/* PATIENT + HOSPITAL */}

              <section className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">

                <SectionHeading
                  icon={Building2}
                  title="Patient & Hospital"
                  description="Where the blood is needed"
                />

                <div className="divide-y divide-slate-100">

                  <DetailLine
                    icon={User}
                    label="Patient Name"
                    value={request.recipientName}
                  />

                  <DetailLine
                    icon={HeartPulse}
                    label="Hospital"
                    value={request.hospitalName}
                  />

                  <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">

                    <div className="pr-4">
                      <DetailLine
                        icon={MapPin}
                        label="District"
                        value={request.districtName}
                      />
                    </div>

                    <div className="sm:pl-4">
                      <DetailLine
                        icon={MapPin}
                        label="Upazila"
                        value={request.upazilaName}
                      />
                    </div>
                  </div>

                  <DetailLine
                    icon={MapPin}
                    label="Address"
                    value={request.address}
                  />
                </div>
              </section>

              {/* REQUEST OVERVIEW */}

              <section className="rounded-2xl border border-slate-100 bg-[#FFFAFB] p-5 sm:p-6">

                <SectionHeading
                  icon={Activity}
                  title="Request Overview"
                  description="Current request status"
                />

                <div className="space-y-5">

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-400">
                      Status
                    </p>

                    <div className="mt-2">
                      <StatusBadge
                        status={(request.status || "").toLowerCase()}
                      />
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-400">
                      Urgency
                    </p>

                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wide ${urgencyColor(
                          urgency
                        )}`}
                      >
                        <AlertTriangle size={12} />
                        {urgency}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-400">
                      Request Created
                    </p>

                    <p className="mt-2 text-sm font-bold text-slate-800">
                      {formattedCreatedDate}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="my-8 h-px bg-slate-100" />

            {/* ==================================================
                CONTACT
            =================================================== */}

            <section>

              <SectionHeading
                icon={Phone}
                title="Contact Information"
                description="Get in touch regarding this blood request"
              />

              <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 sm:grid-cols-3">

                <div className="border-b border-slate-100 sm:border-b-0 sm:border-r">
                  <SummaryItem
                    icon={User}
                    label="Contact Person"
                    value={
                      request.requesterName ||
                      request.requester?.name
                    }
                  />
                </div>

                <div className="border-b border-slate-100 sm:border-b-0 sm:border-r">
                  <SummaryItem
                    icon={Phone}
                    label="Phone Number"
                    value={request.phoneNumber}
                  />
                </div>

                <div>
                  <SummaryItem
                    icon={Mail}
                    label="Email Address"
                    value={
                      request.requesterEmail ||
                      request.requester?.email
                    }
                  />
                </div>
              </div>
            </section>

            <div className="my-8 h-px bg-slate-100" />

            {/* ==================================================
                MESSAGE
            =================================================== */}

            <section>

              <SectionHeading
                icon={HeartPulse}
                title="Request Message"
                description="Additional information from the requester"
              />

              <div className="relative overflow-hidden rounded-2xl border border-[#F3E2E5] bg-[#FFF8F9] p-5 sm:p-6">

                <div className="absolute left-0 top-0 h-full w-1 bg-[#D62839]" />

                <p className="pl-3 text-sm leading-7 text-slate-600">
                  {request.message ||
                    request.description ||
                    "No additional information was provided for this request."}
                </p>
              </div>
            </section>

            {/* ==================================================
                CTA
            =================================================== */}

            <div className="mt-9">

              <button
                type="button"
                className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#D62839] px-5 py-4 text-sm font-black text-white shadow-[0_10px_25px_rgba(214,40,57,0.16)] transition-all duration-300 hover:bg-[#B91C2C] hover:shadow-[0_14px_32px_rgba(214,40,57,0.22)] active:scale-[0.99]"
              >
                <Droplets
                  size={18}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                Respond to Request

                <ChevronRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <p className="mt-3 text-center text-[11px] font-medium text-slate-400">
                Your response could help save a life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}