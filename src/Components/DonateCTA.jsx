import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const DonateCTA = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] bg-[#A4161A] px-6 py-12 sm:px-10 lg:px-14">

        {/* Decorative Elements */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-white/5" />

        {/* Content */}
        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

          {/* Text Content */}
          <div className="max-w-2xl">

            <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
              Make a Difference
            </span>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              One donation can give someone
              <span className="text-red-200">
                {" "}another tomorrow.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-red-100 sm:text-base">
              Join BloodBridge and become part of a community that connects
              blood donors with people who need help when it matters most.
            </p>

          </div>

          {/* Buttons */}
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">

            {/* Become Donor */}
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#A4161A] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Become a Donor

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            {/* Find Donor */}
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
            >
              Find a Donor
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateCTA;