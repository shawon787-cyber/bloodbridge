import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  HeartPulse,
  MapPin,
} from "lucide-react";

const requests = [
  {
    id: "BB-1024",
    bloodGroup: "O+",
    name: "Md. Rakib Hasan",
    location: "Dhanmondi, Dhaka",
    hospital: "Dhaka Medical College Hospital",
    units: "2 units required",
    date: "Aug 12, 2026",
    time: "10:30 AM",
    status: "Urgent",
  },
  {
    id: "BB-1023",
    bloodGroup: "A+",
    name: "Ayesha Siddiqua",
    location: "Pahartali, Chattogram",
    hospital: "Chattogram Medical College",
    units: "1 unit required",
    date: "Aug 13, 2026",
    time: "02:00 PM",
    status: "Active",
  },
  {
    id: "BB-1021",
    bloodGroup: "AB+",
    name: "Shirin Akter",
    location: "Paba, Rajshahi",
    hospital: "Rajshahi Medical College Hospital",
    units: "2 units required",
    date: "Aug 16, 2026",
    time: "11:15 AM",
    status: "Active",
  },
];

const BloodRequestsSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFF9FA] py-16 sm:py-20 lg:py-24">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#FDECEF] blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#FBE5E9] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mx-auto max-w-2xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-[#F2C7CC] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D62839] shadow-sm sm:text-xs">

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D62839] opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-[#D62839]" />
            </span>

            Live Blood Requests
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#171717] sm:text-4xl lg:text-5xl">
            Someone nearby needs
            <span className="text-[#D62839]"> your blood.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#707070] sm:text-base sm:leading-7">
            Browse active blood requests from people and hospitals in
            your community. One response can make a real difference.
          </p>

        </div>


        {/* ================= FILTER BAR ================= */}

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">

          <button className="rounded-full bg-[#D62839] px-4 py-2 text-xs font-bold text-white shadow-sm">
            All Requests
          </button>

          <button className="rounded-full border border-[#E9D8DA] bg-white px-4 py-2 text-xs font-semibold text-[#6F6F6F] transition hover:border-[#D62839] hover:text-[#D62839]">
            Urgent
          </button>

          <button className="rounded-full border border-[#E9D8DA] bg-white px-4 py-2 text-xs font-semibold text-[#6F6F6F] transition hover:border-[#D62839] hover:text-[#D62839]">
            Nearby
          </button>

          <button className="rounded-full border border-[#E9D8DA] bg-white px-4 py-2 text-xs font-semibold text-[#6F6F6F] transition hover:border-[#D62839] hover:text-[#D62839]">
            Compatible Blood
          </button>

        </div>


        {/* ================= REQUEST CARDS ================= */}

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
            />
          ))}

        </div>


        {/* ================= BOTTOM ================= */}

        <div className="mt-8 flex justify-center">

          <Link
            href="/donation-requests"
            className="group inline-flex items-center gap-2 rounded-xl border border-[#E9C8CD] bg-white px-5 py-3 text-sm font-bold text-[#D62839] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D62839] hover:shadow-md"
          >
            View All Blood Requests

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


/* =========================================================
   REQUEST CARD
========================================================= */

const RequestCard = ({ request }) => {
  const isUrgent = request.status === "Urgent";

  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-[#F0DDDF] bg-white shadow-[0_8px_30px_rgba(185,28,28,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E8BBC1] hover:shadow-[0_18px_40px_rgba(185,28,28,0.10)]">

      {/* Top tinted area */}
      <div className="absolute inset-x-0 top-0 h-[86px] bg-[#FFF7F8]" />

      {/* Card Content */}
      <div className="relative p-5 sm:p-6">

        {/* Status */}

        <div className="flex items-center justify-between">

          <span
            className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.12em] ${
              isUrgent
                ? "text-[#D62839]"
                : "text-[#D97706]"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isUrgent
                  ? "bg-[#D62839]"
                  : "bg-[#D97706]"
              }`}
            />

            {request.status}
          </span>

          <span className="text-[9px] font-medium text-[#A0A0A0]">
            #{request.id}
          </span>

        </div>


        {/* Blood Group + Recipient */}

        <div className="mt-5 flex items-center gap-4">

          {/* Blood Badge */}

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-lg font-black text-[#D62839] shadow-[0_8px_20px_rgba(185,28,28,0.10)] ring-1 ring-[#F4E1E3] transition-transform duration-300 group-hover:scale-105">
            {request.bloodGroup}
          </div>


          <div className="min-w-0">

            <h3 className="truncate text-base font-extrabold text-[#171717]">
              {request.name}
            </h3>

            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#A0A0A0]">
              Blood Recipient
            </p>

          </div>

        </div>


        {/* Divider */}

        <div className="my-5 h-px bg-[#F1E5E7]" />


        {/* Location */}

        <div className="flex items-start gap-3">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF0F2] text-[#D62839]">
            <MapPin size={14} />
          </div>

          <div className="min-w-0">

            <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#A3A3A3]">
              Location
            </p>

            <p className="mt-0.5 truncate text-xs font-semibold text-[#444444]">
              {request.location}
            </p>

          </div>

        </div>


        {/* Hospital */}

        <div className="mt-3 flex items-start gap-3">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF0F2] text-[#D62839]">
            <HeartPulse size={14} />
          </div>

          <div className="min-w-0">

            <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#A3A3A3]">
              Hospital
            </p>

            <p className="mt-0.5 truncate text-xs font-semibold text-[#444444]">
              {request.hospital}
            </p>

          </div>

        </div>


        {/* Date / Time */}

        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#FFF9FA] px-3 py-2.5">

          <div className="flex items-center gap-2">

            <CalendarDays
              size={14}
              className="text-[#D62839]"
            />

            <span className="text-[10px] font-semibold text-[#555555]">
              {request.date}
            </span>

          </div>

          <div className="flex items-center gap-1.5">

            <Clock3
              size={13}
              className="text-[#D62839]"
            />

            <span className="text-[10px] font-semibold text-[#555555]">
              {request.time}
            </span>

          </div>

        </div>


        {/* Units */}

        <div className="mt-3 flex items-center justify-between">

          <span className="text-xs font-bold text-[#333333]">
            {request.units}
          </span>

          <span className="text-[9px] text-[#999999]">
            Needs a donor
          </span>

        </div>


        {/* CTA */}

        <Link
          href={`/donation-requests/${request.id}`}
          className="group/button mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D62839] py-3 text-xs font-bold text-white transition-all duration-300 hover:bg-[#B91C2C] hover:shadow-[0_8px_20px_rgba(214,40,57,0.20)]"
        >
          View Request

          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover/button:translate-x-1"
          />

        </Link>

      </div>

    </div>
  );
};

export default BloodRequestsSection;