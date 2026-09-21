"use client";

import Link from "next/link";
import {
  HeartPulse,
  Droplet,
  Users,
  ShieldCheck,
  ArrowRight,
  HandHeart,
  MapPin,
  Clock,
} from "lucide-react";

import PageHeader from "@/Components/shared/PageHeader";
import SectionTitle from "@/Components/shared/SectionTitle";
import InfoCard from "@/Components/shared/InfoCard";

export default function AboutPage() {
  return (
    <main>
      {/* ================= ABOUT HERO ================= */}
      <PageHeader
        badge="About BloodBridge"
        badgeIcon={<HeartPulse size={12} strokeWidth={2.4} />}
        title="Connecting hearts through blood donation"
        subtitle="BloodBridge is a community-driven platform built to bridge the gap between blood donors and people in urgent need across Bangladesh."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/donation-requests"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D62839] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(214,40,57,0.23)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B91C2C] hover:shadow-[0_14px_30px_rgba(214,40,57,0.28)]"
          >
            View Blood Requests
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/auth/SignUpPage"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-[#D62839]"
          >
            Become a Donor
            <ArrowRight size={16} />
          </Link>
        </div>
      </PageHeader>

      {/* ================= INTRODUCTION ================= */}
      <section className="relative bg-[#FFF9FA] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#FDECEF] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#FBE5E9] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              badge="Our Story"
              badgeIcon={<HeartPulse size={14} strokeWidth={2} />}
              title="About BloodBridge"
              subtitle="Every two seconds, someone somewhere needs blood. Yet many lives are lost simply because the right donor cannot be reached in time. BloodBridge was created to change that."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon={<Droplet size={24} fill="currentColor" />}
              title="Mission-Driven"
              description="Our mission is to make blood donation simpler, faster, and more accessible by connecting willing donors with people who need them most."
              points={[
                "Reduce response time",
                "Build a trusted donor network",
                "Save lives across communities",
              ]}
            />
            <InfoCard
              icon={<Users size={24} />}
              title="Community-First"
              description="BloodBridge is built around the belief that communities thrive when people help each other. We create a safe space for donors and recipients."
              points={[
                "Transparent matching",
                "Verified donor profiles",
                "Community support tools",
              ]}
            />
            <InfoCard
              icon={<ShieldCheck size={24} />}
              title="Trusted & Safe"
              description="We prioritize safety, transparency, and trust in every interaction. BloodBridge is a platform built with responsibility at its core."
              points={[
                "Verified user accounts",
                "Responsible platform practices",
                "Clear donation guidance",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Mission */}
            <div className="relative overflow-hidden rounded-3xl border border-[#F4D4D8] bg-gradient-to-br from-[#FFF0F2] to-white p-8 shadow-[0_8px_30px_rgba(185,28,28,0.05)] sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#FDECEF] blur-3xl" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D62839] text-white shadow-[0_10px_25px_rgba(214,40,57,0.20)]">
                  <HeartPulse size={28} strokeWidth={2} />
                </div>
                <h3 className="mt-6 text-xl font-black text-[#171717] sm:text-2xl">
                  Our Mission
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#6F6F6F]">
                  To ensure that no one in Bangladesh suffers or loses a life because
                  they could not find a blood donor in time. We strive to build a
                  connected, responsive, and compassionate network of donors ready
                  to help whenever a need arises.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Make blood requests discoverable instantly",
                    "Empower donors to act quickly and confidently",
                    "Support hospitals and families during critical moments",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-medium text-[#444444]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D62839] text-white">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vision */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.045)] sm:p-10">
              <div className="pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-[#FFF0F2] blur-3xl" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0F2] text-[#D62839]">
                  <HandHeart size={28} />
                </div>
                <h3 className="mt-6 text-xl font-black text-[#171717] sm:text-2xl">
                  Our Vision
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#6F6F6F]">
                  A Bangladesh where every person has equal access to safe blood
                  when they need it most. A future where communities are connected,
                  compassionate, and ready to support each other in times of need.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "A nationwide network of verified donors",
                    "Zero preventable deaths due to blood shortage",
                    "Healthcare support that reaches every community",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-medium text-[#444444]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D62839] text-white">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW BLOODBRIDGE WORKS ================= */}
      <section className="relative bg-[#FFF7F8] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#FDECEF] blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#FCE4E7] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="How It Works"
            badgeIcon={<MapPin size={14} />}
            title="How BloodBridge works"
            subtitle="BloodBridge connects people in need with willing donors through a simple, transparent, and fast process."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Users size={22} />,
                title: "Create an Account",
                description:
                  "Sign up as a donor, recipient, or volunteer. It only takes a minute.",
              },
              {
                icon: <Droplet size={22} />,
                title: "Post or Find Requests",
                description:
                  "Post a blood request or search for active requests by blood group and location.",
              },
              {
                icon: <HeartPulse size={22} />,
                title: "Connect Directly",
                description:
                  "Donors respond to requests. Recipients review responses and connect safely.",
              },
              {
                icon: <ShieldCheck size={22} />,
                title: "Save Lives",
                description:
                  "Donors give blood at verified centers. Lives are saved. Communities grow stronger.",
              },
            ].map((step, idx) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center gap-4 rounded-3xl border border-[#F4D4D8] bg-white p-6 text-center shadow-[0_8px_30px_rgba(185,28,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E9AEB5] hover:shadow-[0_18px_45px_rgba(185,28,28,0.10)]"
              >
                <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#D62839] text-xs font-black text-white shadow-md">
                  {idx + 1}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839] transition-colors duration-300 group-hover:bg-[#D62839] group-hover:text-white">
                  {step.icon}
                </div>
                <h3 className="text-base font-extrabold text-[#171717]">{step.title}</h3>
                <p className="text-sm leading-6 text-[#6F6F6F]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY BLOODBRIDGE MATTERS ================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Impact"
            badgeIcon={<ShieldCheck size={14} />}
            title="Why BloodBridge matters"
            subtitle="Blood donation is more than a medical process. It is a bridge between strangers who share something deeply human: the willingness to help."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Clock size={22} />,
                title: "Faster Response",
                description:
                  "Timely access to blood can mean the difference between life and death. BloodBridge reduces the time it takes to find and connect with donors.",
              },
              {
                icon: <MapPin size={22} />,
                title: "Location-Based Matching",
                description:
                  "Find donors near you. BloodBridge uses location to connect recipients with the nearest eligible donors.",
              },
              {
                icon: <HandHeart size={22} />,
                title: "Community Support",
                description:
                  "Join a growing network of donors, volunteers, and supporters committed to making blood donation a community responsibility.",
              },
              {
                icon: <ShieldCheck size={22} />,
                title: "Verified & Safe",
                description:
                  "Donors and requests go through verification to ensure safety, trust, and accountability on the platform.",
              },
              {
                icon: <Droplet size={22} />,
                title: "All Blood Types",
                description:
                  "Whether you have a common or rare blood type, BloodBridge helps you find the right match when it matters most.",
              },
              {
                icon: <Users size={22} />,
                title: "Open & Inclusive",
                description:
                  "BloodBridge is open to everyone. Donors, recipients, volunteers, and supporters all have a role to play.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F1C7CD] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:rounded-3xl sm:p-7"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839]">
                  {item.icon}
                </div>
                <h3 className="text-base font-extrabold text-[#171717] sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[#6F6F6F]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY IMPACT ================= */}
      <section className="relative bg-[#FFF9FA] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#FDECEF] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#FBE5E9] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle
              badge="Our Impact"
              badgeIcon={<HeartPulse size={14} strokeWidth={2} />}
              title="Community impact"
              subtitle="Every donation creates a ripple effect. Together, our community is building a safer, more connected Bangladesh."
            />
          </div>

          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:gap-6">
            {[
              { label: "Active Donors", value: "2.1K+" },
              { label: "Blood Requests Fulfilled", value: "500+" },
              { label: "Cities Connected", value: "64+" },
              { label: "Volunteers", value: "300+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-[#F4D4D8] bg-white p-6 text-center shadow-[0_8px_30px_rgba(185,28,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E9AEB5] hover:shadow-[0_18px_45px_rgba(185,28,28,0.10)] sm:rounded-3xl sm:p-8"
              >
                <p className="text-2xl font-black text-[#D62839] sm:text-3xl lg:text-4xl">
                  {stat.value}
                </p>
                <p className="text-xs font-semibold text-[#888888] sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] border border-[#F4D4D8] bg-gradient-to-br from-[#FFF0F2] to-[#FDECEF] p-8 shadow-[0_20px_60px_rgba(214,40,57,0.08)] sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/30 blur-3xl" />

            <div className="relative flex flex-col items-center gap-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D62839] text-white shadow-[0_10px_25px_rgba(214,40,57,0.20)] sm:h-20 sm:w-20 sm:rounded-[30px]">
                <HeartPulse size={32} strokeWidth={2} />
              </div>

              <h2 className="text-2xl font-black text-[#171717] sm:text-3xl lg:text-4xl">
                Ready to make a difference?
              </h2>
              <p className="max-w-xl text-sm leading-7 text-[#6F6F6F] sm:text-base">
                Join BloodBridge today. Whether you want to donate blood, find a
                donor, or volunteer your time, there is a place for you in our
                community.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/SignUpPage"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D62839] px-7 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(214,40,57,0.23)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B91C2C] hover:shadow-[0_14px_30px_rgba(214,40,57,0.28)]"
                >
                  Become a Donor
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/donation-requests"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-[#D62839]"
                >
                  Find Blood Requests
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
