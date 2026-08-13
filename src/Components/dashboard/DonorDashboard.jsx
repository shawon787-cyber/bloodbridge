"use client";

import {
  Droplets,
  CheckCircle2,
  ClipboardList,
  FileText,
  UserRound,
  ArrowUpRight,
  Clock,
  Award,
  HeartPulse,
  MapPin,
  Calendar,
  ShieldCheck,
  ToggleLeft,
  Phone,
} from "lucide-react";

const donorStats = [
  {
    label: "My Blood Group",
    value: "A+",
    change: "Verified",
    icon: Droplets,
    color: "#D62839",
  },
  {
    label: "Donation Status",
    value: "Active",
    change: "Eligible",
    icon: CheckCircle2,
    color: "#16A34A",
  },
  {
    label: "Total Donations",
    value: "12",
    change: "+1 this year",
    icon: Award,
    color: "#F59E0B",
  },
  {
    label: "Available Requests",
    value: "5",
    change: "Nearby",
    icon: ClipboardList,
    color: "#2563EB",
  },
];

const donationStatus = {
  bloodGroup: "A+",
  lastDonation: "2025-07-15",
  nextEligible: "2025-10-15",
  availability: "Available",
};

const profileCompletion = {
  pct: 85,
  missing: ["Add emergency contact", "Upload medical certificate"],
};

const availableRequests = [
  { id: "BR-201", blood: "A+", hospital: "Dhaka Medical", urgency: "High", distance: "2.3 km", posted: "1 hour ago" },
  { id: "BR-202", blood: "A+", hospital: "Square Hospital", urgency: "Medium", distance: "4.1 km", posted: "3 hours ago" },
  { id: "BR-203", blood: "A+", hospital: "Lab Aid Hospital", urgency: "Low", distance: "5.8 km", posted: "5 hours ago" },
  { id: "BR-204", blood: "A+", hospital: "Popular Hospital", urgency: "High", distance: "6.2 km", posted: "6 hours ago" },
  { id: "BR-205", blood: "A+", hospital: "Apollo Hospital", urgency: "Medium", distance: "8.0 km", posted: "1 day ago" },
];

const donationHistory = [
  { date: "Aug 1, 2025", hospital: "Dhaka Medical", blood: "A+", recipient: "Rahim Uddin", status: "Completed" },
  { date: "May 15, 2025", hospital: "Square Hospital", blood: "A+", recipient: "Fatima Begum", status: "Completed" },
  { date: "Feb 3, 2025", hospital: "Lab Aid Hospital", blood: "A+", recipient: "Karim Mia", status: "Completed" },
  { date: "Nov 20, 2024", hospital: "Apollo Hospital", blood: "A+", recipient: "Sabina Yesmin", status: "Completed" },
];

const quickActions = [
  { label: "View Blood Requests", icon: FileText, href: "/dashboard/requests", desc: "Browse open requests" },
  { label: "Update Profile", icon: UserRound, href: "/dashboard/profile", desc: "Update your information" },
  { label: "Donation History", icon: Clock, href: "/dashboard/history", desc: "View donation history" },
  { label: "Update Availability", icon: ToggleLeft, href: "#", desc: "Toggle donor status" },
];

export default function DonorDashboard({ user }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">
          Donor Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back, {user?.name || "Donor"}! Your blood can save lives.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {donorStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <Icon size={22} strokeWidth={2} />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight size={13} />
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Your Donation Status */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900">Your Donation Status</h3>
        <p className="mt-1 text-xs text-slate-500">Current status and eligibility information</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 rounded-xl bg-[#FFF7F8] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDECEF]">
              <Droplets size={20} className="text-[#D62839]" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Blood Group</p>
              <p className="text-sm font-bold text-slate-900">{donationStatus.bloodGroup}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-[#FFF7F8] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDECEF]">
              <Calendar size={20} className="text-[#D62839]" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Last Donation</p>
              <p className="text-sm font-bold text-slate-900">{donationStatus.lastDonation}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-[#FFF7F8] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDECEF]">
              <ShieldCheck size={20} className="text-[#D62839]" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Next Eligible</p>
              <p className="text-sm font-bold text-slate-900">{donationStatus.nextEligible}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-[#FFF7F8] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDECEF]">
              <ToggleLeft size={20} className="text-[#D62839]" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Availability</p>
              <p className="text-sm font-bold text-emerald-600">{donationStatus.availability}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Available Blood Requests */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-sm font-bold text-slate-900">Available Blood Requests</h3>
            <span className="text-xs font-medium text-slate-500">{availableRequests.length} nearby</span>
          </div>
          <div className="divide-y divide-slate-50">
            {availableRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-sm font-black text-[#D62839]">
                    {req.blood}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{req.hospital}</p>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {req.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {req.posted}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      req.urgency === "High"
                        ? "bg-red-50 text-red-600"
                        : req.urgency === "Medium"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {req.urgency}
                  </span>
                  <button className="rounded-xl bg-[#D62839] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#A4161A]">
                    Donate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
            <p className="mt-1 text-xs text-slate-500">Frequently used donor tools</p>
            <div className="mt-4 space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-all hover:border-[#D62839]/30 hover:bg-[#FFF7F8]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FDECEF] text-[#D62839]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                      <p className="text-xs text-slate-500">{action.desc}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Profile Completion */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">Profile Completion</h3>
            <p className="mt-1 text-xs text-slate-500">Complete your profile to help save more lives</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>{profileCompletion.pct}% complete</span>
                <span className="text-[#D62839]">{100 - profileCompletion.pct}% remaining</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-[#D62839]"
                  style={{ width: `${profileCompletion.pct}%` }}
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {profileCompletion.missing.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
                  <Clock size={14} className="shrink-0 text-amber-600" />
                  <span className="text-xs font-medium text-amber-700">{item}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full rounded-xl border border-[#D62839] px-4 py-2.5 text-sm font-semibold text-[#D62839] transition-colors hover:bg-[#D62839] hover:text-white">
              Complete Profile
            </button>
          </div>
        </div>
      </div>

      {/* Recent Donation Activity */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="text-sm font-bold text-slate-900">Recent Donation Activity</h3>
          <button className="text-xs font-semibold text-[#D62839] hover:underline">View History</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Hospital</th>
                <th className="px-5 py-3 font-semibold">Blood Type</th>
                <th className="px-5 py-3 font-semibold">Recipient</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.map((donation) => (
                <tr key={donation.date} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 text-slate-600">{donation.date}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-900">{donation.hospital}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-bold text-[#D62839]">
                      {donation.blood}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{donation.recipient}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 size={12} />
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
