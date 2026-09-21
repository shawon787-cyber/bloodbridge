"use client";

const LegalSection = ({ number, title, children, className = "" }) => {
  return (
    <section className={`gap-4 ${className}`}>
      <h2 className="text-base font-bold text-[#171717] sm:text-lg">
        {number ? `${number}. ` : ""}
        {title}
      </h2>
      <div className="mt-3 text-sm leading-6 text-[#6F6F6F] sm:leading-7 [&>p]:mb-3 [&>p]:last:mb-0">
        {children}
      </div>
    </section>
  );
};

export default LegalSection;
