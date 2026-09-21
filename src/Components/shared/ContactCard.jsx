"use client";

import { LucideIcon } from "lucide-react";

const ContactCard = ({ icon, title, value, href, className = "" }) => {
  const content = (
    <div
      className={`group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F1C7CD] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${className}`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839] transition-colors duration-300 group-hover:bg-[#D62839] group-hover:text-white">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#888888]">
          {title}
        </p>
        <p className="mt-1 text-sm font-semibold text-[#171717]">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {content}
      </a>
    );
  }

  return content;
};

export default ContactCard;
