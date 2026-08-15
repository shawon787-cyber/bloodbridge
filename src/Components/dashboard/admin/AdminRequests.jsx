"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Package,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import { mockBloodRequests } from "@/data/mockData";
import PageHeader from "@/Components/dashboard/shared/PageHeader";
import StatCard from "@/Components/dashboard/shared/StatCard";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";
import SearchFilter from "@/Components/dashboard/shared/SearchFilter";
import EmptyState from "@/Components/dashboard/shared/EmptyState";
import Modal from "@/Components/dashboard/shared/Modal";

export default function AdminRequests() {
  /* =================================
      REQUEST STATE
  ================================= */

  const [requests, setRequests] = useState(mockBloodRequests);

  const [search, setSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [activeTab, setActiveTab] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  
  const itemsPerPage = 5;

  /* =================================
      FILTER OPTIONS
  ================================= */

  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  const statuses = [
    "Pending",
    "Approved",
    "Confirmed",
    "Cancelled",
    "Rejected",
  ];

  const urgencies = [
    "Urgent",
    "High",
    "Medium",
    "Low",
  ];

  /* =================================
      STATISTICS
  ================================= */

  const totalRequests = requests.length;

  const pending = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const urgent = requests.filter(
    (request) => request.urgency === "Urgent"
  ).length;

  const confirmed = requests.filter(
    (request) => request.status === "Confirmed"
  ).length;

  const cancelled = requests.filter(
    (request) => request.status === "Cancelled"
  ).length;

  /* =================================
      STATUS TABS
  ================================= */

  const tabs = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Pending",
      value: "Pending",
    },
    {
      label: "In Progress",
      value: "Approved",
    },
    {
      label: "Done",
      value: "Confirmed",
    },
    {
      label: "Canceled",
      value: "Cancelled",
    },
  ];

  /* =================================
      FILTER REQUESTS
  ================================= */

  const filteredRequests = requests.filter((req) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      req.patient?.toLowerCase().includes(searchText) ||
      req.id?.toLowerCase().includes(searchText) ||
      req.hospital?.toLowerCase().includes(searchText);

    const matchesBlood =
      !bloodGroupFilter ||
      req.bloodGroup === bloodGroupFilter;

    const matchesStatus =
      !statusFilter ||
      req.status === statusFilter;

    const matchesUrgency =
      !urgencyFilter ||
      req.urgency === urgencyFilter;

    const matchesLocation =
      !locationFilter ||
      req.location === locationFilter;

    const matchesTab =
      activeTab === "All" ||
      req.status === activeTab;

    return (
      matchesSearch &&
      matchesBlood &&
      matchesStatus &&
      matchesUrgency &&
      matchesLocation &&
      matchesTab
    );
  });

  /* =================================
      PAGINATION
  ================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRequests.length / itemsPerPage)
  );

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* =================================
      UPDATE REQUEST STATUS
  ================================= */

  const handleStatusUpdate = (requestId, newStatus) => {
    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: newStatus,
            }
          : request
      )
    );

    // Modal-এর selected request-ও update হবে
    setSelectedRequest((previousRequest) =>
      previousRequest
        ? {
            ...previousRequest,
            status: newStatus,
          }
        : null
    );
  };

  /* =================================
      PAGE CHANGE
  ================================= */

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =================================
      TAB CHANGE
  ================================= */

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  /* =================================
      SEARCH CHANGE
  ================================= */

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  /* =================================
      CLEAR FILTERS
  ================================= */

  const handleClear = () => {
    setSearch("");
    setBloodGroupFilter("");
    setStatusFilter("");
    setUrgencyFilter("");
    setLocationFilter("");
    setActiveTab("All");
    setCurrentPage(1);
  };

  /* =================================
      URGENCY COLOR
  ================================= */

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

  /* =================================
      PAGINATION NUMBERS
  ================================= */

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("left-dots");
    }

    const startPage = Math.max(
      2,
      currentPage - 1
    );

    const endPage = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (
      let i = startPage;
      i <= endPage;
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("right-dots");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="min-h-screen space-y-7">

      {/* =================================
          PAGE HEADER
      ================================= */}

      <PageHeader
        title="Blood Requests"
        subtitle="Manage and respond to blood donation requests across the platform."
      />

      {/* =================================
          STAT CARDS
      ================================= */}

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-5">

        <StatCard
          title="Total Requests"
          value={totalRequests}
          icon={Droplets}
          color="#D62839"
        />

        <StatCard
          title="Pending"
          value={pending}
          icon={Clock3}
          color="#F59E0B"
        />

        <StatCard
          title="Urgent"
          value={urgent}
          icon={AlertTriangle}
          color="#EF4444"
        />

        <StatCard
          title="Confirmed"
          value={confirmed}
          icon={CheckCircle2}
          color="#16A34A"
        />

        <StatCard
          title="Cancelled"
          value={cancelled}
          icon={XCircle}
          color="#64748B"
        />

      </section>

      {/* =================================
          REQUEST STATUS TABS
      ================================= */}

      <div className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-xl bg-[#F1F5F9] p-1">

        {tabs.map((tab) => {
          const isActive =
            activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() =>
                handleTabChange(tab.value)
              }
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-[#111827] shadow-sm"
                  : "text-[#64748B] hover:text-[#111827]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}

      </div>

      {/* =================================
          SEARCH + FILTERS
      ================================= */}

      <SearchFilter
        search={search}
        onSearchChange={handleSearchChange}
        filters={
          bloodGroupFilter ||
          statusFilter ||
          urgencyFilter ||
          locationFilter
        }
        onFilterChange={() => {}}
        onClear={handleClear}
      >
        <div className="flex flex-wrap items-center gap-3">

          {/* Blood Group */}

          <select
            value={bloodGroupFilter}
            onChange={(e) => {
              setBloodGroupFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">
              All Blood Groups
            </option>

            {bloodGroups.map((group) => (
              <option
                key={group}
                value={group}
              >
                {group}
              </option>
            ))}
          </select>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">
              All Statuses
            </option>

            {statuses.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>

          {/* Urgency */}

          <select
            value={urgencyFilter}
            onChange={(e) => {
              setUrgencyFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">
              All Urgencies
            </option>

            {urgencies.map((urgency) => (
              <option
                key={urgency}
                value={urgency}
              >
                {urgency}
              </option>
            ))}
          </select>

          {/* Location */}

          <select
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">
              All Locations
            </option>

            {[
              ...new Set(
                requests.map(
                  (request) =>
                    request.location
                )
              ),
            ].map((location) => (
              <option
                key={location}
                value={location}
              >
                {location}
              </option>
            ))}
          </select>

        </div>
      </SearchFilter>

      {/* =================================
          REQUEST TABLE
      ================================= */}

      <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px] text-left">

            <thead>

              <tr className="border-b border-[#F1F5F9] text-[10px] uppercase tracking-wider text-[#94A3B8]">

                <th className="px-5 py-3 font-bold">
                  Request ID
                </th>

                <th className="px-5 py-3 font-bold">
                  Patient
                </th>

                <th className="px-5 py-3 font-bold">
                  Blood Group
                </th>

                <th className="px-5 py-3 font-bold">
                  Units
                </th>

                <th className="px-5 py-3 font-bold">
                  Hospital
                </th>

                <th className="px-5 py-3 font-bold">
                  Location
                </th>

                <th className="px-5 py-3 font-bold">
                  Required Date
                </th>

                <th className="px-5 py-3 font-bold">
                  Urgency
                </th>

                <th className="px-5 py-3 font-bold">
                  Status
                </th>

                <th className="px-5 py-3 font-bold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {paginatedRequests.length === 0 ? (

                <tr>

                  <td colSpan={10}>

                    <EmptyState
                      icon={Droplets}
                      title="No requests found"
                      description="Try adjusting your search or filters to find what you are looking for."
                    />

                  </td>

                </tr>

              ) : (

                paginatedRequests.map((req) => (

                  <tr
                    key={req.id}
                    className="border-b border-[#F8FAFC] last:border-0 hover:bg-[#FFF7F8]"
                  >

                    {/* Request ID */}

                    <td className="px-5 py-4">

                      <span className="text-sm font-bold text-[#111827]">
                        {req.id}
                      </span>

                    </td>

                    {/* Patient */}

                    <td className="px-5 py-4 text-sm font-semibold text-[#111827]">
                      {req.patient}
                    </td>

                    {/* Blood Group */}

                    <td className="px-5 py-4">

                      <span className="inline-flex rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-black text-[#D62839]">
                        {req.bloodGroup}
                      </span>

                    </td>

                    {/* Units */}

                    <td className="px-5 py-4 text-sm font-semibold text-[#111827]">
                      {req.units}
                    </td>

                    {/* Hospital */}

                    <td className="px-5 py-4 text-xs text-[#64748B]">
                      {req.hospital}
                    </td>

                    {/* Location */}

                    <td className="px-5 py-4 text-xs text-[#64748B]">
                      {req.location}
                    </td>

                    {/* Required Date */}

                    <td className="px-5 py-4 text-xs text-[#94A3B8]">

                      {new Date(
                        req.requiredDate
                      ).toLocaleDateString()}

                    </td>

                    {/* Urgency */}

                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${urgencyColor(
                          req.urgency
                        )}`}
                      >
                        {req.urgency}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">

                      <StatusBadge
                        status={req.status.toLowerCase()}
                      />

                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedRequest(req)
                        }
                        className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#FFF4F5] hover:text-[#D62839]"
                      >
                        <MoreHorizontal
                          size={16}
                        />
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* =================================
            PAGINATION
        ================================= */}

        {filteredRequests.length > itemsPerPage && (

          <div className="flex flex-col gap-4 border-t border-[#F1F5F9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Result Count */}

            <p className="text-xs text-[#94A3B8]">

              Showing{" "}

              <span className="font-bold text-[#64748B]">
                {(currentPage - 1) *
                  itemsPerPage +
                  1}
              </span>

              {" - "}

              <span className="font-bold text-[#64748B]">
                {Math.min(
                  currentPage *
                    itemsPerPage,
                  filteredRequests.length
                )}
              </span>

              {" of "}

              <span className="font-bold text-[#64748B]">
                {filteredRequests.length}
              </span>

              {" requests"}

            </p>

            {/* Pagination */}

            <div className="flex items-center gap-1.5">

              {/* Previous */}

              <button
                type="button"
                onClick={() =>
                  handlePageChange(
                    Math.max(
                      1,
                      currentPage - 1
                    )
                  )
                }
                disabled={currentPage === 1}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-3 text-xs font-bold text-[#64748B] transition-all hover:border-[#D62839] hover:text-[#D62839] disabled:cursor-not-allowed disabled:opacity-40"
              >

                <ChevronLeft
                  size={15}
                />

                <span className="ml-1 hidden sm:inline">
                  Previous
                </span>

              </button>

              {/* Page Numbers */}

              {getPageNumbers().map(
                (page, index) => {

                  if (
                    page ===
                      "left-dots" ||
                    page ===
                      "right-dots"
                  ) {

                    return (
                      <span
                        key={`${page}-${index}`}
                        className="flex h-9 w-9 items-center justify-center text-sm font-semibold text-[#94A3B8]"
                      >
                        ...
                      </span>
                    );
                  }

                  const isActive =
                    currentPage ===
                    page;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        handlePageChange(
                          page
                        )
                      }
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                        isActive
                          ? "bg-[#D62839] text-white shadow-sm"
                          : "border border-[#E5E7EB] bg-white text-[#64748B] hover:border-[#D62839] hover:text-[#D62839]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
              )}

              {/* Next */}

              <button
                type="button"
                onClick={() =>
                  handlePageChange(
                    Math.min(
                      totalPages,
                      currentPage + 1
                    )
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
                }
                className="inline-flex h-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-3 text-xs font-bold text-[#64748B] transition-all hover:border-[#D62839] hover:text-[#D62839] disabled:cursor-not-allowed disabled:opacity-40"
              >

                <span className="mr-1 hidden sm:inline">
                  Next
                </span>

                <ChevronRight
                  size={15}
                />

              </button>

            </div>

          </div>

        )}

      </div>

      {/* =================================
          REQUEST DETAILS MODAL
      ================================= */}

      <Modal
        isOpen={!!selectedRequest}
        onClose={() =>
          setSelectedRequest(null)
        }
        title="Request Details"
        width="max-w-lg"
      >

        {selectedRequest && (

          <div className="space-y-5">

            {/* Modal Header */}

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-lg font-black text-[#111827]">
                  {selectedRequest.id}
                </h3>

                <p className="text-sm text-[#64748B]">
                  Patient:{" "}
                  {selectedRequest.patient}
                </p>

              </div>

              <StatusBadge
                status={selectedRequest.status.toLowerCase()}
              />

            </div>

            {/* Details */}

            <div className="grid grid-cols-2 gap-4">

              {/* Blood Group */}

              <div>

                <p className="text-xs font-bold text-[#94A3B8]">
                  Blood Group
                </p>

                <p className="mt-1 inline-flex rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-black text-[#D62839]">
                  {selectedRequest.bloodGroup}
                </p>

              </div>

              {/* Units */}

              <div>

                <p className="text-xs font-bold text-[#94A3B8]">
                  Units Required
                </p>

                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {selectedRequest.units}
                </p>

              </div>

              {/* Hospital */}

              <div>

                <p className="text-xs font-bold text-[#94A3B8]">
                  Hospital
                </p>

                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {selectedRequest.hospital}
                </p>

              </div>

              {/* Location */}

              <div>

                <p className="text-xs font-bold text-[#94A3B8]">
                  Location
                </p>

                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {selectedRequest.location}
                </p>

              </div>

              {/* Required Date */}

              <div>

                <p className="text-xs font-bold text-[#94A3B8]">
                  Required Date
                </p>

                <p className="mt-1 text-sm font-semibold text-[#111827]">

                  {new Date(
                    selectedRequest.requiredDate
                  ).toLocaleDateString()}

                </p>

              </div>

              {/* Urgency */}

              <div>

                <p className="text-xs font-bold text-[#94A3B8]">
                  Urgency
                </p>

                <p className="mt-1">

                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${urgencyColor(
                      selectedRequest.urgency
                    )}`}
                  >
                    {selectedRequest.urgency}
                  </span>

                </p>

              </div>

              {/* Contact */}

              <div className="col-span-2">

                <p className="text-xs font-bold text-[#94A3B8]">
                  Contact
                </p>

                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {selectedRequest.contact}
                </p>

              </div>

              {/* Description */}

              <div className="col-span-2">

                <p className="text-xs font-bold text-[#94A3B8]">
                  Description
                </p>

                <p className="mt-1 text-sm text-[#64748B]">
                  {selectedRequest.description}
                </p>

              </div>

            </div>

            {/* =================================
                MODAL ACTIONS
            ================================= */}

            <div className="flex flex-wrap gap-3 pt-2">

              {/* Pending */}

              {selectedRequest.status ===
                "Pending" && (
                <>

                  <button
                    type="button"
                    onClick={() =>
                      handleStatusUpdate(
                        selectedRequest.id,
                        "Approved"
                      )
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                  >

                    <CheckCircle2
                      size={16}
                    />

                    Approve

                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleStatusUpdate(
                        selectedRequest.id,
                        "Rejected"
                      )
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
                  >

                    <XCircle
                      size={16}
                    />

                    Reject

                  </button>

                </>
              )}

              {/* In Progress / Approved */}

              {selectedRequest.status ===
                "Approved" && (
                <>

                  <button
                    type="button"
                    onClick={() =>
                      handleStatusUpdate(
                        selectedRequest.id,
                        "Confirmed"
                      )
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                  >

                    <CheckCircle2
                      size={16}
                    />

                    Confirm

                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleStatusUpdate(
                        selectedRequest.id,
                        "Cancelled"
                      )
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
                  >

                    <XCircle
                      size={16}
                    />

                    Cancel

                  </button>

                </>
              )}

              {/* Confirmed */}

              {selectedRequest.status ===
                "Confirmed" && (

                <div className="flex w-full items-center justify-center rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600">

                  <CheckCircle2
                    size={17}
                    className="mr-2"
                  />

                  Request Completed

                </div>

              )}

              {/* Cancelled */}

              {selectedRequest.status ===
                "Cancelled" && (

                <div className="flex w-full items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600">

                  <XCircle
                    size={17}
                    className="mr-2"
                  />

                  Request Cancelled

                </div>

              )}

              {/* Rejected */}

              {selectedRequest.status ===
                "Rejected" && (

                <div className="flex w-full items-center justify-center rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">

                  <XCircle
                    size={17}
                    className="mr-2"
                  />

                  Request Rejected

                </div>

              )}

            </div>

          </div>

        )}

      </Modal>

    </div>
  );
}