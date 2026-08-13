"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HeartPulse,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  UserRound,
  LogOut,
  Droplet,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Donation Requests",
    href: "/donation-requests",
  },
  {
    label: "Search Donors",
    href: "/search",
  },
  {
    label: "Funding",
    href: "/funding",
  },
];

const Navbar = () => {
  const [imageError, setImageError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { data:session, isPending } =useSession();
  // console.log("Session data:", session, "Is pending:", isPending);
  const user = session?.user;

  // Replace this with your real authentication state
  const isLoggedIn = !!session?.user;
  const handleLogout = async () => {
  try {
    await signOut();

    setUserMenu(false);
    setIsOpen(false);

    
    router.push("/");
    router.refresh();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-2.5"
        >
          {/* Logo Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D62839] text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
            <HeartPulse size={21} strokeWidth={2.4} />
          </div>

          {/* Logo Text */}
          <div className="leading-none">
            <span className="block text-[20px] font-extrabold tracking-tight text-slate-900">
              Blood<span className="text-[#D62839]">Bridge</span>
            </span>

            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Connect • Donate • Save
            </span>
          </div>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-[#FDECEF] hover:text-[#D62839]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ================= DESKTOP RIGHT ================= */}
        <div className="hidden items-center gap-3 lg:flex">

          {!isLoggedIn ? (
            <>
              {/* Login */}
              <Link
                href="/auth/SignInPage"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-[#D62839]"
              >
                Login
              </Link>

              {/* Become Donor */}
              <Link
                href="/auth/SignUpPage"
                className="group flex items-center gap-2 rounded-xl bg-[#D62839] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(214,40,57,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A4161A] hover:shadow-[0_8px_24px_rgba(214,40,57,0.25)]"
              >
                <Droplet
                  size={16}
                  fill="currentColor"
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                Become a Donor
              </Link>
            </>
          ) : (
            /* ================= USER MENU ================= */
            <div className="relative">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
              >
                {/* Avatar */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FDECEF] text-sm font-bold text-[#D62839]">
                    {user?.image && !imageError ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user?.name?.trim()?.charAt(0)?.toUpperCase() || "U"
                    )}
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  {user?.name || "User"}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 ${
                    userMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {userMenu && (
                <div className="absolute right-0 top-12 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#D62839]"
                  >
                    <LayoutDashboard size={17} />
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#D62839]"
                  >
                    <UserRound size={17} />
                    Profile
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                  onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-all duration-200 hover:bg-slate-50 lg:hidden"
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 lg:hidden ${
          isOpen
            ? "max-h-[520px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">

          {/* Mobile Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-[#FDECEF] hover:text-[#D62839]"
            >
              {link.label}
            </Link>
          ))}

          <div className="my-3 border-t border-slate-100" />

          {/* Mobile Auth */}
          {!isLoggedIn ? (
            <div className="grid grid-cols-2 gap-3">

              <Link
                href="/auth/SignInPage"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Login
              </Link>

              <Link
                href="/auth/SignUpPage"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#D62839] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#A4161A]"
              >
                <Droplet size={16} fill="currentColor" />
                Become a Donor
              </Link>

            </div>
          ) : (
            <div className="space-y-1">

              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link
                href="/dashboard/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                <UserRound size={18} />
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;