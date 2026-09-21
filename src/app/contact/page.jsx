"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import PageHeader from "@/Components/shared/PageHeader";
import ContactCard from "@/Components/shared/ContactCard";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ fullName: "", email: "", subject: "", message: "" });

      setTimeout(() => setIsSuccess(false), 4000);
    }, 1200);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main>
      {/* ================= CONTACT HERO ================= */}
      <PageHeader
        badge="Contact Us"
        badgeIcon={<MessageCircle size={12} strokeWidth={2} />}
        title="We are here to help"
        subtitle="Have a question, feedback, or need support? Reach out to the BloodBridge team and we will get back to you as soon as possible."
      />

      {/* ================= CONTACT CARDS ================= */}
      <section className="relative bg-[#FFF9FA] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ContactCard
              icon={<Mail size={22} />}
              title="Email"
              value="hello@bloodbridge.com"
              href="mailto:hello@bloodbridge.com"
            />
            <ContactCard
              icon={<Phone size={22} />}
              title="Phone"
              value="+880 1700-000000"
              href="tel:+8801700000000"
            />
            <ContactCard
              icon={<MapPin size={22} />}
              title="Location"
              value="Bangladesh"
            />
            <ContactCard
              icon={<Clock size={22} />}
              title="Support Hours"
              value="24 / 7 Community Support"
            />
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]">
            {/* Left Info */}
            <div className="flex flex-col justify-center gap-6">
              <div>
                <h2 className="text-2xl font-black text-[#171717] sm:text-3xl">
                  Send us a message
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#6F6F6F]">
                  Fill out the form and our team will respond within one business
                  day. For urgent blood requests, please use the Blood Requests page
                  instead.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <MessageCircle size={18} />,
                    label: "General Inquiries",
                    text: "hello@bloodbridge.com",
                  },
                  {
                    icon: <Mail size={18} />,
                    label: "Support",
                    text: "support@bloodbridge.com",
                  },
                  {
                    icon: <Phone size={18} />,
                    label: "Emergency Line",
                    text: "+880 1700-000000",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-300 hover:border-[#F1C7CD]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#888888]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#171717]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#A4161A] via-[#D62839] to-[#F21D3B]" />

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-black text-[#171717]">
                    Message sent!
                  </h3>
                  <p className="max-w-sm text-sm text-[#6F6F6F]">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-xs font-bold text-slate-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold text-slate-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-xs font-bold text-slate-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-bold text-slate-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us more..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm font-medium text-slate-600 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#D62839] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(214,40,57,0.23)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B91C2C] hover:shadow-[0_14px_30px_rgba(214,40,57,0.28)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={17} />
                        Send Message
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
