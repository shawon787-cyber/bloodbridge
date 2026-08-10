import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Droplet,
  HeartHandshake,
  Search,
  UserPlus,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Register on BloodBridge and create your donor or recipient profile in just a few simple steps.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Create a Blood Request",
    description:
      "Need blood? Add the blood group, hospital, location and urgency so suitable donors can find your request.",
  },
  {
    number: "03",
    icon: Search,
    title: "Find the Right Donor",
    description:
      "Search verified donors by blood group and location, then connect with an available donor.",
  },
  {
    number: "04",
    icon: CalendarCheck,
    title: "Connect & Coordinate",
    description:
      "Confirm the donation details and coordinate with the donor, keeping everything organized until the donation is successfully completed.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-10 sm:pt-20 lg:pt-24 ">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FFF1F3] blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F3CDD2] bg-[#FFF8F9] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D62839] sm:px-4 sm:py-2 sm:text-xs">
            <HeartHandshake size={14} />

            How BloodBridge Works
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] text-[#171717] sm:text-4xl lg:text-5xl">
            Simple steps to{" "}
            <span className="text-[#D62839]">
              save a life.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#707070] sm:mt-5 sm:text-base sm:leading-7">
            Whether you need blood or want to donate, BloodBridge makes it
            simple to connect with the right people at the right time.
          </p>

        </div>


        {/* ================= ACTION SWITCH ================= */}

        <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:mt-8 sm:flex-row">

          <Link
            href="/search"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D62839] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(214,40,57,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B91C2C] hover:shadow-[0_12px_25px_rgba(214,40,57,0.22)] sm:w-auto"
          >
            <Droplet size={16} fill="currentColor" />

            I Need Blood
          </Link>

          <Link
            href="/register"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#D62839] bg-white px-5 py-3 text-sm font-bold text-[#D62839] transition-all duration-300 hover:bg-[#FFF1F3] sm:w-auto"
          >
            <HeartHandshake size={16} />

            I Want to Donate
          </Link>

        </div>


        {/* ================= DESKTOP TIMELINE ================= */}

        <div className="relative mt-14 hidden lg:block">

          {/* Connecting Line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-7 h-px border-t-2 border-dashed border-[#F3C4C9]" />

          <div className="grid grid-cols-4 gap-4">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center"
                >

                  {/* Step Number */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#D62839] text-sm font-black text-white shadow-[0_8px_20px_rgba(214,40,57,0.20)] transition-all duration-300 hover:scale-110">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="group mt-5 w-full rounded-2xl border border-[#F0DADD] bg-white p-6 text-center shadow-[0_8px_25px_rgba(185,28,28,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E5AEB5] hover:shadow-[0_18px_35px_rgba(185,28,28,0.09)]">

                    {/* Icon */}
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839] transition-all duration-300 group-hover:bg-[#D62839] group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-[#171717]">
                      {step.title}
                    </h3>

                    <p className="mt-2.5 text-xs leading-5 text-[#747474]">
                      {step.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>
        </div>


        {/* ================= MOBILE / TABLET TIMELINE ================= */}

        <div className="relative mt-10 lg:hidden">

          {/* Vertical Line */}
          <div className="absolute bottom-8 left-[23px] top-8 w-px bg-[#F2C8CD]" />

          <div className="space-y-5">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative flex gap-4"
                >

                  {/* Number */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#D62839] text-[11px] font-black text-white shadow-[0_6px_15px_rgba(214,40,57,0.18)]">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="group min-w-0 flex-1 rounded-2xl border border-[#F0DADD] bg-white p-5 shadow-[0_6px_20px_rgba(185,28,28,0.04)] transition-all duration-300 hover:border-[#E5AEB5]">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839]">
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-[#171717]">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-[#747474] sm:text-sm">
                          {step.description}
                        </p>
                      </div>

                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D62839]">
                      <CheckCircle2 size={13} />

                      BloodBridge Step {step.number}
                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        </div>


        {/* ================= BOTTOM CTA ================= */}

        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#F2D5D9] bg-[#FFF8F9] px-5 py-6 text-center sm:mt-12 sm:flex-row sm:text-left sm:px-7">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D62839] text-white shadow-md">
            <HeartHandshake size={21} />
          </div>

          <div className="flex-1">

            <h3 className="text-sm font-bold text-[#202020] sm:text-base">
              Every connection can make a difference.
            </h3>

            <p className="mt-1 text-xs leading-5 text-[#777777] sm:text-sm">
              Join BloodBridge and become part of a community that helps
              people find blood when they need it most.
            </p>

          </div>

          <Link
            href="/register"
            className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#D62839] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#B91C2C] sm:w-auto"
          >
            Get Started

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;