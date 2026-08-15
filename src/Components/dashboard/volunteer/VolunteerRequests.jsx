"use client";

import { useState, useMemo } from "react";
import {
  CheckCircle2,
  XCircle,
  Droplets,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import { useDonationRequests } from "@/context/DonationRequestContext";
import PageHeader from "@/Components/dashboard/shared/PageHeader";
import StatCard from "@/Components/dashboard/shared/StatCard";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";
import DonationRequestFilters from "@/Components/dashboard/shared/DonationRequestFilters";
import DonationRequestTable from "@/Components/dashboard/shared/DonationRequestTable";
import DonationRequestModal from "@/Components/dashboard/shared/DonationRequestModal";





export default function VolunteerRequests() {
  const { requests, updateRequestStatus, isInitialized } = useDonationRequests();

  const [search, setSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [upazilaFilter, setUpazilaFilter] = useState("");

  const [activeTab, setActiveTab] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filters = useMemo(
    () => ({
      search,
      bloodGroup: bloodGroupFilter,
      status: statusFilter,
      urgency: urgencyFilter,
      location: locationFilter,
      district: districtFilter,
      upazila: upazilaFilter,
    }),
    [search, bloodGroupFilter, statusFilter, urgencyFilter, locationFilter, districtFilter, upazilaFilter]
  );

  const filteredRequests = useMemo(() => {
    let result = requests;

    if (activeTab !== "All") {
      result = result.filter((req) => req.status === activeTab);
    }

    return result;
  }, [requests, activeTab]);

  const finalFiltered = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return filteredRequests.filter((req) => {
      const matchesSearch =
        !searchText ||
        (req.id && String(req.id).toLowerCase().includes(searchText)) ||
        (req.recipientName && req.recipientName.toLowerCase().includes(searchText)) ||
        (req.requesterName && req.requesterName.toLowerCase().includes(searchText)) ||
        (req.hospitalName && req.hospitalName.toLowerCase().includes(searchText)) ||
        (req.districtName && req.districtName.toLowerCase().includes(searchText)) ||
        (req.upazilaName && req.upazilaName.toLowerCase().includes(searchText)) ||
        (req.bloodGroup && req.bloodGroup.toLowerCase().includes(searchText));

      const matchesBlood = !bloodGroupFilter || req.bloodGroup === bloodGroupFilter;
      const matchesStatus = !statusFilter || req.status === statusFilter;
      const matchesUrgency = !urgencyFilter || req.urgency === urgencyFilter;
      const matchesLocation =
        !locationFilter ||
        (req.location && req.location.toLowerCase().includes(locationFilter.toLowerCase())) ||
        (req.address && req.address.toLowerCase().includes(locationFilter.toLowerCase()));
      const matchesDistrict =
        !districtFilter ||
        (req.districtName && req.districtName.toLowerCase().includes(districtFilter.toLowerCase()));
      const matchesUpazila =
        !upazilaFilter ||
        (req.upazilaName && req.upazilaName.toLowerCase().includes(upazilaFilter.toLowerCase()));

      return (
        matchesSearch &&
        matchesBlood &&
        matchesStatus &&
        matchesUrgency &&
        matchesLocation &&
        matchesDistrict &&
        matchesUpazila
      );
    });
  }, [filteredRequests, search, bloodGroupFilter, statusFilter, urgencyFilter, locationFilter, districtFilter, upazilaFilter]);

  const stats = useMemo(() => {
    const pending = requests.filter((r) => r.status === "Pending").length;
    const inProgress = requests.filter((r) => r.status === "In Progress").length;
    const done = requests.filter((r) => r.status === "Done").length;
    const cancelled = requests.filter((r) => r.status === "Cancelled").length;
    const urgent = requests.filter((r) => r.urgency === "Urgent").length;

    return {
      total: requests.length,
      pending,
      inProgress,
      done,
      cancelled,
      urgent,
    };
  }, [requests]);

  const tabs = [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Done", value: "Done" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  const handleClear = () => {
    setSearch("");
    setBloodGroupFilter("");
    setStatusFilter("");
    setUrgencyFilter("");
    setLocationFilter("");
    setDistrictFilter("");
    setUpazilaFilter("");
    setActiveTab("All");
  };

  const handleStatusUpdate = (requestId, newStatus) => {
    updateRequestStatus(requestId, newStatus);
    setSelectedRequest((prev) =>
      prev && prev.id === requestId ? { ...prev, status: newStatus } : prev
    );
  };

  const isLoading = !isInitialized;

  return (
    <div className="min-h-screen space-y-7">
      <PageHeader
        title="Blood Requests"
        subtitle="Manage and respond to blood donation requests across the platform."
      />

      {isLoading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D62839] border-t-transparent" />
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-5">
            <StatCard title="Total Requests" value={stats.total} icon={Droplets} color="#D62839" />
            <StatCard title="Pending" value={stats.pending} icon={Clock3} color="#F59E0B" />
            <StatCard title="Urgent" value={stats.urgent} icon={AlertTriangle} color="#EF4444" />
            <StatCard title="In Progress" value={stats.inProgress} icon={Clock3} color="#2563EB" />
            <StatCard title="Done" value={stats.done} icon={CheckCircle2} color="#16A34A" />
          </section>

          <div className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-xl bg-[#F1F5F9] p-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
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

          <DonationRequestFilters
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={(newFilters) => {
              setBloodGroupFilter(newFilters.bloodGroup || "");
              setStatusFilter(newFilters.status || "");
              setUrgencyFilter(newFilters.urgency || "");
              setLocationFilter(newFilters.location || "");
              setDistrictFilter(newFilters.district || "");
              setUpazilaFilter(newFilters.upazila || "");
            }}
            onClear={handleClear}
            requests={filteredRequests}
            showDistrict
            showUpazila
          />

          <DonationRequestTable
            requests={finalFiltered}
            itemsPerPage={5}
            onActionClick={setSelectedRequest}
          />

          <DonationRequestModal
            isOpen={!!selectedRequest}
            onClose={() => setSelectedRequest(null)}
            request={selectedRequest}
            title="Request Details"
          >
            {selectedRequest && (
              <>
                {selectedRequest.status === "Pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(selectedRequest.id, "In Progress")}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                    >
                      <CheckCircle2 size={16} />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(selectedRequest.id, "Rejected")}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  </>
                )}

                {selectedRequest.status === "In Progress" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(selectedRequest.id, "Done")}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                    >
                      <CheckCircle2 size={16} />
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(selectedRequest.id, "Cancelled")}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  </>
                )}

                {selectedRequest.status === "Done" && (
                  <div className="flex w-full items-center justify-center rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600">
                    <CheckCircle2 size={17} className="mr-2" />
                    Request Completed
                  </div>
                )}

                {selectedRequest.status === "Cancelled" && (
                  <div className="flex w-full items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600">
                    <XCircle size={17} className="mr-2" />
                    Request Cancelled
                  </div>
                )}

                {selectedRequest.status === "Rejected" && (
                  <div className="flex w-full items-center justify-center rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                    <XCircle size={17} className="mr-2" />
                    Request Rejected
                  </div>
                )}
              </>
            )}
          </DonationRequestModal>
        </>
      )}
    </div>
  );
}
