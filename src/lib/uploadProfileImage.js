import { apiFetchJSON } from "@/lib/api";

export async function uploadProfileImage(file, userId) {
  if (!file) {
    throw new Error("No image selected");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size must be less than 5MB");
  }

  const body = new FormData();
  body.append("image", file);

  const result = await apiFetchJSON(`/api/users/${userId}/profile-image`, {
    method: "POST",
    body,
  });

  return result.imageUrl;
}

export function getProfileImageUrl(baseImageUrl) {
  if (!baseImageUrl) return "";
  return `${baseImageUrl}?t=${Date.now()}`;
}
