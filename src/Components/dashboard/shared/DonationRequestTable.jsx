"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  MoreHorizontal,
} from "lucide-react";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";
import EmptyState from "@/Components/dashboard/shared/EmptyState";
import { getUrgencyStyle } from "@/lib/donationRequests";

const DonationRequestTable = ({
  requests,
  onRowClick,
  onActionClick,
  renderActions,
  itemsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(requests.length / itemsPerPage));
  const paginatedRequests = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push("left-dots");
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("right-dots");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-[10px] uppercase tracking-wider text-[#94A3B8]">
              <th className="px-5 py-3 font-bold">Request ID</th>
              <th className="px-5 py-3 font-bold">Recipient</th>
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
                    {req.recipientName || req.patient}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-black text-[#D62839]">
                      {req.bloodGroup}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-[#111827]">{req.units}</td>
                  <td className="px-5 py-4 text-xs text-[#64748B]">{req.hospitalName || req.hospital}</td>
                  <td className="px-5 py-4 text-xs text-[#64748B]">{req.location || req.address}</td>
                  <td className="px-5 py-4 text-xs text-[#94A3B8]">
                    {req.requiredDate ? new Date(req.requiredDate).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${getUrgencyStyle(req.urgency)}`}
                    >
                      {req.urgency}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={req.status.toLowerCase()} />
                  </td>
                  <td className="px-5 py-4">
                    {renderActions ? (
                      renderActions(req)
                    ) : (
                      <button
                        type="button"
                        onClick={() => onActionClick?.(req)}
                        className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#FFF4F5] hover:text-[#D62839]"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {requests.length > itemsPerPage && (
        <div className="flex flex-col gap-4 border-t border-[#F1F5F9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#94A3B8]">
            Showing{" "}
            <span className="font-bold text-[#64748B]">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>
            {" - "}
            <span className="font-bold text-[#64748B]">
              {Math.min(currentPage * itemsPerPage, requests.length)}
            </span>
            {" of "}
            <span className="font-bold text-[#64748B]">{requests.length}</span>
            {" requests"}
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-3 text-xs font-bold text-[#64748B] transition-all hover:border-[#D62839] hover:text-[#D62839] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={15} />
              <span className="ml-1 hidden sm:inline">Previous</span>
            </button>

            {getPageNumbers().map((page, index) => {
              if (page === "left-dots" || page === "right-dots") {
                return (
                  <span
                    key={`${page}-${index}`}
                    className="flex h-9 w-9 items-center justify-center text-sm font-semibold text-[#94A3B8]"
                  >
                    ...
                  </span>
                );
              }

              const isActive = currentPage === page;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#D62839] text-white shadow-sm"
                      : "border border-[#E5E7EB] bg-white text-[#64748B] hover:border-[#D62839] hover:text-[#D62839]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-3 text-xs font-bold text-[#64748B] transition-all hover:border-[#D62839] hover:text-[#D62839] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="mr-1 hidden sm:inline">Next</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestTable;
