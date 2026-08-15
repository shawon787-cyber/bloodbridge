"use client";

import { useEffect, useState } from "react";
import {
  Award,
  Camera,
  CalendarDays,
  CheckCircle2,
  Droplet,
  Edit3,
  Heart,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const districts = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Sylhet",
  "Mymensingh",
  "Barisal",
  "Rangpur",
];

const upazilas = [
  "Dhaka Sadar",
  "Chattogram Sadar",
  "Rajshahi Sadar",
  "Khulna Sadar",
  "Sylhet Sadar",
  "Mymensingh Sadar",
];

export default function AdminProfile() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [savedImage, setSavedImage] = useState("");
  const [imageError, setImageError] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [savedFormData, setSavedFormData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [passwordMessage, setPasswordMessage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    image: "",
    phone: "+880 1711-000000",
    bloodGroup: "A+",
    location: "Dhaka",
    district: "Dhaka",
    upazila: "Dhaka Sadar",
  });

  /* ============================================================
     LOAD SESSION
  ============================================================ */

  useEffect(() => {
    if (!user) return;

    const userImage = user.image || "";

    setFormData((prev) => ({
      ...prev,
      fullName: user.name || "",
      email: user.email || "",
      image: userImage,
    }));

    setImagePreview(userImage);
    setSavedImage(userImage);
    setImageError(false);
  }, [user]);

  /* ============================================================
     FORM CHANGE
  ============================================================ */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaveMessage(null);
  };

  /* ============================================================
     IMAGE CHANGE
  ============================================================ */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedImage(file);
    setImagePreview(previewUrl);
    setImageError(false);

    setFormData((prev) => ({
      ...prev,
      image: previewUrl,
    }));
  };

  /* ============================================================
     PASSWORD CHANGE
  ============================================================ */

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPasswordMessage(null);
  };

  const handleChangePassword = () => {
    if (
      !passwordData.current ||
      !passwordData.newPassword ||
      !passwordData.confirm
    ) {
      setPasswordMessage({
        type: "error",
        text: "Please fill in all fields.",
      });

      return;
    }

    if (passwordData.newPassword !== passwordData.confirm) {
      setPasswordMessage({
        type: "error",
        text: "New passwords do not match.",
      });

      return;
    }

    setPasswordMessage({
      type: "success",
      text: "Password changed successfully.",
    });

    setPasswordData({
      current: "",
      newPassword: "",
      confirm: "",
    });
  };

  /* ============================================================
     START EDIT
  ============================================================ */

  const handleEdit = () => {
    setSavedFormData({ ...formData });
    setSavedImage(imagePreview);
    setSaveMessage(null);
    setIsEditing(true);
  };

  /* ============================================================
     SAVE PROFILE
  ============================================================ */

  const handleSave = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    setSaveMessage(null);

    

    setTimeout(() => {
      setSavedFormData({ ...formData });
      setSavedImage(imagePreview);
      setSelectedImage(null);
      setIsEditing(false);
      setIsSaving(false);

      setSaveMessage({
        type: "success",
        text: "Profile updated successfully.",
      });
    }, 800);
  };

  /* ============================================================
     CANCEL
  ============================================================ */

  const handleCancel = () => {
    if (savedFormData) {
      setFormData(savedFormData);
    }

    if (
      imagePreview?.startsWith("blob:") &&
      imagePreview !== savedImage
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(savedImage || "");
    setSelectedImage(null);
    setImageError(false);
    setIsEditing(false);
    setSaveMessage(null);
  };

  /* ============================================================
     IMAGE ERROR
  ============================================================ */

  const handleImageError = () => {
    setImageError(true);
  };

  /* ============================================================
     CLEANUP
  ============================================================ */

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  /* ============================================================
     FIRST LETTER
  ============================================================ */

  const firstLetter =
    formData.fullName?.trim()?.charAt(0)?.toUpperCase() || "A";

  /* ============================================================
     JOINED DATE
  ============================================================ */

  const joinedDate = user?.createdAt
    ? formatDate(user.createdAt)
    : "01 Jan 2024";

  /* ============================================================
     LOADING
  ============================================================ */

  if (isPending) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FDECEF] border-t-[#D62839]" />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#FFF9FA] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-5">

        {/* =====================================================
            PROFILE HERO
        ====================================================== */}

        <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#A4161A] via-[#D62839] to-[#F21D3B] p-6 text-white shadow-[0_15px_40px_rgba(214,40,57,0.18)] sm:p-8">

          {/* Decorative Shapes */}

          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5" />

          <div className="pointer-events-none absolute right-20 top-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

          <Heart
            className="pointer-events-none absolute -bottom-8 right-10 h-40 w-40 rotate-12 text-white/5"
            fill="currentColor"
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Identity */}

            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">

              {/* Profile Image */}

              <div className="relative shrink-0">

                <div className="relative h-28 w-28 sm:h-32 sm:w-32">

                  {imagePreview && !imageError ? (
                    <img
                      src={imagePreview}
                      alt={formData.fullName || "Admin"}
                      onError={handleImageError}
                      className="h-full w-full rounded-full border-[5px] border-white/90 object-cover shadow-xl"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full border-[5px] border-white/90 bg-white text-5xl font-black text-[#D62839] shadow-xl sm:text-6xl">
                      {firstLetter}
                    </div>
                  )}

                  {/* Admin Badge */}

                  <div className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#D62839] bg-white text-[#D62839] shadow-md">
                    <ShieldCheck size={17} />
                  </div>

                  {/* Camera */}

                  <label
                    htmlFor="admin-profile-image"
                    title="Change profile photo"
                    className="absolute bottom-1 right-1 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-[#D62839] text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#A4161A] active:scale-95"
                  >
                    <Camera size={17} />

                    <span className="sr-only">
                      Change profile photo
                    </span>
                  </label>

                  <input
                    id="admin-profile-image"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Details */}

              <div className="text-center sm:text-left">

                <div className="flex flex-col items-center gap-2 sm:flex-row">

                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                    {formData.fullName || "Administrator"}
                  </h1>

                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                    <ShieldCheck size={14} />
                    Administrator
                  </span>

                </div>

                <div className="mt-2 flex flex-col gap-2 text-sm text-white/85 sm:flex-row sm:items-center sm:gap-5">

                  <span className="flex items-center justify-center gap-2 sm:justify-start">
                    <Mail size={15} />
                    {formData.email}
                  </span>

                  <span className="flex items-center justify-center gap-2 sm:justify-start">
                    <MapPin size={15} />
                    {formData.location}, Bangladesh
                  </span>

                </div>

                <div className="mt-2 flex items-center justify-center gap-2 text-sm text-white/85 sm:justify-start">
                  <Phone size={15} />
                  {formData.phone}
                </div>

              </div>
            </div>

            {/* Actions */}

            <div className="mx-auto flex items-center gap-3 lg:mx-0">

              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="group flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  <Edit3
                    size={16}
                    className="transition-transform duration-200 group-hover:rotate-[-8deg]"
                  />

                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                  >
                    <X size={16} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    form="admin-profile-form"
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#D62839] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <CheckCircle2 size={16} />

                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}

            </div>
          </div>

          {/* =====================================================
              ADMIN STATS
          ====================================================== */}

          <div className="relative mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/20 bg-white/95 text-slate-900 shadow-xl backdrop-blur-md sm:grid-cols-4">

            <Stat
              icon={<ShieldCheck size={21} />}
              value="Administrator"
              label="Account Role"
            />

            <Stat
              icon={<CheckCircle2 size={21} />}
              value="Active"
              label="Account Status"
            />

            <Stat
              icon={<CalendarDays size={21} />}
              value={joinedDate}
              label="Joined Date"
            />

            <Stat
              icon={<Users size={21} />}
              value="Management"
              label="Access Level"
            />

          </div>
        </section>

        {/* =====================================================
            SAVE MESSAGE
        ====================================================== */}

        {saveMessage && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
              saveMessage.type === "success"
                ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                : "border-red-100 bg-red-50 text-red-600"
            }`}
          >
            {saveMessage.text}
          </div>
        )}

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.85fr_1.35fr_0.9fr]">

          {/* ===================================================
              ABOUT ADMIN
          ==================================================== */}

          <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_5px_25px_rgba(15,23,42,0.04)]">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
                <Shield size={19} />
              </div>

              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  About Admin
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Account information
                </p>
              </div>

            </div>

            <p className="text-sm leading-6 text-slate-500">
              Manage your BloodBridge administration account, profile
              information and platform access from one place.
            </p>

            <div className="mt-6 space-y-1">

              <InfoRow
                icon={<ShieldCheck size={16} />}
                label="Role"
                value="Administrator"
                highlight
              />

              <InfoRow
                icon={<CheckCircle2 size={16} />}
                label="Status"
                value="Active"
              />

              <InfoRow
                icon={<CalendarDays size={16} />}
                label="Joined"
                value={joinedDate}
              />

              <InfoRow
                icon={<MapPin size={16} />}
                label="Location"
                value={`${formData.location}, Bangladesh`}
              />

            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#FFF0F2] to-[#FDECEF] p-5 sm:hidden">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Access Level
                  </p>

                  <p className="mt-1 text-2xl font-black text-[#D62839]">
                    Admin
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#D62839] shadow-sm">
                  <ShieldCheck size={24} />
                </div>

              </div>

            </div>

          </section>

          {/* ===================================================
              PERSONAL INFORMATION
          ==================================================== */}

          <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_5px_25px_rgba(15,23,42,0.04)]">

            <div className="mb-6 flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
                  <UserRound size={19} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">
                    Personal Information
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Update your profile details
                  </p>
                </div>

              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <X size={17} />
                </button>
              )}

            </div>

            <form
              id="admin-profile-form"
              onSubmit={handleSave}
            >

              <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">

                <ProfileField
                  name="fullName"
                  label="Full Name"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <ProfileField
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <ProfileField
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                <ProfileField
                  name="bloodGroup"
                  label="Blood Group"
                  type="text"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                

                <div>

                  <label className="mb-2 block text-xs font-bold text-slate-600">
                    District
                  </label>

                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF] disabled:cursor-not-allowed disabled:text-slate-500"
                  >
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="">

                  <label className="mb-2 block text-xs font-bold text-slate-600">
                    Upazila
                  </label>

                  <select
                    name="upazila"
                    value={formData.upazila}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF] disabled:cursor-not-allowed disabled:text-slate-500"
                  >
                    {upazilas.map((upazila) => (
                      <option key={upazila} value={upazila}>
                        {upazila}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

            </form>

          </section>

          {/* ===================================================
              RIGHT COLUMN
          ==================================================== */}

          <div className="space-y-5">

            {/* Contact Information */}

            <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_5px_25px_rgba(15,23,42,0.04)]">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
                  <Mail size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">
                    Contact Information
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Your account contact details
                  </p>
                </div>

              </div>

              <div className="space-y-1">

                <ContactItem
                  icon={<Mail size={16} />}
                  label="Email"
                  value={formData.email}
                />

                <ContactItem
                  icon={<Phone size={16} />}
                  label="Phone"
                  value={formData.phone}
                />

                <ContactItem
                  icon={<MapPin size={16} />}
                  label="Location"
                  value={formData.location}
                />

                <ContactItem
                  icon={<Droplet size={16} />}
                  label="Blood Group"
                  value={formData.bloodGroup}
                />

              </div>

            </section>

            

          </div>

        </div>

        {/* =====================================================
            CHANGE PASSWORD
        ====================================================== */}

        <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_5px_25px_rgba(15,23,42,0.04)]">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Lock size={18} />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Change Password
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Update your administrator account password
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_1fr_auto]">

            <PasswordField
              label="Current Password"
              name="current"
              value={passwordData.current}
              onChange={handlePasswordChange}
              showPassword={showPassword}
            />

            <PasswordField
              label="New Password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              showPassword={showPassword}
            />

            <PasswordField
              label="Confirm Password"
              name="confirm"
              value={passwordData.confirm}
              onChange={handlePasswordChange}
              showPassword={showPassword}
            />

            <div className="flex items-end">

              <button
                type="button"
                onClick={handleChangePassword}
                className="h-11 w-full rounded-xl bg-[#D62839] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#A4161A] lg:w-auto"
              >
                Update Password
              </button>

            </div>

          </div>

          {passwordMessage && (
            <div
              className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${
                passwordMessage.type === "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {passwordMessage.text}
            </div>
          )}

          <label className="mt-4 inline-flex cursor-pointer items-center gap-2">

            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) =>
                setShowPassword(e.target.checked)
              }
              className="h-4 w-4 rounded border-slate-300 text-[#D62839] focus:ring-[#D62839]"
            />

            <span className="text-xs font-medium text-slate-500">
              Show passwords
            </span>

          </label>

        </section>

        {/* =====================================================
            BRANDING
        ====================================================== */}

        <div className="flex items-center justify-center gap-2 pb-2 pt-1 text-xs text-slate-400">

          <Heart
            size={13}
            className="text-[#D62839]"
            fill="currentColor"
          />

          <span>
            Every donation counts —{" "}

            <span className="font-semibold text-[#D62839]">
              BloodBridge
            </span>
          </span>

        </div>

      </div>
    </div>
  );
}

/* ============================================================
   STAT
============================================================ */

function Stat({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDECEF] text-[#D62839]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="truncate text-sm font-black text-slate-900">
          {value}
        </p>

        <p className="mt-0.5 truncate text-[11px] font-medium text-slate-400">
          {label}
        </p>

      </div>

    </div>
  );
}

/* ============================================================
   INFO ROW
============================================================ */

function InfoRow({
  icon,
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-b-0">

      <div className="flex min-w-0 items-center gap-3">

        <span className="text-[#D62839]">
          {icon}
        </span>

        <span className="text-xs font-semibold text-slate-500">
          {label}
        </span>

      </div>

      <span
        className={`truncate text-right text-xs font-bold ${
          highlight
            ? "text-[#D62839]"
            : "text-slate-700"
        }`}
      >
        {value}
      </span>

    </div>
  );
}

/* ============================================================
   PROFILE FIELD
============================================================ */

function ProfileField({
  name,
  label,
  type,
  value,
  onChange,
  disabled,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
      />

    </div>
  );
}

/* ============================================================
   CONTACT ITEM
============================================================ */

function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0">

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FDECEF] text-[#D62839]">
        {icon}
      </span>

      <div className="min-w-0">

        <p className="text-[10px] font-semibold text-slate-400">
          {label}
        </p>

        <p className="truncate text-xs font-bold text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}

/* ============================================================
   PASSWORD FIELD
============================================================ */

function PasswordField({
  label,
  name,
  value,
  onChange,
  showPassword,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#D62839] focus:ring-4 focus:ring-[#FDECEF]"
      />

    </div>
  );
}

/* ============================================================
   DATE FORMATTER
============================================================ */

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}