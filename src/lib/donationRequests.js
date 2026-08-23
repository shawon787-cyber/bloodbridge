export const DONATION_REQUEST_STATUSES = [
  "Pending",
  "In Progress",
  "Done",
  "Cancelled",
];

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const URGENCY_LEVELS = [
  "Urgent",
  "High",
  "Medium",
  "Low",
];

export const getStatusStyle = (status) => {
  const normalized = String(status || "").toLowerCase().replace(/\s+/g, "");

  switch (normalized) {
    case "pending":
      return "bg-amber-50 text-amber-600";
    case "inprogress":
      return "bg-blue-50 text-blue-600";
    case "done":
      return "bg-emerald-50 text-emerald-600";
    case "cancelled":
      return "bg-slate-100 text-slate-600";
    case "rejected":
      return "bg-red-50 text-red-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

export const getUrgencyStyle = (urgency) => {
  switch (urgency) {
    case "Urgent":
      return "bg-red-50 text-red-600";
    case "High":
      return "bg-orange-50 text-orange-600";
    case "Medium":
      return "bg-amber-50 text-amber-600";
    case "Low":
      return "bg-emerald-50 text-emerald-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

export const normalizeStatusForCompare = (status) => {
  if (!status) return "";
  const s = String(status).toLowerCase().trim().replace(/\s+/g, "");
  return s;
};

export const getStatusDisplayLabel = (status) => {
  const normalized = normalizeStatusForCompare(status);
  switch (normalized) {
    case "pending":
      return "Pending";
    case "inprogress":
      return "In Progress";
    case "done":
      return "Done";
    case "cancelled":
      return "Cancelled";
    case "rejected":
      return "Rejected";
    default:
      return status || "Unknown";
  }
};

export const filterRequests = (requests, filters) => {
  const {
    search = "",
    bloodGroup = "",
    status = "",
    urgency = "",
    location = "",
    district = "",
    upazila = "",
  } = filters;

  const searchText = search.toLowerCase().trim();
  const normalizedStatusFilter = normalizeStatusForCompare(status);

  return requests.filter((req) => {
    const matchesSearch =
      !searchText ||
      (req.id && String(req.id).toLowerCase().includes(searchText)) ||
      (req.recipientName && req.recipientName.toLowerCase().includes(searchText)) ||
      (req.requesterName && req.requesterName.toLowerCase().includes(searchText)) ||
      (req.hospitalName && req.hospitalName.toLowerCase().includes(searchText)) ||
      (req.districtName && req.districtName.toLowerCase().includes(searchText)) ||
      (req.upazilaName && req.upazilaName.toLowerCase().includes(searchText)) ||
      (req.bloodGroup && req.bloodGroup.toLowerCase().includes(searchText));

    const matchesBlood = !bloodGroup || req.bloodGroup === bloodGroup;
    const matchesStatus = !normalizedStatusFilter || normalizeStatusForCompare(req.status) === normalizedStatusFilter;
    const matchesUrgency = !urgency || req.urgency === urgency;
    const matchesLocation =
      !location ||
      (req.location && req.location.toLowerCase().includes(location.toLowerCase())) ||
      (req.address && req.address.toLowerCase().includes(location.toLowerCase()));
    const matchesDistrict =
      !district ||
      (req.districtName && req.districtName.toLowerCase().includes(district.toLowerCase()));
    const matchesUpazila =
      !upazila ||
      (req.upazilaName && req.upazilaName.toLowerCase().includes(upazila.toLowerCase()));

    return (
      matchesSearch &&
      matchesBlood &&
      matchesStatus &&
      matchesUrgency &&
      matchesLocation &&
      matchesDistrict &&
      matchesUpazila
    );
  });
};

export const getRequestStats = (requests) => {
  const total = requests.length;
  const pending = requests.filter((r) => normalizeStatusForCompare(r.status) === "pending").length;
  const inProgress = requests.filter((r) => normalizeStatusForCompare(r.status) === "inprogress").length;
  const done = requests.filter((r) => normalizeStatusForCompare(r.status) === "done").length;
  const cancelled = requests.filter((r) => normalizeStatusForCompare(r.status) === "cancelled").length;
  const urgent = requests.filter((r) => r.urgency === "Urgent").length;

  return {
    total,
    pending,
    inProgress,
    done,
    cancelled,
    urgent,
  };
};

export const getLatestRequests = (requests, limit = 3) => {
  return [...requests]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
};
