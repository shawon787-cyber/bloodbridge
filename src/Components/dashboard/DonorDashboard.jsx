"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Droplets,
  CheckCircle2,
  ClipboardList,
  FileText,
  UserRound,
  ArrowUpRight,
  Clock,
  Award,
  MapPin,
  Calendar,
  ShieldCheck,
  ToggleLeft,
  Plus,
  Activity,
  CircleCheck,
  Clock3,
  XCircle,
  Eye,
} from "lucide-react";

import { useDonationRequests } from "@/context/DonationRequestContext";

/* =================================
   DONOR STATS
================================= */

const donorStats = [
  {
    label: "My Blood Group",
    value: "A+",
    change: "Verified",
    icon: Droplets,
    color: "#D62839",
  },
  {
    label: "Donation Status",
    value: "Active",
    change: "Eligible",
    icon: CheckCircle2,
    color: "#16A34A",
  },
  {
    label: "Total Donations",
    value: "12",
    change: "+1 this year",
    icon: Award,
    color: "#F59E0B",
  },
  {
    label: "Available Requests",
    value: "5",
    change: "Nearby",
    icon: ClipboardList,
    color: "#2563EB",
  },
];

/* =================================
   DONATION STATUS
================================= */

const donationStatus = {
  bloodGroup: "A+",
  lastDonation: "2025-07-15",
  nextEligible: "2025-10-15",
  availability: "Available",
};

/* =================================
   PROFILE COMPLETION
================================= */

const profileCompletion = {
  pct: 85,
  missing: [
    "Add emergency contact",
    "Upload medical certificate",
  ],
};

/* =================================
   DONATION HISTORY
================================= */

const donationHistory = [
  {
    date: "Aug 1, 2025",
    hospital: "Dhaka Medical",
    blood: "A+",
    recipient: "Rahim Uddin",
    status: "Completed",
  },
  {
    date: "May 15, 2025",
    hospital: "Square Hospital",
    blood: "A+",
    recipient: "Fatima Begum",
    status: "Completed",
  },
  {
    date: "Feb 3, 2025",
    hospital: "Lab Aid Hospital",
    blood: "A+",
    recipient: "Karim Mia",
    status: "Completed",
  },
  {
    date: "Nov 20, 2024",
    hospital: "Apollo Hospital",
    blood: "A+",
    recipient: "Sabina Yesmin",
    status: "Completed",
  },
];

/* =================================
   QUICK ACTIONS
================================= */

const quickActions = [
  {
    label: "View Blood Requests",
    icon: FileText,
    href: "/dashboard/requests",
    desc: "Browse open requests",
  },
  {
    label: "Update Profile",
    icon: UserRound,
    href: "/dashboard/profile",
    desc: "Update your information",
  },
  {
    label: "Donation History",
    icon: Clock,
    href: "/dashboard/history",
    desc: "View donation history",
  },
  {
    label: "Update Availability",
    icon: ToggleLeft,
    href: "#",
    desc: "Toggle donor status",
  },
];

/* =================================
   STATUS HELPERS
================================= */

const getRequestStatus = (status) => {
  const normalizedStatus = status?.toLowerCase();

  if (normalizedStatus === "pending") {
    return "Pending";
  }

  if (
    normalizedStatus === "approved" ||
    normalizedStatus === "in progress" ||
    normalizedStatus === "inprogress"
  ) {
    return "In Progress";
  }

  if (
    normalizedStatus === "confirmed" ||
    normalizedStatus === "fulfilled" ||
    normalizedStatus === "completed"
  ) {
    return "Completed";
  }

  if (
    normalizedStatus === "cancelled" ||
    normalizedStatus === "canceled"
  ) {
    return "Cancelled";
  }

  if (normalizedStatus === "rejected") {
    return "Rejected";
  }

  return status || "Pending";
};

/* =================================
   STATUS STYLE
================================= */

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "bg-amber-50 text-amber-600";

    case "In Progress":
      return "bg-blue-50 text-blue-600";

    case "Completed":
      return "bg-emerald-50 text-emerald-600";

    case "Cancelled":
      return "bg-slate-100 text-slate-600";

    case "Rejected":
      return "bg-red-50 text-red-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
};

/* =================================
   COMPONENT
================================= */

export default function DonorDashboard({ user }) {
  const { requests, isInitialized } = useDonationRequests();

  const currentUserEmail = user?.email?.toLowerCase();

  const userRequests = useMemo(() => {
    if (!currentUserEmail) return [];

    return requests.filter((req) => {
      const requesterEmail = (req.requesterEmail || "").toLowerCase();
      return requesterEmail === currentUserEmail;
    });
  }, [requests, currentUserEmail]);

  const availableRequestsCount = useMemo(() => {
    return requests.filter((req) => ["Pending", "In Progress"].includes(req.status)).length;
  }, [requests]);

  const donorStats = [
    {
      label: "My Blood Group",
      value: "A+",
      change: "Verified",
      icon: Droplets,
      color: "#D62839",
    },
    {
      label: "Donation Status",
      value: "Active",
      change: "Eligible",
      icon: CheckCircle2,
      color: "#16A34A",
    },
    {
      label: "Total Donations",
      value: "12",
      change: "+1 this year",
      icon: Award,
      color: "#F59E0B",
    },
    {
      label: "Available Requests",
      value: String(availableRequestsCount),
      change: "Nearby",
      icon: ClipboardList,
      color: "#2563EB",
    },
  ];

  /* =================================
     REQUEST COUNTS
  ================================= */

  const totalMyRequests = userRequests.length;

  const pendingRequests = userRequests.filter(
    (request) =>
      getRequestStatus(request.status) === "Pending"
  ).length;

  const inProgressRequests = userRequests.filter(
    (request) =>
      getRequestStatus(request.status) === "In Progress"
  ).length;

  const completedRequests = userRequests.filter(
    (request) =>
      getRequestStatus(request.status) === "Completed"
  ).length;

  /* =================================
     REQUEST SUMMARY
  ================================= */

  const requestSummary = [
    {
      label: "Total Requests",
      value: totalMyRequests,
      icon: ClipboardList,
      color: "#D62839",
      bg: "bg-[#FDECEF]",
    },
    {
      label: "Pending",
      value: pendingRequests,
      icon: Clock3,
      color: "#F59E0B",
      bg: "bg-amber-50",
    },
    {
      label: "In Progress",
      value: inProgressRequests,
      icon: Activity,
      color: "#2563EB",
      bg: "bg-blue-50",
    },
    {
      label: "Completed",
      value: completedRequests,
      icon: CircleCheck,
      color: "#16A34A",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6">

      {/* =================================
          HEADER
      ================================= */}

      <div>
        <h1 className="text-2xl font-black text-slate-900">
          Donor Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back, {user?.name || "Donor"}! Your blood can save lives.
        </p>
      </div>

      {/* =================================
          DONOR STATS
      ================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {donorStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">

                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    color: stat.color,
                  }}
                >
                  <Icon size={22} strokeWidth={2} />
                </div>

                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight size={13} />
                  {stat.change}
                </span>

              </div>

              <div className="mt-4">

                <p className="text-2xl font-black text-slate-900">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  {stat.label}
                </p>

              </div>
            </div>
          );
        })}

      </div>

      {/* =================================
          MY BLOOD REQUEST SUMMARY
      ================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              My Blood Requests
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Track the blood requests you have created
            </p>
          </div>

          <Link
            href="/dashboard/create-donation-request"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D62839] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#A4161A]"
          >
            <Plus size={15} />
            Create Request
          </Link>

        </div>

        {/* Request Summary Cards */}

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {requestSummary.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
              >

                <div className="flex items-center justify-between">

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg}`}
                    style={{ color: item.color }}
                  >
                    <Icon size={19} />
                  </div>

                  <span
                    className="text-2xl font-black"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </span>

                </div>

                <p className="mt-3 text-xs font-semibold text-slate-600">
                  {item.label}
                </p>

              </div>
            );
          })}

        </div>

      </div>

      {/* =================================
          MY REQUESTS
      ================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              My Requests
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Requests created from your account
            </p>
          </div>

          {userRequests.length > 0 && (
            <Link
              href="/dashboard/requests"
              className="text-xs font-semibold text-[#D62839] hover:underline"
            >
              View All
            </Link>
          )}

        </div>

        {/* =================================
            NO REQUEST STATE
        ================================= */}

        {userRequests.length === 0 ? (

          <div className="px-5 py-12">

            <div className="mx-auto flex max-w-md flex-col items-center text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FDECEF] text-[#D62839]">
                <Droplets size={30} />
              </div>

              <h4 className="mt-5 text-lg font-black text-slate-900">
                No Blood Requests Yet
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                You haven't created any blood donation requests yet.
                Create a request when you or someone you know needs blood.
              </p>

              <Link
                href="/dashboard/create-donation-request"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#D62839] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#A4161A]"
              >
                <Plus size={17} />
                Create Blood Request
              </Link>

            </div>

          </div>

        ) : (

          /* =================================
             REQUEST LIST
          ================================= */

          <div className="divide-y divide-slate-100">

            {userRequests.slice(0, 5).map((request) => {

              const status = getRequestStatus(
                request.status
              );

              return (
                <div
                  key={request.id}
                  className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-slate-50/50 md:flex-row md:items-center md:justify-between"
                >

                  {/* Request Info */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FDECEF] text-sm font-black text-[#D62839]">
                      {request.bloodGroup || "—"}
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <p className="text-sm font-bold text-slate-900">
                          {request.id}
                        </p>

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusStyle(
                            status
                          )}`}
                        >
                          {status}
                        </span>

                      </div>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {request.hospitalName || request.hospital || "Hospital not specified"}
                      </p>

                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">

                        {request.address && (
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {request.address}
                          </span>
                        )}

                        {request.donationDate && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(
                              request.donationDate
                            ).toLocaleDateString()}
                          </span>
                        )}

                        {request.units && (
                          <span>
                            {request.units}{" "}
                            {Number(request.units) === 1
                              ? "unit"
                              : "units"}
                          </span>
                        )}

                      </div>

                    </div>

                  </div>

                  {/* Action */}

                  <Link
                    href={`/dashboard/requests/${request.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D62839] px-4 py-2.5 text-xs font-bold text-[#D62839] transition-colors hover:bg-[#D62839] hover:text-white"
                  >
                    <Eye size={14} />
                    View Request
                  </Link>

                </div>
              );
            })}

          </div>

        )}

      </div>

      {/* =================================
          YOUR DONATION STATUS
      ================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <h3 className="text-sm font-bold text-slate-900">
          Your Donation Status
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Current status and eligibility information
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Blood Group */}

          <div className="flex items-center gap-3 rounded-xl bg-[#FFF7F8] p-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDECEF]">
              <Droplets size={20} className="text-[#D62839]" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Blood Group
              </p>

              <p className="text-sm font-bold text-slate-900">
                {donationStatus.bloodGroup}
              </p>
            </div>

          </div>

          {/* Last Donation */}

          <div className="flex items-center gap-3 rounded-xl bg-[#FFF7F8] p-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDECEF]">
              <Calendar size={20} className="text-[#D62839]" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Last Donation
              </p>

              <p className="text-sm font-bold text-slate-900">
                {donationStatus.lastDonation}
              </p>
            </div>

          </div>

          {/* Next Eligible */}

          <div className="flex items-center gap-3 rounded-xl bg-[#FFF7F8] p-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDECEF]">
              <ShieldCheck size={20} className="text-[#D62839]" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Next Eligible
              </p>

              <p className="text-sm font-bold text-slate-900">
                {donationStatus.nextEligible}
              </p>
            </div>

          </div>

          {/* Availability */}

          <div className="flex items-center gap-3 rounded-xl bg-[#FFF7F8] p-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDECEF]">
              <ToggleLeft size={20} className="text-[#D62839]" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Availability
              </p>

              <p className="text-sm font-bold text-emerald-600">
                {donationStatus.availability}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* =================================
          RECENT DONATION ACTIVITY
      ================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

          <h3 className="text-sm font-bold text-slate-900">
            Recent Donation Activity
          </h3>

          <Link
            href="/dashboard/history"
            className="text-xs font-semibold text-[#D62839] hover:underline"
          >
            View History
          </Link>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead>

              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">

                <th className="px-5 py-3 font-semibold">
                  Date
                </th>

                <th className="px-5 py-3 font-semibold">
                  Hospital
                </th>

                <th className="px-5 py-3 font-semibold">
                  Blood Type
                </th>

                <th className="px-5 py-3 font-semibold">
                  Recipient
                </th>

                <th className="px-5 py-3 font-semibold">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {donationHistory.map((donation) => (

                <tr
                  key={donation.date}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                >

                  <td className="px-5 py-3.5 text-slate-600">
                    {donation.date}
                  </td>

                  <td className="px-5 py-3.5 font-medium text-slate-900">
                    {donation.hospital}
                  </td>

                  <td className="px-5 py-3.5">

                    <span className="inline-flex items-center rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-bold text-[#D62839]">
                      {donation.blood}
                    </span>

                  </td>

                  <td className="px-5 py-3.5 text-slate-600">
                    {donation.recipient}
                  </td>

                  <td className="px-5 py-3.5">

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">

                      <CheckCircle2 size={12} />

                      {donation.status}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}