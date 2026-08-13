"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  HeartPulse,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Droplets,
} from "lucide-react";

const SignInPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email.trim() || !formData.password) {
    toast.error("Email and password are required.");
    return;
  }

  setLoading(true);

  try {
    const result = await signIn.email({
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      callbackURL: "/",
    });

    console.log("LOGIN RESULT:", result);

    if (result?.error) {
      toast.error(
        result.error.message || "Invalid email or password."
      );
      return;
    }

    if (!result?.data) {
      toast.error("Invalid email or password.");
      return;
    }

    toast.success("Signed in successfully!");

    router.push("/");
    router.refresh();

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    toast.error(
      error?.message || "Invalid email or password."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-[#FFF7F8]">

      {/* =====================================================
          BACKGROUND DECORATIONS
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#FCE4E7] blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#FDEBED] blur-3xl" />

      </div>


      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] items-center px-4 py-8 sm:px-6 lg:px-10 lg:py-12">

        <div className="grid w-full overflow-hidden rounded-[32px] border border-[#F0DADD] bg-white shadow-[0_30px_100px_rgba(145,28,40,0.10)] lg:grid-cols-[1.05fr_0.95fr]">


          {/* =================================================
              LEFT — BRAND / MESSAGE
          ================================================== */}

          <section className="relative hidden overflow-hidden bg-[#8F1117] lg:block">

            {/* Decorative circles */}

            <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full border border-white/10" />

            <div className="absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full border border-white/[0.07]" />

            <div className="absolute right-20 top-24 h-3 w-3 rounded-full bg-red-200/40" />

            <div className="absolute left-20 top-1/2 h-2 w-2 rounded-full bg-white/30" />


            {/* Glow */}

            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D62839]/30 blur-[110px]" />


            <div className="relative z-10 flex min-h-[650px] flex-col justify-between p-10 xl:p-14">


              {/* Logo */}

              <Link
                href="/"
                className="group flex w-fit items-center gap-3"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#D62839] shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <HeartPulse
                    size={22}
                    strokeWidth={2.5}
                  />
                </div>

                <div>

                  <p className="text-xl font-black tracking-tight text-white">
                    BloodBridge
                  </p>

                  <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Connect • Donate • Save
                  </p>

                </div>

              </Link>


              {/* Main Content */}

              <div className="max-w-md">

                {/* <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-red-100 backdrop-blur-md">

                  <Droplets
                    size={31}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />

                </div> */}


                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-200 lg:hidden">
                  Welcome back
                </p>


                <h1 className="mt-4 text-4xl font-black leading-[1.08] tracking-[-0.04em] text-white xl:text-5xl">

                  Every connection
                  <br />

                  <span className="text-red-200">
                    can make a difference.
                  </span>

                </h1>


                <p className="mt-6 max-w-sm text-sm leading-7 text-red-100/70">
                  Sign in to your BloodBridge account and stay connected
                  with blood requests and opportunities to help people
                  in your community.
                </p>


                {/* Benefits */}

                <div className="mt-8 space-y-4">

                  {[
                    "Manage your donor profile",
                    "Explore nearby blood requests",
                    "Stay connected with the community",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-red-200">

                        <CheckCircle2
                          size={14}
                          strokeWidth={2.5}
                        />

                      </div>

                      <span className="text-sm font-medium text-white/80">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>


              {/* Bottom */}

              <div className="flex items-center gap-3 border-t border-white/10 pt-6">

                <ShieldCheck
                  size={19}
                  className="text-red-200"
                />

                <p className="text-xs leading-5 text-white/45">
                  Welcome back to the BloodBridge community.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              RIGHT — LOGIN FORM
          ================================================== */}

          <section className="flex items-center justify-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12 xl:px-16">

            <div className="w-full max-w-md">


              {/* Mobile Logo */}

              <div className="mb-10 flex justify-center lg:hidden">

                <Link
                  href="/"
                  className="flex items-center gap-2.5"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D62839] text-white shadow-md">

                    <HeartPulse size={20} />

                  </div>

                  <span className="text-xl font-black text-[#171717]">
                    BloodBridge
                  </span>

                </Link>

              </div>


              {/* Header */}

              <div className="mb-8">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D62839]">
                      Welcome back
                    </p>

                    <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#171717] sm:text-4xl">
                      Sign in
                    </h2>

                  </div>


                  <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0F2] text-[#D62839] sm:flex">

                    <HeartPulse size={23} />

                  </div>

                </div>


                <p className="mt-3 text-sm leading-6 text-[#777777]">
                  Sign in to continue helping people through BloodBridge.
                </p>

              </div>


              {/* =================================================
                   FORM
              ================================================== */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >


                {/* Email */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold text-[#333333]"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A5A5A5]"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-13 w-full rounded-xl border border-[#E8DADC] bg-[#FFFCFC] pl-11 pr-4 text-sm text-[#222222] outline-none transition-all duration-200 placeholder:text-[#B5B5B5] focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#D62839]/10"
                    />

                  </div>

                </div>


                {/* Password */}

                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-bold text-[#333333]"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A5A5A5]"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-13 w-full rounded-xl border border-[#E8DADC] bg-[#FFFCFC] pl-11 pr-12 text-sm text-[#222222] outline-none transition-all duration-200 placeholder:text-[#B5B5B5] focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#D62839]/10"
                    />


                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999999] transition-colors hover:text-[#D62839]"
                    >

                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}

                    </button>

                  </div>

                </div>


                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#D62839] px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(214,40,57,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B91C2C] hover:shadow-[0_14px_30px_rgba(214,40,57,0.25)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {loading ? "Signing In..." : "Sign In"}

                  {!loading && (
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}

                </button>


                {/* Divider */}

                <div className="relative py-2">

                  <div className="absolute inset-0 flex items-center">

                    <div className="w-full border-t border-[#EEEEEE]" />

                  </div>

                  <div className="relative flex justify-center">

                    <span className="bg-white px-3 text-[10px] font-semibold uppercase tracking-wider text-[#AAAAAA]">
                      New to BloodBridge?
                    </span>

                  </div>

                </div>


                {/* Register */}

                <Link
                  href="/signup"
                  className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-[#E5D5D8] bg-white text-sm font-bold text-[#444444] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D62839] hover:bg-[#FFF8F9] hover:text-[#D62839]"
                >

                  Create a Donor Account

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </Link>


                {/* Footer */}

                <p className="pt-3 text-center text-xs leading-5 text-[#AAAAAA]">
                  By continuing, you agree to use BloodBridge
                  responsibly and help build a trusted donor community.
                </p>

              </form>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
};

export default SignInPage;