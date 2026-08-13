"use client";

import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, width = "max-w-lg" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${width} overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-[#F1F3F5] px-6 py-4">
          <h3 className="text-base font-bold text-[#111827]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#FFF4F5] hover:text-[#D62839]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
