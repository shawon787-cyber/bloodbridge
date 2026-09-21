"use client";

import { useState } from "react";
import { Search, HelpCircle, MessageCircle, Droplets, CalendarCheck, UserRound } from "lucide-react";

import PageHeader from "@/Components/shared/PageHeader";
import SectionTitle from "@/Components/shared/SectionTitle";
import FAQAccordion from "@/Components/shared/FAQAccordion";

const categories = [
  {
    id: "general",
    label: "General",
    icon: <HelpCircle size={16} />,
    items: [
      {
        question: "What is BloodBridge?",
        answer:
          "BloodBridge is a community platform that connects blood donors with people who need blood donations. It helps users find and respond to blood requests, manage donation schedules, and build a trusted network of donors across Bangladesh.",
      },
      {
        question: "How does BloodBridge work?",
        answer:
          "BloodBridge allows recipients to post blood requests and donors to search for those requests. Users create accounts, browse available requests, and connect directly. The platform supports roles for donors, recipients, volunteers, and administrators.",
      },
      {
        question: "Who can use BloodBridge?",
        answer:
          "BloodBridge is open to anyone who wants to donate blood, request blood, or volunteer to support the community. Users register as donors, recipients, or volunteers depending on how they want to help.",
      },
    ],
  },
  {
    id: "blood-requests",
    label: "Blood Requests",
    icon: <Droplets size={16} />,
    items: [
      {
        question: "How can I find a blood request?",
        answer:
          "Visit the Blood Requests page to browse active requests. You can filter by blood group and location to find requests that match your criteria and availability.",
      },
      {
        question: "How can I respond to a request?",
        answer:
          "When you find a request you want to respond to, use the available action on the request card. Follow the instructions provided by the platform and the recipient to coordinate the donation.",
      },
      {
        question: "What happens after responding?",
        answer:
          "After you respond, the recipient will review your response. You may receive updates about the request status. If selected, coordinate with the recipient or hospital to arrange the donation time and location.",
      },
    ],
  },
  {
    id: "donation",
    label: "Donation",
    icon: <CalendarCheck size={16} />,
    items: [
      {
        question: "How often can someone donate blood?",
        answer:
          "Eligibility intervals vary by local regulation and blood center. Whole blood donations generally require an 8 to 12 week waiting period. Plasma and platelet donations often have different schedules. Check with your local center for exact guidelines.",
      },
      {
        question: "What should I do before donating?",
        answer:
          "Get adequate rest, eat a healthy meal, stay hydrated, and bring valid identification. Avoid alcohol before donating and follow any pre-donation instructions provided by the center.",
      },
      {
        question: "What should I do after donating?",
        answer:
          "Keep the bandage on for a few hours, drink extra fluids, eat a nutritious meal, and avoid heavy lifting with the donation arm. Rest if you feel lightheaded and contact the center if unusual symptoms persist.",
      },
    ],
  },
  {
    id: "account",
    label: "Account",
    icon: <UserRound size={16} />,
    items: [
      {
        question: "How do I create an account?",
        answer:
          "Click the Become a Donor button on the homepage and follow the registration steps. You can select your role as donor, recipient, or volunteer and complete the required profile information.",
      },
      {
        question: "Can I update my profile?",
        answer:
          "Yes. After logging in, go to your profile or dashboard to update your personal information, contact details, blood group, and availability status.",
      },
      {
        question: "What are donor and volunteer roles?",
        answer:
          "Donors are users who are willing and eligible to donate blood. Volunteers help coordinate and support donation activities. Recipients are users who create and manage blood requests. Each role has specific features tailored to its purpose.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <main>
      {/* ================= FAQ HERO ================= */}
      <PageHeader
        badge="FAQ"
        badgeIcon={<HelpCircle size={12} strokeWidth={2} />}
        title="Frequently asked questions"
        subtitle="Find answers to common questions about BloodBridge, blood donation, and how our platform works."
      />

      {/* ================= SEARCH BAR ================= */}
      <section className="relative bg-[#FFF9FA] py-8 sm:py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-300 focus-within:border-[#F1C7CD] sm:rounded-3xl">
            <div className="flex items-center gap-4 p-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839]">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm font-medium text-slate-600 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ CATEGORIES ================= */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition-all duration-200 sm:text-sm ${
                    isActive
                      ? "border-[#D62839] bg-[#D62839] text-white shadow-[0_8px_20px_rgba(214,40,57,0.18)]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-[#D62839]"
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* FAQ Content */}
          <div className="mt-10">
            {filteredCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const visibleItems = cat.items;

              if (!isActive && searchQuery) return null;

              return (
                <div key={cat.id} className={isActive ? "block" : "hidden"}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF0F2] text-[#D62839]">
                      {cat.icon}
                    </div>
                    <h3 className="text-base font-extrabold text-[#171717] sm:text-lg">
                      {cat.label}
                    </h3>
                  </div>

                  {visibleItems.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center sm:rounded-3xl">
                      <p className="text-sm font-medium text-slate-400">
                        No questions found matching your search.
                      </p>
                    </div>
                  ) : (
                    <FAQAccordion items={visibleItems} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= STILL HAVE QUESTIONS ================= */}
      <section className="relative bg-[#FFF7F8] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] border border-[#F4D4D8] bg-gradient-to-br from-[#FFF0F2] to-[#FDECEF] p-8 text-center shadow-[0_20px_60px_rgba(214,40,57,0.08)] sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/30 blur-3xl" />

            <div className="relative flex flex-col items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D62839] text-white shadow-[0_10px_25px_rgba(214,40,57,0.20)]">
                <MessageCircle size={28} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-black text-[#171717] sm:text-2xl">
                Still have questions?
              </h3>
              <p className="max-w-md text-sm leading-6 text-[#6F6F6F] sm:text-base">
                If you could not find the answer you were looking for, feel free to
                reach out to our support team.
              </p>
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#D62839] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(214,40,57,0.23)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B91C2C] hover:shadow-[0_14px_30px_rgba(214,40,57,0.28)]"
              >
                Contact Us
                <Search
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
