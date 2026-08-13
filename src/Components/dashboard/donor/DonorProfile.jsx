"use client";

import { useState } from "react";
import PageHeader from "@/Components/dashboard/shared/PageHeader";
import { useSession } from "@/lib/auth-client";

export default function DonorProfile() {
  const { data: session } = useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || "Arif Khan",
    email: user?.email || "arif@email.com",
    phone: "+880 1711-100001",
    bloodGroup: "A+",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    location: "Dhaka",
    address: "House 42, Road 12, Dhanmondi",
    emergencyContact: "+880 1711-000000",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const donationInfo = [
    { label: "Last Donation", value: "Jul 15, 2025" },
    { label: "Total Donations", value: "12" },
    { label: "Availability", value: "Available", highlight: true },
    { label: "Preferred Contact", value: "Phone / SMS" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information and donation details"
      />

      {/* Profile Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#D62839] text-3xl font-black text-white">
            {formData.fullName.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-black text-slate-900">{formData.fullName}</h2>
            <p className="mt-1 text-sm text-slate-500">{formData.email}</p>
            <span className="mt-2 inline-flex rounded-full bg-[#FDECEF] px-3 py-1 text-xs font-bold text-[#D62839]">
              Blood Donor
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Donation Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Donation Information</h3>
          <p className="mt-1 text-xs text-slate-500">Your donor stats at a glance</p>
          <div className="mt-4 space-y-3">
            {donationInfo.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                <span className="text-xs font-medium text-slate-500">{item.label}</span>
                <span className={`text-xs font-bold ${item.highlight ? "text-emerald-600" : "text-slate-900"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
              <p className="mt-1 text-xs text-slate-500">Update your profile details</p>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-xl bg-[#D62839] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#A4161A]"
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="mt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { name: "fullName", label: "Full Name", type: "text", value: formData.fullName },
                { name: "email", label: "Email", type: "email", value: formData.email },
                { name: "phone", label: "Phone", type: "tel", value: formData.phone },
                { name: "bloodGroup", label: "Blood Group", type: "text", value: formData.bloodGroup, disabled: true },
                { name: "dateOfBirth", label: "Date of Birth", type: "date", value: formData.dateOfBirth },
                { name: "gender", label: "Gender", type: "select", value: formData.gender, options: ["Male", "Female", "Other"] },
                { name: "location", label: "Location", type: "text", value: formData.location },
                { name: "address", label: "Address", type: "text", value: formData.address },
                { name: "emergencyContact", label: "Emergency Contact", type: "tel", value: formData.emergencyContact },
              ].map((field) => (
                <div key={field.name} className={field.name === "address" || field.name === "emergencyContact" ? "sm:col-span-2" : ""}>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">{field.label}</label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={field.value}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF] disabled:bg-slate-50 disabled:text-slate-500"
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={field.value}
                      onChange={handleChange}
                      disabled={!isEditing || field.disabled}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF] disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="mt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#D62839] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#A4161A]"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900">Change Password</h3>
        <p className="mt-1 text-xs text-slate-500">Update your account password</p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Current Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="current"
              value={passwordData.current}
              onChange={handlePasswordChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirm"
              value={passwordData.confirm}
              onChange={handlePasswordChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 transition-all focus:border-[#D62839] focus:outline-none focus:ring-2 focus:ring-[#FDECEF]"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#D62839] focus:ring-[#D62839]"
            />
            <span className="text-xs font-medium text-slate-600">Show passwords</span>
          </label>
          <button
            type="button"
            className="rounded-xl bg-[#D62839] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#A4161A]"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
