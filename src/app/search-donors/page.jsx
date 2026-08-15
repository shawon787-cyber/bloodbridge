"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  Droplets,
  MapPin,
  Search,
  UsersRound,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Phone,
  UserPlus,
} from "lucide-react";

import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";
import { useDonors } from "@/context/DonorContext";

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

const SearchDonorsPage = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const { donors, isInitialized } = useDonors();

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
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const matchedDonors = useMemo(() => {
    if (!hasSearched || !isInitialized) return [];

    return donors.filter((donor) => {
      const matchesBlood = !bloodGroup || donor.bloodGroup === bloodGroup;
      const matchesDistrict = !district || donor.location === selectedDistrict?.name || donor.district === district;
      const matchesUpazila = !upazila || donor.upazila === upazila;
      return matchesBlood && matchesDistrict && matchesUpazila;
    });
  }, [bloodGroup, district, upazila, hasSearched, donors, isInitialized, selectedDistrict]);

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
                    Donors matching your selected criteria
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

              {!isInitialized ? (
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
                      No donor results available yet
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Connect your donor collection or API here.
                    </p>

                  </div>

                </div>
              ) : (
                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {matchedDonors.map((donor) => (
                    <div
                      key={donor.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FDECEF] text-lg font-black text-[#D62839]">
                          {donor.bloodGroup}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900">
                            {donor.name}
                          </p>

                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A0A0A0]">
                            {donor.id}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <MapPin size={13} className="text-[#D62839]" />
                          {donor.location}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Phone size={13} className="text-[#D62839]" />
                          {donor.phone}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Droplets size={13} className="text-[#D62839]" />
                          {donor.bloodGroup}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          donor.availability === "Available"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {donor.availability}
                        </span>

                        <span className="text-[10px] text-slate-400">
                          Last donation: {new Date(donor.lastDonation).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
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
