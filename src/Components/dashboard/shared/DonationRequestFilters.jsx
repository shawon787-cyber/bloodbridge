"use client";

import { useMemo } from "react";
import { BLOOD_GROUPS, URGENCY_LEVELS, getUrgencyStyle } from "@/lib/donationRequests";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

const DonationRequestFilters = ({
  search,
  onSearchChange,
  filters = {},
  onFilterChange,
  onClear,
  requests = [],
  showDistrict = true,
  showUpazila = true,
}) => {
  const {
    bloodGroup = "",
    status = "",
    urgency = "",
    location = "",
    district = "",
    upazila = "",
  } = filters;

  const districtOptions = useMemo(() => {
    const map = new Map();
    requests.forEach((req) => {
      const name = req.districtName || req.location || "";
      if (name && !map.has(name)) {
        map.set(name, name);
      }
    });
    return Array.from(map.values()).sort();
  }, [requests]);

  const upazilaOptions = useMemo(() => {
    const map = new Map();
    requests.forEach((req) => {
      const name = req.upazilaName || "";
      if (name && !map.has(name)) {
        map.set(name, name);
      }
    });
    return Array.from(map.values()).sort();
  }, [requests]);

  const hasActiveFilters =
    search || bloodGroup || status || urgency || location || district || upazila;

  const handleChange = (key, value) => {
    onFilterChange?.({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />
          <input
            type="text"
            placeholder="Search by ID, patient, hospital, location..."
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full rounded-xl border border-[#E5E7EB] bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-[#111827] placeholder:text-[#94A3B8] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5">
            <SlidersHorizontal size={16} className="text-[#94A3B8]" />
            <span className="text-xs font-semibold text-[#64748B]">Filters</span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-xs font-semibold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839]"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={bloodGroup}
            onChange={(e) => handleChange("bloodGroup", e.target.value)}
            className="appearance-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 pr-9 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Blood Groups</option>
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
        </div>

        <div className="relative">
          <select
            value={status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="appearance-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 pr-9 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Statuses</option>
            {["Pending", "In Progress", "Done", "Cancelled"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
        </div>

        <div className="relative">
          <select
            value={urgency}
            onChange={(e) => handleChange("urgency", e.target.value)}
            className="appearance-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 pr-9 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          >
            <option value="">All Urgencies</option>
            {URGENCY_LEVELS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
        </div>

        {showDistrict && (
          <div className="relative">
            <select
              value={district}
              onChange={(e) => handleChange("district", e.target.value)}
              className="appearance-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 pr-9 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
            >
              <option value="">All Districts</option>
              {districtOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
          </div>
        )}

        {showUpazila && (
          <div className="relative">
            <select
              value={upazila}
              onChange={(e) => handleChange("upazila", e.target.value)}
              className="appearance-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 pr-9 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
            >
              <option value="">All Upazilas</option>
              {upazilaOptions.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationRequestFilters;
