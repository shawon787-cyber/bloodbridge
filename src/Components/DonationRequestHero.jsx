

const DonationRequestHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFF7F8]">
  {/* Background decorations */}
  <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#FCE4E7] blur-3xl" />
  <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#FDEBED] blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
    <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">

      {/* Left Content */}
      <div>
        {/* Small Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F5C9CF] bg-white px-4 py-2 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#D62839] shadow-[0_0_0_4px_rgba(214,40,57,0.10)]" />

          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D62839]">
            Active Blood Requests
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.045em] text-[#171717] sm:text-5xl lg:text-6xl">
          Someone nearby
          <br />
          <span className="text-[#D62839]">
            needs your blood.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-xl text-base leading-7 text-[#6F6F6F] sm:text-lg">
          Browse active blood donation requests from people and hospitals
          across Bangladesh. Your small act of kindness could become
          someone’s second chance at life.
        </p>

        {/* Stats */}
        <div className="mt-9 flex flex-wrap items-center gap-8">
          <div>
            <p className="text-2xl font-black text-[#171717]">
              120+
            </p>
            <p className="mt-1 text-xs font-medium text-[#888888]">
              Active Requests
            </p>
          </div>

          <div className="h-10 w-px bg-[#E8DADC]" />

          <div>
            <p className="text-2xl font-black text-[#171717]">
              64
            </p>
            <p className="mt-1 text-xs font-medium text-[#888888]">
              Lives Helped
            </p>
          </div>

          <div className="h-10 w-px bg-[#E8DADC]" />

          <div>
            <p className="text-2xl font-black text-[#171717]">
              24/7
            </p>
            <p className="mt-1 text-xs font-medium text-[#888888]">
              Community Support
            </p>
          </div>
        </div>
      </div>

      {/* Right Visual */}
      <div className="relative hidden lg:block">
        <div className="relative mx-auto flex h-[310px] w-[310px] items-center justify-center">

          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border border-[#F4C8CE]" />
          <div className="absolute inset-7 rounded-full border border-[#F7DDE0]" />
          <div className="absolute inset-14 rounded-full bg-white shadow-[0_25px_70px_rgba(145,28,40,0.12)]" />

          {/* Main icon */}
          <div className="relative flex h-28 w-28 items-center justify-center rounded-[30px] bg-[#D62839] text-white shadow-[0_18px_40px_rgba(214,40,57,0.30)] rotate-[-6deg]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-14 w-14"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                d="M12 21s-7-4.35-7-10.2C5 7.13 7.24 5 10 5c1.35 0 2.58.62 3.38 1.62C14.18 5.62 15.41 5 16.76 5 19.52 5 21.76 7.13 21.76 10.8 21.76 16.65 12 21 12 21Z"
                fill="currentColor"
                stroke="none"
              />
              <path
                d="M12 8v6M9 11h6"
                stroke="#D62839"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Floating card */}
          <div className="absolute -right-4 top-10 rounded-2xl border border-[#F0DADD] bg-white px-4 py-3 shadow-[0_15px_40px_rgba(145,28,40,0.10)]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839]">
                <span className="text-sm font-black">O+</span>
              </div>

              <div>
                <p className="text-xs font-bold text-[#222222]">
                  Urgent Request
                </p>
                <p className="text-[10px] text-[#999999]">
                  2 units needed
                </p>
              </div>
            </div>
          </div>

          {/* Floating location */}
          <div className="absolute -bottom-1 -left-5 rounded-2xl border border-[#F0DADD] bg-white px-4 py-3 shadow-[0_15px_40px_rgba(145,28,40,0.10)]">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#999999]">
              Location
            </p>
            <p className="mt-1 text-xs font-bold text-[#333333]">
              Dhaka, Bangladesh
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>
  );
};

export default DonationRequestHero;