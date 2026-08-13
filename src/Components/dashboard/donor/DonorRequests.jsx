"use client";

import { useState } from "react";
import PageHeader from "@/Components/dashboard/shared/PageHeader";
import SearchFilter from "@/Components/dashboard/shared/SearchFilter";
import Modal from "@/Components/dashboard/shared/Modal";
import EmptyState from "@/Components/dashboard/shared/EmptyState";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";
import {
  Search,
  Droplets,
  MapPin,
  Calendar,
  AlertTriangle,
  User,
} from "lucide-react";
import { mockBloodRequests } from "@/data/mockData";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const URGENCY_LEVELS = ["Urgent", "High", "Medium", "Low"];
const LOCATIONS = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Sylhet", "Mymensingh"];

export default function DonorRequests() {
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [date, setDate] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const filtered = mockBloodRequests.filter((req) => {
    const matchSearch =
      !search ||
      req.hospital.toLowerCase().includes(search.toLowerCase()) ||
      req.patient.toLowerCase().includes(search.toLowerCase()) ||
      req.id.toLowerCase().includes(search.toLowerCase());
    const matchBlood = !bloodGroup || req.bloodGroup === bloodGroup;
    const matchLocation = !location || req.location === location;
    const matchUrgency = !urgency || req.urgency === urgency;
    const matchDate = !date || req.requiredDate >= date;
    return matchSearch && matchBlood && matchLocation && matchUrgency && matchDate;
  });

  const handleDonateClick = (req) => {
    setConfirmId(req.id);
    setShowConfirm(true);
  };

  const confirmDonate = () => {
    setShowConfirm(false);
    setConfirmId(null);
  };

  const urgencyColor = (u) => {
    switch (u) {
      case "Urgent":
        return "bg-red-50 text-red-600";
      case "High":
        return "bg-orange-50 text-orange-600";
      case "Medium":
        return "bg-amber-50 text-amber-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blood Requests"
        subtitle="Browse blood requests that match your blood type and location."
      />

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        filters={{
          bloodGroup,
          location,
          urgency,
          date,
        }}
        onFilterChange={(key, value) => {
          if (key === "bloodGroup") setBloodGroup(value);
          if (key === "location") setLocation(value);
          if (key === "urgency") setUrgency(value);
          if (key === "date") setDate(value);
        }}
        onClear={() => {
          setSearch("");
          setBloodGroup("");
          setLocation("");
          setUrgency("");
          setDate("");
        }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Blood Groups</option>
            {BLOOD_GROUPS.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Urgency Levels</option>
            {URGENCY_LEVELS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          />
        </div>
      </SearchFilter>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <EmptyState
            icon={Search}
            title="No requests found"
            description="Try adjusting your filters to find more blood requests."
            action={
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setBloodGroup("");
                  setLocation("");
                  setUrgency("");
                  setDate("");
                }}
                className="rounded-xl bg-[#D62839] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#A4161A]"
              >
                Clear Filters
              </button>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((req) => (
            <div
              key={req.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-sm font-black text-[#D62839]">
                    {req.bloodGroup}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{req.id}</p>
                    <StatusBadge status={req.urgency} />
                  </div>
                </div>
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${urgencyColor(req.urgency)}`}>
                  {req.urgency}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <User size={14} className="shrink-0 text-[#D62839]" />
                  <span className="font-medium text-slate-700">Patient:</span> {req.patient}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin size={14} className="shrink-0 text-[#D62839]" />
                  <span className="font-medium text-slate-700">Hospital:</span> {req.hospital}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Droplets size={14} className="shrink-0 text-[#D62839]" />
                  <span className="font-medium text-slate-700">Units:</span> {req.units}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={14} className="shrink-0 text-[#D62839]" />
                  <span className="font-medium text-slate-700">Required:</span> {req.requiredDate}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(req)}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-[#D62839] hover:text-[#D62839]"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => handleDonateClick(req)}
                  disabled={req.status === "Fulfilled" || req.status === "Cancelled"}
                  className="flex-1 rounded-xl bg-[#D62839] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#A4161A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  I Can Donate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Request Details Modal */}
      <Modal isOpen={!!selectedRequest} onClose={() => setSelectedRequest(null)} title="Blood Request Details" width="max-w-lg">
        {selectedRequest && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDECEF] text-lg font-black text-[#D62839]">
                {selectedRequest.bloodGroup}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{selectedRequest.id}</p>
                <StatusBadge status={selectedRequest.status} />
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Patient", value: selectedRequest.patient },
                { label: "Hospital", value: selectedRequest.hospital },
                { label: "Location", value: selectedRequest.location },
                { label: "Blood Group", value: selectedRequest.bloodGroup },
                { label: "Units Required", value: selectedRequest.units },
                { label: "Required Date", value: selectedRequest.requiredDate },
                { label: "Urgency", value: selectedRequest.urgency },
                { label: "Contact", value: selectedRequest.contact },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                  <span className="text-xs font-medium text-slate-500">{item.label}</span>
                  <span className="text-xs font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">{selectedRequest.description}</p>
            <button
              type="button"
              onClick={() => setSelectedRequest(null)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Confirm Donation" width="max-w-md">
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl bg-[#FDECEF] p-4">
            <AlertTriangle size={24} className="shrink-0 text-[#D62839]" />
            <p className="text-sm font-medium text-slate-700">
              Are you sure you want to donate for request <span className="font-bold text-[#D62839]">#{confirmId}</span>? This is a frontend confirmation only.
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDonate}
              className="rounded-xl bg-[#D62839] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#A4161A]"
            >
              Confirm Donation
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
