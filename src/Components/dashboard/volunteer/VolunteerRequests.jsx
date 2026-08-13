"use client";

import { useState } from "react";
import {
  Eye,
  CheckCircle2,
  XCircle,
  Package,
  Phone,
  UserPlus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { mockBloodRequests } from "@/data/mockData";
import PageHeader from "@/Components/dashboard/shared/PageHeader";
import StatCard from "@/Components/dashboard/shared/StatCard";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";
import SearchFilter from "@/Components/dashboard/shared/SearchFilter";
import EmptyState from "@/Components/dashboard/shared/EmptyState";
import Modal from "@/Components/dashboard/shared/Modal";

import { Droplets, Clock3, AlertTriangle, CheckCircle2 as FulfilledIcon, XCircle as CancelledIcon } from "lucide-react";

export default function VolunteerRequests() {
  const [search, setSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const statuses = ["Pending", "Approved", "Fulfilled", "Cancelled"];
  const urgencies = ["Urgent", "High", "Medium", "Low"];

  const newRequests = mockBloodRequests.filter((r) => r.status === "Pending").length;
  const urgentCount = mockBloodRequests.filter((r) => r.urgency === "Urgent").length;
  const inProgress = mockBloodRequests.filter((r) => r.status === "Approved").length;
  const completed = mockBloodRequests.filter((r) => r.status === "Fulfilled").length;

  const filteredRequests = mockBloodRequests.filter((req) => {
    const matchesSearch =
      req.patient.toLowerCase().includes(search.toLowerCase()) ||
      req.id.toLowerCase().includes(search.toLowerCase()) ||
      req.hospital.toLowerCase().includes(search.toLowerCase());
    const matchesBlood = !bloodGroupFilter || req.bloodGroup === bloodGroupFilter;
    const matchesStatus = !statusFilter || req.status === statusFilter;
    const matchesUrgency = !urgencyFilter || req.urgency === urgencyFilter;
    const matchesLocation = !locationFilter || req.location === locationFilter;
    return matchesSearch && matchesBlood && matchesStatus && matchesUrgency && matchesLocation;
  });

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / itemsPerPage));
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClear = () => {
    setSearch("");
    setBloodGroupFilter("");
    setStatusFilter("");
    setUrgencyFilter("");
    setLocationFilter("");
    setCurrentPage(1);
  };

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

  return (
    <div className="min-h-screen space-y-7">
      <PageHeader
        title="Blood Requests"
        subtitle="Help manage and respond to blood donation requests."
      />

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="New Requests" value={newRequests} icon={Droplets} color="#D62839" />
        <StatCard title="Urgent" value={urgentCount} icon={AlertTriangle} color="#EF4444" />
        <StatCard title="In Progress" value={inProgress} icon={Clock3} color="#F59E0B" />
        <StatCard title="Completed" value={completed} icon={FulfilledIcon} color="#16A34A" />
      </section>

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        filters={bloodGroupFilter || statusFilter || urgencyFilter || locationFilter}
        onFilterChange={() => {}}
        onClear={handleClear}
      >
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={bloodGroupFilter}
            onChange={(e) => {
              setBloodGroupFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Blood Groups</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={urgencyFilter}
            onChange={(e) => {
              setUrgencyFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Urgencies</option>
            {urgencies.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <select
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Locations</option>
            {[...new Set(mockBloodRequests.map((r) => r.location))].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </SearchFilter>

      <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="border-b border-[#F1F5F9] text-[10px] uppercase tracking-wider text-[#94A3B8]">
                <th className="px-5 py-3 font-bold">Request ID</th>
                <th className="px-5 py-3 font-bold">Patient</th>
                <th className="px-5 py-3 font-bold">Blood Group</th>
                <th className="px-5 py-3 font-bold">Units</th>
                <th className="px-5 py-3 font-bold">Hospital</th>
                <th className="px-5 py-3 font-bold">Location</th>
                <th className="px-5 py-3 font-bold">Required Date</th>
                <th className="px-5 py-3 font-bold">Urgency</th>
                <th className="px-5 py-3 font-bold">Status</th>
                <th className="px-5 py-3 font-bold">Actions</th>
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
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-[#111827]">{req.id}</span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-[#111827]">
                      {req.patient}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-black text-[#D62839]">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-[#111827]">{req.units}</td>
                    <td className="px-5 py-4 text-xs text-[#64748B]">{req.hospital}</td>
                    <td className="px-5 py-4 text-xs text-[#64748B]">{req.location}</td>
                    <td className="px-5 py-4 text-xs text-[#94A3B8]">
                      {new Date(req.requiredDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${urgencyColor(req.urgency)}`}
                      >
                        {req.urgency}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={req.status.toLowerCase()} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="relative">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#FFF4F5] hover:text-[#D62839]"
                          onClick={() => setSelectedRequest(req)}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#F1F5F9] px-5 py-4">
            <p className="text-xs text-[#94A3B8]">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-bold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839] disabled:opacity-50"
              >
                <ChevronLeft size={14} />
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-bold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839] disabled:opacity-50"
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        title="Request Details"
        width="max-w-lg"
      >
        {selectedRequest && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-[#111827]">{selectedRequest.id}</h3>
                <p className="text-sm text-[#64748B]">Patient: {selectedRequest.patient}</p>
              </div>
              <StatusBadge status={selectedRequest.status.toLowerCase()} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Blood Group</p>
                <p className="mt-1 inline-flex rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-black text-[#D62839]">
                  {selectedRequest.bloodGroup}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Units Required</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">{selectedRequest.units}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Hospital</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">{selectedRequest.hospital}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Location</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">{selectedRequest.location}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Required Date</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {new Date(selectedRequest.requiredDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Urgency</p>
                <p className="mt-1">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${urgencyColor(selectedRequest.urgency)}`}
                  >
                    {selectedRequest.urgency}
                  </span>
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-bold text-[#94A3B8]">Contact</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">{selectedRequest.contact}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-bold text-[#94A3B8]">Description</p>
                <p className="mt-1 text-sm text-[#64748B]">{selectedRequest.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D62839] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#A4161A]"
              >
                <UserPlus size={16} />
                Find Donors
              </button>
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839]"
              >
                <Phone size={16} />
                Contact
              </button>
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-amber-700"
              >
                <Clock3 size={16} />
                Mark In Progress
              </button>
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
              >
                <CheckCircle2 size={16} />
                Mark Completed
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
