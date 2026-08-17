"use client";

import { useMemo, useState, useEffect } from "react";
import {
  ChevronDown,
  Droplets,
  MapPin,
  Search,
  UsersRound,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
} from "lucide-react";

import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";

const districts = districtsData[2]?.data || [];
const upazilas = upazilasData[2]?.data || [];

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const DONORS_PER_PAGE = 9;

const SearchDonorsPage = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [donors, setDonors] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const fetchDonors = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/api/donors`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch donors");
        }

        const result = await res.json();

        if (result.success !== true || !Array.isArray(result.data)) {
          throw new Error("Invalid API response");
        }

        if (isMounted) {
          setDonors(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch donors:", err);
        if (isMounted) {
          setError(err.message || "Failed to fetch donors");
        }
      } finally {
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    fetchDonors();

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedDonors = useMemo(() => {
    return donors
      .filter((donor) => donor.role === "donor")
      .map((donor) => ({
        id: donor._id || donor.id,
        name: donor.name,
        bloodGroup: donor.bloodGroup,
        district: donor.district,
        upazila: donor.upazila,
        email: donor.email,
        phoneNumber: donor.phoneNumber,
        status: donor.status,
        image: donor.image,
        role: donor.role,
      }));
  }, [donors]);

  const selectedDistrict = useMemo(() => {
    return districts.find(
      (item) => String(item.id) === String(district)
    );
  }, [district]);

  const filteredUpazilas = useMemo(() => {
    if (!district) return [];

    return upazilas.filter(
      (item) =>
        String(item.district_id) === String(district)
    );
  }, [district]);

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setUpazila("");
    setHasSearched(false);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setHasSearched(true);
  };

  const matchedDonors = useMemo(() => {
    if (!hasSearched || !isInitialized) return [];

    return normalizedDonors.filter((donor) => {
      const matchesBlood = !bloodGroup || donor.bloodGroup === bloodGroup;
      const matchesDistrict = !district || donor.district === selectedDistrict?.name;
      const selectedUpazila = filteredUpazilas.find(
        (item) => String(item.id) === String(upazila)
      );
      const matchesUpazila = !upazila || donor.upazila === selectedUpazila?.name;
      return matchesBlood && matchesDistrict && matchesUpazila;
    });
  }, [bloodGroup, district, upazila, hasSearched, normalizedDonors, isInitialized, selectedDistrict, filteredUpazilas]);

  const totalPages = Math.ceil(matchedDonors.length / DONORS_PER_PAGE);
  const startIndex = (currentPage - 1) * DONORS_PER_PAGE;
  const paginatedDonors = matchedDonors.slice(
    startIndex,
    startIndex + DONORS_PER_PAGE
  );

  const visiblePages = useMemo(() => {
    const maxVisible = 5;
    const pages = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }, [totalPages, currentPage]);

  return (
    <main className="min-h-screen bg-[#FFF9FA]">

      {/* =====================================================
          HERO / SEARCH SECTION
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200/70 bg-white">

        {/* Premium Background */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-[#FDECEF]/70 blur-3xl" />

          <div className="absolute -left-40 bottom-[-260px] h-[500px] w-[500px] rounded-full bg-[#FFF0F2]/80 blur-3xl" />

          <div className="absolute right-[22%] top-[35%] h-32 w-32 rounded-full bg-[#D62839]/5 blur-3xl" />

          <div className="absolute left-[42%] top-20 h-20 w-20 rounded-full bg-[#FDECEF]/60 blur-2xl" />

        </div>

        {/* Main Container */}

        <div className="relative mx-auto max-w-[1280px] px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-14">

          {/* =================================================
              TOP BADGE
          ================================================= */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F3CBD1] bg-white/90 px-3.5 py-1.5 shadow-[0_5px_20px_rgba(214,40,57,0.07)] backdrop-blur-sm">

            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF0F2]">
              <Droplets
                size={12}
                className="text-[#D62839]"
                fill="currentColor"
              />
            </span>

            <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#D62839]">
              Donor Directory
            </span>

          </div>

          {/* =================================================
              HEADING
          ================================================= */}

          <h1 className="max-w-[760px] text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl">

            Find a Donor When It{" "}

            <span className="text-[#D62839]">
              Matters.
            </span>

          </h1>

          <p className="mt-4 max-w-[700px] text-sm leading-6 text-slate-500 sm:text-base">
            Search for available blood donors by blood group and location.
            Connect with people who are ready to help when it matters most.
          </p>

          {/* =================================================
              SEARCH CARD
          ================================================= */}

          <form
            onSubmit={handleSearch}
            className="relative mt-9 overflow-hidden rounded-[26px] border border-slate-200/90 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.075)]"
          >

            {/* Top Accent */}

            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#A4161A] via-[#D62839] to-[#F21D3B]" />

            {/* Inner Glow */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white to-[#FFF9FA]" />

            <div className="relative p-5 sm:p-6">

              {/* Search Header */}

              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839]">
                    <Search size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-slate-900">
                      Search Blood Donors
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Find available donors in your area
                    </p>
                  </div>

                </div>

                <div className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  <span className="text-[10px] font-bold text-emerald-600">
                    Donor network active
                  </span>
                </div>

              </div>

              {/* Search Fields */}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">

                {/* =================================================
                    BLOOD GROUP
                ================================================= */}

                <div>

                  <label
                    htmlFor="bloodGroup"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Blood Group
                  </label>

                  <div className="group relative">

                    <div className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-[#FFF0F2] text-[#D62839]">
                      <Droplets size={13} fill="currentColor" />
                    </div>

                    <select
                      id="bloodGroup"
                      value={bloodGroup}
                      onChange={(e) => {
                        setBloodGroup(e.target.value);
                        setHasSearched(false);
                        setCurrentPage(1);
                      }}
                      className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-12 pr-10 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF]"
                    >

                      <option value="">
                        Any group
                      </option>

                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}

                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                  </div>

                </div>

                {/* =================================================
                    DISTRICT
                ================================================= */}

                <div>

                  <label
                    htmlFor="district"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    District
                  </label>

                  <div className="group relative">

                    <div className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                      <MapPin size={13} />
                    </div>

                    <select
                      id="district"
                      value={district}
                      onChange={handleDistrictChange}
                      className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-12 pr-10 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF]"
                    >

                      <option value="">
                        Any district
                      </option>

                      {districts.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}

                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                  </div>

                </div>

                {/* =================================================
                    UPAZILA
                ================================================= */}

                <div>

                  <label
                    htmlFor="upazila"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Upazila
                  </label>

                  <div className="group relative">

                    <div
                      className={`pointer-events-none absolute left-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md ${
                        district
                          ? "bg-slate-100 text-slate-500"
                          : "bg-slate-100 text-slate-300"
                      }`}
                    >
                      <MapPin size={13} />
                    </div>

                    <select
                      id="upazila"
                      value={upazila}
                      onChange={(e) => {
                        setUpazila(e.target.value);
                        setHasSearched(false);
                        setCurrentPage(1);
                      }}
                      disabled={!district}
                      className={`h-12 w-full appearance-none rounded-xl border pl-12 pr-10 text-sm font-medium outline-none transition-all duration-200 ${
                        district
                          ? "cursor-pointer border-slate-200 bg-slate-50/70 text-slate-600 hover:border-slate-300 hover:bg-white focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF]"
                          : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400"
                      }`}
                    >

                      <option value="">
                        {district
                          ? "Any upazila"
                          : "Choose district first"}
                      </option>

                      {filteredUpazilas.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}

                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                  </div>

                </div>

                {/* =================================================
                    SEARCH BUTTON
                ================================================= */}

                <button
                  type="submit"
                  className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#A4161A] via-[#D62839] to-[#E12D3B] px-7 text-sm font-bold text-white shadow-[0_10px_25px_rgba(214,40,57,0.23)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(214,40,57,0.28)] active:translate-y-0 active:scale-[0.98]"
                >

                  <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                  <Search
                    size={17}
                    className="relative transition-transform duration-200 group-hover:scale-110"
                  />

                  <span className="relative">
                    Search Donors
                  </span>

                  <ArrowRight
                    size={15}
                    className="relative transition-transform duration-200 group-hover:translate-x-0.5"
                  />

                </button>

              </div>

              {/* Bottom Hint */}

              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">

                <ShieldCheck
                  size={14}
                  className="text-emerald-500"
                />

                <p className="text-[11px] font-medium text-slate-400">
                  Search results only show donors who are available to help.
                </p>

              </div>

            </div>

          </form>

        </div>
      </section>

      {/* =====================================================
          RESULTS SECTION
      ====================================================== */}

      <section className="min-h-[360px] bg-[#F8FAFC]">

        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

          {!hasSearched ? (

            /* =================================================
                START SEARCH
            ================================================== */

            <div className="relative flex min-h-[290px] items-center justify-center overflow-hidden rounded-[26px] border border-slate-200/80 bg-white px-6 py-12 shadow-[0_12px_40px_rgba(15,23,42,0.045)]">

              {/* Decorative Background */}

              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#FDECEF]/70 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-28 -left-20 h-52 w-52 rounded-full bg-[#FFF0F2] blur-3xl" />

              <div className="pointer-events-none absolute right-[25%] top-10 h-16 w-16 rounded-full bg-[#D62839]/5 blur-xl" />

              <div className="relative text-center">

                {/* Icon */}

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-[#F4D2D7] bg-gradient-to-br from-[#FFF4F5] to-[#FDECEF] text-[#D62839] shadow-[0_10px_25px_rgba(214,40,57,0.10)]">

                  <UsersRound size={27} />

                </div>

                {/* Title */}

                <h2 className="mt-5 text-base font-black text-slate-900">
                  Start your search
                </h2>

                <p className="mx-auto mt-2 max-w-[430px] text-sm leading-6 text-slate-500">
                  Choose a blood group and location above.
                  We&apos;ll show donors who match your search
                  and are available to help.
                </p>

                {/* Hint */}

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-[11px] font-semibold text-slate-400">

                  <Sparkles
                    size={12}
                    className="text-[#D62839]"
                  />

                  Find help. Give hope.

                </div>

              </div>

            </div>

          ) : (
            <div className="relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] sm:p-7">

              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D62839]/50 to-transparent" />

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-[#D62839]" />

                    <p className="text-xs font-bold uppercase tracking-wider text-[#D62839]">
                      Search Results
                    </p>

                  </div>

                   <h2 className="mt-1 text-xl font-black text-slate-900">
                     Available Blood Donors
                   </h2>

                   <p className="mt-1 text-xs text-slate-400">
                     {matchedDonors.length} donors found
                   </p>

                </div>

                <div className="flex flex-wrap items-center gap-2">

                  {bloodGroup && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F5D0D5] bg-[#FFF3F4] px-3 py-1.5 text-xs font-bold text-[#D62839]">
                      <Droplets size={12} fill="currentColor" />
                      {bloodGroup}
                    </span>
                  )}

                  {selectedDistrict && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                      <MapPin size={12} />
                      {selectedDistrict.name}
                    </span>
                  )}

                  {upazila && (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                      {
                        filteredUpazilas.find(
                          (item) =>
                            String(item.id) === String(upazila)
                        )?.name
                      }
                    </span>
                  )}

                </div>

              </div>

              {error ? (
                <div className="mt-7 flex min-h-[210px] items-center justify-center rounded-[20px] border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-white">
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-500">
                      Failed to load donors
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Please try again later.
                    </p>
                  </div>
                </div>
              ) : !isInitialized ? (
                <div className="mt-7 flex min-h-[210px] items-center justify-center rounded-[20px] border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-white">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D62839] border-t-transparent" />
                </div>
              ) : matchedDonors.length === 0 ? (
                <div className="mt-7 flex min-h-[210px] items-center justify-center rounded-[20px] border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-white">

                  <div className="text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-300 shadow-sm">
                      <UsersRound size={25} />
                    </div>

                    <p className="mt-4 text-sm font-bold text-slate-500">
                      No donors found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try adjusting your search criteria.
                    </p>

                  </div>

                </div>
              ) : (
              <div>
                <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
  {paginatedDonors.map((donor) => (
    <div
      key={donor.id}
      className="group relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F1C7CD] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
    >
      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#A4161A] via-[#D62839] to-[#F21D3B] opacity-70 transition-opacity group-hover:opacity-100" />

      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {/* Blood Group Badge */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A4161A] via-[#D62839] to-[#F21D3B] text-white shadow-[0_8px_20px_rgba(214,40,57,0.22)]">
            <Droplets
              size={17}
              fill="currentColor"
              className="absolute left-2.5 top-2.5 opacity-30"
            />

            <span className="relative text-lg font-black tracking-tight">
              {donor.bloodGroup}
            </span>
          </div>

          {/* Name */}
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-extrabold text-slate-900">
              {donor.name}
            </h3>

            <p className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Blood Donor
            </p>
          </div>
        </div>

        {/* Status */}
        <span
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${
            donor.status?.toLowerCase() === "active"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              donor.status?.toLowerCase() === "active"
                ? "bg-emerald-500"
                : "bg-slate-400"
            }`}
          />

          {donor.status || "Unknown"}
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-slate-100" />

      {/* Donor Information */}
      <div className="space-y-3">
        {/* Blood Group */}
        <div className="flex items-center justify-between rounded-xl bg-[#FFF8F9] px-3.5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF0F2] text-[#D62839]">
              <Droplets size={15} fill="currentColor" />
            </div>

            <span className="text-xs font-medium text-slate-500">
              Blood Group
            </span>
          </div>

          <span className="text-sm font-black text-[#D62839]">
            {donor.bloodGroup}
          </span>
        </div>

        {/* District */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <MapPin size={14} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              District
            </p>

             <p className="truncate text-xs font-bold text-slate-700">
               {donor.district || "Not available"}
             </p>
          </div>
        </div>

        {/* Upazila */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <MapPin size={14} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Upazila
            </p>

             <p className="truncate text-xs font-bold text-slate-700">
               {donor.upazila || "Not available"}
             </p>
          </div>
        </div>
      </div>

      {/* Contact Button */}
      {/* <div className="mt-5">
        {donor.phoneNumber ? (
          <a
            href={`tel:${donor.phoneNumber}`}
            className="group/button flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A4161A] via-[#D62839] to-[#E12D3B] text-xs font-bold text-white shadow-[0_8px_20px_rgba(214,40,57,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(214,40,57,0.25)] active:translate-y-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>

            <span>Contact Donor</span>

            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover/button:translate-x-0.5"
            />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-400"
          >
            Contact Unavailable
          </button>
        )}
      </div> */}
      {/* Contact Actions */}
<div className="mt-5 flex items-center gap-2">
  {/* Contact Now */}
  <button
    type="button"
    className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A4161A] via-[#D62839] to-[#E12D3B] text-xs font-bold text-white shadow-[0_8px_20px_rgba(214,40,57,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(214,40,57,0.25)] active:translate-y-0 active:scale-[0.98]"
  >
    

    <Heart
      size={18}
      strokeWidth={2}
    />
    <span>Contact Now</span>
  </button>

  
</div>
    </div>
  ))}
</div>

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center">
                    <nav className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`flex h-9 px-4 items-center justify-center rounded-full border text-xs font-bold ${
                          currentPage === 1
                            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                            : "border-slate-200 bg-white text-slate-600 hover:border-[#D62839] hover:bg-[#FFF0F2] hover:text-[#D62839]"
                        }`}
                      >
                        Previous
                      </button>

                      {visiblePages.map((page, idx) =>
                        page === "..." ? (
                          <span
                            key={`ellipsis-${idx}`}
                            className="flex h-9 w-9 items-center justify-center text-xs font-bold text-slate-400"
                          >
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-bold ${
                              currentPage === page
                                ? "border-[#D62839] bg-[#D62839] text-white"
                                : "border-slate-200 bg-white text-slate-600 hover:border-[#D62839] hover:bg-[#FFF0F2] hover:text-[#D62839]"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className={`flex h-9 w-12 items-center justify-center rounded-xl border text-xs font-bold ${
                          currentPage === totalPages
                            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                            : "border-slate-200 bg-white text-slate-600 hover:border-[#D62839] hover:bg-[#FFF0F2] hover:text-[#D62839]"
                        }`}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </div>
              )}

            </div>
          )}

        </div>

      </section>

    </main>
  );
};

export default SearchDonorsPage;
