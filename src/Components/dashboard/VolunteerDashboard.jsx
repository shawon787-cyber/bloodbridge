"use client";

import {
  ClipboardList,
  Droplets,
  CheckCircle2,
  Users,
  Clock,
  ArrowUpRight,
  Bell,
  MapPin,
  UserPlus,
  FileText,
} from "lucide-react";

const stats = [
  {
    label: "Assigned Requests",
    value: "8",
    change: "+2 new",
    icon: ClipboardList,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Active Blood Requests",
    value: "24",
    change: "+5 today",
    icon: Droplets,
    color: "bg-red-50 text-red-600",
  },
  {
    label: "Completed Requests",
    value: "156",
    change: "+12 this week",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Available Donors",
    value: "89",
    change: "Online now",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
];

const assignedRequests = [
  { id: "BR-101", name: "Salam Mia", blood: "A+", location: "Dhaka", urgency: "High", time: "30 min ago" },
  { id: "BR-102", name: "Rahima Khatun", blood: "O-", location: "Chittagong", urgency: "Medium", time: "1 hour ago" },
  { id: "BR-103", name: "Jamal Hossain", blood: "B+", location: "Sylhet", urgency: "Low", time: "2 hours ago" },
  { id: "BR-104", name: "Nasreen Akter", blood: "AB+", location: "Dhaka", urgency: "High", time: "3 hours ago" },
];

const recentActivities = [
  { action: "Request fulfilled", detail: "BR-099 - Rahim Uddin received A+ blood", time: "20 min ago", type: "success" },
  { action: "New request assigned", detail: "BR-101 - Salam Mia needs A+ blood", time: "30 min ago", type: "info" },
  { action: "Donor confirmed", detail: "Karim Hossain confirmed for BR-098", time: "1 hour ago", type: "success" },
  { action: "Urgent alert", detail: "BR-100 - O- blood needed at DMH", time: "2 hours ago", type: "alert" },
  { action: "Request updated", detail: "BR-097 status changed to fulfilled", time: "3 hours ago", type: "info" },
];

const quickActions = [
  { label: "Find Donors", icon: Users, href: "#", desc: "Search available donors" },
  { label: "Update Request", icon: FileText, href: "#", desc: "Update blood request status" },
  { label: "Send Alert", icon: Bell, href: "#", desc: "Notify nearby donors" },
  { label: "View Map", icon: MapPin, href: "#", desc: "See donor locations" },
];

export default function VolunteerDashboard({ user }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">
          Volunteer Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back, {user?.name || "Volunteer"}! Here&apos;s your activity overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Assigned Requests */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-sm font-bold text-slate-900">Assigned Blood Requests</h3>
            <button className="text-xs font-semibold text-[#D62839] hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {assignedRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-sm font-black text-[#D62839]">
                    {req.blood}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{req.name}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                      <MapPin size={12} />
                      {req.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
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
                  <p className="mt-1 text-xs text-slate-400">{req.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Recent Activities</h3>
          <p className="mt-1 text-xs text-slate-500">Your latest volunteer activities</p>
          <div className="mt-5 space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D62839]" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.detail}</p>
                  <p className="mt-1 text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
        <p className="mt-1 text-xs text-slate-500">Frequently used volunteer tools</p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition-all hover:border-[#D62839]/30 hover:bg-[#FFF7F8]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                  <p className="text-xs text-slate-500">{action.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
