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
  switch (status) {
    case "Pending":
      return "bg-amber-50 text-amber-600";
    case "In Progress":
      return "bg-blue-50 text-blue-600";
    case "Done":
      return "bg-emerald-50 text-emerald-600";
    case "Cancelled":
      return "bg-slate-100 text-slate-600";
    case "Rejected":
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

export const normalizeStatus = (status) => {
  if (!status) return "Pending";
  const s = String(status).toLowerCase().trim();
  if (s === "approved" || s === "in progress" || s === "inprogress") return "In Progress";
  if (s === "confirmed" || s === "fulfilled" || s === "completed" || s === "done") return "Done";
  if (s === "cancelled" || s === "canceled") return "Cancelled";
  if (s === "rejected") return "Rejected";
  if (s === "pending") return "Pending";
  if (s === "urgent" || s === "active") return "Pending";
  return "Pending";
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
    const matchesStatus = !status || req.status === status;
    const matchesUrgency = !urgency || req.urgency === urgency;
    const matchesLocation = !location || req.location === location || req.address === location;
    const matchesDistrict = !district || req.district === district || req.districtName === district;
    const matchesUpazila = !upazila || req.upazila === upazila || req.upazilaName === upazila;

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
  const pending = requests.filter((r) => r.status === "Pending").length;
  const inProgress = requests.filter((r) => r.status === "In Progress").length;
  const done = requests.filter((r) => r.status === "Done").length;
  const cancelled = requests.filter((r) => r.status === "Cancelled").length;
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
