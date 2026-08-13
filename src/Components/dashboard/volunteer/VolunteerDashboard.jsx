"use client";

import { useState } from "react";
import {
  ClipboardList,
  Droplets,
  CheckCircle2,
  Users,
  Clock,
  MapPin,
  Phone,
  ArrowUpRight,
  UserPlus,
  FileText,
  Bell,
} from "lucide-react";

import { mockBloodRequests, mockDonors } from "@/data/mockData";
import PageHeader from "@/Components/dashboard/shared/PageHeader";
import StatCard from "@/Components/dashboard/shared/StatCard";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";
import Modal from "@/Components/dashboard/shared/Modal";

export default function VolunteerDashboard() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const pendingRequests = mockBloodRequests.filter((r) => r.status === "Pending").length;
  const urgentRequests = mockBloodRequests.filter((r) => r.urgency === "Urgent").length;
  const availableDonors = mockDonors.filter((d) => d.availability === "Available").length;
  const requestsHelped = mockBloodRequests.filter((r) => r.status === "Fulfilled").length;
  const peopleReached = mockBloodRequests.length * 3;

  const urgentBloodRequests = mockBloodRequests
    .filter((r) => r.urgency === "Urgent" || r.urgency === "High")
    .slice(0, 4);

  const availableDonorsList = mockDonors.filter((d) => d.availability === "Available").slice(0, 4);

  return (
    <div className="min-h-screen space-y-7">
      <PageHeader
        title="Volunteer Dashboard"
        subtitle="Welcome back! Here's what's happening in your BloodBridge community."
      />

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Pending Blood Requests"
          value={pendingRequests}
          change="+2 new"
          positive={true}
          icon={ClipboardList}
          color="#D62839"
        />
        <StatCard
          title="Urgent Requests"
          value={urgentRequests}
          change="+1 today"
          positive={false}
          icon={Droplets}
          color="#EF4444"
        />
        <StatCard
          title="Available Donors"
          value={availableDonors}
          change="Online now"
          positive={true}
          icon={Users}
          color="#2563EB"
        />
        <StatCard
          title="Requests Helped"
          value={requestsHelped}
          change="+3 this week"
          positive={true}
          icon={CheckCircle2}
          color="#16A34A"
        />
        <StatCard
          title="People Reached"
          value={peopleReached}
          change="+12 today"
          positive={true}
          icon={Clock}
          color="#7C3AED"
        />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] px-5 py-4">
              <h3 className="text-sm font-bold text-[#111827]">Urgent Blood Requests</h3>
              <span className="text-xs font-semibold text-[#94A3B8]">
                {urgentBloodRequests.length} requests
              </span>
            </div>
            <div className="divide-y divide-[#F8FAFC]">
              {urgentBloodRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-[#FFF7F8] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-sm font-black text-[#D62839]">
                      {req.bloodGroup}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{req.patient}</p>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-[#64748B]">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {req.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Droplets size={12} />
                          {req.units} unit{req.units > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={req.urgency.toLowerCase()} />
                    <p className="mt-1 text-xs text-[#94A3B8]">{req.hospital}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedRequest(req)}
                      className="mt-2 inline-flex items-center gap-1 rounded-lg bg-[#D62839] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#A4161A]"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] px-5 py-4">
              <h3 className="text-sm font-bold text-[#111827]">Available Donors</h3>
              <span className="text-xs font-semibold text-[#94A3B8]">
                {availableDonorsList.length} donors
              </span>
            </div>
            <div className="divide-y divide-[#F8FAFC]">
              {availableDonorsList.map((donor) => (
                <div
                  key={donor.id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-[#FFF7F8] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-sm font-black text-[#D62839]">
                      {donor.bloodGroup}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{donor.name}</p>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-[#64748B]">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {donor.location}
                        </span>
                        <span>{donor.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={donor.availability.toLowerCase()} />
                    <p className="mt-1 text-xs text-[#94A3B8]">
                      Last donation: {new Date(donor.lastDonation).toLocaleDateString()}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedDonor(donor)}
                      className="mt-2 inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-xs font-bold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839]"
                    >
                      <Phone size={12} />
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <h3 className="text-sm font-bold text-[#111827]">Volunteer Activity</h3>
            <p className="mt-1 text-xs text-[#64748B]">Your recent contributions</p>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-[#F1F5F9] p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <ClipboardList size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">Requests Handled</p>
                    <p className="text-xs text-[#94A3B8]">This month</p>
                  </div>
                </div>
                <p className="text-lg font-black text-[#111827]">12</p>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-[#F1F5F9] p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">Donors Contacted</p>
                    <p className="text-xs text-[#94A3B8]">This month</p>
                  </div>
                </div>
                <p className="text-lg font-black text-[#111827]">28</p>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-[#F1F5F9] p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">Successful Matches</p>
                    <p className="text-xs text-[#94A3B8]">This month</p>
                  </div>
                </div>
                <p className="text-lg font-black text-[#111827]">7</p>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-[#F1F5F9] p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">Hours Contributed</p>
                    <p className="text-xs text-[#94A3B8]">This month</p>
                  </div>
                </div>
                <p className="text-lg font-black text-[#111827]">34</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <h3 className="text-sm font-bold text-[#111827]">Quick Actions</h3>
            <p className="mt-1 text-xs text-[#64748B]">Frequently used tools</p>
            <div className="mt-5 space-y-3">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-[#E5E7EB] p-3 text-left transition-all hover:border-[#D62839]/30 hover:bg-[#FFF7F8]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FDECEF] text-[#D62839]">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">View Blood Requests</p>
                  <p className="text-xs text-[#94A3B8]">Browse active requests</p>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-[#94A3B8]" />
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-[#E5E7EB] p-3 text-left transition-all hover:border-[#D62839]/30 hover:bg-[#FFF7F8]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FDECEF] text-[#D62839]">
                  <Users size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Find Donors</p>
                  <p className="text-xs text-[#94A3B8]">Search donor database</p>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-[#94A3B8]" />
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-[#E5E7EB] p-3 text-left transition-all hover:border-[#D62839]/30 hover:bg-[#FFF7F8]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FDECEF] text-[#D62839]">
                  <Bell size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Update Availability</p>
                  <p className="text-xs text-[#94A3B8]">Set your status</p>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-[#94A3B8]" />
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-[#E5E7EB] p-3 text-left transition-all hover:border-[#D62839]/30 hover:bg-[#FFF7F8]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FDECEF] text-[#D62839]">
                  <Droplets size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">View Funding</p>
                  <p className="text-xs text-[#94A3B8]">Check campaigns</p>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-[#94A3B8]" />
              </button>
            </div>
          </div>
        </div>
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
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${
                      selectedRequest.urgency === "Urgent"
                        ? "bg-red-50 text-red-600"
                        : selectedRequest.urgency === "High"
                        ? "bg-orange-50 text-orange-600"
                        : selectedRequest.urgency === "Medium"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
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
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!selectedDonor}
        onClose={() => setSelectedDonor(null)}
        title="Donor Profile"
        width="max-w-md"
      >
        {selectedDonor && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FDECEF] text-lg font-black text-[#D62839]">
                {selectedDonor.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-black text-[#111827]">{selectedDonor.name}</h3>
                <p className="text-sm text-[#64748B]">{selectedDonor.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Blood Group</p>
                <p className="mt-1 inline-flex rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-black text-[#D62839]">
                  {selectedDonor.bloodGroup}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Location</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">{selectedDonor.location}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Distance</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">{selectedDonor.distance}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Availability</p>
                <div className="mt-1">
                  <StatusBadge status={selectedDonor.availability.toLowerCase()} />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Last Donation</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {new Date(selectedDonor.lastDonation).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Donation Count</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">{selectedDonor.donationCount}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D62839] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#A4161A]"
              >
                <Phone size={16} />
                Contact
              </button>
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839]"
              >
                <UserPlus size={16} />
                Match With Request
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
