"use client";

import { LucideIcon } from "lucide-react";

const SectionTitle = ({
  badge,
  badgeIcon,
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignment =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`flex flex-col ${alignment} gap-3 ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full border border-[#F5C9CF] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#C91F32] shadow-sm">
          {badgeIcon && <span className="text-[#D62839]">{badgeIcon}</span>}
          {badge}
        </div>
      )}

      <h2 className="text-2xl font-black leading-tight tracking-[-0.035em] text-[#171717] sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="max-w-2xl text-sm leading-6 text-[#6F6F6F] sm:text-base sm:leading-7">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
