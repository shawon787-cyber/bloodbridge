"use client";

import { useMemo, useState, useEffect } from "react";
import DonationRequestHero from "@/Components/DonationRequestHero";
import RequestCard from "@/Components/shared/RequestCard";
import LatestPendingRequests from "@/Components/LatestPendingRequests";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2, MapPin, HeartPulse, CalendarDays, Clock3 } from "lucide-react";
import { normalizeStatusForCompare, getStatusDisplayLabel } from "@/lib/donationRequests";
import { toast } from "sonner";

export default function DonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    let isMounted = true;

    const fetchRequests = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/api/donation-requests`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch donation requests");
        }

        const result = await res.json();

        if (isMounted && result.success && Array.isArray(result.data)) {
          setRequests(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch donation requests:", error);
        if (isMounted) {
          setRequests([]);
        }
      } finally {
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    fetchRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedRequests = useMemo(() => {
    return requests.map((req) => {
      const rawUnits = req.units;
      let normalizedUnits = "1";
      if (typeof rawUnits === "number") {
        normalizedUnits = String(rawUnits);
      } else if (typeof rawUnits === "string") {
        const match = rawUnits.match(/(\d+)/);
        normalizedUnits = match ? match[1] : "1";
      }

      const requestId =
        typeof req._id === "object"
          ? req._id.toString()
          : String(req._id || req.id || req.requestId);

      return {
        id: requestId,
        bloodGroup: req.bloodGroup,
        name: req.recipientName || req.name,
        location: req.address || req.location,
        hospital: req.hospitalName || req.hospital,
        units: normalizedUnits,
        date: req.donationDate || req.date,
        time: req.donationTime || req.time,
        status: req.status,
        _original: req,
      };
    });
  }, [requests]);

  const pendingRequests = useMemo(() => {
    return normalizedRequests.filter((req) => normalizeStatusForCompare(req.status) === "pending");
  }, [normalizedRequests]);

  const totalPages = Math.max(1, Math.ceil(pendingRequests.length / ITEMS_PER_PAGE));

  const currentRequests = pendingRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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
    if (currentPage > 3) pages.push("...");
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <main>
      <DonationRequestHero />

      <div className="relative bg-[#FFF9FA] pb-12">

        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#FDECEF] blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#FBE5E9] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {!isInitialized ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D62839] border-t-transparent" />
            </div>
          ) : pendingRequests.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm font-medium text-slate-500">No pending donation requests found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {currentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="group relative overflow-hidden rounded-[24px] border border-[#F0DDDF] bg-white shadow-[0_8px_30px_rgba(185,28,28,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E8BBC1] hover:shadow-[0_18px_40px_rgba(185,28,28,0.10)]"
                  >
                    <div className="absolute inset-x-0 top-0 h-[86px] bg-[#FFF7F8]" />

                    <div className="relative p-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#D97706]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
                          {request.status}
                        </span>
                        <span className="text-[9px] font-medium text-[#A0A0A0]">
                          #{request.id}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-lg font-black text-[#D62839] shadow-[0_8px_20px_rgba(185,28,28,0.10)] ring-1 ring-[#F4E1E3] transition-transform duration-300 group-hover:scale-105">
                          {request.bloodGroup}
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-extrabold text-[#171717]">
                            {request.name}
                          </h3>
                          <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#A0A0A0]">
                            Blood Recipient
                          </p>
                        </div>
                      </div>

                      <div className="my-5 h-px bg-[#F1E5E7]" />

                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF0F2] text-[#D62839]">
                          <MapPin size={14} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#A3A3A3]">
                            Location
                          </p>
                          <p className="mt-0.5 truncate text-xs font-semibold text-[#444444]">
                            {request.location}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF0F2] text-[#D62839]">
                          <HeartPulse size={14} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#A3A3A3]">
                            Hospital
                          </p>
                          <p className="mt-0.5 truncate text-xs font-semibold text-[#444444]">
                            {request.hospital}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between rounded-xl bg-[#FFF9FA] px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={14} className="text-[#D62839]" />
                          <span className="text-[10px] font-semibold text-[#555555]">
                            {request.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock3 size={13} className="text-[#D62839]" />
                          <span className="text-[10px] font-semibold text-[#555555]">
                            {request.time}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#333333]">
                          {request.units}
                        </span>
                        <span className="text-[9px] text-[#999999]">
                          Needs a donor
                        </span>
                      </div>

                      <Link
                        href={`/donation-requests/${request.id}`}
                        className="group/button mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D62839] py-3 text-xs font-bold text-white transition-all duration-300 hover:bg-[#B91C2C] hover:shadow-[0_8px_20px_rgba(214,40,57,0.20)]"
                      >
                        <CheckCircle2 size={14} />
                        Respond to Request
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-1.5">
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
                    if (page === "...") {
                      return (
                        <span
                          key={`dots-${index}`}
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
              )}
            </>
          )}

        </div>
      </div>
    </main>
  );
}
