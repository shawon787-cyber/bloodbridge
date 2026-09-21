"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const PageHeader = ({
  badge,
  badgeIcon,
  title,
  subtitle,
  align = "center",
  className = "",
  children,
}) => {
  const alignment =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <section className={`relative overflow-hidden bg-white ${className}`}>
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[#FDECEF] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-20 h-72 w-72 rounded-full bg-[#FFF0F2] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className={`flex flex-col ${alignment} gap-4`}>
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F5C9CF] bg-white px-4 py-2 shadow-sm">
              {badgeIcon && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF0F2] text-[#D62839]">
                  {badgeIcon}
                </span>
              )}
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D62839]">
                {badge}
              </span>
            </div>
          )}

          <h1 className="max-w-3xl text-3xl font-black leading-[1.08] tracking-[-0.04em] text-[#171717] sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="max-w-2xl text-sm leading-6 text-[#6F6F6F] sm:text-base sm:leading-7">
              {subtitle}
            </p>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
