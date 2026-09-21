"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Heart,
  WalletCards,
  Users,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { apiFetchJSON } from "@/lib/api";
import Modal from "@/Components/dashboard/shared/Modal";

const ITEMS_PER_PAGE = 5;

export default function FundingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verificationHandled = useRef("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  const closeFundModal = () => {
    if (isCreatingCheckout) return;
    setIsFundModalOpen(false);
    setDonorName("");
    setFundAmount("");
  };

  const handleCreateCheckout = async (event) => {
    event.preventDefault();

    const trimmedName = donorName.trim();
    const amountNumber = Number(fundAmount);

    if (!trimmedName) {
      toast.error("Please enter your name.");
      return;
    }

    if (!fundAmount.trim() || !Number.isFinite(amountNumber) || amountNumber <= 0) {
      toast.error("Please enter a valid amount greater than zero.");
      return;
    }

    try {
      setIsCreatingCheckout(true);

      const response = await apiFetchJSON("/api/funding/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({
          name: trimmedName,
          amount: amountNumber,
        }),
      });

      if (!response?.success || !response?.url) {
        throw new Error(response?.message || "Unable to start payment.");
      }

      window.location.href = response.url;
    } catch (error) {
      toast.error(error.message || "Unable to start payment.");
      setIsCreatingCheckout(false);
    }
  };

  const fetchFunding = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetchJSON("/api/funding");
      if (data?.success && Array.isArray(data.data)) {
        setRecords(data.data.map((record) => ({
          id: record._id || record.id,
          name: record.name || record.userName || "Anonymous",
          image: record.image || record.userImage || "",
          amount: record.amount || 0,
          date: record.createdAt || record.date || "",
        })));
      } else {
        setRecords([]);
      }
    } catch (err) {
      setError(err.message || "Failed to load funding records.");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadFunding = async () => {
      await fetchFunding();
    };

    loadFunding();
  }, [fetchFunding]);

  useEffect(() => {
    const payment = searchParams.get("payment");
    const sessionId = searchParams.get("session_id");
    const handlingKey = `${payment || ""}:${sessionId || ""}`;

    if (!payment || verificationHandled.current === handlingKey) return;
    verificationHandled.current = handlingKey;

    const cleanUrl = () => {
      router.replace("/funding", { scroll: false });
    };

    if (payment === "cancelled") {
      toast.info("Payment was cancelled. No fund was added.");
      cleanUrl();
      return;
    }

    if (payment !== "success") {
      cleanUrl();
      return;
    }

    if (!sessionId) {
      toast.error("We couldn't verify the payment yet. Please try again.");
      cleanUrl();
      return;
    }

    const verifyPayment = async () => {
      try {
        const result = await apiFetchJSON(
          `/api/funding/verify-session/${encodeURIComponent(sessionId)}`
        );

        if (result?.success && result.paid === true && result.status === "paid") {
          toast.success("Fund payment successful. Thank you for supporting BloodBridge!");
          await fetchFunding();
        } else if (result?.success && result.paid === false) {
          toast.info("Payment is still being confirmed. Please check again shortly.");
        } else {
          toast.error("We couldn't verify the payment yet. Please try again.");
        }
      } catch {
        toast.error("We couldn't verify the payment yet. Please try again.");
      } finally {
        cleanUrl();
      }
    };

    verifyPayment();
  }, [fetchFunding, router, searchParams]);

  const totalFunding = useMemo(() => {
    return records.reduce((total, record) => total + (record.amount || 0), 0);
  }, [records]);

  const totalSupporters = records.length;

  const averageContribution =
    totalSupporters > 0
      ? Math.round(totalFunding / totalSupporters)
      : 0;

  const totalPages = Math.max(1, Math.ceil(records.length / ITEMS_PER_PAGE));

  const currentRecords = records.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =====================================================
          PREMIUM HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* Background decorations */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#D62839]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#FDECEF] blur-3xl" />

        <div className="pointer-events-none absolute right-[18%] top-20 h-2 w-2 rounded-full bg-[#D62839]/40" />

        <div className="pointer-events-none absolute right-[12%] top-36 h-1.5 w-1.5 rounded-full bg-[#D62839]/30" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px]">
            {/* Hero Content */}
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F5C8CE] bg-[#FFF7F8] px-3.5 py-1.5 shadow-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D62839] text-white">
                  <Heart size={10} fill="currentColor" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D62839]">
                  Community Funding
                </span>
              </div>

              {/* Heading */}
              <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.04] tracking-[-0.04em] text-[#0F172A] sm:text-5xl lg:text-[58px]">
                Together, We Can
                <span className="block text-[#D62839]">
                  Save More Lives.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#64748B] sm:text-[15px]">
                Your contribution helps BloodBridge maintain a
                reliable blood donation network, support emergency
                responses, and make life-saving assistance available
                when it matters most.
              </p>

              {/* CTA */}
              {/* <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-2 text-xs font-medium text-[#64748B]">
                  <ShieldCheck
                    size={16}
                    className="text-[#D62839]"
                  />
                  Transparent community support
                </div>
              </div> */}
              
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsFundModalOpen(true)}
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-[#D62839] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#D62839]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A4161A] hover:shadow-xl hover:shadow-[#D62839]/25 active:translate-y-0"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 transition-transform duration-300 group-hover:scale-110">
                    <Heart size={15} fill="currentColor" strokeWidth={2.2} />
                  </span>

                  <span>Give Fund</span>

                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>


              </div>
            </div>

            {/* Hero Side Card */}
            <div className="relative hidden lg:block">
              <div className="relative overflow-hidden rounded-3xl border border-[#F1D9DD] bg-gradient-to-br from-[#FFF7F8] via-white to-[#FDECEF] p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#D62839]/10" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D62839] text-white shadow-lg shadow-[#D62839]/20">
                    <Heart size={18} strokeWidth={2.2} />
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[#94A3B8]">
                    Community Impact
                  </p>

                  <p className="mt-2 text-3xl font-black tracking-tight text-[#0F172A]">
                    {loading ? "Loading..." : formatCurrency(totalFunding)}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#64748B]">
                    Total contributions from our community so far.
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-[#E2E8F0] pt-5">
                    <div className="flex -space-x-2">
                      {records
                        .slice(0, 4)
                        .map((record) => (
                          <div
                            key={record.id}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#FDECEF] text-[9px] font-bold text-[#D62839]"
                          >
                            {getInitials(record.name)}
                          </div>
                        ))}
                    </div>

                    <p className="text-[11px] font-medium text-[#64748B]">
                      Supported by{" "}
                      <span className="font-bold text-[#0F172A]">
                        {totalSupporters} people
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <section className="bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {/* =================================================
              STAT CARDS
          ================================================== */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Total Funding */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#FDECEF] blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">
                    Total Funding
                  </p>

                  <p className="mt-2 text-2xl font-black tracking-tight text-[#0F172A]">
                    {loading ? "Loading..." : formatCurrency(totalFunding)}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
                    <TrendingUp size={12} />
                    Community supported
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839] transition-transform duration-300 group-hover:scale-105">
                  <WalletCards size={19} />
                </div>
              </div>
            </div>

            {/* Supporters */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#FDECEF] blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">
                    Supporters
                  </p>

                  <p className="mt-2 text-2xl font-black tracking-tight text-[#0F172A]">
                    {loading ? "Loading..." : totalSupporters}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-[#64748B]">
                    <Users size={12} />
                    Community members
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839] transition-transform duration-300 group-hover:scale-105">
                  <Users size={19} />
                </div>
              </div>
            </div>

            {/* Average */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#FDECEF] blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">
                    Average Contribution
                  </p>

                  <p className="mt-2 text-2xl font-black tracking-tight text-[#0F172A]">
                    {loading ? "Loading..." : formatCurrency(averageContribution)}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-[#64748B]">
                    <Sparkles size={12} />
                    Per supporter
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839] transition-transform duration-300 group-hover:scale-105">
                  <TrendingUp size={19} />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RECORDS CARD
          ================================================== */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            {/* Header */}
            <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FDECEF] text-[#D62839]">
                    <Heart size={15} strokeWidth={2.2} />
                  </div>

                  <h2 className="text-sm font-black text-[#0F172A]">
                    Funding Records
                  </h2>
                </div>

                <p className="mt-1 pl-10 text-[10px] text-[#94A3B8]">
                  Recent contributions from the BloodBridge community
                </p>
              </div>

              <div className="self-start rounded-full bg-[#F8FAFC] px-3 py-1.5 text-[10px] font-bold text-[#64748B]">
                {loading ? "Loading..." : `${records.length} contributions`}
              </div>
            </div>

            {error && (
              <div className="px-5 py-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-[#FAFBFC]">
                    <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                      Supporter
                    </th>

                    <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                      Contribution
                    </th>

                    <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                      Date
                    </th>

                    <th className="px-6 py-3 text-right text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-xs text-[#94A3B8]">
                        Loading records...
                      </td>
                    </tr>
                  ) : currentRecords.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-xs text-[#94A3B8]">
                        No funding records found.
                      </td>
                    </tr>
                  ) : (
                    currentRecords.map((record) => (
                      <tr
                        key={record.id}
                        className="group border-b border-slate-100 last:border-b-0 transition-colors hover:bg-[#FFF9FA]"
                      >
                        {/* User */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#F3D7DC] bg-[#FDECEF] text-[10px] font-black text-[#D62839]">
                              {record.image ? (
                                <img
                                  src={record.image}
                                  alt={record.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                getInitials(record.name)
                              )}
                            </div>

                            <div>
                              <p className="text-xs font-bold text-[#0F172A]">
                                {record.name}
                              </p>

                              <p className="mt-0.5 text-[9px] text-[#94A3B8]">
                                BloodBridge Supporter
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-lg bg-[#FFF3F5] px-2.5 py-1.5 text-[11px] font-black text-[#D62839]">
                            {formatCurrency(record.amount)}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <span className="text-[11px] font-medium text-[#64748B]">
                            {formatDate(record.date)}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Verified
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-slate-100 md:hidden">
              {loading ? (
                <div className="px-4 py-8 text-center text-xs text-[#94A3B8]">
                  Loading records...
                </div>
              ) : currentRecords.length === 0 ? (
                <div className="px-4 py-8 text-center text-xs text-[#94A3B8]">
                  No funding records found.
                </div>
              ) : (
                currentRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-[#FFF9FA]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#F3D7DC] bg-[#FDECEF] text-[10px] font-black text-[#D62839]">
                        {record.image ? (
                          <img
                            src={record.image}
                            alt={record.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          getInitials(record.name)
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-[#0F172A]">
                          {record.name}
                        </p>

                        <p className="mt-1 text-[9px] text-[#94A3B8]">
                          {formatDate(record.date)}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xs font-black text-[#D62839]">
                        {formatCurrency(record.amount)}
                      </p>

                      <span className="mt-1 inline-flex items-center gap-1 text-[8px] font-bold text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Verified
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {!loading && records.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-between border-t border-slate-100 bg-[#FAFBFC] px-4 py-3.5 sm:px-6">
                <p className="text-[10px] font-medium text-[#94A3B8]">
                  Showing{" "}
                  <span className="font-bold text-[#64748B]">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  -{" "}
                  <span className="font-bold text-[#64748B]">
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      records.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-[#64748B]">
                    {records.length}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.max(prev - 1, 1)
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#64748B] transition-all hover:border-[#D62839] hover:text-[#D62839] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#D62839] px-2 text-[10px] font-bold text-white shadow-sm">
                    {currentPage}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#64748B] transition-all hover:border-[#D62839] hover:text-[#D62839] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Modal
        isOpen={isFundModalOpen}
        onClose={closeFundModal}
        title="Give Fund"
        width="max-w-md"
      >
        <form onSubmit={handleCreateCheckout} className="space-y-5">
          <div>
            <label
              htmlFor="donor-name"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#64748B]"
            >
              Your name
            </label>
            <input
              id="donor-name"
              type="text"
              value={donorName}
              onChange={(event) => setDonorName(event.target.value)}
              placeholder="Your name"
              disabled={isCreatingCheckout}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#D62839] focus:ring-4 focus:ring-[#FDECEF] disabled:bg-slate-50"
            />
          </div>

          <div>
            <label
              htmlFor="fund-amount"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-[#64748B]"
            >
              Amount in USD
            </label>
            <div className="relative">
              <input
                id="fund-amount"
                type="number"
                min="0.01"
                step="0.01"
                value={fundAmount}
                onChange={(event) => setFundAmount(event.target.value)}
                placeholder="10"
                disabled={isCreatingCheckout}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-16 text-sm text-[#0F172A] outline-none transition focus:border-[#D62839] focus:ring-4 focus:ring-[#FDECEF] disabled:bg-slate-50"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-bold text-[#D62839]">
                USD
              </span>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeFundModal}
              disabled={isCreatingCheckout}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-[#64748B] transition hover:border-[#D62839] hover:text-[#D62839] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreatingCheckout}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D62839] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#D62839]/20 transition hover:bg-[#A4161A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Heart size={15} fill="currentColor" />
              {isCreatingCheckout ? "Creating payment..." : "Continue to Payment"}
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
}
