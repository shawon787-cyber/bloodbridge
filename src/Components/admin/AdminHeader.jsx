"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const AdminHeader = ({ onMenuClick }) => {
  const { data: session } = useSession();

  const user = session?.user;
  const role = user?.role || "donor";

  // Role অনুযায়ী information
  const roleConfig = {
    admin: {
      title: "Admin Dashboard",
      subtitle: "Manage your BloodBridge community",
      label: "Administrator",
    },

    volunteer: {
      title: "Volunteer Dashboard",
      subtitle: "Help manage blood donation activities",
      label: "Volunteer",
    },

    donor: {
      title: "Donor Dashboard",
      subtitle: "Manage your donor profile and activities",
      label: "Blood Donor",
    },
  };

  const currentRole = roleConfig[role] || roleConfig.donor;

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#E5E7EB] bg-white/95 px-5 backdrop-blur-md sm:px-6 lg:px-8">

      {/* ================= LEFT ================= */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#64748B] transition-colors hover:bg-[#FFF4F5] hover:text-[#D62839] lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={21} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-[#111827]">
            {currentRole.title}
          </h2>

          <p className="hidden text-xs text-[#94A3B8] sm:block">
            {currentRole.subtitle}
          </p>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-3">

        {/* Notification */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#64748B] transition-colors hover:bg-[#FFF4F5] hover:text-[#D62839]"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-[#D62839] ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-[#E5E7EB] sm:block" />

        {/* User */}
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#FCE4E7] bg-[#FFF0F2]">

            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#D62839]">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

          </div>

          {/* User Info */}
          <div className="hidden sm:block">

            <p className="max-w-[140px] truncate text-sm font-bold text-[#1F2937]">
              {user?.name || "User"}
            </p>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#D62839]">
              {currentRole.label}
            </p>

          </div>

          <ChevronDown
            size={16}
            className="hidden text-[#94A3B8] sm:block"
          />

        </div>

      </div>

    </header>
  );
};

export default AdminHeader;