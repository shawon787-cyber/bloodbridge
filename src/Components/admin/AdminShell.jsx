"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import DashboardSidebar from "./DashboardSidebar";

export default function AdminShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = useSession();

  const user = session?.user;
  const role = user?.role;

  // Redirect to the correct dashboard for the user's role
  useEffect(() => {
    if (!role) return;

    if (role === "admin" && !pathname.startsWith("/admin")) {
      router.push("/admin");
    } else if (role === "volunteer" && !pathname.startsWith("/volunteer")) {
      router.push("/volunteer");
    } else if (role === "donor" && !pathname.startsWith("/dashboard")) {
      router.push("/dashboard");
    }
  }, [role, pathname, router]);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut();

      setSidebarOpen(false);

      router.push("/");

      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Loading
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF7F8]">
        <p className="text-sm font-medium text-[#D62839]">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // If session is loaded but there is no valid role, don't render anything
  if (!role || !["admin", "volunteer", "donor"].includes(role)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFF7F8]">

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="lg:ml-[265px]">

        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-[#F0DADD] bg-white/90 px-4 backdrop-blur lg:hidden">

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-[#8F1117] hover:bg-[#FFF0F2]"
          >
            ☰
          </button>

          <span className="ml-3 font-bold text-[#171717]">
            BloodBridge
          </span>

        </header>

        {/* Page Content */}
        <main className="min-h-screen p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}