import Link from "next/link";
import {
  HeartPulse,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white mt-10">

      {/* ================= CTA SECTION ================= */}
      

      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-10 border-b border-slate-200 pb-10 md:grid-cols-2 lg:grid-cols-5">

          {/* ================= BRAND ================= */}
          <div className="lg:col-span-2">

            <Link
              href="/"
              className="group inline-flex items-center gap-2.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D62839] text-white shadow-sm transition-all duration-300 group-hover:scale-105">
                <HeartPulse size={21} strokeWidth={2.4} />
              </div>

              <div className="leading-none">
                <span className="block text-xl font-extrabold tracking-tight text-slate-900">
                  Blood<span className="text-[#D62839]">Bridge</span>
                </span>

                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Connect • Donate • Save
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
              BloodBridge connects blood donors with people in need, making it
              easier to find the right blood type at the right time.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">

              <a
                href="mailto:hello@bloodbridge.com"
                className="flex items-center gap-3 text-sm text-slate-500 transition-colors hover:text-[#D62839]"
              >
                <Mail size={17} className="text-[#D62839]" />
                hello@bloodbridge.com
              </a>

              <a
                href="tel:+8801700000000"
                className="flex items-center gap-3 text-sm text-slate-500 transition-colors hover:text-[#D62839]"
              >
                <Phone size={17} className="text-[#D62839]" />
                +880 1700-000000
              </a>

              <div className="flex items-center gap-3 text-sm text-slate-500">
                <MapPin size={17} className="text-[#D62839]" />
                Bangladesh
              </div>

            </div>
          </div>

          {/* ================= PLATFORM ================= */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Platform
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/donation-requests"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  Donation Requests
                </Link>
              </li>

              <li>
                <Link
                  href="/search"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  Search Donors
                </Link>
              </li>

              <li>
                <Link
                  href="/funding"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  Funding
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= COMMUNITY ================= */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Community
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/register"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  Become a Donor
                </Link>
              </li>

              <li>
                <Link
                  href="/donation-requests"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  Find Blood
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= RESOURCES ================= */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/blood-guide"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  Blood Donation Guide
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-500 transition-colors hover:text-[#D62839]"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM FOOTER ================= */}
        <div className="flex flex-col items-center justify-between gap-5 pt-7 sm:flex-row">

          <p className="text-center text-xs text-slate-400 sm:text-left">
            © {currentYear} BloodBridge. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2">

            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all duration-200 hover:border-[#D62839] hover:bg-[#FDECEF] hover:text-[#D62839]"
            >
              <FaFacebook size={17} />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all duration-200 hover:border-[#D62839] hover:bg-[#FDECEF] hover:text-[#D62839]"
            >
              <FaTwitter size={17} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all duration-200 hover:border-[#D62839] hover:bg-[#FDECEF] hover:text-[#D62839]"
            >
              <FaInstagram size={17} />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all duration-200 hover:border-[#D62839] hover:bg-[#FDECEF] hover:text-[#D62839]"
            >
              <FaLinkedin size={17} />
            </a>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;