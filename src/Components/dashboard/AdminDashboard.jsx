"use client";

import {
  Users,
  Droplets,
  WalletCards,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  UserPlus,
  Clock3,
  CheckCircle2,
  XCircle,
  CircleDollarSign,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";

/* =========================================================
   TEMPORARY DASHBOARD DATA
   Later these values can come from MongoDB/API
========================================================= */

const monthlyRequests = [
  { month: "Mar", requests: 320, completed: 210 },
  { month: "Apr", requests: 405, completed: 270 },
  { month: "May", requests: 380, completed: 295 },
  { month: "Jun", requests: 470, completed: 350 },
  { month: "Jul", requests: 525, completed: 405 },
  { month: "Aug", requests: 590, completed: 455 },
];

const bloodGroups = [
  { group: "A+", value: 820 },
  { group: "A-", value: 190 },
  { group: "B+", value: 635 },
  { group: "B-", value: 150 },
  { group: "AB+", value: 205 },
  { group: "AB-", value: 70 },
  { group: "O+", value: 950 },
  { group: "O-", value: 175 },
];

const donationStatus = [
  {
    label: "Pending",
    value: 18,
    color: "#F59E0B",
    icon: Clock3,
  },
  {
    label: "In Progress",
    value: 12,
    color: "#2563EB",
    icon: Activity,
  },
  {
    label: "Completed",
    value: 64,
    color: "#16A34A",
    icon: CheckCircle2,
  },
  {
    label: "Cancelled",
    value: 6,
    color: "#D62839",
    icon: XCircle,
  },
];

const recentRequests = [
  {
    id: "BR-001",
    name: "Rahim Uddin",
    blood: "A+",
    hospital: "Dhaka Medical College",
    status: "Urgent",
    date: "2 hours ago",
  },
  {
    id: "BR-002",
    name: "Fatima Begum",
    blood: "O-",
    hospital: "Square Hospital",
    status: "Pending",
    date: "5 hours ago",
  },
  {
    id: "BR-003",
    name: "Karim Hossain",
    blood: "B+",
    hospital: "Popular Hospital",
    status: "Completed",
    date: "1 day ago",
  },
  {
    id: "BR-004",
    name: "Nasreen Akter",
    blood: "AB+",
    hospital: "United Hospital",
    status: "Urgent",
    date: "1 day ago",
  },
];

const recentUsers = [
  {
    name: "Arif Khan",
    email: "arif@email.com",
    role: "Donor",
    joined: "2 hours ago",
  },
  {
    name: "Sabina Yesmin",
    email: "sabina@email.com",
    role: "Volunteer",
    joined: "5 hours ago",
  },
  {
    name: "Jamal Mia",
    email: "jamal@email.com",
    role: "Donor",
    joined: "1 day ago",
  },
  {
    name: "Taslima Rahman",
    email: "taslima@email.com",
    role: "Volunteer",
    joined: "2 days ago",
  },
];

/* =========================================================
   DASHBOARD COMPONENT
========================================================= */

export default function AdminDashboard() {
  const { data: session } = useSession();

  const user = session?.user;

  const userName = user?.name || "Admin";

  /*
    Since this is currently frontend-based,
    role is read from session.user.role.

    Later you can replace dashboard data with
    real MongoDB/API data.
  */
  const role = user?.role || "admin";

  /* =========================================================
     STATISTICS
  ========================================================= */

  const stats = [
    {
      label: "Total Donors",
      value: "3,204",
      change: "+12.5%",
      positive: true,
      icon: Users,
    },
    {
      label: "Total Funding",
      value: "৳14,850",
      change: "+8.2%",
      positive: true,
      icon: WalletCards,
    },
    {
      label: "Total Requests",
      value: "504",
      change: "+5.4%",
      positive: true,
      icon: Droplets,
    },
  ];

  return (
    <div className="min-h-screen space-y-7">

      {/* =====================================================
          WELCOME SECTION
      ===================================================== */}

      <section>
        <h1 className="text-2xl font-black tracking-tight text-[#111827] sm:text-3xl">
          Welcome back, {userName}
        </h1>

        <p className="mt-1 text-sm text-[#64748B]">
          Here&apos;s an overview of the BloodBridge community.
        </p>

        {/* Current Role */}
        <div className="mt-3 inline-flex items-center rounded-full bg-[#FDECEF] px-3 py-1 text-xs font-bold capitalize text-[#D62839]">
          {role} Account
        </div>
      </section>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

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

      {/* =====================================================
          CHARTS
      ===================================================== */}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Donation Requests Chart */}

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

          <div>
            <h2 className="text-sm font-bold text-[#111827]">
              Donation Requests
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              Requests vs completed donations, last 6 months
            </p>
          </div>

          <div className="mt-7">

            {/* Chart */}

            <div className="relative h-[260px]">

              {/* Horizontal Lines */}

              <div className="absolute inset-0 flex flex-col justify-between">

                {[600, 450, 300, 150, 0].map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-3"
                  >
                    <span className="w-7 text-right text-[10px] text-[#94A3B8]">
                      {value}
                    </span>

                    <div className="h-px flex-1 border-t border-dashed border-[#E2E8F0]" />
                  </div>
                ))}

              </div>

              {/* SVG Line */}

              <svg
                viewBox="0 0 600 240"
                preserveAspectRatio="none"
                className="absolute left-10 right-0 top-0 h-[230px] w-[calc(100%-40px)]"
              >

                {/* Requests */}

                <polyline
                  points="0,120 120,65 240,78 360,35 480,22 600,0"
                  fill="none"
                  stroke="#D62839"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Completed */}

                <polyline
                  points="0,165 120,135 240,120 360,95 480,65 600,45"
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

              {/* Months */}

              <div className="absolute bottom-0 left-10 right-0 flex justify-between">
                {monthlyRequests.map((item) => (
                  <span
                    key={item.month}
                    className="text-[10px] text-[#64748B]"
                  >
                    {item.month}
                  </span>
                ))}
              </div>

            </div>

            {/* Legend */}

            <div className="mt-4 flex items-center justify-center gap-6 text-xs">

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D62839]" />
                <span className="text-[#64748B]">
                  Requests
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                <span className="text-[#64748B]">
                  Completed
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* Blood Group Distribution */}

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

          <div>
            <h2 className="text-sm font-bold text-[#111827]">
              Blood Group Distribution
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              Registered donors by blood group
            </p>
          </div>

          <div className="mt-7 flex h-[260px] items-end justify-between gap-2 px-1">

            {bloodGroups.map((item) => {

              const height = Math.max(
                10,
                (item.value / 1000) * 210
              );

              return (
                <div
                  key={item.group}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >

                  <div className="mb-2 text-[10px] font-semibold text-[#64748B]">
                    {item.value}
                  </div>

                  <div
                    className="w-full max-w-[38px] rounded-t-lg bg-[#D62839] transition-all duration-300 hover:bg-[#A4161A]"
                    style={{
                      height: `${height}px`,
                    }}
                  />

                  <span className="mt-2 text-[10px] font-medium text-[#64748B]">
                    {item.group}
                  </span>

                </div>
              );
            })}

          </div>
        </div>

      </section>

      {/* =====================================================
          DONATION STATUS
      ===================================================== */}

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

      {/* =====================================================
          RECENT REQUESTS + FUNDING
      ===================================================== */}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Recent Requests */}

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

                {recentRequests.map((request) => (
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
                ))}

              </tbody>

            </table>
          </div>
        </div>

        {/* Funding Overview */}

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
                  ৳14,850
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-600">
                78%
              </span>

            </div>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#F1F5F9]">
              <div
                className="h-full rounded-full bg-[#D62839]"
                style={{ width: "78%" }}
              />
            </div>

            <div className="mt-2 flex justify-between text-[10px] text-[#94A3B8]">
              <span>Raised</span>
              <span>Goal ৳20,000</span>
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
              ৳5,150 more funding is needed to reach the current goal.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          RECENT USERS
      ===================================================== */}

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

          {recentUsers.map((member) => (
            <div
              key={member.email}
              className="flex items-center justify-between p-5 hover:bg-[#FFF7F8]"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDECEF] text-sm font-black text-[#D62839]">
                  {member.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-bold text-[#111827]">
                    {member.name}
                  </p>

                  <p className="mt-0.5 text-xs text-[#64748B]">
                    {member.email}
                  </p>
                </div>

              </div>

              <div className="text-right">

                <span className="inline-flex rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[10px] font-bold text-[#475569]">
                  {member.role}
                </span>

                <p className="mt-1 text-[10px] text-[#94A3B8]">
                  {member.joined}
                </p>

              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}