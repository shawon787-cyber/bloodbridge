import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
  HeartPulse,
  Quote,
} from "lucide-react";

const FounderSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">

      {/* ================= BACKGROUND DECORATION ================= */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#FFF0F2] blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#FDE7EA] blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF5F6] blur-3xl" />


      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= SECTION HEADER ================= */}

        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">

          <span className="inline-flex items-center rounded-full border border-[#F3C9CE] bg-[#FFF8F9] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D62839] sm:text-xs">
            Meet the Founder
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#151515] sm:text-4xl lg:text-5xl">
            Behind{" "}
            <span className="text-[#D62839]">
              BloodBridge
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#707070] sm:text-base sm:leading-7">
            Technology with a purpose — connecting people when every
            second matters.
          </p>

        </div>


        {/* ================= MAIN FOUNDER CARD ================= */}

        <div className="relative overflow-hidden rounded-[28px] border border-[#F0DDDF] bg-[#FFF9FA] shadow-[0_20px_70px_rgba(185,28,28,0.08)] sm:rounded-[32px]">

          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">


            {/* =====================================================
                FOUNDER IMAGE
            ====================================================== */}

            <div className="relative min-h-[500px] overflow-hidden bg-[#0B0F12] sm:min-h-[580px] lg:min-h-[650px]">

              {/* Red Glow */}

              <div className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#D62839]/20 blur-[90px]" />

              <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F1D1D]/20 blur-[100px]" />


              {/* Decorative Circles */}

              <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-white/[0.07]" />

              <div className="pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full border border-[#D62839]/20" />

              <div className="pointer-events-none absolute right-10 top-10 h-2 w-2 rounded-full bg-[#D62839]" />

              <div className="pointer-events-none absolute left-12 top-32 h-1.5 w-1.5 rounded-full bg-white/40" />


              {/* Founder Image */}

              <div className="absolute inset-0 flex items-end justify-center">
  <img
    src="https://i.ibb.co.com/8QVvksL/founder-removebg-preview.png"
    alt="Md. Shawon - Founder of BloodBridge"
    className="h-full w-full object-contain object-bottom"
  />
</div>


              {/* Bottom Gradient */}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />


              {/* Founder Badge */}

              <div className="absolute bottom-5 left-5 z-10 sm:bottom-7 sm:left-7">

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-xl backdrop-blur-md">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D62839] text-white shadow-lg">

                    <HeartPulse size={18} />

                  </div>

                  <div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/50">
                      Founder
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-white">
                      BloodBridge
                    </p>

                  </div>

                </div>

              </div>


              {/* Decorative Plus */}

              <div className="absolute right-7 top-7 text-3xl font-light text-white/20">
                +
              </div>

            </div>


            {/* =====================================================
                FOUNDER CONTENT
            ====================================================== */}

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14 xl:p-16">

              {/* Role Badge */}

              <span className="w-fit rounded-full border border-[#F2C8CD] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D62839]">
                Founder & Full-Stack Developer
              </span>


              {/* Name */}

              <h3 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#151515] sm:text-4xl lg:text-[42px]">
                Md. Shawon
              </h3>


              <p className="mt-2 text-sm font-semibold text-[#D62839]">
                Founder & Creator of BloodBridge
              </p>


              {/* Description */}

              <div className="mt-6 space-y-4 text-sm leading-7 text-[#666666] sm:text-[15px]">

                <p>
                  I created BloodBridge with a simple belief — finding
                  blood during an emergency should be faster, easier,
                  and more reliable.
                </p>

                <p>
                  As a full-stack developer, I wanted to build more
                  than just another website. BloodBridge is designed
                  as a community-driven platform that helps people
                  connect with potential blood donors when they need
                  help the most.
                </p>

                <p>
                  My vision is to use modern technology to reduce the
                  gap between a blood request and a potential donor,
                  while creating a simple, trustworthy, and meaningful
                  experience for everyone.
                </p>

              </div>


              {/* ================= QUOTE ================= */}

             


              {/* ================= SOCIAL + CTA ================= */}

              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                {/* Social Links */}

                <div>

                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#999999]">
                    Connect with me
                  </p>


                  <div className="flex items-center gap-2">


                    {/* ================= FACEBOOK ================= */}

                    <a
                      href="YOUR_FACEBOOK_URL"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#E8D9DB] bg-white text-[#555555] transition-all duration-300 hover:-translate-y-1 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:shadow-lg"
                    >

                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-[17px] w-[17px]"
                        aria-hidden="true"
                      >
                        <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1z" />
                      </svg>

                    </a>


                    {/* ================= WHATSAPP ================= */}

                    <a
                      href="https://wa.me/YOUR_PHONE_NUMBER"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#E8D9DB] bg-white text-[#555555] transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white hover:shadow-lg"
                    >

                      <MessageCircle
                        size={18}
                        strokeWidth={2}
                      />

                    </a>


                    {/* ================= LINKEDIN ================= */}

                    <a
                      href="YOUR_LINKEDIN_URL"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#E8D9DB] bg-white text-[#555555] transition-all duration-300 hover:-translate-y-1 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:shadow-lg"
                    >

                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-[17px] w-[17px]"
                        aria-hidden="true"
                      >
                        <path d="M6.5 8.5A2.5 2.5 0 1 0 6.5 3a2.5 2.5 0 0 0 0 5.5ZM4 10h5v10H4V10Zm7 0h4.8v1.36h.07c.67-1.16 2.3-2.36 4.73-2.36 5.06 0 5.4 3.33 5.4 7.66V20h-5v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.84 1.25-1.84 2.54V20h-5V10Z" />
                      </svg>

                    </a>

                  </div>

                </div>


                {/* About Button */}

                <Link
                  href="/about"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D62839] px-5 py-3.5 text-xs font-bold text-white shadow-[0_8px_20px_rgba(214,40,57,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#B91C2C] hover:shadow-[0_12px_25px_rgba(214,40,57,0.25)] sm:w-auto"
                >
                  More About Me

                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />

                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default FounderSection;