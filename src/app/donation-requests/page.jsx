"use client";

import { useMemo, useState, useEffect } from "react";
import DonationRequestHero from "@/Components/DonationRequestHero";
import RequestCard from "@/Components/shared/RequestCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

      return {
        id: req._id || req.id || req.requestId,
        bloodGroup: req.bloodGroup,
        name: req.recipientName || req.name,
        location: req.address || req.location,
        hospital: req.hospitalName || req.hospital,
        units: normalizedUnits,
        date: req.donationDate || req.date,
        time: req.donationTime || req.time,
        status: req.status,
      };
    });
  }, [requests]);

  const totalPages = Math.max(1, Math.ceil(normalizedRequests.length / ITEMS_PER_PAGE));

  const currentRequests = normalizedRequests.slice(
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
          ) : normalizedRequests.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm font-medium text-slate-500">No donation requests found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {currentRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                  />
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
