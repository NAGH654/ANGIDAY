// Normalize image URL coming from API that can be:
// - absolute URL (http/https) → return as-is
// - storage key like "uploads/..." or any relative key → wrap with Storage/view
// - invalid values (empty, blob:, data:) → return empty string
export function resolveImageUrl(input, baseUrl) {
  const val = String(input || "").trim();
  if (!val) return "";

  const lower = val.toLowerCase();
  if (lower.startsWith("http://") || lower.startsWith("https://")) {
    return val; // already absolute (e.g., googleusercontent)
  }
  if (lower.startsWith("blob:") || lower.startsWith("data:")) {
    return ""; // do not render these in IMG for remote content
  }

  const base = String(baseUrl || "").trim();
  // Default: treat as storage key
  // Note: do NOT append extra params here; callers can add if needed
  return `${base}/Storage/view?key=${encodeURIComponent(val)}`;
}


