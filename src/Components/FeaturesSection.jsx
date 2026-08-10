import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  CalendarCheck,
  CheckCircle2,
  Droplet,
  HeartHandshake,
  MapPin,
  Search,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFF9F9] py-16 sm:py-20 lg:py-24">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#FCE4E7] opacity-60 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#FDECEE] opacity-60 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F7C8CE] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#C91F32] shadow-sm sm:px-4 sm:py-2 sm:text-xs">
            <HeartHandshake size={14} />

            How BloodBridge Helps
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-[-0.035em] text-[#171717] sm:text-4xl lg:text-5xl">
            Everything you need to{" "}
            <span className="text-[#D62839]">
              save a life.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6B6B6B] sm:mt-5 sm:text-base sm:leading-7">
            From requesting blood to finding a suitable donor,
            BloodBridge makes the entire donation journey simpler,
            faster, and more connected.
          </p>

        </div>


        {/* ================= FEATURE GRID ================= */}

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-12 lg:gap-5">

          {/* ================= REQUEST BLOOD ================= */}

          <div className="group relative overflow-hidden rounded-2xl border border-[#F4D4D8] bg-white p-5 shadow-[0_8px_30px_rgba(185,28,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E9AEB5] hover:shadow-[0_18px_45px_rgba(185,28,28,0.10)] sm:rounded-3xl sm:p-7 lg:col-span-7 lg:p-8">

            {/* Decorative Circle */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#FFF0F2] transition-transform duration-500 group-hover:scale-110 sm:h-52 sm:w-52" />

            <Droplet
              className="pointer-events-none absolute right-7 top-7 text-[#FBE0E3] sm:right-10 sm:top-10"
              size={75}
              strokeWidth={1}
            />

            {/* Number */}
            <span className="absolute right-5 top-4 text-5xl font-black text-[#FFF0F2] sm:right-8 sm:top-6 sm:text-6xl">
              01
            </span>

            {/* Icon */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839] transition-all duration-300 group-hover:bg-[#D62839] group-hover:text-white sm:h-14 sm:w-14 sm:rounded-2xl">
              <Droplet size={24} fill="currentColor" />

            </div>

            <div className="relative mt-6 sm:mt-7">

              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D62839]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#D62839] sm:text-xs">
                  Emergency Blood Request
                </span>
              </div>

              <h3 className="max-w-xl text-xl font-bold leading-tight text-[#171717] sm:text-2xl lg:text-3xl">
                Request blood when
                <span className="text-[#D62839]">
                  {" "}every minute matters.
                </span>
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#707070]">
                Share the blood group, hospital, location and urgency.
                Nearby eligible donors can discover your request and
                respond quickly.
              </p>

            </div>

            {/* Features */}
            <div className="relative mt-6 grid grid-cols-1 gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3">

              <FeaturePoint text="Quick emergency request" />
              <FeaturePoint text="Location-based matching" />
              <FeaturePoint text="Request status tracking" />
              <FeaturePoint text="Donor response updates" />

            </div>

            {/* CTA */}
            <Link
              href="/donation-requests/create"
              className="group/btn relative mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D62839] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(214,40,57,0.18)] transition-all duration-300 hover:bg-[#B91C2C] hover:shadow-[0_10px_25px_rgba(214,40,57,0.25)] sm:mt-8 sm:w-auto"
            >
              Create Blood Request

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
              />
            </Link>

          </div>


          {/* ================= FIND DONOR ================= */}

          <div className="group relative overflow-hidden rounded-2xl border border-[#F4D4D8] bg-white p-5 shadow-[0_8px_30px_rgba(185,28,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E9AEB5] hover:shadow-[0_18px_45px_rgba(185,28,28,0.10)] sm:rounded-3xl sm:p-7 lg:col-span-5 lg:p-8">

            {/* Background */}
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-[#FFF2F3] transition-transform duration-500 group-hover:scale-110" />

            {/* Number */}
            <span className="absolute right-5 top-4 text-5xl font-black text-[#FFF1F3] sm:right-8 sm:top-6 sm:text-6xl">
              02
            </span>

            {/* Icon */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839] transition-all duration-300 group-hover:bg-[#D62839] group-hover:text-white sm:h-14 sm:w-14 sm:rounded-2xl">
              <Search size={24} />
            </div>

            <div className="relative mt-6 sm:mt-7">

              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D62839]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#D62839] sm:text-xs">
                  Donor Search
                </span>
              </div>

              <h3 className="text-xl font-bold leading-tight text-[#171717] sm:text-2xl lg:text-3xl">
                Find the right donor,
                <span className="text-[#D62839]">
                  {" "}faster.
                </span>
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#707070]">
                Search available donors using blood group, location and
                availability to reach the right person faster.
              </p>

            </div>

            {/* Donor Preview */}
            <div className="relative mt-6 rounded-2xl border border-[#F3E1E3] bg-[#FFF9F9] p-4">

              <div className="flex items-center justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D62839] text-xs font-black text-white">
                    O+
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-bold text-[#222222]">
                      Available Donor
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-xs text-[#8A8A8A]">
                      <MapPin size={12} />
                      Dhaka • 2.4 km
                    </div>

                  </div>

                </div>

                <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#EAF8EF] px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22A447]" />

                  <span className="text-[10px] font-semibold text-[#19863A]">
                    Available
                  </span>
                </div>

              </div>

            </div>

            <Link
              href="/search"
              className="group/btn relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#D62839]"
            >
              Search Donors

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Link>

          </div>


          {/* ================= SUPPORTING CARDS ================= */}

          <FeatureCard
            number="03"
            icon={<CalendarCheck size={21} />}
            title="Coordinate donations"
            description="Keep donor responses, confirmations and donation schedules organized in one place."
            points={[
              "Easy donor coordination",
              "Track confirmations",
              "Everything in one view",
            ]}
          />

          <FeatureCard
            number="04"
            icon={<BellRing size={21} />}
            title="Stay updated"
            description="Know what is happening from the moment a request is posted until the donation is completed."
            points={[
              "Donor response alerts",
              "Request status updates",
              "Important notifications",
            ]}
          />

          <FeatureCard
            number="05"
            icon={<ShieldCheck size={21} />}
            title="A trusted community"
            description="Build confidence with verified donor profiles and transparent donation activity."
            points={[
              "Verified donor profiles",
              "Donation history",
              "Trusted community",
            ]}
          />

        </div>


        {/* ================= TRUST STRIP ================= */}

        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#F1D9DC] bg-white px-5 py-5 shadow-[0_8px_25px_rgba(185,28,28,0.04)] sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839]">
              <UserRoundCheck size={19} />
            </div>

            <div>
              <p className="text-sm font-bold text-[#222222]">
                Built for Bangladesh
              </p>

              <p className="mt-0.5 text-xs text-[#888888]">
                Connecting donors and recipients across communities
              </p>
            </div>

          </div>

          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#D62839]"
          >
            Learn how BloodBridge works

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

      </div>
    </section>
  );
};


/* =========================================================
   FEATURE CARD
========================================================= */

const FeatureCard = ({
  number,
  icon,
  title,
  description,
  points,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#F1E0E2] bg-white p-5 shadow-[0_8px_25px_rgba(185,28,28,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E8B5BA] hover:shadow-[0_15px_35px_rgba(185,28,28,0.08)] sm:rounded-3xl sm:p-7 lg:col-span-4">

      {/* Number */}
      <span className="absolute right-5 top-4 text-5xl font-black text-[#FFF1F3] sm:right-7 sm:top-5 sm:text-6xl">
        {number}
      </span>

      {/* Icon */}
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0F2] text-[#D62839] transition-all duration-300 group-hover:bg-[#D62839] group-hover:text-white sm:h-12 sm:w-12">
        {icon}
      </div>

      {/* Content */}
      <div className="relative mt-5 sm:mt-6">

        <h3 className="text-lg font-bold text-[#202020] sm:text-xl">
          {title}
        </h3>

        <p className="mt-2.5 text-sm leading-6 text-[#707070]">
          {description}
        </p>

      </div>

      {/* Points */}
      <div className="relative mt-5 space-y-2.5">

        {points.map((point) => (
          <div
            key={point}
            className="flex items-center gap-2.5 text-xs font-medium text-[#5F5F5F]"
          >
            <CheckCircle2
              size={14}
              className="shrink-0 text-[#D62839]"
            />

            {point}
          </div>
        ))}

      </div>

    </div>
  );
};


/* =========================================================
   FEATURE POINT
========================================================= */

const FeaturePoint = ({ text }) => {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-[#626262]">

      <CheckCircle2
        size={15}
        className="shrink-0 text-[#D62839]"
      />

      <span>{text}</span>

    </div>
  );
};

export default FeaturesSection;