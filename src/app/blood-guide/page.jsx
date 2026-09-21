"use client";

import {
  Droplet,
  ShieldCheck,
  Clock,
  HeartPulse,
  UtensilsCrossed,
  Activity,
  Ban,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

import PageHeader from "@/Components/shared/PageHeader";
import SectionTitle from "@/Components/shared/SectionTitle";
import GuideStep from "@/Components/shared/GuideStep";
import InfoCard from "@/Components/shared/InfoCard";
import FAQAccordion from "@/Components/shared/FAQAccordion";

export default function BloodGuidePage() {
  const faqItems = [
    {
      question: "Does donating blood hurt?",
      answer:
        "Most donors feel only a brief pinch when the needle is inserted. The actual donation process is generally painless. Any discomfort is temporary and minor compared to the impact of your donation.",
    },
    {
      question: "How long does donation take?",
      answer:
        "The entire process, from registration to refreshments, usually takes about 45 to 60 minutes. The actual blood draw takes approximately 8 to 10 minutes.",
    },
    {
      question: "Will donating blood make me weak?",
      answer:
        "Some donors may feel lightheaded afterward, which is why resting and hydrating after donation is important. Most people feel fine and can resume normal activities after a short break.",
    },
    {
      question: "Can I donate if I have a chronic condition?",
      answer:
        "Eligibility varies depending on the condition, medications, and current health. Please consult your local blood donation center or healthcare professional for personalized guidance.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "Waiting periods between donations vary by region and blood component. Whole blood donations typically require an 8 to 12 week interval. Plasma and platelet donations may have different schedules.",
    },
  ];

  return (
    <main>
      {/* ================= BLOOD GUIDE HERO ================= */}
      <PageHeader
        badge="Blood Donation Guide"
        badgeIcon={<Droplet size={12} fill="currentColor" />}
        title="Learn how blood donation saves lives"
        subtitle="Blood donation is a simple, safe, and powerful act. This guide will help you understand what to expect and how to prepare."
      />

      {/* ================= WHY DONATION MATTERS ================= */}
      <section className="relative bg-[#FFF9FA] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#FDECEF] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#FBE5E9] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Why Donate"
            badgeIcon={<HeartPulse size={14} />}
            title="Why blood donation matters"
            subtitle="Every unit of donated blood can save up to three lives. Your contribution supports surgeries, cancer treatment, trauma care, and chronic illness management."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <HeartPulse size={24} />,
                title: "Supports Medical Emergencies",
                description:
                  "Accidents, surgeries, and complications often require immediate blood transfusions.",
              },
              {
                icon: <ShieldCheck size={24} />,
                title: "Helps Chronic Patients",
                description:
                  "People with conditions like sickle cell disease or thalassemia need regular transfusions.",
              },
              {
                icon: <Activity size={24} />,
                title: "Strengthens the Community",
                description:
                  "A strong blood supply means a more resilient and prepared healthcare system for everyone.",
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

      {/* ================= ELIGIBILITY ================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Eligibility"
            badgeIcon={<ShieldCheck size={14} />}
            title="Basic eligibility information"
            subtitle="Eligibility requirements may vary by blood center and local regulations. Always confirm with your local donation center."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-300 sm:rounded-3xl sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-base font-extrabold text-emerald-900">
                  You may be eligible if you
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm text-emerald-800">
                {[
                  "Are generally in good health",
                  "Meet minimum weight requirements",
                  "Are within the eligible age range",
                  "Have not donated recently within the required interval",
                  "Have no temporary disqualifications (e.g., recent travel, illness)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50/60 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-300 sm:rounded-3xl sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Ban size={20} />
                </div>
                <h3 className="text-base font-extrabold text-red-900">
                  You may not be eligible if you
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm text-red-800">
                {[
                  "Have a current infection or illness",
                  "Are pregnant or recently gave birth",
                  "Have low hemoglobin levels",
                  "Have certain medical conditions or take certain medications",
                  "Have traveled to or lived in restricted regions recently",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PREPARATION & PROCESS ================= */}
      <section className="relative bg-[#FFF7F8] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#FDECEF] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#FBE5E9] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Before Donating"
            badgeIcon={<Clock size={14} />}
            title="What to do before donating"
            subtitle="Proper preparation helps ensure a safe and comfortable donation experience."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <GuideStep
              number="1"
              title="Get a good night of sleep"
              description="Rest well before your donation. Being well-rested helps your body recover faster and keeps you feeling your best."
            />
            <GuideStep
              number="2"
              title="Eat a healthy meal"
              description="Have a balanced meal within 2 to 3 hours before donating. Avoid fatty foods right before donation."
              icon={<UtensilsCrossed size={18} />}
            />
            <GuideStep
              number="3"
              title="Stay hydrated"
              description="Drink extra fluids in the days leading up to your donation and especially before you arrive. Proper hydration helps maintain blood volume."
            />
            <GuideStep
              number="4"
              title="Bring identification"
              description="Carry a valid ID or donor card. Some centers also require basic health history information."
            />
          </div>
        </div>
      </section>

      {/* ================= DURING DONATION ================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="During Donation"
            badgeIcon={<Activity size={14} />}
            title="What happens during donation"
            subtitle="The blood donation process is straightforward and supervised by trained healthcare professionals."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Registration",
                text: "You sign in and provide basic identification and health information.",
              },
              {
                step: "2",
                title: "Mini-Health Check",
                text: "Your temperature, pulse, blood pressure, and hemoglobin are checked.",
              },
              {
                step: "3",
                title: "Blood Collection",
                text: "A sterile needle is inserted and blood is collected. This takes about 8 to 10 minutes.",
              },
              {
                step: "4",
                title: "Refreshments",
                text: "You rest and enjoy snacks and drinks while being monitored for a short period.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F1C7CD] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:rounded-3xl sm:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D62839] text-lg font-black text-white shadow-[0_8px_20px_rgba(214,40,57,0.18)]">
                  {item.step}
                </div>
                <h3 className="text-base font-extrabold text-[#171717]">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[#6F6F6F]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AFTER DONATION ================= */}
      <section className="relative bg-[#FFF9FA] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-[#FDECEF] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="After Donation"
            badgeIcon={<CheckCircle2 size={14} className="text-[#D62839]" />}
            title="What to do after donating"
            subtitle="A few simple steps after donation help your body recover and protect your well-being."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Keep the bandage on",
                description:
                  "Leave the bandage on for a few hours and avoid heavy lifting with that arm for the rest of the day.",
              },
              {
                title: "Drink fluids",
                description:
                  "Replenish fluids by drinking water, juice, or electrolyte drinks for the next 24 to 48 hours.",
              },
              {
                title: "Eat well",
                description:
                  "Enjoy a nutritious meal after donating. Iron-rich foods and vitamin C help restore your energy.",
              },
              {
                title: "Rest if needed",
                description:
                  "If you feel lightheaded, sit or lie down until you feel better. Avoid strenuous activity for several hours.",
              },
              {
                title: "Avoid alcohol",
                description:
                  "Limit or avoid alcohol for at least 24 hours after donation to support healthy recovery.",
              },
              {
                title: "Know the signs",
                description:
                  "If you experience unusual pain, bruising, or continued dizziness, contact the donation center or a healthcare provider.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F1C7CD] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:rounded-3xl sm:p-7"
              >
                <h3 className="text-sm font-extrabold text-[#171717]">{item.title}</h3>
                <p className="text-sm leading-6 text-[#6F6F6F]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SAFETY REMINDERS ================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Safety"
            badgeIcon={<AlertTriangle size={14} className="text-[#D97706]" />}
            title="Safety reminders"
            subtitle="Blood donation is safe when performed at certified centers. Keep these reminders in mind."
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Only donate at certified, licensed blood donation centers or authorized mobile drives.",
              "All equipment used is sterile and used only once. There is no risk of infection from the donation process itself.",
              "Be honest about your health history during screening to protect both yourself and recipients.",
              "Do not donate if you feel unwell, even if symptoms are mild.",
              "Follow post-donation care instructions provided by the center.",
              "Consult a healthcare professional if you have ongoing concerns after donation.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-[#F4D4D8] bg-white p-5 shadow-[0_8px_30px_rgba(185,28,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E9AEB5] hover:shadow-[0_18px_45px_rgba(185,28,28,0.10)] sm:rounded-3xl sm:p-7"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF0F2] text-[#D62839]">
                  <ShieldCheck size={16} />
                </div>
                <p className="text-sm leading-6 text-[#444444]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMMON QUESTIONS ================= */}
      <section className="relative bg-[#FFF7F8] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#FDECEF] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="FAQ"
            badgeIcon={<ShieldCheck size={14} />}
            title="Common questions"
            subtitle="Quick answers to questions donors and recipients often ask."
            align="center"
          />

          <div className="mt-12 max-w-3xl mx-auto">
            <FAQAccordion items={faqItems} />
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
                Ready to donate or find blood?
              </h2>
              <p className="max-w-xl text-sm leading-7 text-[#6F6F6F] sm:text-base">
                Take the next step. Find active blood requests near you or sign up to
                become a donor on BloodBridge.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href="/search-donors"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D62839] px-7 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(214,40,57,0.23)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B91C2C] hover:shadow-[0_14px_30px_rgba(214,40,57,0.28)]"
                >
                  Find Blood Requests
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="/auth/SignUpPage"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-[#D62839]"
                >
                  Become a Donor
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
