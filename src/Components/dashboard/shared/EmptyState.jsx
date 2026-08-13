"use client";

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FDECEF] text-[#D62839]">
          <Icon size={28} />
        </div>
      )}
      <h3 className="text-lg font-bold text-[#111827]">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-[#64748B]">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;
