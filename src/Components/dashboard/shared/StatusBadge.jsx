"use client";

const StatusBadge = ({ status }) => {
  const normalized = status?.toLowerCase().replace(/\s+/g, "") || "default";

  const styles = {
    active: "bg-emerald-50 text-emerald-600",
    inactive: "bg-slate-100 text-slate-600",
    pending: "bg-amber-50 text-amber-600",
    urgent: "bg-red-50 text-red-600",
    completed: "bg-emerald-50 text-emerald-600",
    done: "bg-emerald-50 text-emerald-600",
    cancelled: "bg-slate-100 text-slate-600",
    fulfilled: "bg-emerald-50 text-emerald-600",
    approved: "bg-emerald-50 text-emerald-600",
    inprogress: "bg-blue-50 text-blue-600",
    rejected: "bg-red-50 text-red-600",
    suspended: "bg-red-50 text-red-600",
    donor: "bg-blue-50 text-blue-600",
    volunteer: "bg-purple-50 text-purple-600",
    admin: "bg-[#FDECEF] text-[#D62839]",
    default: "bg-slate-100 text-slate-600",
  };

  const style = styles[normalized] || styles.default;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${style}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
