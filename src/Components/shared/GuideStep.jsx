"use client";

const GuideStep = ({ number, title, description, icon, className = "" }) => {
  return (
    <div
      className={`flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-300 hover:border-[#F1C7CD] sm:rounded-3xl sm:p-7 ${className}`}
    >
      {/* Step Number */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D62839] text-lg font-black text-white shadow-[0_8px_20px_rgba(214,40,57,0.18)] sm:h-14 sm:w-14 sm:rounded-2xl sm:text-xl">
        {number}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-base font-extrabold text-[#171717] sm:text-lg">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm leading-6 text-[#6F6F6F]">{description}</p>
        )}
        {icon && (
          <div className="mt-3 text-[#D62839]">{icon}</div>
        )}
      </div>
    </div>
  );
};

export default GuideStep;
