"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Droplets,
  WalletCards,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock3,
  CheckCircle2,
  XCircle,
  CircleDollarSign,
} from "lucide-react";

import { useUser } from "@/context/UserContext";
import { useDonationRequests } from "@/context/DonationRequestContext";
import { getRequestStats } from "@/lib/donationRequests";
import { apiFetchJSON } from "@/lib/api";

function getRelativeTime(date) {
  if (!date) return "Unknown";

  const created = new Date(date);
  const now = new Date();

  if (Number.isNaN(created.getTime())) {
    return "Unknown";
  }

  const diffInSeconds = Math.floor(
    (now.getTime() - created.getTime()) / 1000
  );

  if (diffInSeconds < 0) {
    return "Just now";
  }

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${
      diffInMinutes === 1 ? "minute" : "minutes"
    } ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} ${
      diffInHours === 1 ? "hour" : "hours"
    } ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 30) {
    return `${diffInDays} ${
      diffInDays === 1 ? "day" : "days"
    } ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths < 12) {
    return `${diffInMonths} ${
      diffInMonths === 1 ? "month" : "months"
    } ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);

  return `${diffInYears} ${
    diffInYears === 1 ? "year" : "years"
  } ago`;
}

export default function AdminDashboard() {
  const [recentUsers, setRecentUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [recentRequests, setRecentRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [requestsError, setRequestsError] = useState(false);
  const [adminStats, setAdminStats] = useState(null);
  const [adminStatsLoading, setAdminStatsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        setUsersLoading(true);
        const result = await apiFetchJSON("/api/admin/users");
        if (result.success && Array.isArray(result.data)) {
          setRecentUsers(result.data.slice(0, 4));
        } else {
          setRecentUsers([]);
        }
      } catch (error) {
        console.error("Failed to fetch recent users:", error);
        setRecentUsers([]);
      } finally {
        setUsersLoading(false);
      }
    };
    fetchRecentUsers();
  }, []);

  useEffect(() => {
    const fetchRecentRequests = async () => {
      try {
        setRequestsLoading(true);
        setRequestsError(false);
        const result = await apiFetchJSON("/api/donation-requests");
        if (result.success && Array.isArray(result.data)) {
          const latestRequests = [...result.data]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 4)
            .map((req) => ({
              id: req._id,
              name: req.recipientName,
              blood: req.bloodGroup,
              hospital: req.hospitalName,
              status: req.urgency === "Urgent" ? "Urgent" : req.status,
              date: new Date(req.createdAt).toLocaleDateString(),
            }));
          setRecentRequests(latestRequests);
        } else {
          setRecentRequests([]);
        }
      } catch (error) {
        console.error("Failed to fetch recent blood requests:", error);
        setRecentRequests([]);
        setRequestsError(true);
      } finally {
        setRequestsLoading(false);
      }
    };
    fetchRecentRequests();
  }, []);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setAdminStatsLoading(true);
        const data = await apiFetchJSON("/api/admin/stats");
        if (data?.success && data?.data) {
          setAdminStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setAdminStatsLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  const { user } = useUser();
  const { requests } = useDonationRequests();

  const userName = user?.name || "User";
  const role = user?.role;

  const requestStats = getRequestStats(requests);

  const donationStatus = [
    {
      label: "Pending",
      value: requestStats.pending,
      color: "#F59E0B",
      icon: Clock3,
    },
    {
      label: "In Progress",
      value: requestStats.inProgress,
      color: "#2563EB",
      icon: Activity,
    },
    {
      label: "Completed",
      value: requestStats.done,
      color: "#16A34A",
      icon: CheckCircle2,
    },
    {
      label: "Cancelled",
      value: requestStats.cancelled,
      color: "#D62839",
      icon: XCircle,
    },
  ];

  const stats = [
    {
      label: "Total Donors",
      value: adminStats
        ? String(adminStats.users?.donors ?? 0)
        : adminStatsLoading
          ? "Loading..."
          : "0",
      positive: true,
      icon: Users,
    },
    {
      label: "Total Funding",
      value: adminStats
        ? `$${(adminStats.funding?.total ?? 0).toLocaleString()}`
        : adminStatsLoading
          ? "Loading..."
          : "$0",
      positive: true,
      icon: WalletCards,
    },
    {
      label: "Total Requests",
      value: adminStats
        ? String(adminStats.donationRequests?.total ?? 0)
        : adminStatsLoading
          ? "Loading..."
          : "0",
      positive: true,
      icon: Droplets,
    },
  ];

  return (
    <div className="min-h-screen space-y-7">

      <section>
        <h1 className="text-2xl font-black tracking-tight text-[#111827] sm:text-3xl">
          Welcome back, {userName}
        </h1>

        <p className="mt-1 text-sm text-[#64748B]">
          Here&apos;s an overview of the BloodBridge community.
        </p>

        <div className="mt-3 inline-flex items-center rounded-full bg-[#FDECEF] px-3 py-1 text-xs font-bold capitalize text-[#D62839]">
          {user?.role} Account
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF0F2] text-[#D62839]">
                  <Icon size={20} strokeWidth={2} />
                </div>

                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                  {stat.positive ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  )}

                  {stat.change}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-2xl font-black text-[#111827]">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm font-medium text-[#64748B]">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}

      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

          <div>
            <h2 className="text-sm font-bold text-[#111827]">
              Donation Requests
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              Current status of all blood requests
            </p>
          </div>

          {adminStatsLoading ? (
            <div className="mt-7 h-[260px] animate-pulse rounded-xl bg-slate-100" />
          ) : adminStats ? (
            <div className="mt-7 space-y-4">
              {[
                { label: "Pending", value: adminStats.donationRequests?.pending ?? 0, color: "#F59E0B", bg: "bg-amber-50" },
                { label: "In Progress", value: adminStats.donationRequests?.inProgress ?? 0, color: "#2563EB", bg: "bg-blue-50" },
                { label: "Completed", value: adminStats.donationRequests?.done ?? 0, color: "#16A34A", bg: "bg-emerald-50" },
                { label: "Canceled", value: adminStats.donationRequests?.canceled ?? 0, color: "#D62839", bg: "bg-red-50" },
              ].map((item) => {
                const total = adminStats.donationRequests?.total || 1;
                const pct = Math.round((item.value / total) * 100);
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#64748B]">{item.label}</span>
                      <span className="font-bold text-[#111827]">{item.value}</span>
                    </div>
                    <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-7 flex h-[260px] items-center justify-center text-sm text-[#64748B]">
              No data available
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

          <div>
            <h2 className="text-sm font-bold text-[#111827]">
              User Distribution
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              Registered users by role
            </p>
          </div>

          {adminStatsLoading ? (
            <div className="mt-7 h-[260px] animate-pulse rounded-xl bg-slate-100" />
          ) : adminStats ? (
            <div className="mt-7 flex h-[260px] items-end justify-around gap-3 px-4">
              {[
                { label: "Donors", value: adminStats.users?.donors ?? 0, color: "#D62839" },
                { label: "Volunteers", value: adminStats.users?.volunteers ?? 0, color: "#2563EB" },
                { label: "Admins", value: adminStats.users?.admins ?? 0, color: "#16A34A" },
              ].map((item) => {
                const maxVal = Math.max(
                  adminStats.users?.donors ?? 0,
                  adminStats.users?.volunteers ?? 0,
                  adminStats.users?.admins ?? 0,
                  1
                );
                const height = Math.max(20, (item.value / maxVal) * 200);
                return (
                  <div key={item.label} className="flex h-full flex-1 flex-col items-center justify-end">
                    <div className="mb-2 text-xs font-bold text-[#111827]">
                      {item.value}
                    </div>
                    <div
                      className="w-full max-w-[48px] rounded-t-lg transition-all duration-300"
                      style={{ height: `${height}px`, backgroundColor: item.color }}
                    />
                    <span className="mt-2 text-[10px] font-medium text-[#64748B]">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-7 flex h-[260px] items-center justify-center text-sm text-[#64748B]">
              No data available
            </div>
          )}
        </div>

      </section>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

        <div>
          <h2 className="text-sm font-bold text-[#111827]">
            Donation Status
          </h2>

          <p className="mt-1 text-xs text-[#64748B]">
            Distribution of all blood donation requests
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">

          {donationStatus.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-xl border border-[#F1F5F9] bg-[#FAFBFC] p-4"
              >

                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  <Icon size={18} />
                </div>

                <p className="mt-4 text-xl font-black text-[#111827]">
                  {item.value}
                </p>

                <p className="mt-1 text-xs font-medium text-[#64748B]">
                  {item.label}
                </p>

              </div>
            );
          })}

        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)] xl:col-span-2">

          <div className="flex items-center justify-between border-b border-[#F1F5F9] px-5 py-4">

            <div>
              <h2 className="text-sm font-bold text-[#111827]">
                Recent Blood Requests
              </h2>

              <p className="mt-1 text-xs text-[#64748B]">
                Latest requests from the community
              </p>
            </div>

            <a
              href="/admin/requests"
              className="text-xs font-bold text-[#D62839] hover:underline"
            >
              View All
            </a>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] text-left">

              <thead>
                <tr className="border-b border-[#F1F5F9] text-[10px] uppercase tracking-wider text-[#94A3B8]">
                  <th className="px-5 py-3 font-bold">
                    Request
                  </th>

                  <th className="px-5 py-3 font-bold">
                    Blood
                  </th>

                  <th className="px-5 py-3 font-bold">
                    Hospital
                  </th>

                  <th className="px-5 py-3 font-bold">
                    Status
                  </th>

                  <th className="px-5 py-3 font-bold">
                    Time
                  </th>
                </tr>
              </thead>

              <tbody>

                {requestsLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#F8FAFC] last:border-0"
                    >
                      <td className="px-5 py-4">
                        <div className="space-y-2">
                          <div className="h-3.5 w-32 rounded bg-slate-200" />
                          <div className="h-2.5 w-24 rounded bg-slate-100" />
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="h-6 w-10 rounded-lg bg-slate-200" />
                      </td>

                      <td className="px-5 py-4">
                        <div className="h-3 w-28 rounded bg-slate-100" />
                      </td>

                      <td className="px-5 py-4">
                        <div className="h-5 w-16 rounded-full bg-slate-200" />
                      </td>

                      <td className="px-5 py-4">
                        <div className="h-3 w-16 rounded bg-slate-100" />
                      </td>
                    </tr>
                  ))
                ) : requestsError ? (
                  <tr className="border-b border-[#F8FAFC]">
                    <td colSpan={5} className="px-5 py-8 text-center">
                      <p className="text-sm font-medium text-[#64748B]">
                        Failed to load blood requests.
                      </p>
                    </td>
                  </tr>
                ) : recentRequests.length === 0 ? (
                  <tr className="border-b border-[#F8FAFC]">
                    <td colSpan={5} className="px-5 py-8 text-center">
                      <p className="text-sm font-medium text-[#64748B]">
                        No blood requests found.
                      </p>
                    </td>
                  </tr>
                ) : (
                  recentRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-[#F8FAFC] last:border-0 hover:bg-[#FFF7F8]"
                    >

                      <td className="px-5 py-4">

                        <div>
                          <p className="text-sm font-bold text-[#111827]">
                            {request.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-[#94A3B8]">
                            {request.id}
                          </p>
                        </div>

                      </td>

                      <td className="px-5 py-4">

                        <span className="inline-flex rounded-lg bg-[#FDECEF] px-2.5 py-1 text-xs font-black text-[#D62839]">
                          {request.blood}
                        </span>

                      </td>

                      <td className="px-5 py-4 text-xs text-[#64748B]">
                        {request.hospital}
                      </td>

                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            request.status === "Urgent"
                              ? "bg-red-50 text-red-600"
                              : request.status === "Pending"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {request.status}
                        </span>

                      </td>

                      <td className="px-5 py-4 text-xs text-[#94A3B8]">
                        {request.date}
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839]">
              <CircleDollarSign size={19} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#111827]">
                Funding Overview
              </h2>

              <p className="text-xs text-[#64748B]">
                Community funding
              </p>
            </div>

          </div>

          <div className="mt-7">

            <div className="flex items-end justify-between">

              <div>
                <p className="text-xs text-[#64748B]">
                  Total Raised
                </p>

                <p className="mt-1 text-2xl font-black text-[#111827]">
                  {adminStats
                    ? `$${(adminStats.funding?.total ?? 0).toLocaleString()}`
                    : adminStatsLoading
                      ? "Loading..."
                      : "$0"}
                </p>
              </div>

            </div>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#F1F5F9]">
              <div
                className="h-full rounded-full bg-[#D62839]"
                style={{ width: "0%" }}
              />
            </div>

            <div className="mt-2 flex justify-between text-[10px] text-[#94A3B8]">
              <span>Community contributions</span>
              <span>Thank you for supporting</span>
            </div>

          </div>

          <div className="mt-7 rounded-xl bg-[#FFF7F8] p-4">

            <div className="flex items-center gap-2">

              <Activity
                size={16}
                className="text-[#D62839]"
              />

              <span className="text-xs font-bold text-[#334155]">
                Campaign Progress
              </span>

            </div>

            <p className="mt-2 text-xs leading-5 text-[#64748B]">
              Total community contributions to support BloodBridge.
            </p>

          </div>

        </div>

      </section>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

        <div className="flex items-center justify-between border-b border-[#F1F5F9] px-5 py-4">

          <div>
            <h2 className="text-sm font-bold text-[#111827]">
              Recently Joined
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              Latest members of the BloodBridge community
            </p>
          </div>

          <a
            href="/admin/users"
            className="text-xs font-bold text-[#D62839] hover:underline"
          >
            View All
          </a>

        </div>

        <div className="grid grid-cols-1 divide-y divide-[#F1F5F9] md:grid-cols-2 md:divide-x md:divide-y-0">

  {usersLoading ? (
    Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-5 animate-pulse"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200" />

          <div>
            <div className="h-3 w-28 rounded bg-slate-200" />
            <div className="mt-2 h-2.5 w-40 rounded bg-slate-100" />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="h-5 w-16 rounded-full bg-slate-200" />
          <div className="mt-2 h-2.5 w-14 rounded bg-slate-100" />
        </div>
      </div>
    ))
  ) : recentUsers.length > 0 ? (
    recentUsers.map((member) => (
      <div
        key={member.id}
        className="flex items-center justify-between p-5 hover:bg-[#FFF7F8]"
      >

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDECEF] text-sm font-black text-[#D62839]">
            {member.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <p className="text-sm font-bold text-[#111827]">
              {member.name || "Unknown User"}
            </p>

            <p className="mt-0.5 text-xs text-[#64748B]">
              {member.email || "No email"}
            </p>
          </div>

        </div>

        <div className="text-right">

          <span className="inline-flex rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[10px] font-bold text-[#475569]">
            {member.role || "Unknown"}
          </span>

          <p className="mt-1 text-[10px] text-[#94A3B8]">
            {getRelativeTime(member.joined)}
          </p>

        </div>

      </div>
    ))
  ) : (
    <div className="col-span-full p-8 text-center">
      <p className="text-sm font-medium text-[#64748B]">
        No users found.
      </p>
    </div>
  )}

</div>

      </section>

    </div>
  );
}
