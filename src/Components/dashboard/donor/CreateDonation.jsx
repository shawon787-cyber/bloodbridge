"use client";

import { useMemo, useState, useEffect } from "react";
import { useDonationRequests } from "@/context/DonationRequestContext";
import { useSession } from "@/lib/auth-client";
import PageHeader from "@/Components/dashboard/shared/PageHeader";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Droplets,
  Hospital,
  MapPin,
  MessageSquareText,
  Send,
  UserRound,
  CalendarDays,
} from "lucide-react";

import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";

// =====================================================
// DATA
// =====================================================

const districts = districtsData[2]?.data || [];
const upazilas = upazilasData[2]?.data || [];

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const urgencyLevels = [
  {
    value: "Urgent",
    label: "Urgent",
    description: "Needed immediately",
  },
  {
    value: "High",
    label: "High",
    description: "Needed within 24 hours",
  },
  {
    value: "Medium",
    label: "Medium",
    description: "Needed within a few days",
  },
  {
    value: "Low",
    label: "Low",
    description: "Planned requirement",
  },
];

// =====================================================
// COMPONENT
// =====================================================

export default function CreateDonation() {
  const today = new Date().toISOString().split("T")[0];
  const { addDonationRequest } = useDonationRequests();
  const { data: session, isPending: sessionPending } = useSession();

  const currentUser = session?.user;

  const [formData, setFormData] = useState({
    requesterName: "",
    requesterEmail: "",
    recipientName: "",
    hospitalName: "",
    district: "",
    upazila: "",
    bloodGroup: "",
    units: "1",
    donationDate: "",
    donationTime: "",
    urgency: "Urgent",
    address: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        requesterName: currentUser.name || prev.requesterName,
        requesterEmail: currentUser.email || prev.requesterEmail,
      }));
    }
  }, [currentUser]);

  // =====================================================
  // SELECTED DISTRICT
  // =====================================================

  const selectedDistrict = useMemo(() => {
    return districts.find(
      (district) =>
        String(district.id) === String(formData.district)
    );
  }, [formData.district]);

  // =====================================================
  // FILTER UPAZILA
  // =====================================================

  const filteredUpazilas = useMemo(() => {
    if (!formData.district) return [];

    return upazilas.filter(
      (upazila) =>
        String(upazila.district_id) ===
        String(formData.district)
    );
  }, [formData.district]);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // =====================================================
  // DISTRICT CHANGE
  // =====================================================

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      district: districtId,
      upazila: "",
    }));

    setErrors((prev) => ({
      ...prev,
      district: "",
      upazila: "",
    }));
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.recipientName.trim()) {
      newErrors.recipientName =
        "Recipient name is required.";
    }

    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName =
        "Hospital name is required.";
    }

    if (!formData.district) {
      newErrors.district =
        "Please select a district.";
    }

    if (!formData.upazila) {
      newErrors.upazila =
        "Please select an upazila.";
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup =
        "Please select a blood group.";
    }

    if (!formData.donationDate) {
      newErrors.donationDate =
        "Please select a required date.";
    }

    if (!formData.donationTime) {
      newErrors.donationTime =
        "Please select a required time.";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Full address is required.";
    }

    if (!formData.message.trim()) {
      newErrors.message =
        "Please provide a request message.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const selectedUpazila = filteredUpazilas.find(
      (item) =>
        String(item.id) === String(formData.upazila)
    );

    const submissionData = {
      ...formData,

      districtId: formData.district,
      districtName: selectedDistrict?.name || "",
      districtBnName:
        selectedDistrict?.bn_name || "",

      upazilaId: formData.upazila,
      upazilaName: selectedUpazila?.name || "",

      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    addDonationRequest(submissionData);

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    setFormData((prev) => ({
      ...prev,

      recipientName: "",
      hospitalName: "",
      district: "",
      upazila: "",
      bloodGroup: "",
      units: "1",
      donationDate: "",
      donationTime: "",
      urgency: "Urgent",
      address: "",
      message: "",
    }));

    setErrors({});
  };

  // =====================================================
  // STYLES
  // =====================================================

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 ${
      errors[field]
        ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-50"
        : "border-slate-200 hover:border-slate-300 focus:border-[#D62839] focus:ring-4 focus:ring-[#FDECEF]"
    }`;

  const labelClass =
    "mb-1.5 block text-xs font-bold text-slate-700";

  // =====================================================
  // ERROR
  // =====================================================

  const FieldError = ({ field }) => {
    if (!errors[field]) return null;

    return (
      <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-500">
        <AlertCircle size={12} />
        {errors[field]}
      </p>
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="w-full">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mx-auto w-full max-w-4xl">
        <PageHeader
          title="Create Donation Request"
          subtitle="Provide accurate details so nearby donors can respond quickly."
        />
      </div>

      {/* =================================================
          SUCCESS
      ================================================= */}

      {submitted && (
        <div className="mx-auto mt-5 flex w-full max-w-4xl items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-emerald-800">
              Donation request submitted successfully!
            </p>

            <p className="mt-0.5 text-[11px] text-emerald-700">
              Your request is now available for eligible donors.
            </p>
          </div>
        </div>
      )}

      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-5 w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
      >
        {/* =================================================
            REQUESTER
        ================================================= */}

        <section className="border-b border-slate-100 px-5 py-5 sm:px-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
              <UserRound size={18} />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Requester Information
              </h2>

              <p className="text-[11px] text-slate-400">
                Your account information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Name */}

            <div>
              <label className={labelClass}>
                Requester Name
              </label>

              <div className="relative">
                <UserRound
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={formData.requesterName}
                  className={`${inputClass(
                    "requesterName"
                  )} bg-slate-50 pl-9`}
                  readOnly
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className={labelClass}>
                Requester Email
              </label>

              <input
                type="email"
                value={formData.requesterEmail}
                className={`${inputClass(
                  "requesterEmail"
                )} bg-slate-50`}
                readOnly
              />
            </div>
          </div>
        </section>

        {/* =================================================
            BLOOD REQUIREMENT
        ================================================= */}

        <section className="border-b border-slate-100 px-5 py-5 sm:px-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
              <Droplets size={18} />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Blood Requirement
              </h2>

              <p className="text-[11px] text-slate-400">
                Enter the patient's blood requirement
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Recipient */}

            <div>
              <label className={labelClass}>
                Recipient Name
              </label>

              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                className={inputClass(
                  "recipientName"
                )}
                placeholder="Enter patient's full name"
                required
              />

              <FieldError field="recipientName" />
            </div>

            {/* Hospital */}

            <div>
              <label className={labelClass}>
                Hospital Name
              </label>

              <div className="relative">
                <Hospital
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  className={`${inputClass(
                    "hospitalName"
                  )} pl-9`}
                  placeholder="e.g. Dhaka Medical College"
                  required
                />
              </div>

              <FieldError field="hospitalName" />
            </div>

            {/* District */}

            <div>
              <label className={labelClass}>
                Recipient District
              </label>

              <div className="relative">
                <MapPin
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#D62839]"
                />

                <select
                  name="district"
                  value={formData.district}
                  onChange={handleDistrictChange}
                  className={`${inputClass(
                    "district"
                  )} appearance-none pl-9 pr-9`}
                  required
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

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <FieldError field="district" />
            </div>

            {/* Upazila */}

            <div>
              <label className={labelClass}>
                Recipient Upazila
              </label>

              <div className="relative">
                <select
                  name="upazila"
                  value={formData.upazila}
                  onChange={handleChange}
                  disabled={!formData.district}
                  className={`${inputClass(
                    "upazila"
                  )} appearance-none pr-9 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
                  required
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

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <FieldError field="upazila" />
            </div>

            {/* Blood */}

            <div>
              <label className={labelClass}>
                Blood Group
              </label>

              <div className="relative">
                <Droplets
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#D62839]"
                />

                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className={`${inputClass(
                    "bloodGroup"
                  )} appearance-none pl-9 pr-9`}
                  required
                >
                  <option value="">
                    Select blood group
                  </option>

                  {bloodGroups.map((group) => (
                    <option
                      key={group}
                      value={group}
                    >
                      {group}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <FieldError field="bloodGroup" />
            </div>

            {/* Units */}

            <div>
              <label className={labelClass}>
                Units Required
              </label>

              <div className="relative">
                <Droplets
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  className={`${inputClass(
                    "units"
                  )} appearance-none pl-9 pr-9`}
                  required
                >
                  {[1, 2, 3, 4, 5].map((unit) => (
                    <option
                      key={unit}
                      value={String(unit)}
                    >
                      {unit}{" "}
                      {unit === 1 ? "Unit" : "Units"}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            REQUEST DETAILS
        ================================================= */}

        <section className="border-b border-slate-100 px-5 py-5 sm:px-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
              <CalendarDays size={18} />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Request Details
              </h2>

              <p className="text-[11px] text-slate-400">
                When and how urgently blood is needed
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Date */}

            <div>
              <label className={labelClass}>
                Required Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  name="donationDate"
                  value={formData.donationDate}
                  onChange={handleChange}
                  min={today}
                  className={`${inputClass(
                    "donationDate"
                  )} pl-9`}
                  required
                />
              </div>

              <FieldError field="donationDate" />
            </div>

            {/* Time */}

            <div>
              <label className={labelClass}>
                Required Time
              </label>

              <div className="relative">
                <Clock3
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="time"
                  name="donationTime"
                  value={formData.donationTime}
                  onChange={handleChange}
                  className={`${inputClass(
                    "donationTime"
                  )} pl-9`}
                  required
                />
              </div>

              <FieldError field="donationTime" />
            </div>

            {/* Urgency */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Urgency Level
              </label>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {urgencyLevels.map((level) => {
                  const active =
                    formData.urgency ===
                    level.value;

                  return (
                    <label
                      key={level.value}
                      className={`cursor-pointer rounded-xl border p-3 transition-all ${
                        active
                          ? "border-[#D62839] bg-[#FFF7F8] ring-2 ring-[#FDECEF]"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={level.value}
                        checked={active}
                        onChange={handleChange}
                        className="sr-only"
                      />

                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p
                            className={`text-xs font-extrabold ${
                              active
                                ? "text-[#D62839]"
                                : "text-slate-800"
                            }`}
                          >
                            {level.label}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {level.description}
                          </p>
                        </div>

                        <div
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                            active
                              ? "border-[#D62839]"
                              : "border-slate-300"
                          }`}
                        >
                          {active && (
                            <div className="h-2 w-2 rounded-full bg-[#D62839]" />
                          )}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Address */}

            <div className="md:col-span-2">
              <label className={labelClass}>
                Full Address
              </label>

              <div className="relative">
                <MapPin
                  size={15}
                  className="pointer-events-none absolute left-3 top-3 text-slate-400"
                />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className={`${inputClass(
                    "address"
                  )} resize-none pl-9`}
                  placeholder="Ward, road, area, nearby landmark..."
                  required
                />
              </div>

              <FieldError field="address" />
            </div>
          </div>
        </section>

        {/* =================================================
            MESSAGE
        ================================================= */}

        <section className="px-5 py-5 sm:px-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D62839]">
              <MessageSquareText size={18} />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Request Message
              </h2>

              <p className="text-[11px] text-slate-400">
                Give donors important information
              </p>
            </div>
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            maxLength={500}
            className={`${inputClass(
              "message"
            )} resize-none`}
            placeholder="Explain why blood is needed, patient's condition, or other important information..."
            required
          />

          <div className="mt-1.5 flex items-center justify-between">
            <FieldError field="message" />

            <p className="ml-auto text-[10px] text-slate-400">
              {formData.message.length}/500
            </p>
          </div>

          {/* LOCATION */}

          {selectedDistrict && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#D62839] shadow-sm">
                <MapPin size={15} />
              </div>

              <div>
                <p className="text-[10px] font-medium text-slate-400">
                  Request Location
                </p>

                <p className="text-xs font-bold text-slate-800">
                  {selectedDistrict.name}

                  {formData.upazila && (
                    <>
                      {" • "}
                      {
                        filteredUpazilas.find(
                          (item) =>
                            String(item.id) ===
                            String(
                              formData.upazila
                            )
                        )?.name
                      }
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* ACTIONS */}

          <div className="mt-6 flex flex-col-reverse gap-2.5 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50"
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#D62839] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#A4161A] hover:shadow-md active:scale-[0.99]"
            >
              <Send size={15} />
              Submit Donation Request
            </button>
          </div>
        </section>
      </form>

      {/* =================================================
          FOOTNOTE
      ================================================= */}

      <div className="mx-auto flex w-full max-w-4xl items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <AlertCircle
          size={15}
          className="mt-0.5 shrink-0 text-slate-400"
        />

        <p className="text-[11px] leading-5 text-slate-500">
          Please make sure all information is accurate before
          submitting. Accurate location, blood group, date,
          and contact information helps donors respond faster.
        </p>
      </div>
    </div>
  );
}