// dd/MM/yyyy -> number (timestamp). Fallback: 0
export default function parseVnDate(d) {
  if (!d) return 0;
  const [dd, mm, yyyy] = String(d).split("/");
  const day = Number(dd), month = Number(mm) - 1, year = Number(yyyy);
  const ts = new Date(year, month, day).getTime();
  return Number.isFinite(ts) ? ts : 0;
}
