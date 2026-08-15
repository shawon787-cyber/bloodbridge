"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserRound,
  Users,
  Droplets,
  WalletCards,
  LogOut,
  HeartPulse,
  X,
  History,
} from "lucide-react";

const menuItems = {
  admin: [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      href: "/admin/profile",
      icon: UserRound,
    },
    {
      label: "All Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      label: "Blood Requests",
      href: "/admin/requests",
      icon: Droplets,
    },
    {
      label: "Funding",
      href: "/admin/funding",
      icon: WalletCards,
    },
  ],

  volunteer: [
    {
      label: "Dashboard",
      href: "/volunteer",
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      href: "/volunteer/profile",
      icon: UserRound,
    },
    {
      label: "Blood Requests",
      href: "/volunteer/requests",
      icon: Droplets,
    },
    {
      label: "Donors",
      href: "/volunteer/donors",
      icon: Users,
    },
    {
      label: "Funding",
      href: "/volunteer/funding",
      icon: WalletCards,
    },
  ],

  donor: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
    {
      label: "My Donation Requests",
      href: "/dashboard/my-donation-requests",
      icon: Droplets,
    },
    {
      label: "Create Donation Request",
      href: "/dashboard/create-donation-request",
      icon: History,
    },
    {
      label: "Funding",
      href: "/funding",
      icon: WalletCards,
    },
  ],
};

const roleConfig = {
  admin: {
    title: "Admin Panel",
  },
  volunteer: {
    title: "Volunteer Panel",
  },
  donor: {
    title: "Donor Panel",
  },
};

const DashboardSidebar = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const pathname = usePathname();

  const { data: session, isPending } = useSession();

  // ================= SESSION LOADING =================

  if (isPending) {
    return (
      <aside
        className="
          fixed left-0 top-0 z-50
          flex h-screen w-[265px]
          flex-col
          border-r border-[#E5E7EB]
          bg-white
        "
      >
        {/* Logo Loading */}
        <div className="flex h-[72px] items-center gap-3 px-5">
          <div className="h-10 w-10 animate-pulse rounded-full bg-[#FDECEF]" />

          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-2 w-20 animate-pulse rounded bg-slate-100" />
          </div>
        </div>

        {/* Menu Loading */}
        <div className="flex-1 px-4 py-5">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex h-11 items-center gap-3 rounded-xl px-4"
              >
                <div className="h-[18px] w-[18px] animate-pulse rounded bg-slate-200" />

                <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout Loading */}
        <div className="border-t border-[#F1F3F5] p-4">
          <div className="flex h-11 items-center gap-3 rounded-xl px-4">
            <div className="h-[18px] w-[18px] animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </aside>
    );
  }

  // ================= SESSION LOADED =================

  const user = session?.user;
  const role = user?.role;

  const currentRole =
    role && menuItems[role] ? role : null;

  // কোনো valid role না থাকলে sidebar render করবে না
  if (!currentRole) {
    return null;
  }

  const currentMenuItems = menuItems[currentRole];

  const panelTitle = roleConfig[currentRole].title;

  const matchingItems = currentMenuItems.filter(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
  );

  const activeItem = matchingItems.sort(
    (a, b) => b.href.length - a.href.length
  )[0];

  return (
    <>
      {/* ================= MOBILE OVERLAY ================= */}

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-[265px]
          flex-col
          border-r border-[#E5E7EB]
          bg-white
          transition-transform
          duration-300
          ease-in-out
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ================= LOGO ================= */}

        <div className="flex h-[72px] items-center justify-between px-5">
          <Link
            href={currentMenuItems[0].href}
            onClick={onClose}
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D62839] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <HeartPulse
                size={20}
                strokeWidth={2.5}
              />
            </div>

            <div>
              <h1 className="text-[17px] font-black tracking-tight text-[#111827]">
                Blood
                <span className="text-[#D62839]">
                  Bridge
                </span>
              </h1>

              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9CA3AF]">
                {panelTitle}
              </p>
            </div>
          </Link>

          {/* Mobile Close */}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#FFF4F5] hover:text-[#D62839] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}

        <nav className="flex-1 px-4 py-5">
          <div className="space-y-1.5">
            {currentMenuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                activeItem?.href === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center gap-3
                    rounded-xl px-4 py-3
                    text-sm font-semibold
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#D62839] text-white shadow-[0_8px_20px_rgba(214,40,57,0.18)]"
                        : "text-[#64748B] hover:bg-[#FFF4F5] hover:text-[#D62839]"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={
                      isActive ? 2.5 : 2
                    }
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ================= LOGOUT ================= */}

        <div className="border-t border-[#F1F3F5] p-4">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#D62839] transition-colors hover:bg-[#FFF4F5]"
          >
            <LogOut
              size={18}
              strokeWidth={2}
            />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;