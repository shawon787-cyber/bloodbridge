"use client";

import { useState, useEffect } from "react";
import RequestCard from "@/Components/shared/RequestCard";
import { normalizeStatusForCompare, getLatestRequests } from "@/lib/donationRequests";

const LatestPendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      } catch (err) {
        if (isMounted) {
          setError("Unable to load requests. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const latestPendingRequests = getLatestRequests(
    requests.filter((request) => {
      const status = normalizeStatusForCompare(request.status);
      return status === "pending";
    }),
    3
  );

  return (
    <section className="relative bg-[#FFF9FA] py-12 lg:py-16">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#FDECEF] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#FBE5E9] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        

        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D62839] border-t-transparent" />
          </div>
        ) : error ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm font-medium text-[#D62839]">{error}</p>
          </div>
        ) : latestPendingRequests.length === 0 ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm font-medium text-slate-500">
              No pending blood requests at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestPendingRequests.map((request) => {
              const requestId =
                typeof request._id === "object"
                  ? request._id.toString()
                  : String(request._id || request.id || request.requestId);

              return (
                <RequestCard
                  key={requestId}
                  request={request}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestPendingRequests;
