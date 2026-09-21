import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";

const districts = districtsData[2]?.data || [];
const upazilas = upazilasData[2]?.data || [];

export function getDistrictName(districtId) {
  if (!districtId && districtId !== 0) return "";

  const id = String(districtId).trim();
  if (!id) return "";

  const district = districts.find(
    (item) => String(item.id).trim() === id
  );

  if (district) {
    return district.name;
  }

  return String(districtId).trim();
}

export function getUpazilaName(upazilaId) {
  if (!upazilaId && upazilaId !== 0) return "";

  const id = String(upazilaId).trim();
  if (!id) return "";

  const upazila = upazilas.find(
    (item) => String(item.id).trim() === id
  );

  if (upazila) {
    return upazila.name;
  }

  return String(upazilaId).trim();
}

export function getDistrictById(districtId) {
  if (!districtId && districtId !== 0) return null;

  const id = String(districtId).trim();
  if (!id) return null;

  return districts.find((item) => String(item.id).trim() === id) || null;
}

export function getUpazilaById(upazilaId) {
  if (!upazilaId && upazilaId !== 0) return null;

  const id = String(upazilaId).trim();
  if (!id) return null;

  return upazilas.find((item) => String(item.id).trim() === id) || null;
}
