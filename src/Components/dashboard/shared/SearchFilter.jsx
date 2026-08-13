"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

const SearchFilter = ({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  onClear,
  children,
}) => {
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
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-[#E5E7EB] bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-[#111827] placeholder:text-[#94A3B8] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5">
            <SlidersHorizontal size={16} className="text-[#94A3B8]" />
            <span className="text-xs font-semibold text-[#64748B]">Filters</span>
          </div>

          {(search || filters) && (
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

      {children}
    </div>
  );
};

export default SearchFilter;
