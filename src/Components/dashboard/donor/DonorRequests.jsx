"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDonationRequests } from "@/context/DonationRequestContext";
import { useSession } from "@/lib/auth-client";
import {
  Plus,
  ClipboardList,
  MapPin,
  Calendar,
  Droplets,
  Clock3,
  Users,
  Eye,
  Pencil,
  Trash2,
  ChevronRight,
} from "lucide-react";

import PageHeader from "@/Components/dashboard/shared/PageHeader";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";
import EmptyState from "@/Components/dashboard/shared/EmptyState";

const statusTabs = [
  { label: "All", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Done", value: "Done" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function MyDonationRequests() {
  const [activeTab, setActiveTab] = useState("All");
  const { requests, isInitialized } = useDonationRequests();
  const { data: session, isPending: sessionPending } = useSession();

  const currentUserEmail = session?.user?.email?.toLowerCase();

  const myDonationRequests = useMemo(() => {
    if (!currentUserEmail) return [];

    return requests.filter((req) => {
      const requesterEmail = (req.requesterEmail || "").toLowerCase();
      return requesterEmail === currentUserEmail;
    });
  }, [requests, currentUserEmail]);

  const filteredRequests = useMemo(() => {
    if (activeTab === "All") {
      return myDonationRequests;
    }

    return myDonationRequests.filter(
      (request) => request.status === activeTab
    );
  }, [activeTab, myDonationRequests]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-100";

      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-100";

      case "Done":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";

      case "Cancelled":
        return "bg-red-50 text-red-600 border-red-100";

      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const isLoading = sessionPending || !isInitialized;

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          title="My Donation Requests"
          subtitle="Track and manage every blood request you have created."
        />

        <Link
          href="/dashboard/create-request"
          className="
            inline-flex w-fit items-center justify-center gap-2
            rounded-xl bg-[#D62839]
            px-4 py-2.5
            text-sm font-semibold text-white
            shadow-sm
            transition-all
            hover:bg-[#A4161A]
            hover:shadow-md
          "
        >
          <Plus size={17} strokeWidth={2.5} />
          New Request
        </Link>
      </div>

      {/* ================= STATUS FILTER ================= */}

      <div className="flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-xl bg-[#F6F8FA] p-1">
        {statusTabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`
                whitespace-nowrap rounded-lg
                px-3.5 py-2
                text-xs font-semibold
                transition-all
                ${
                  isActive
                    ? "bg-white text-[#111827] shadow-sm"
                    : "text-slate-500 hover:text-[#D62839]"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ================= REQUESTS ================= */}

      {isLoading ? (
        <div className="flex min-h-[290px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D62839] border-t-transparent" />
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex min-h-[290px] items-center justify-center p-6">
            <div className="w-full max-w-md text-center">
              {/* Icon */}

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FDECEF]">
                <ClipboardList
                  size={25}
                  strokeWidth={2}
                  className="text-[#D62839]"
                />
              </div>

              {/* Text */}

              <h3 className="mt-5 text-base font-bold text-slate-900">
                {activeTab === "All"
                  ? "No donation requests yet."
                  : `No ${activeTab.toLowerCase()} requests.`}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                {activeTab === "All"
                  ? "Requests you create will appear here with their current status."
                  : `You don't have any ${activeTab.toLowerCase()} donation requests right now.`}
              </p>

              {/* Create Button */}

              {activeTab === "All" && (
                <Link
                  href="/dashboard/create-request"
                  className="
                    mt-5 inline-flex items-center gap-2
                    rounded-xl
                    bg-[#D62839]
                    px-4 py-2.5
                    text-sm font-semibold text-white
                    shadow-sm
                    transition-all
                    hover:bg-[#A4161A]
                    hover:shadow-md
                  "
                >
                  <Plus size={17} strokeWidth={2.5} />
                  Create Donation Request
                </Link>
              )}

              {activeTab !== "All" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("All")}
                  className="
                    mt-5 rounded-xl
                    border border-slate-200
                    px-4 py-2.5
                    text-sm font-semibold text-slate-700
                    transition-colors
                    hover:border-[#D62839]
                    hover:text-[#D62839]
                  "
                >
                  View All Requests
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="
                overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-white
                shadow-sm
                transition-shadow
                hover:shadow-md
              "
            >
              {/* ================= CARD TOP ================= */}

              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  {/* Blood Group */}

                  <div
                    className="
                      flex h-12 w-12 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-[#FDECEF]
                      text-sm font-black
                      text-[#D62839]
                    "
                  >
                    {request.bloodGroup}
                  </div>

                  {/* Request Info */}

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">
                        {request.recipientName}
                      </h3>

                      <span className="text-xs text-slate-400">
                        #{request.id}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {request.address}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {request.donationDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status */}

                <span
                  className={`
                    inline-flex w-fit items-center rounded-full
                    border px-3 py-1
                    text-[11px] font-bold
                    ${getStatusStyle(request.status)}
                  `}
                >
                  {request.status}
                </span>
              </div>

              {/* ================= DETAILS ================= */}

              <div className="grid grid-cols-2 border-y border-slate-100 bg-slate-50/40 sm:grid-cols-4">
                <div className="border-r border-slate-100 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Droplets
                      size={15}
                      className="text-[#D62839]"
                    />
                    <span className="text-[11px] font-medium text-slate-400">
                      Blood Group
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {request.bloodGroup}
                  </p>
                </div>

                <div className="border-b border-r border-slate-100 px-5 py-4 sm:border-b-0">
                  <div className="flex items-center gap-2">
                    <Droplets
                      size={15}
                      className="text-[#D62839]"
                    />
                    <span className="text-[11px] font-medium text-slate-400">
                      Units Required
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {request.units} units
                  </p>
                </div>

                <div className="border-r border-slate-100 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Clock3
                      size={15}
                      className="text-[#D62839]"
                    />
                    <span className="text-[11px] font-medium text-slate-400">
                      Required Time
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {request.donationTime}
                  </p>
                </div>

                <div className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Users
                      size={15}
                      className="text-[#D62839]"
                    />
                    <span className="text-[11px] font-medium text-slate-400">
                      Donors
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {request.units} units needed
                  </p>
                </div>
              </div>

              {/* ================= FOOTER ================= */}

              <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`
                      rounded-lg px-2.5 py-1
                      text-[10px] font-bold
                      ${
                        request.urgency === "Urgent"
                          ? "bg-red-50 text-red-600"
                          : request.urgency === "High"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-amber-50 text-amber-600"
                      }
                    `}
                  >
                    {request.urgency}
                  </span>

                  <span className="text-xs text-slate-400">
                    Created {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* View */}

                  <button
                    type="button"
                    className="
                      inline-flex items-center gap-1.5
                      rounded-lg
                      border border-slate-200
                      px-3 py-2
                      text-xs font-semibold text-slate-600
                      transition-colors
                      hover:border-[#D62839]
                      hover:text-[#D62839]
                    "
                  >
                    <Eye size={14} />
                    View
                  </button>

                  {/* Edit */}

                  {request.status !== "Done" &&
                    request.status !== "Cancelled" && (
                      <button
                        type="button"
                        className="
                          inline-flex items-center gap-1.5
                          rounded-lg
                          border border-slate-200
                          px-3 py-2
                          text-xs font-semibold text-slate-600
                          transition-colors
                          hover:border-[#D62839]
                          hover:text-[#D62839]
                        "
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                    )}

                  {/* Delete */}

                  <button
                    type="button"
                    className="
                      inline-flex items-center justify-center
                      rounded-lg
                      border border-slate-200
                      p-2
                      text-slate-400
                      transition-colors
                      hover:border-red-200
                      hover:bg-red-50
                      hover:text-red-600
                    "
                  >
                    <Trash2 size={14} />
                  </button>

                  <button
                    type="button"
                    className="
                      rounded-lg
                      p-2
                      text-slate-400
                      transition-colors
                      hover:bg-[#FFF4F5]
                      hover:text-[#D62839]
                    "
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}