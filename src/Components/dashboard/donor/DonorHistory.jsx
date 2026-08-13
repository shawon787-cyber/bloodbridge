"use client";

import { useState } from "react";
import PageHeader from "@/Components/dashboard/shared/PageHeader";
import SearchFilter from "@/Components/dashboard/shared/SearchFilter";
import Modal from "@/Components/dashboard/shared/Modal";
import EmptyState from "@/Components/dashboard/shared/EmptyState";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";
import StatCard from "@/Components/dashboard/shared/StatCard";
import { Search, Calendar, Filter } from "lucide-react";
import { mockDonationHistory } from "@/data/mockData";

export default function DonorHistory() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);

  const filtered = mockDonationHistory.filter((donation) => {
    const matchSearch =
      !search ||
      donation.hospital.toLowerCase().includes(search.toLowerCase()) ||
      donation.id.toLowerCase().includes(search.toLowerCase()) ||
      donation.bloodGroup.toLowerCase().includes(search.toLowerCase());
    const matchDate = !dateFilter || donation.date >= dateFilter;
    const matchStatus = !statusFilter || donation.status === statusFilter;
    return matchSearch && matchDate && matchStatus;
  });

  const totalDonations = mockDonationHistory.length;
  const totalUnits = mockDonationHistory.reduce((sum, d) => sum + d.units, 0);
  const hospitalsServed = [...new Set(mockDonationHistory.map((d) => d.hospital))].length;

  const historyStats = [
    { title: "Total Donations", value: totalDonations.toString(), change: "+1 this month", positive: true, icon: Search, color: "#D62839" },
    { title: "Total Units", value: totalUnits.toString(), change: "+1 unit", positive: true, icon: Filter, color: "#2563EB" },
    { title: "Hospitals Served", value: hospitalsServed.toString(), change: "New hospital", positive: true, icon: Calendar, color: "#F59E0B" },
    { title: "Lives Impacted", value: (totalUnits * 3).toString(), change: "+3 lives", positive: true, icon: Search, color: "#16A34A" },
  ];

  const statusColor = (s) => {
    switch (s) {
      case "Completed":
        return "bg-emerald-50 text-emerald-600";
      case "Pending":
        return "bg-amber-50 text-amber-600";
      case "Cancelled":
        return "bg-slate-100 text-slate-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Donation History"
        subtitle="Track your past donations and their impact."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {historyStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        filters={{
          date: dateFilter,
          status: statusFilter,
        }}
        onFilterChange={(key, value) => {
          if (key === "date") setDateFilter(value);
          if (key === "status") setStatusFilter(value);
        }}
        onClear={() => {
          setSearch("");
          setDateFilter("");
          setStatusFilter("");
        }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </SearchFilter>

      {/* History Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3 font-semibold">Donation ID</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Hospital</th>
                <th className="px-5 py-3 font-semibold">Blood Group</th>
                <th className="px-5 py-3 font-semibold">Units</th>
                <th className="px-5 py-3 font-semibold">Request</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12">
                    <EmptyState
                      icon={Search}
                      title="No donations found"
                      description="Try adjusting your filters to find more records."
                    />
                  </td>
                </tr>
              ) : (
                filtered.map((donation) => (
                  <tr key={donation.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 font-medium text-slate-900">{donation.id}</td>
                    <td className="px-5 py-3.5 text-slate-600">{donation.date}</td>
                    <td className="px-5 py-3.5 text-slate-600">{donation.hospital}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-bold text-[#D62839]">
                        {donation.bloodGroup}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{donation.units}</td>
                    <td className="px-5 py-3.5 text-slate-600">{donation.requestId}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor(donation.status)}`}>
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        type="button"
                        onClick={() => setSelectedDonation(donation)}
                        className="rounded-lg bg-[#D62839] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#A4161A]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Donation Details Modal */}
      <Modal isOpen={!!selectedDonation} onClose={() => setSelectedDonation(null)} title="Donation Details" width="max-w-lg">
        {selectedDonation && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDECEF] text-sm font-black text-[#D62839]">
                {selectedDonation.bloodGroup}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{selectedDonation.id}</p>
                <StatusBadge status={selectedDonation.status} />
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Date", value: selectedDonation.date },
                { label: "Hospital", value: selectedDonation.hospital },
                { label: "Blood Group", value: selectedDonation.bloodGroup },
                { label: "Units", value: selectedDonation.units },
                { label: "Request ID", value: selectedDonation.requestId },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                  <span className="text-xs font-medium text-slate-500">{item.label}</span>
                  <span className="text-xs font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSelectedDonation(null)}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
