"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  HeartPulse,
  LockKeyhole,
  Mail,
  MapPin,
  UserRound,
  Droplets,
  ShieldCheck,
} from "lucide-react";

import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";

const districts = districtsData[2]?.data || [];
const upazilas = upazilasData[2]?.data || [];

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    role: "donor",
    password: "",
    confirmPassword: "",
  });

  // ============================================
  // Handle normal input
  // ============================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================
  // Handle District Change
  // ============================================

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      district: districtId,
      upazila: "",
    }));
  };

  // ============================================
  // Get Upazilas based on selected District
  // ============================================

  const filteredUpazilas = upazilas.filter(
    (upazila) =>
      String(upazila.district_id) === String(formData.district)
  );

  // ============================================
  // Submit
  // ============================================

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  setLoading(true);

  try {
    const { data, error } = await signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: formData.avatar,
      bloodGroup: formData.bloodGroup,
      district: formData.district,
      upazila: formData.upazila,
      role: formData.role,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Unable to create account.");
      return;
    }

    toast.success("Account created successfully!");

    router.push("/login");
  } catch (err) {
    toast.error(
      err?.message || "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-[#FFF7F8]">

      {/* ==========================================
          BACKGROUND
      =========================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#FCE4E7] blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#FDEBED] blur-3xl" />

      </div>


      {/* ==========================================
          MAIN CONTAINER
      =========================================== */}

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] items-center px-4 py-8 sm:px-6 lg:px-10 lg:py-12">

        <div className="grid w-full overflow-hidden rounded-[32px] border border-[#F0DADD] bg-white shadow-[0_30px_100px_rgba(145,28,40,0.10)] lg:grid-cols-[0.9fr_1.1fr]">


          {/* ========================================
              LEFT BRAND SECTION
          ========================================= */}

          <section className="relative hidden overflow-hidden bg-[#8F1117] lg:block">

            <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full border border-white/10" />

            <div className="absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full border border-white/[0.07]" />

            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D62839]/30 blur-[110px]" />


            <div className="relative z-10 flex min-h-[720px] flex-col justify-between p-10 xl:p-14">


              {/* Logo */}

              <Link
                href="/"
                className="group flex w-fit items-center gap-3"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#D62839] shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <HeartPulse size={22} strokeWidth={2.5} />
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


              {/* Main Message */}

              <div className="max-w-md">

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-red-100 backdrop-blur-xl mt-6">

                  <Droplets
                    size={31}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />

                </div>


                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-200">
                  Become a donor
                </p>


                <h1 className="mt-4 text-4xl font-black leading-[1.08] tracking-[-0.04em] text-white xl:text-5xl">

                  Your blood can
                  <br />

                  <span className="text-red-200">
                    give someone hope.
                  </span>

                </h1>


                <p className="mt-6 max-w-sm text-sm leading-7 text-red-100/70">
                  Create your BloodBridge account and become part of a
                  trusted community connecting donors with people who
                  need blood when it matters most.
                </p>


                {/* Benefits */}

                <div className="mt-8 space-y-4">

                  {[
                    "Create your personal donor profile",
                    "Connect with nearby blood requests",
                    "Help people in critical moments",
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
                  Your information helps BloodBridge connect you
                  with people who need help.
                </p>

              </div>

            </div>

          </section>


          {/* ========================================
              SIGNUP FORM
          ========================================= */}

          <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-16">

            <div className="w-full max-w-xl">


              {/* Mobile Logo */}

              <div className="mb-8 flex justify-center lg:hidden">

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

              <div className="mb-7">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D62839]">
                      Join BloodBridge
                    </p>

                    <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#171717] sm:text-4xl">
                      Create account
                    </h2>

                  </div>


                  <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0F2] text-[#D62839] sm:flex">

                    <HeartPulse size={23} />

                  </div>

                </div>


                <p className="mt-3 text-sm leading-6 text-[#777777]">
                  Register as a donor and help make blood available
                  when someone needs it most.
                </p>

              </div>


              {/* ======================================
                  FORM
              ======================================= */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >


                {/* Name + Email */}

                <div className="grid gap-5 sm:grid-cols-2">


                  {/* Name */}

                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-bold text-[#333333]"
                    >
                      Full Name
                    </label>

                    <div className="relative">

                      <UserRound
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A5A5A5]"
                      />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="h-12 w-full rounded-xl border border-[#E8DADC] bg-[#FFFCFC] pl-11 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-[#B5B5B5] focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#D62839]/10"
                      />

                    </div>

                  </div>


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
                        className="h-12 w-full rounded-xl border border-[#E8DADC] bg-[#FFFCFC] pl-11 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-[#B5B5B5] focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#D62839]/10"
                      />

                    </div>

                  </div>

                </div>


                {/* Avatar */}

                <div>

                  <label
                    htmlFor="avatar"
                    className="mb-2 block text-xs font-bold text-[#333333]"
                  >
                    Avatar URL
                  </label>

                  <input
                    id="avatar"
                    name="avatar"
                    type="url"
                    required
                    value={formData.avatar}
                    onChange={handleChange}
                    placeholder="Paste your ImageBB image URL"
                    className="h-12 w-full rounded-xl border border-[#E8DADC] bg-[#FFFCFC] px-4 text-sm outline-none transition-all duration-200 placeholder:text-[#B5B5B5] focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#D62839]/10"
                  />

                  <p className="mt-1.5 text-[10px] text-[#AAAAAA]">
                    Upload your avatar to ImageBB and paste the image URL here.
                  </p>

                </div>


                {/* Blood Group */}

                <div>

                  <label
                    htmlFor="bloodGroup"
                    className="mb-2 block text-xs font-bold text-[#333333]"
                  >
                    Blood Group
                  </label>

                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                    className="h-12 w-full appearance-none rounded-xl border border-[#E8DADC] bg-[#FFFCFC] px-4 text-sm text-[#555555] outline-none transition-all focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#D62839]/10"
                  >

                    <option value="">
                      Select blood group
                    </option>

                    {[
                      "A+",
                      "A-",
                      "B+",
                      "B-",
                      "AB+",
                      "AB-",
                      "O+",
                      "O-",
                    ].map((group) => (

                      <option
                        key={group}
                        value={group}
                      >
                        {group}
                      </option>

                    ))}

                  </select>

                </div>
                {/* Account Role */}

<div>
  <label
    htmlFor="role"
    className="mb-2 block text-xs font-bold text-[#333333]"
  >
    Account Type
  </label>

  <select
    id="role"
    name="role"
    value={formData.role}
    onChange={handleChange}
    required
    className="h-12 w-full appearance-none rounded-xl border border-[#E8DADC] bg-[#FFFCFC] px-4 text-sm text-[#555555] outline-none transition-all focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#D62839]/10"
  >
    <option value="donor">Donor</option>
    <option value="volunteer">Volunteer</option>
  </select>

  <p className="mt-1.5 text-[10px] text-[#AAAAAA]">
    Choose how you want to participate in BloodBridge.
  </p>
</div>


                {/* =====================================
                    DISTRICT + UPAZILA
                ====================================== */}

                <div className="grid gap-5 sm:grid-cols-2">


                  {/* District */}

                  <div>

                    <label
                      htmlFor="district"
                      className="mb-2 block text-xs font-bold text-[#333333]"
                    >
                      District
                    </label>

                    <div className="relative">

                      <MapPin
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A5A5A5]"
                      />

                      <select
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleDistrictChange}
                        required
                        className="h-12 w-full appearance-none rounded-xl border border-[#E8DADC] bg-[#FFFCFC] pl-11 pr-4 text-sm text-[#555555] outline-none transition-all focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#D62839]/10"
                      >

                        <option value="">
                          Select district
                        </option>

                        {districts.map((district) => (

                          <option
                            key={district.id}
                            value={district.id}
                          >
                            {district.name}
                          </option>

                        ))}

                      </select>

                    </div>

                  </div>


                  {/* Upazila */}

                  <div>

                    <label
                      htmlFor="upazila"
                      className="mb-2 block text-xs font-bold text-[#333333]"
                    >
                      Upazila
                    </label>

                    <div className="relative">

                      <MapPin
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A5A5A5]"
                      />

                      <select
                        id="upazila"
                        name="upazila"
                        value={formData.upazila}
                        onChange={handleChange}
                        required
                        disabled={!formData.district}
                        className={`h-12 w-full appearance-none rounded-xl border pl-11 pr-4 text-sm outline-none transition-all ${
                          formData.district
                            ? "border-[#E8DADC] bg-[#FFFCFC] text-[#555555] focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#D62839]/10"
                            : "cursor-not-allowed border-[#EEEEEE] bg-[#F5F5F5] text-[#AAAAAA]"
                        }`}
                      >

                        <option value="">
                          {formData.district
                            ? "Select upazila"
                            : "Select district first"}
                        </option>

                        {filteredUpazilas.map((upazila) => (

                          <option
                            key={upazila.id}
                            value={upazila.id}
                          >
                            {upazila.name}
                          </option>

                        ))}

                      </select>

                    </div>

                    {formData.district && filteredUpazilas.length === 0 && (
                      <p className="mt-1.5 text-[10px] text-red-500">
                        No upazila found for this district.
                      </p>
                    )}

                  </div>

                </div>


                {/* Password */}

                <div className="grid gap-5 sm:grid-cols-2">


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
                        minLength={6}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create password"
                        className="h-12 w-full rounded-xl border border-[#E8DADC] bg-[#FFFCFC] pl-11 pr-11 text-sm outline-none transition-all focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#D62839]/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#D62839]"
                      >

                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>


                  {/* Confirm Password */}

                  <div>

                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-xs font-bold text-[#333333]"
                    >
                      Confirm Password
                    </label>

                    <div className="relative">

                      <LockKeyhole
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A5A5A5]"
                      />

                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        className="h-12 w-full rounded-xl border border-[#E8DADC] bg-[#FFFCFC] pl-11 pr-11 text-sm outline-none transition-all focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#D62839]/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (prev) => !prev
                          )
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#D62839]"
                      >

                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>

                </div>


                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#D62839] px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(214,40,57,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B91C2C] hover:shadow-[0_14px_30px_rgba(214,40,57,0.25)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {loading ? "Creating Account..." : "Create Donor Account"}

                  {!loading && (
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}

                </button>


                {/* Login */}

                <p className="text-center text-sm text-[#888888]">

                  Already have an account?{" "}

                  <Link
                    href="/login"
                    className="font-bold text-[#D62839] transition-colors hover:text-[#A4161A]"
                  >
                    Sign in
                  </Link>

                </p>


                {/* Note */}

                <div className="flex items-start gap-2 rounded-xl bg-[#FFF7F8] p-3">

                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0 text-[#D62839]"
                  />

                  <p className="text-[10px] leading-5 text-[#999999]">
                    Your account will be created with an active donor
                    status by default. You can update your profile
                    information later from your dashboard.
                  </p>

                </div>

              </form>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
};

export default SignupPage;