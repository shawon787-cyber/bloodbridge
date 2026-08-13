"use client";

import { useState } from "react";
import {
  Search,
  Users,
  Phone,
  UserPlus,
  MapPin,
  Droplets,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import { mockDonors } from "@/data/mockData";
import PageHeader from "@/Components/dashboard/shared/PageHeader";
import StatCard from "@/Components/dashboard/shared/StatCard";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";
import SearchFilter from "@/Components/dashboard/shared/SearchFilter";
import EmptyState from "@/Components/dashboard/shared/EmptyState";
import Modal from "@/Components/dashboard/shared/Modal";

export default function VolunteerDonors() {
  const [search, setSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const locations = [...new Set(mockDonors.map((d) => d.location))];
  const availabilities = ["Available", "Unavailable"];

  const filteredDonors = mockDonors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(search.toLowerCase()) ||
      donor.id.toLowerCase().includes(search.toLowerCase());
    const matchesBlood = !bloodGroupFilter || donor.bloodGroup === bloodGroupFilter;
    const matchesLocation = !locationFilter || donor.location === locationFilter;
    const matchesAvailability = !availabilityFilter || donor.availability === availabilityFilter;
    return matchesSearch && matchesBlood && matchesLocation && matchesAvailability;
  });

  const totalPages = Math.max(1, Math.ceil(filteredDonors.length / itemsPerPage));
  const paginatedDonors = filteredDonors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClear = () => {
    setSearch("");
    setBloodGroupFilter("");
    setLocationFilter("");
    setAvailabilityFilter("");
    setCurrentPage(1);
  };

  const recommendedDonors = mockDonors.filter(
    (d) => d.availability === "Available" && d.donationCount >= 8
  );

  return (
    <div className="min-h-screen space-y-7">
      <PageHeader
        title="Find Blood Donors"
        subtitle="Search and connect with available blood donors."
      />

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Donors"
          value={mockDonors.length}
          icon={Users}
          color="#D62839"
        />
        <StatCard
          title="Available Now"
          value={mockDonors.filter((d) => d.availability === "Available").length}
          icon={HeartPulse}
          color="#16A34A"
        />
        <StatCard
          title="Blood Groups"
          value={new Set(mockDonors.map((d) => d.bloodGroup)).size}
          icon={Droplets}
          color="#2563EB"
        />
        <StatCard
          title="Avg Donations"
          value={Math.round(mockDonors.reduce((sum, d) => sum + d.donationCount, 0) / mockDonors.length)}
          icon={MapPin}
          color="#7C3AED"
        />
      </section>

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        filters={bloodGroupFilter || locationFilter || availabilityFilter}
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
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <select
            value={availabilityFilter}
            onChange={(e) => {
              setAvailabilityFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Availability</option>
            {availabilities.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </SearchFilter>

      <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-[#F1F5F9] text-[10px] uppercase tracking-wider text-[#94A3B8]">
                <th className="px-5 py-3 font-bold">Donor</th>
                <th className="px-5 py-3 font-bold">Blood Group</th>
                <th className="px-5 py-3 font-bold">Location</th>
                <th className="px-5 py-3 font-bold">Distance</th>
                <th className="px-5 py-3 font-bold">Availability</th>
                <th className="px-5 py-3 font-bold">Last Donation</th>
                <th className="px-5 py-3 font-bold">Donations</th>
                <th className="px-5 py-3 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDonors.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <EmptyState
                      icon={Users}
                      title="No donors found"
                      description="Try adjusting your search or filters to find what you are looking for."
                    />
                  </td>
                </tr>
              ) : (
                paginatedDonors.map((donor) => (
                  <tr
                    key={donor.id}
                    className="border-b border-[#F8FAFC] last:border-0 hover:bg-[#FFF7F8]"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-bold text-[#111827]">{donor.name}</p>
                        <p className="text-[10px] text-[#94A3B8]">{donor.id}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-black text-[#D62839]">
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-[#111827]">{donor.location}</td>
                    <td className="px-5 py-4 text-xs text-[#64748B]">{donor.distance}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={donor.availability.toLowerCase()} />
                    </td>
                    <td className="px-5 py-4 text-xs text-[#94A3B8]">
                      {new Date(donor.lastDonation).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-[#111827]">{donor.donationCount}</td>
                    <td className="px-5 py-4">
                      <div className="relative">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#FFF4F5] hover:text-[#D62839]"
                          onClick={() => setSelectedDonor(donor)}
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

      {recommendedDonors.length > 0 && (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <div className="border-b border-[#F1F5F9] px-5 py-4">
            <h3 className="text-sm font-bold text-[#111827]">Recommended Donors</h3>
            <p className="mt-1 text-xs text-[#94A3B8]">
              Available donors with high donation history
            </p>
          </div>
          <div className="divide-y divide-[#F8FAFC]">
            {recommendedDonors.map((donor) => (
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
                  <p className="text-xs text-[#94A3B8]">{donor.donationCount} donations</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-xs font-bold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839]"
                    >
                      <Phone size={12} />
                      Contact
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDonor(donor)}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#D62839] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#A4161A]"
                    >
                      <UserPlus size={12} />
                      Match
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
