"use client";

import { useEffect, useState } from "react";
import {
  Award,
  Camera,
  CalendarDays,
  CheckCircle2,
  Edit3,
  Heart,
  HeartPulse,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
  X,
  Map,
  Clock,
  ClipboardList,
} from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { uploadProfileImage, getProfileImageUrl } from "@/lib/uploadProfileImage";

export default function VolunteerProfile() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [savedFormData, setSavedFormData] = useState(null);
  const [imageError, setImageError] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isAvailable, setIsAvailable] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    image: "",
    phone: "+880 1711-100002",
    bloodGroup: "A+",
    dateOfBirth: "15-May-1990",
    gender: "Male",
    location: "Dhaka",
    emergencyContact: "+880 1711-000000",
    address: "House 42, Road 12, Dhanmondi",
    assignedArea: "Dhaka Sadar",
    joinedDate: "2024-02-20",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState(null);

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const [passwordMessage, setPasswordMessage] = useState(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  /* ============================================================
     FETCH PROFILE FROM BACKEND
  ============================================================ */

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      setIsLoadingProfile(true);
      setProfileError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${user.id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          const data = result.data;
          const userImage = data.image || user.image || "";

          setFormData({
            fullName: data.name || "",
            email: data.email || "",
            image: userImage,
            phone: data.phone || "",
            bloodGroup: data.bloodGroup || "",
            location: data.districtName || data.district || "",
          });

          if (userImage) {
            setProfileImageUrl(getProfileImageUrl(userImage));
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setProfileError("Failed to load profile data.");
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  /* ============================================================
     HANDLE FORM CHANGE
  ============================================================ */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ============================================================
     HANDLE PROFILE IMAGE
  ============================================================ */

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
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

    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    setIsUploadingImage(true);

    try {
      const imageUrl = await uploadProfileImage(file, user.id);
      setProfileImageUrl(getProfileImageUrl(imageUrl));
      setSelectedImage(null);
      setImagePreview("");
      toast.success("Profile image updated successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(error.message || "Failed to upload profile image");
      setSelectedImage(null);
      setImagePreview("");
    } finally {
      setIsUploadingImage(false);
    }

    e.target.value = "";
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
  };

  const handleChangePassword = async () => {
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

    setIsUpdatingPassword(true);
    setPasswordMessage(null);

    try {
      const { error } = await authClient.changePassword({
        currentPassword: passwordData.current,
        newPassword: passwordData.newPassword,
      });

      if (error) {
        setPasswordMessage({
          type: "error",
          text: error.message || "Failed to update password.",
        });
      } else {
        setPasswordMessage({
          type: "success",
          text: "Password updated successfully.",
        });

        setPasswordData({
          current: "",
          newPassword: "",
          confirm: "",
        });

        toast.success("Password updated successfully");
      }
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: "Failed to update password.",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  /* ============================================================
     START EDITING
  ============================================================ */

  const handleEdit = () => {
    setSavedFormData({ ...formData });

    setIsEditing(true);
  };

  /* ============================================================
     SAVE PROFILE
  ============================================================ */

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const payload = {
        name: formData.fullName,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
      };

      const response = await fetch(
        `http://localhost:5000/api/users/${user.id}/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.success && result.data) {
        const updatedUser = result.data;
        const updatedImage = updatedUser.image || profileImageUrl || "";

        setFormData({
          fullName: updatedUser.name || "",
          email: updatedUser.email || "",
          phone: updatedUser.phone || "",
          bloodGroup: updatedUser.bloodGroup || "",
        });

        if (updatedImage) {
          setProfileImageUrl(getProfileImageUrl(updatedImage));
        }

        setSelectedImage(null);
        setSavedFormData({ ...formData });
        setIsEditing(false);

        toast.success("Profile updated successfully");

        const refreshed = await fetch(
          `http://localhost:5000/api/user/${user.id}`
        );

        if (refreshed.ok) {
          const refreshedResult = await refreshed.json();

          if (refreshedResult.success && refreshedResult.data) {
            const fresh = refreshedResult.data;
            const freshImage = fresh.image || updatedImage;

            setFormData({
              fullName: fresh.name || "",
              email: fresh.email || "",
              phone: fresh.phone || "",
              bloodGroup: fresh.bloodGroup || "",
            });

            if (freshImage) {
              setProfileImageUrl(getProfileImageUrl(freshImage));
            }
          }
        }
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  /* ============================================================
     CANCEL EDITING
  ============================================================ */

  const handleCancel = () => {
    if (savedFormData) {
      setFormData(savedFormData);
    }

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
    setSelectedImage(null);
    setIsEditing(false);
    setImageError(false);
  };

  /* ============================================================
     IMAGE ERROR
  ============================================================ */

  const handleImageError = () => {
    setImageError(true);
  };

  /* ============================================================
     CLEANUP OBJECT URL
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
    formData.fullName?.trim()?.charAt(0)?.toUpperCase() || "V";

  const displayImage = selectedImage ? imagePreview : (profileImageUrl || user?.image || "");

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

  if (isLoadingProfile) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FDECEF] border-t-[#D62839]" />
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

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

            {/* =================================================
                PROFILE IDENTITY
            ================================================= */}

            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">

              {/* Profile Image */}

              <div className="relative shrink-0">

                <div className="relative h-28 w-28 sm:h-32 sm:w-32">

                  {displayImage && !imageError ? (
                    <img
                      src={displayImage}
                      alt={formData.fullName || "Profile"}
                      onError={handleImageError}
                      className="h-full w-full rounded-full border-[5px] border-white/90 object-cover shadow-xl"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full border-[5px] border-white/90 bg-white text-5xl font-black text-[#D62839] shadow-xl sm:text-6xl">
                      {firstLetter}
                    </div>
                  )}

                  {/* Camera */}

                  <label
                    htmlFor="volunteer-profile-image"
                    title={isUploadingImage ? "Uploading..." : "Change profile photo"}
                    className={`absolute -bottom-1 -right-1 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-[#D62839] text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#A4161A] active:scale-95 ${isUploadingImage ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isUploadingImage ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Camera size={17} />
                    )}

                    <span className="sr-only">
                      {isUploadingImage ? "Uploading..." : "Change profile photo"}
                    </span>
                  </label>

                  <input
                    id="volunteer-profile-image"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    disabled={isUploadingImage}
                    className="hidden"
                  />

                </div>
              </div>

              {/* Profile Details */}

              <div className="text-center sm:text-left">

                <div className="flex flex-col items-center gap-2 sm:flex-row">

                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                    {formData.fullName}
                  </h1>

                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                    <ShieldCheck size={14} />
                    Volunteer
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

            {/* =================================================
                ACTIONS
            ================================================= */}

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
                    form="volunteer-profile-form"
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
              VOLUNTEER STATS
          ====================================================== */}

          <div className="relative mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/20 bg-white/95 text-slate-900 shadow-xl backdrop-blur-md sm:grid-cols-4">

            <Stat
              icon={<ClipboardList size={21} />}
              value="12"
              label="Requests Handled"
            />

            <Stat
              icon={<Users size={21} />}
              value="28"
              label="Donor Connections"
            />

            <Stat
              icon={<Clock size={21} />}
              value="34"
              label="Hours Contributed"
            />

            <Stat
              icon={<HeartPulse size={21} />}
              value={isAvailable ? "Available" : "Unavailable"}
              label="Current Status"
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

        {profileError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {profileError}
          </div>
        )}

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.85fr_1.35fr_0.9fr]">

          {/* ===================================================
              ABOUT VOLUNTEER
          ==================================================== */}

          <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_5px_25px_rgba(15,23,42,0.04)]">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
                <UserRound size={19} />
              </div>

              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  About Me
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Volunteer information
                </p>
              </div>

            </div>

            <p className="text-sm leading-6 text-slate-500">
              Proud to support the community by helping connect blood donors
              with people and hospitals who need them.
            </p>

            <div className="mt-6 space-y-1">

              <InfoRow
                icon={<ShieldCheck size={16} />}
                label="Role"
                value="Volunteer"
                highlight
              />

              <InfoRow
                icon={<Map size={16} />}
                label="Assigned Area"
                value={formData.assignedArea}
              />

              <InfoRow
                icon={<MapPin size={16} />}
                label="Location"
                value={`${formData.location}, Bangladesh`}
              />

              <InfoRow
                icon={<CalendarDays size={16} />}
                label="Joined"
                value={formatDate(formData.joinedDate)}
              />

            </div>

            {/* Availability */}

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#FFF0F2] to-[#FDECEF] p-5">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Volunteer Status
                  </p>

                  <p
                    className={`mt-1 text-xl font-black ${
                      isAvailable
                        ? "text-[#D62839]"
                        : "text-slate-500"
                    }`}
                  >
                    {isAvailable
                      ? "Available to Help"
                      : "Currently Unavailable"}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={isAvailable}
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                    isAvailable
                      ? "bg-[#D62839]"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow transition duration-200 ${
                      isAvailable
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>

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
              id="volunteer-profile-form"
              onSubmit={handleSave}
            >

              <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">

                {/* Full Name */}

                <ProfileField
                  name="fullName"
                  label="Full Name"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                {/* Email */}

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-600">
                    Email
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    disabled
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 text-sm font-medium text-slate-500 outline-none cursor-not-allowed"
                  />

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Email address cannot be changed.
                  </p>
                </div>

                {/* Phone */}

                <ProfileField
                  name="phone"
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                {/* Blood Group */}

                <ProfileSelect
                  name="bloodGroup"
                  label="Blood Group"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  disabled={!isEditing}
                  options={[
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "O+",
                    "O-",
                  ]}
                />

                {/* Date of Birth */}

                <ProfileField
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                {/* Gender */}

                <ProfileSelect
                  name="gender"
                  label="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  options={[
                    "Male",
                    "Female",
                    "Other",
                  ]}
                />

                {/* Location */}

                <ProfileField
                  name="location"
                  label="Location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                {/* Emergency Contact */}

                <ProfileField
                  name="emergencyContact"
                  label="Emergency Contact"
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  disabled={!isEditing}
                />

                {/* Address - Full Width */}

                <div className="sm:col-span-2">

                  <ProfileField
                    name="address"
                    label="Address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                </div>

              </div>

            </form>

          </section>

          {/* ===================================================
              RIGHT COLUMN
          ==================================================== */}

          <div className="space-y-5">

            {/* Volunteer Activity */}

            <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_5px_25px_rgba(15,23,42,0.04)]">

              <div className="mb-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
                    <CalendarDays size={18} />
                  </div>

                  <div>

                    <h2 className="text-sm font-extrabold text-slate-900">
                      Volunteer Activity
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Your recent activities
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  View All
                </button>

              </div>

              <div className="space-y-1">

                <VolunteerActivity
                  date="Jul 18, 2025"
                  type="Blood request coordination"
                />

                <VolunteerActivity
                  date="Jun 25, 2025"
                  type="Donor connection completed"
                />

                <VolunteerActivity
                  date="May 12, 2025"
                  type="Blood request assistance"
                />

              </div>
            </section>

            {/* Achievement */}

            <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_5px_25px_rgba(15,23,42,0.04)]">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5DD] text-amber-600">
                  <Award size={19} />
                </div>

                <div>

                  <h2 className="text-sm font-extrabold text-slate-900">
                    Achievements
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Your volunteer milestones
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
                  <Award size={28} />
                </div>

                <div>

                  <p className="text-sm font-extrabold text-slate-900">
                    Community Helper
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Successfully handled 10+ blood requests
                  </p>

                  <p className="mt-1 text-[11px] font-semibold text-slate-400">
                    Earned Jul 18, 2025
                  </p>

                </div>

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
                Update your account password
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
                disabled={isUpdatingPassword}
                className="h-11 w-full rounded-xl bg-[#D62839] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#A4161A] disabled:cursor-not-allowed disabled:opacity-70 lg:w-auto"
              >
                {isUpdatingPassword ? "Updating Password..." : "Update Password"}
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

        {/* Bottom Branding */}

        <div className="flex items-center justify-center gap-2 pb-2 pt-1 text-xs text-slate-400">

          <Heart
            size={13}
            className="text-[#D62839]"
            fill="currentColor"
          />

          <span>
            Every helping hand matters —{" "}

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
   STAT COMPONENT
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
   PROFILE SELECT
============================================================ */

function ProfileSelect({
  name,
  label,
  value,
  onChange,
  disabled,
  options,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-11 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-700 outline-none transition-all focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}

/* ============================================================
   VOLUNTEER ACTIVITY
============================================================ */

function VolunteerActivity({ date, type }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-3.5 last:border-b-0">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FDECEF] text-[#D62839]">
        <HeartPulse size={17} />
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs font-bold text-slate-700">
          {date}
        </p>

        <p className="mt-0.5 truncate text-[11px] text-slate-400">
          {type}
        </p>

      </div>

      <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">

        <span className="flex items-center gap-1">

          <CheckCircle2 size={11} />
          Completed

        </span>

      </span>

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
