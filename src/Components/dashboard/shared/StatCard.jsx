"use client";

import { LucideIcon } from "lucide-react";

const StatCard = ({ title, value, change, positive, icon: Icon, color = "#D62839" }) => {
  return (
    <div className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}15`, color }}
        >
          <Icon size={20} strokeWidth={2} />
        </div>

        {change && (
          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
              positive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {positive ? "↑" : "↓"}
            {change}
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-2xl font-black text-[#111827]">{value}</p>
        <p className="mt-1 text-sm font-medium text-[#64748B]">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
