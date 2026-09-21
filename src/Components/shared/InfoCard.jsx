"use client";

import { CheckCircle2, LucideIcon } from "lucide-react";

const InfoCard = ({
  icon,
  title,
  description,
  points = [],
  className = "",
  children,
  iconClassName = "",
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-[#F4D4D8] bg-white p-5 shadow-[0_8px_30px_rgba(185,28,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E9AEB5] hover:shadow-[0_18px_45px_rgba(185,28,28,0.10)] sm:rounded-3xl sm:p-7 ${className}`}
    >
      {/* Decorative Circle */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FFF0F2] transition-transform duration-500 group-hover:scale-110 sm:h-40 sm:w-40" />

      {/* Icon */}
      <div
        className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839] transition-all duration-300 group-hover:bg-[#D62839] group-hover:text-white sm:h-14 sm:w-14 sm:rounded-2xl ${iconClassName}`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="relative mt-5 sm:mt-6">
        <h3 className="text-lg font-bold text-[#202020] sm:text-xl">{title}</h3>
        {description && (
          <p className="mt-2.5 text-sm leading-6 text-[#707070]">
            {description}
          </p>
        )}
      </div>

      {/* Points */}
      {points.length > 0 && (
        <div className="relative mt-5 space-y-2.5">
          {points.map((point) => (
            <div
              key={point}
              className="flex items-center gap-2.5 text-xs font-medium text-[#5F5F5F]"
            >
              <CheckCircle2 size={14} className="shrink-0 text-[#D62839]" />
              {point}
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
};

export default InfoCard;
