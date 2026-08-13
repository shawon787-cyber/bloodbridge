"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Droplets,
  Shield,
  KeyRound,
  Save,
  X,
} from "lucide-react";

import PageHeader from "@/Components/dashboard/shared/PageHeader";
import Modal from "@/Components/dashboard/shared/Modal";
import EmptyState from "@/Components/dashboard/shared/EmptyState";

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
  const { data: session } = useSession();
  const user = session?.user;

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+880 1711-000000",
    location: "Dhaka",
    bloodGroup: "A+",
    district: "Dhaka",
    upazila: "Dhaka Sadar",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setSaveMessage(null);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setPasswordMessage(null);
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage({ type: "success", text: "Profile updated successfully." });
    }, 800);
  };

  const handleCancel = () => {
    setProfile({
      name: user?.name || "",
      email: user?.email || "",
      phone: "+880 1711-000000",
      location: "Dhaka",
      bloodGroup: "A+",
      district: "Dhaka",
      upazila: "Dhaka Sadar",
    });
    setSaveMessage(null);
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.newPassword || !passwords.confirm) {
      setPasswordMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }
    if (passwords.newPassword !== passwords.confirm) {
      setPasswordMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    setPasswordMessage({ type: "success", text: "Password changed successfully." });
    setPasswords({ current: "", newPassword: "", confirm: "" });
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordMessage(null);
    }, 1000);
  };

  const inputClass =
    "w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]";

  return (
    <div className="min-h-screen space-y-7">
      <PageHeader
        title="My Profile"
        subtitle="Manage your account settings and preferences."
        action={
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-bold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839]"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveProfile}
              className="inline-flex items-center gap-2 rounded-xl bg-[#D62839] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#A4161A]"
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        }
      />

      {saveMessage && (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-semibold ${
            saveMessage.type === "success"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {saveMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FDECEF] text-2xl font-black text-[#D62839]">
                {profile.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <h2 className="mt-4 text-lg font-black text-[#111827]">
                {profile.name}
              </h2>
              <p className="mt-1 text-sm text-[#64748B]">{profile.email}</p>
              <span className="mt-3 inline-flex rounded-full bg-[#FDECEF] px-3 py-1 text-xs font-bold text-[#D62839]">
                Administrator
              </span>
              <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                Active
              </span>
              <p className="mt-3 text-xs text-[#94A3B8]">
                Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "2024-01-01"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <h3 className="text-sm font-bold text-[#111827]">Contact Info</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#64748B]">
                <Mail size={16} className="text-[#94A3B8]" />
                {profile.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-[#64748B]">
                <Phone size={16} className="text-[#94A3B8]" />
                {profile.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-[#64748B]">
                <MapPin size={16} className="text-[#94A3B8]" />
                {profile.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-[#64748B]">
                <Droplets size={16} className="text-[#94A3B8]" />
                {profile.bloodGroup}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <h3 className="text-sm font-bold text-[#111827]">Account Security</h3>
            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="flex w-full items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839]"
              >
                <KeyRound size={16} />
                Change Password
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#64748B] transition-colors hover:border-[#D62839] hover:text-[#D62839]"
              >
                <Shield size={16} />
                Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <h3 className="text-sm font-bold text-[#111827]">Profile Information</h3>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-bold text-[#475569]">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-bold text-[#475569]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#475569]">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#475569]">
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleProfileChange}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#475569]">
                  Blood Group
                </label>
                <div className="relative">
                  <Droplets
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <select
                    name="bloodGroup"
                    value={profile.bloodGroup}
                    onChange={handleProfileChange}
                    className={`${inputClass} pl-10 appearance-none`}
                  >
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#475569]">
                  District
                </label>
                <select
                  name="district"
                  value={profile.district}
                  onChange={handleProfileChange}
                  className={`${inputClass} appearance-none`}
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-bold text-[#475569]">
                  Upazila
                </label>
                <select
                  name="upazila"
                  value={profile.upazila}
                  onChange={handleProfileChange}
                  className={`${inputClass} appearance-none`}
                >
                  {upazilas.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
        width="max-w-md"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#475569]">
              Current Password
            </label>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#475569]">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#475569]">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className={inputClass}
            />
          </div>
          {passwordMessage && (
            <div
              className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                passwordMessage.type === "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {passwordMessage.text}
            </div>
          )}
          <button
            type="button"
            onClick={handleChangePassword}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D62839] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#A4161A]"
          >
            Update Password
          </button>
        </div>
      </Modal>
    </div>
  );
}
