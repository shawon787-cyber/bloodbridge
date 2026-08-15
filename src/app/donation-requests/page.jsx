"use client";

import { useMemo } from "react";
import DonationRequestHero from "@/Components/DonationRequestHero";
import RequestCard from "@/Components/shared/RequestCard";
import { useDonationRequests } from "@/context/DonationRequestContext";

export default function DonationRequestsPage() {
  const { requests, isInitialized } = useDonationRequests();

  const normalizedRequests = useMemo(() => {
    return requests.map((req) => ({
      id: req.id,
      bloodGroup: req.bloodGroup,
      name: req.recipientName || req.name,
      location: req.address || req.location,
      hospital: req.hospitalName || req.hospital,
      units: req.units,
      date: req.donationDate || req.date,
      time: req.donationTime || req.time,
      status: req.status,
    }));
  }, [requests]);

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
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {normalizedRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
