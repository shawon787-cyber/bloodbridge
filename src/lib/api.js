const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:5000";

export { API_URL };

const TOKEN_KEY = "bloodbridge_token";
const USER_KEY = "bloodbridge_user";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setAuth(token, user) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function removeAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    cache: options.cache || "no-store",
  });

  if (res.status === 401) {
    removeAuth();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth:logout"));
      window.location.href = "/auth/SignInPage";
    }
  }

  if (res.status === 403) {
    const data = await res.json().catch(() => ({}));
    const error = new Error(data.message || "Access denied");
    error.status = 403;
    error.data = data;
    throw error;
  }

  return res;
}

export async function apiFetchJSON(endpoint, options = {}) {
  const res = await apiFetch(endpoint, options);

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || `HTTP ${res.status}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  get: (endpoint) => apiFetchJSON(endpoint, { method: "GET" }),
  post: (endpoint, body) =>
    apiFetchJSON(endpoint, { method: "POST", body: JSON.stringify(body) }),
  patch: (endpoint, body) =>
    apiFetchJSON(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (endpoint) => apiFetchJSON(endpoint, { method: "DELETE" }),
  upload: (endpoint, formData) =>
    apiFetchJSON(endpoint, { method: "POST", body: formData }),
};

export default api;
