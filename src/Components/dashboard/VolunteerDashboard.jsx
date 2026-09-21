"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList,
  Droplets,
  CheckCircle2,
  Users,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { apiFetchJSON } from "@/lib/api";

export default function VolunteerDashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await apiFetchJSON("/api/volunteer/stats");
        if (data?.success && data?.data) {
          setStats(data.data);
        } else {
          setError("Failed to load statistics.");
        }
      } catch (err) {
        setError(err.message || "Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Requests",
      value: stats?.total ?? "—",
      icon: ClipboardList,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pending Requests",
      value: stats?.pending ?? "—",
      icon: Droplets,
      color: "bg-red-50 text-red-600",
    },
    {
      label: "In Progress",
      value: stats?.inProgress ?? "—",
      icon: Users,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed",
      value: stats?.done ?? "—",
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

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
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 rounded-xl bg-slate-200" />
                <div className="h-4 w-16 rounded bg-slate-100" />
              </div>
              <div className="mt-4 h-7 w-16 rounded bg-slate-200" />
              <div className="mt-2 h-3 w-24 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
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
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
        <p className="mt-1 text-xs text-slate-500">Frequently used volunteer tools</p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/volunteer/requests"
            className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition-all hover:border-[#D62839]/30 hover:bg-[#FFF7F8]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
              <ClipboardList size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Manage Requests</p>
              <p className="text-xs text-slate-500">View and update blood requests</p>
            </div>
          </Link>
          <Link
            href="/search-donors"
            className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition-all hover:border-[#D62839]/30 hover:bg-[#FFF7F8]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Find Donors</p>
              <p className="text-xs text-slate-500">Search available donors</p>
            </div>
          </Link>
          <Link
            href="/dashboard/funding"
            className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition-all hover:border-[#D62839]/30 hover:bg-[#FFF7F8]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
              <ArrowUpRight size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">View Funding</p>
              <p className="text-xs text-slate-500">Community funding records</p>
            </div>
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition-all hover:border-[#D62839]/30 hover:bg-[#FFF7F8]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
              <Users size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">My Profile</p>
              <p className="text-xs text-slate-500">Update your information</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
