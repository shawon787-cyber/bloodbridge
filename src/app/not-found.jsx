"use client";

import Link from "next/link";
import { HeartPulse, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100vh-120px)] overflow-hidden bg-[#FFF7F8]">
      {/* ================= BACKGROUND DECORATIONS ================= */}
      <div className="pointer-events-none absolute left-1/2 top-10 -z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-red-100/40 blur-[100px]" />

      <div className="pointer-events-none absolute -left-32 top-1/3 -z-0 h-64 w-64 rounded-full bg-[#FDECEF]/60 blur-[80px]" />

      <div className="pointer-events-none absolute -right-24 bottom-1/4 -z-0 h-72 w-72 rounded-full bg-red-100/30 blur-[90px]" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-120px)] max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">

        {/* White Card */}
        <div className="w-full max-w-2xl rounded-[32px] border border-slate-100 bg-white px-6 py-14 text-center shadow-[0_25px_70px_rgba(214,40,57,0.08)] sm:px-10 lg:px-14">

          {/* ================= 404 VISUAL ================= */}
          <div className="relative mx-auto h-32 w-32 sm:h-40 sm:w-40">

            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border border-red-100" />

            <div className="absolute inset-3 rounded-full border border-red-50" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D62839] shadow-lg shadow-red-200 sm:h-20 sm:w-20">
                <HeartPulse
                  size={36}
                  strokeWidth={2.2}
                  className="text-white sm:hidden"
                />
                <HeartPulse
                  size={44}
                  strokeWidth={2.2}
                  className="hidden text-white sm:block"
                />
              </div>
            </div>

          </div>

          {/* ================= BADGE ================= */}
          <div className="mt-8 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-red-100 bg-red-50/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D62839]">
              Page Not Found
            </span>
          </div>

          {/* ================= HEADING ================= */}
          <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Oops! This page got lost.
          </h1>

          {/* ================= SUPPORTING TEXT ================= */}
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. Let&apos;s get you back to BloodBridge.
          </p>

          {/* ================= 404 TYPOGRAPHY (BACKGROUND) ================= */}
          <div className="mt-8 flex justify-center">
            <span className="text-8xl font-black tracking-tighter text-slate-100 sm:text-[10rem] select-none">
              404
            </span>
          </div>

          {/* ================= CTA BUTTONS ================= */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            {/* Primary CTA */}
            <Link
              href="/"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D62839] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A4161A] hover:shadow-xl sm:w-auto"
            >
              Back to Home
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/donation-requests"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-[#D62839] sm:w-auto"
            >
              View Blood Requests
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

        {/* ================= FOOTER NOTE ================= */}
        <p className="mt-8 text-xs text-slate-400">
          Need help?{" "}
          <Link
            href="/"
            className="font-semibold text-[#D62839] transition-colors hover:underline"
          >
            Return to homepage
          </Link>
        </p>

      </div>
    </main>
  );
}
