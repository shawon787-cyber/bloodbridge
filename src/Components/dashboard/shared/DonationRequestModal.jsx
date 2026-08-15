"use client";

import { X } from "lucide-react";
import StatusBadge from "@/Components/dashboard/shared/StatusBadge";
import { getUrgencyStyle } from "@/lib/donationRequests";

const DonationRequestModal = ({ isOpen, onClose, request, children, title = "Request Details", width = "max-w-lg" }) => {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${width} overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-[#F1F3F5] px-6 py-4">
          <h3 className="text-base font-bold text-[#111827]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#FFF4F5] hover:text-[#D62839]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-[#111827]">{request.id}</h3>
                <p className="text-sm text-[#64748B]">
                  Recipient: {request.recipientName || request.patient}
                </p>
              </div>
              <StatusBadge status={request.status.toLowerCase()} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Blood Group</p>
                <p className="mt-1 inline-flex rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-black text-[#D62839]">
                  {request.bloodGroup}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Units Required</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">{request.units}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Hospital</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">{request.hospitalName || request.hospital}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Location</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {request.location || request.address}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Required Date</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">
                  {request.requiredDate ? new Date(request.requiredDate).toLocaleDateString() : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#94A3B8]">Urgency</p>
                <p className="mt-1">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${getUrgencyStyle(
                      request.urgency
                    )}`}
                  >
                    {request.urgency}
                  </span>
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-bold text-[#94A3B8]">Contact</p>
                <p className="mt-1 text-sm font-semibold text-[#111827]">{request.contact || request.requesterName}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-bold text-[#94A3B8]">Description</p>
                <p className="mt-1 text-sm text-[#64748B]">{request.description || request.message}</p>
              </div>
            </div>

            {children && <div className="flex flex-wrap gap-3 pt-2">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestModal;
