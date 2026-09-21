"use client";

import { useEffect, useState } from "react";
import {
  Award,
  Camera,
  CalendarDays,
  CheckCircle2,
  Droplet,
  Edit3,
  Eye,
  EyeOff,
  Heart,
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
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { uploadProfileImage, getProfileImageUrl } from "@/lib/uploadProfileImage";
import { apiFetchJSON, api } from "@/lib/api";
import districtsRaw from "@/data/districts.json";
import upazilasRaw from "@/data/upazilas.json";
import { getDistrictName, getUpazilaName } from "@/lib/locationUtils";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const allDistricts =
  districtsRaw.find((item) => item.type === "table" && item.name === "districts")
    ?.data || [];

const allUpazilas =
  upazilasRaw.find((item) => item.type === "table" && item.name === "upazilas")
    ?.data || [];

function formatRole(role) {
  if (!role) return "User";
  const r = String(role).toLowerCase();
  if (r === "admin") return "Admin";
  if (r === "donor") return "Donor";
  if (r === "volunteer") return "Volunteer";
  return r.charAt(0).toUpperCase() + r.slice(1);
}

function formatStatus(status) {
  if (!status) return "";
  return String(status).charAt(0).toUpperCase() + String(status).slice(1);
}

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function roleAccentText(role) {
  const r = String(role || "").toLowerCase();
  if (r === "admin") return "text-[#A4161A]";
  if (r === "donor") return "text-[#D62839]";
  if (r === "volunteer") return "text-emerald-700";
  return "text-[#D62839]";
}

export default function AdminProfile() {
  const { user, isLoading } = useUser();
  const [profile, setProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedFormData, setSavedFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [passwordData, setPasswordData] = useState({ current: "", newPassword: "", confirm: "" });
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
    bloodGroup: "",
    district: "",
    districtId: "",
    districtName: "",
    districtBnName: "",
    upazila: "",
    upazilaId: "",
    upazilaName: "",
  });

  const role = String(profile?.role || user?.role || "").toLowerCase();
  const roleLabel = formatRole(profile?.role || user?.role);
  const isAdmin = role === "admin";

  useEffect(() => {
    if (!user?.id) return;
    const fetchProfile = async () => {
      setIsLoadingProfile(true);
      setProfileError(null);
      try {
        const result = await apiFetchJSON(`/api/user/${user.id}`);
        if (result?.success && result.data) {
          const data = result.data;
          const userImage = data.image || user.image || "";
          setProfile(data);
          setFormData({
            name: data.name || "",
            email: data.email || "",
            image: userImage,
            phone: data.phone || "",
            bloodGroup: data.bloodGroup || "",
            district: data.districtName || getDistrictName(data.district) || "",
            districtId: data.districtId || "",
            districtName: data.districtName || getDistrictName(data.district) || "",
            districtBnName: data.districtBnName || "",
            upazila: data.upazilaName || getUpazilaName(data.upazila) || "",
            upazilaId: data.upazilaId || "",
            upazilaName: data.upazilaName || getUpazilaName(data.upazila) || "",
          });
          if (userImage) setProfileImageUrl(getProfileImageUrl(userImage));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaveMessage(null);
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    const district = allDistricts.find((d) => d.name === districtName);
    setFormData((prev) => ({
      ...prev,
      district: districtName,
      districtId: district?.id || "",
      districtName: district?.name || districtName,
      districtBnName: district?.bn_name || "",
      upazila: "",
      upazilaId: "",
      upazilaName: "",
    }));
    setSaveMessage(null);
  };

  const handleUpazilaChange = (e) => {
    const upazilaName = e.target.value;
    const upazila = allUpazilas.find(
      (u) => u.name === upazilaName && u.district_id === formData.districtId
    );
    setFormData((prev) => ({
      ...prev,
      upazila: upazilaName,
      upazilaId: upazila?.id || "",
      upazilaName: upazila?.name || upazilaName,
    }));
    setSaveMessage(null);
  };

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
    if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
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
      toast.error(error?.message || "Failed to upload profile image");
      setSelectedImage(null);
      setImagePreview("");
    } finally {
      setIsUploadingImage(false);
    }
    e.target.value = "";
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordMessage(null);
  };

  const handleChangePassword = async () => {
    const { current, newPassword, confirm } = passwordData;
    if (!current || !newPassword || !confirm) {
      const msg = "Please fill in all password fields.";
      setPasswordMessage({ type: "error", text: msg });
      toast.error(msg);
      return;
    }
    if (newPassword.length < 8) {
      const msg = "New password must be at least 8 characters.";
      setPasswordMessage({ type: "error", text: msg });
      toast.error(msg);
      return;
    }
    if (newPassword !== confirm) {
      const msg = "Passwords do not match.";
      setPasswordMessage({ type: "error", text: msg });
      toast.error(msg);
      return;
    }
    setIsUpdatingPassword(true);
    setPasswordMessage(null);
    try {
      const data = await api.post("/api/auth/change-password", {
        currentPassword: current,
        newPassword,
      });
      if (data?.success) {
        setPasswordMessage({ type: "success", text: "Password updated successfully." });
        setPasswordData({ current: "", newPassword: "", confirm: "" });
        toast.success("Password updated successfully");
      } else {
        const msg = data?.message || "Failed to update password.";
        setPasswordMessage({ type: "error", text: msg });
        toast.error(msg);
      }
    } catch (error) {
      const msg = error?.data?.message || error?.message || "Failed to update password.";
      setPasswordMessage({ type: "error", text: msg });
      toast.error(msg);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleEdit = () => {
    setSavedFormData({ ...formData });
    setSaveMessage(null);
    setIsEditing(true);
  };

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
        name: formData.name,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        districtId: formData.districtId,
        districtName: formData.districtName,
        districtBnName: formData.districtBnName,
        upazila: formData.upazila,
        upazilaId: formData.upazilaId,
        upazilaName: formData.upazilaName,
      };
      const result = await apiFetchJSON(`/api/users/${user.id}/profile`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      if (!result?.success) throw new Error(result?.message || "Failed to update profile");
      const updatedUser = result.data || {};
      const nextForm = {
        name: updatedUser.name || formData.name,
        email: updatedUser.email || formData.email,
        image: updatedUser.image || formData.image,
        phone: updatedUser.phone || "",
        bloodGroup: updatedUser.bloodGroup || "",
        district: updatedUser.districtName || getDistrictName(updatedUser.district) || "",
        districtId: updatedUser.districtId || "",
        districtName: updatedUser.districtName || getDistrictName(updatedUser.district) || "",
        districtBnName: updatedUser.districtBnName || "",
        upazila: updatedUser.upazilaName || getUpazilaName(updatedUser.upazila) || "",
        upazilaId: updatedUser.upazilaId || "",
        upazilaName: updatedUser.upazilaName || getUpazilaName(updatedUser.upazila) || "",
      };
      setFormData(nextForm);
      setSavedFormData(nextForm);
      setProfile((prev) => (prev ? { ...prev, ...updatedUser } : prev));
      const updatedImage = updatedUser.image || profileImageUrl || "";
      if (updatedImage) setProfileImageUrl(getProfileImageUrl(updatedImage));
      setIsEditing(false);
      setSaveMessage({ type: "success", text: "Profile updated successfully." });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
      const msg = error?.data?.message || error?.message || "Failed to update profile";
      setSaveMessage({ type: "error", text: msg });
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (savedFormData) setFormData(savedFormData);
    if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImagePreview("");
    setSelectedImage(null);
    setImageError(false);
    setIsEditing(false);
    setSaveMessage(null);
  };

  const handleImageError = () => setImageError(true);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const displayImage = selectedImage ? imagePreview : profileImageUrl || profile?.image || "";
  const firstLetter = profile?.name?.trim()?.charAt(0)?.toUpperCase() || roleLabel.charAt(0) || "U";
  const joinedDate = formatDate(profile?.createdAt);

  if (isLoading || isLoadingProfile) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FDECEF] border-t-[#D62839]" />
      </div>
    );
  }

  if (!user || !profile) return null;

  const aboutTitle = "About Admin";
  const aboutSubtitle = "Account information";
  const aboutDescription =
    "Manage your BloodBridge administration account, profile information and platform access from one place.";
  const accessLevel = "Management";

  const stats = [
    { icon: <ShieldCheck size={21} />, value: roleLabel, label: "Account Role" },
    { icon: <CheckCircle2 size={21} />, value: formatStatus(profile?.status), label: "Account Status" },
    { icon: <CalendarDays size={21} />, value: joinedDate, label: "Joined Date" },
    { icon: <Users size={21} />, value: accessLevel, label: "Access Level" },
  ];

  const aboutRows = [
    { icon: <ShieldCheck size={16} />, label: "Role", value: roleLabel, highlight: true },
    { icon: <CheckCircle2 size={16} />, label: "Status", value: formatStatus(profile?.status) },
    { icon: <CalendarDays size={16} />, label: "Joined", value: joinedDate },
    ...(profile?.districtName || profile?.district
      ? [
          {
            icon: <MapPin size={16} />,
            label: "Location",
            value: `${getDistrictName(profile.district) || profile.districtName || ""}, Bangladesh`,
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-full bg-[#FFF9FA] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-5">
        <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#A4161A] via-[#D62839] to-[#F21D3B] p-6 text-white shadow-[0_15px_40px_rgba(214,40,57,0.18)] sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5" />
          <div className="pointer-events-none absolute right-20 top-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
          <Heart className="pointer-events-none absolute -bottom-8 right-10 h-40 w-40 rotate-12 text-white/5" fill="currentColor" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
              <div className="relative shrink-0">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                  {displayImage && !imageError ? (
                    <img src={displayImage} alt={profile.name || roleLabel} onError={handleImageError} className="h-full w-full rounded-full border-[5px] border-white/90 object-cover shadow-xl" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full border-[5px] border-white/90 bg-white text-5xl font-black text-[#D62839] shadow-xl sm:text-6xl">
                      {firstLetter}
                    </div>
                  )}
                  
                  <label htmlFor="profile-image-upload" title={isUploadingImage ? "Uploading..." : "Change profile photo"} className={`absolute bottom-1 right-1 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-[#D62839] text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#A4161A] active:scale-95 ${isUploadingImage ? "cursor-not-allowed opacity-70" : ""}`}>
                    {isUploadingImage ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Camera size={17} />}
                    <span className="sr-only">{isUploadingImage ? "Uploading..." : "Change profile photo"}</span>
                  </label>
                  <input id="profile-image-upload" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handleImageChange} disabled={isUploadingImage} className="hidden" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{profile.name || "User"}</h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                    <ShieldCheck size={14} />
                    {roleLabel}
                  </span>
                </div>
                <div className="mt-2 flex flex-col gap-2 text-sm text-white/85 sm:flex-row sm:items-center sm:gap-5">
                  {profile?.email && (
                    <span className="flex items-center justify-center gap-2 sm:justify-start"><Mail size={15} />{profile.email}</span>
                  )}
                  {(profile?.districtName || profile?.district) && (
                    <span className="flex items-center justify-center gap-2 sm:justify-start"><MapPin size={15} />{getDistrictName(profile.district) || profile.districtName || ""}, Bangladesh</span>
                  )}
                </div>
                {profile?.phone && (
                  <div className="mt-2 flex items-center justify-center gap-2 text-sm text-white/85 sm:justify-start">
                    <Phone size={15} />{profile.phone}
                  </div>
                )}
              </div>
            </div>
            <div className="mx-auto flex items-center gap-3 lg:mx-0">
              {!isEditing ? (
                <button type="button" onClick={handleEdit} className="group flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50">
                  <Edit3 size={16} className="transition-transform duration-200 group-hover:rotate-[-8deg]" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button type="button" onClick={handleCancel} className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
                    <X size={16} />Cancel
                  </button>
                  <button type="submit" form="profile-form" disabled={isSaving} className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#D62839] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70">
                    <CheckCircle2 size={16} />{isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="relative mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/20 bg-white/95 text-slate-900 shadow-xl backdrop-blur-md sm:grid-cols-4">
            {stats.map((s, i) => (<Stat key={`${s.label}-${i}`} icon={s.icon} value={s.value} label={s.label} />))}
          </div>
        </section>

        {saveMessage && (
          <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${saveMessage.type === "success" ? "border-emerald-100 bg-emerald-50 text-emerald-600" : "border-red-100 bg-red-50 text-red-600"}`}>
            {saveMessage.text}
          </div>
        )}
        {profileError && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {profileError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.85fr_1.35fr_0.9fr]">
          <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_5px_25px_rgba(15,23,42,0.04)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
                {isAdmin ? <Shield size={19} /> : <Shield size={19} />}
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">{aboutTitle}</h2>
                <p className="mt-0.5 text-xs text-slate-400">{aboutSubtitle}</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-500">{aboutDescription}</p>
            <div className="mt-6 space-y-1">
              {aboutRows.map((row, i) => (<InfoRow key={`${row.label}-${i}`} icon={row.icon} label={row.label} value={row.value} highlight={row.highlight} />))}
            </div>
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#FFF0F2] to-[#FDECEF] p-5 sm:hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Access Level</p>
                  <p className={`mt-1 text-2xl font-black ${roleAccentText(role)}`}>{accessLevel}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ${roleAccentText(role)}`}>
                  {isAdmin ? <ShieldCheck size={24} /> : <Droplet size={24} />}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_5px_25px_rgba(15,23,42,0.04)]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]"><UserRound size={19} /></div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">Personal Information</h2>
                  <p className="mt-0.5 text-xs text-slate-400">Update your profile details</p>
                </div>
              </div>
              {isEditing && (
                <button type="button" onClick={handleCancel} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"><X size={17} /></button>
              )}
            </div>
            <form id="profile-form" onSubmit={handleSave}>
              <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                <ProfileField name="name" label="Full Name" type="text" value={formData.name} onChange={handleChange} disabled={!isEditing} />
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-600">Email Address</label>
                  <input type="email" value={formData.email} readOnly disabled className="h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3.5 text-sm font-medium text-slate-500 outline-none" />
                  <p className="mt-1.5 text-[11px] text-slate-400">Email address cannot be changed.</p>
                </div>
                <ProfileField name="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} disabled={!isEditing} />
                <SelectField name="bloodGroup" label="Blood Group" value={formData.bloodGroup} onChange={handleChange} disabled={!isEditing} options={bloodGroups} placeholder="Select blood group" />
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-600">District</label>
                  <select name="district" value={formData.district} onChange={handleDistrictChange} disabled={!isEditing} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF] disabled:cursor-not-allowed disabled:text-slate-500">
                    <option value="">Select district</option>
                    {allDistricts.map((district) => (<option key={district.id} value={district.name}>{district.name}</option>))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-600">Upazila</label>
                  <select name="upazila" value={formData.upazila} onChange={handleUpazilaChange} disabled={!isEditing || !formData.districtId} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF] disabled:cursor-not-allowed disabled:text-slate-500">
                    <option value="">Select upazila</option>
                    {allUpazilas.filter((u) => u.district_id === formData.districtId).map((upazila) => (<option key={upazila.id} value={upazila.name}>{upazila.name}</option>))}
                  </select>
                </div>
              </div>
            </form>
          </section>

          <div className="space-y-5">
            <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_5px_25px_rgba(15,23,42,0.04)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]"><Mail size={18} /></div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">Contact Information</h2>
                  <p className="mt-0.5 text-xs text-slate-400">Your account contact details</p>
                </div>
              </div>
              <div className="space-y-1">
                {profile?.email && <ContactItem icon={<Mail size={16} />} label="Email" value={profile.email} />}
                {profile?.phone && <ContactItem icon={<Phone size={16} />} label="Phone" value={profile.phone} />}
                {(profile?.districtName || profile?.district) && <ContactItem icon={<MapPin size={16} />} label="Location" value={getDistrictName(profile.district) || profile.districtName || ""} />}
                {profile?.bloodGroup && <ContactItem icon={<Droplet size={16} />} label="Blood Group" value={profile.bloodGroup} />}
              </div>
            </section>
          </div>
        </div>

        <section className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_5px_25px_rgba(15,23,42,0.04)]">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700"><Lock size={18} /></div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Change Password</h2>
              <p className="mt-0.5 text-xs text-slate-400">Update your account password</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <PasswordField label="Current Password" name="current" value={passwordData.current} onChange={handlePasswordChange} />
            <PasswordField label="New Password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />
            <PasswordField label="Confirm Password" name="confirm" value={passwordData.confirm} onChange={handlePasswordChange} />
            <div className="flex items-end">
              <button type="button" onClick={handleChangePassword} disabled={isUpdatingPassword} className="h-11 w-full rounded-xl bg-[#D62839] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#A4161A] disabled:cursor-not-allowed disabled:opacity-70 lg:w-auto">
                {isUpdatingPassword ? "Updating Password..." : "Update Password"}
              </button>
            </div>
          </div>
          {passwordMessage && (
            <div className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${passwordMessage.type === "success" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
              {passwordMessage.text}
            </div>
          )}
        </section>

        <div className="flex items-center justify-center gap-2 pb-2 pt-1 text-xs text-slate-400">
          <Heart size={13} className="text-[#D62839]" fill="currentColor" />
          <span>Every donation counts — <span className="font-semibold text-[#D62839]">BloodBridge</span></span>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDECEF] text-[#D62839]">{icon}</div>
      <div className="min-w-0">
        <p className="truncate text-sm font-black text-slate-900">{value}</p>
        <p className="mt-0.5 truncate text-[11px] font-medium text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-[#D62839]">{icon}</span>
        <span className="text-xs font-semibold text-slate-500">{label}</span>
      </div>
      <span className={`truncate text-right text-xs font-bold ${highlight ? "text-[#D62839]" : "text-slate-700"}`}>{value}</span>
    </div>
  );
}

function ProfileField({ name, label, type, value, onChange, disabled }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-600">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} disabled={disabled} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500" />
    </div>
  );
}

function SelectField({ name, label, value, onChange, disabled, options, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-600">{label}</label>
      <select name={name} value={value} onChange={onChange} disabled={disabled} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-[#D62839] focus:bg-white focus:ring-4 focus:ring-[#FDECEF] disabled:cursor-not-allowed disabled:text-slate-500">
        <option value="">{placeholder}</option>
        {options.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
      </select>
    </div>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FDECEF] text-[#D62839]">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-slate-400">{label}</p>
        <p className="truncate text-xs font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function PasswordField({ label, name, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-600">{label}</label>
      <div className="relative">
        <input type={show ? "text" : "password"} name={name} value={value} onChange={onChange} placeholder={`Enter ${label.toLowerCase()}`} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 pr-12 text-sm font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#D62839] focus:ring-4 focus:ring-[#FDECEF]" />
        <button type="button" onClick={() => setShow((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D62839]">
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
