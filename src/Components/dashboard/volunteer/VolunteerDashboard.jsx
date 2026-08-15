"use client";

import {
  ClipboardList,
  Clock3,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";
import { useDonationRequests } from "@/context/DonationRequestContext";
import { getRequestStats } from "@/lib/donationRequests";

// =====================================================
// DONATION REQUEST CHART DATA
// =====================================================

const requestChartData = [
  { month: "Mar", requests: 320, completed: 210 },
  { month: "Apr", requests: 410, completed: 260 },
  { month: "May", requests: 380, completed: 300 },
  { month: "Jun", requests: 470, completed: 350 },
  { month: "Jul", requests: 520, completed: 400 },
  { month: "Aug", requests: 590, completed: 460 },
];

// =====================================================
// BLOOD GROUP DATA
// =====================================================

const bloodGroups = [
  { group: "A+", value: 820 },
  { group: "A-", value: 190 },
  { group: "B+", value: 650 },
  { group: "B-", value: 150 },
  { group: "AB+", value: 210 },
  { group: "AB-", value: 70 },
  { group: "O+", value: 940 },
  { group: "O-", value: 180 },
];

// =====================================================
// LINE CHART
// =====================================================

function DonationRequestChart() {
  const width = 620;
  const height = 300;

  const paddingLeft = 55;
  const paddingRight = 15;
  const paddingTop = 25;
  const paddingBottom = 45;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxValue = 600;

  const getX = (index) => {
    return (
      paddingLeft +
      (index / (requestChartData.length - 1)) * chartWidth
    );
  };

  const getY = (value) => {
    return (
      paddingTop +
      chartHeight -
      (value / maxValue) * chartHeight
    );
  };

  const requestPoints = requestChartData
    .map((item, index) => `${getX(index)},${getY(item.requests)}`)
    .join(" ");

  const completedPoints = requestChartData
    .map((item, index) => `${getX(index)},${getY(item.completed)}`)
    .join(" ");

  const yLabels = [0, 150, 300, 450, 600];

  return (
    <div className="mt-5 w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        preserveAspectRatio="none"
      >
        {/* =========================
            GRID LINES
        ========================= */}

        {yLabels.map((value) => {
          const y = getY(value);

          return (
            <g key={value}>
              <line
                x1={paddingLeft}
                x2={width - paddingRight}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="5 5"
              />

              <text
                x={paddingLeft - 12}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#64748b"
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* =========================
            RED LINE
        ========================= */}

        <polyline
          points={requestPoints}
          fill="none"
          stroke="#D62839"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* =========================
            GREEN LINE
        ========================= */}

        <polyline
          points={completedPoints}
          fill="none"
          stroke="#16a34a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* =========================
            RED DOTS
        ========================= */}

        {requestChartData.map((item, index) => (
          <circle
            key={`request-${item.month}`}
            cx={getX(index)}
            cy={getY(item.requests)}
            r="3.5"
            fill="#D62839"
          />
        ))}

        {/* =========================
            GREEN DOTS
        ========================= */}

        {requestChartData.map((item, index) => (
          <circle
            key={`completed-${item.month}`}
            cx={getX(index)}
            cy={getY(item.completed)}
            r="3.5"
            fill="#16a34a"
          />
        ))}

        {/* =========================
            MONTH LABELS
        ========================= */}

        {requestChartData.map((item, index) => (
          <text
            key={item.month}
            x={getX(index)}
            y={height - 18}
            textAnchor="middle"
            fontSize="12"
            fill="#64748b"
          >
            {item.month}
          </text>
        ))}
      </svg>
    </div>
  );
}

// =====================================================
// BLOOD GROUP BAR CHART
// =====================================================

function BloodGroupChart() {
  const width = 620;
  const height = 300;

  const paddingLeft = 55;
  const paddingRight = 15;
  const paddingTop = 25;
  const paddingBottom = 45;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxValue = 1000;

  const barGap = 12;

  const barWidth =
    (chartWidth - barGap * (bloodGroups.length - 1)) /
    bloodGroups.length;

  const getY = (value) => {
    return (
      paddingTop +
      chartHeight -
      (value / maxValue) * chartHeight
    );
  };

  const yLabels = [0, 250, 500, 750, 1000];

  return (
    <div className="mt-5 w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        preserveAspectRatio="none"
      >
        {/* =========================
            GRID LINES
        ========================= */}

        {yLabels.map((value) => {
          const y = getY(value);

          return (
            <g key={value}>
              <line
                x1={paddingLeft}
                x2={width - paddingRight}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="5 5"
              />

              <text
                x={paddingLeft - 12}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#64748b"
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* =========================
            BARS
        ========================= */}

        {bloodGroups.map((item, index) => {
          const x =
            paddingLeft +
            index * (barWidth + barGap);

          const y = getY(item.value);

          const barHeight =
            paddingTop + chartHeight - y;

          return (
            <g key={item.group}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="9"
                fill="#D62839"
              />

              <text
                x={x + barWidth / 2}
                y={height - 18}
                textAnchor="middle"
                fontSize="12"
                fill="#64748b"
              >
                {item.group}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function VolunteerDashboard({ user }) {
  const { requests, isInitialized } = useDonationRequests();
  const stats = getRequestStats(requests);

  const statCards = [
    {
      label: "Total Requests",
      value: stats.total,
      icon: ClipboardList,
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock3,
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: LoaderCircle,
    },
    {
      label: "Completed",
      value: stats.done,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-full bg-[#f8fafc]">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-7 sm:px-6 lg:px-8">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Welcome back, {user?.name || "Shawonmohammad"}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Here&apos;s an overview of the whole community.
          </p>
        </div>

        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FDECEF] text-[#D62839]">
                    <Icon size={21} strokeWidth={2} />
                  </div>

                  {/* Content */}

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>

                    <p className="mt-1 text-2xl font-black leading-none text-slate-950">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================
            CHARTS
        ================================================= */}

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* =================================================
              DONATION REQUESTS
          ================================================= */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
            <div className="px-5 pt-5 sm:px-6 sm:pt-6">
              <h2 className="text-sm font-bold text-slate-950">
                Donation Requests
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Requests vs completed donations, last 6 months
              </p>
            </div>

            <DonationRequestChart />

            {/* Legend */}

            <div className="flex items-center gap-5 px-6 pb-5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D62839]" />
                <span className="text-xs text-slate-500">
                  Requests
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                <span className="text-xs text-slate-500">
                  Completed
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              BLOOD GROUP DISTRIBUTION
          ================================================= */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
            <div className="px-5 pt-5 sm:px-6 sm:pt-6">
              <h2 className="text-sm font-bold text-slate-950">
                Blood Group Distribution
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Registered donors by group
              </p>
            </div>

            <BloodGroupChart />
          </div>
        </div>
      </div>
    </div>
  );
}
