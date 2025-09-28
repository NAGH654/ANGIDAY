export default function parseDistance(d = "") {
  const n = parseFloat(String(d).replace(",", "."));
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
}
