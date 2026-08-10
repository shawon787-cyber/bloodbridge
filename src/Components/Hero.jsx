"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Droplet,
  HeartPulse,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-red-50/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">

        {/* ================= TOP BADGE ================= */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/70 px-4 py-2 text-xs font-semibold text-[#D62839] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D62839] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D62839]" />
            </span>

            Bangladesh's Blood Donation Network
          </div>
        </div>

        {/* ================= MAIN HEADING ================= */}
        <div className="mx-auto mt-7 max-w-4xl text-center">

          <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl">
            The right donor.
            <br />

            <span className="text-[#D62839]">
              Right when it matters.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            BloodBridge connects people who need blood with available donors
            across Bangladesh — making blood donation faster, simpler, and
            more accessible for everyone.
          </p>

        </div>

        {/* ================= HERO CONTENT ================= */}
        <div className="relative mx-auto mt-12 max-w-6xl">

          {/* LEFT FLOATING CARD */}
          <div className="absolute -left-3 top-10 hidden w-56 -rotate-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.10)] lg:block">

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D62839]">
                Urgent Request
              </span>

              <span className="h-2 w-2 rounded-full bg-red-500" />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-[#D62839]">
                B+
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Blood Needed
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Sylhet MAG Osmani
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500">
              <MapPin size={13} className="text-[#D62839]" />
              Sylhet, Bangladesh
            </div>
          </div>

          {/* RIGHT FLOATING CARD */}
          <div className="absolute -right-3 top-20 hidden w-56 rotate-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.10)] lg:block">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                <ShieldCheck
                  size={20}
                  className="text-green-600"
                />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Verified Donor
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  O+ • Available
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <span className="text-xs font-semibold text-green-700">
                Ready to donate
              </span>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
              <Clock3 size={13} />
              Available now
            </div>
          </div>

          {/* ================= CENTER SEARCH CARD ================= */}
          <div className="mx-auto max-w-3xl rounded-[30px] border border-red-100 bg-gradient-to-b from-white to-red-50/40 p-3 shadow-[0_25px_70px_rgba(214,40,57,0.10)]">

            {/* Card Header */}
            <div className="rounded-[23px] border border-slate-100 bg-white px-5 py-7 sm:px-8">

              <div className="flex flex-col items-center text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D62839] text-white shadow-lg shadow-red-200">
                  <HeartPulse size={27} strokeWidth={2.2} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
                  Find a blood donor near you
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  Search by blood group and location to quickly discover
                  available donors.
                </p>

              </div>

              {/* Search Fields */}
              <div className="mt-7 grid gap-3 sm:grid-cols-3">

                {/* Blood Group */}
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition-all hover:border-red-200 hover:shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Blood Group
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <Droplet
                      size={16}
                      className="text-[#D62839]"
                      fill="currentColor"
                    />

                    <span className="text-sm font-semibold text-slate-800">
                      Select Group
                    </span>
                  </div>
                </div>

                {/* District */}
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition-all hover:border-red-200 hover:shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    District
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <MapPin
                      size={16}
                      className="text-[#D62839]"
                    />

                    <span className="text-sm font-semibold text-slate-800">
                      Select District
                    </span>
                  </div>
                </div>

                {/* Search Button */}
                <Link
                  href="/search"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-[#D62839] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A4161A] hover:shadow-xl"
                >
                  <Search size={17} />

                  Search Donors

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

              </div>

              {/* Bottom Stats */}
              <div className="mt-7 grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 pt-6">

                <div className="text-center">
                  <p className="text-lg font-black text-slate-900">
                    2.1K+
                  </p>

                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    Active Donors
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-black text-slate-900">
                    64
                  </p>

                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    Districts
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-black text-slate-900">
                    $15,256
                  </p>

                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    Total Funds Raised
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* ================= BOTTOM FLOATING CARD ================= */}
          <div className="mx-auto mt-5 flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row">

            <div className="flex items-center -space-x-2">

              {["A+", "B+", "O+", "AB+"].map((group) => (
                <div
                  key={group}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-red-50 text-[9px] font-black text-[#D62839] shadow-sm"
                >
                  {group}
                </div>
              ))}

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#D62839] text-[9px] font-bold text-white shadow-sm">
                +2K
              </div>

            </div>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 text-[#D62839]">
                ★★★★★
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">
                  Trusted by donors
                </p>

                <p className="text-[10px] text-slate-400">
                  Helping communities across Bangladesh
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= CTA LINKS ================= */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#D62839] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A4161A]"
          >
            Become a Donor

            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href="/donation-requests"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-[#D62839]"
          >
            View Blood Requests
            <ArrowRight size={16} />
          </Link>

        </div>

        {/* ================= TRUSTED LOCATIONS ================= */}
        <div className="mt-12 text-center">

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Connecting donors across Bangladesh
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
            {[
              "Dhaka",
              "Chattogram",
              "Sylhet",
              "Khulna",
              "Rajshahi",
              "Rangpur",
              "Barishal",
            ].map((city) => (
              <span
                key={city}
                className="flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#D62839]" />
                {city}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;