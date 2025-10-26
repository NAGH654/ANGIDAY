// Lưu & đọc localStorage có TTL (hết hạn tự động)
export const ttlStorage = {
  set(key, value, ttlMs) {
    const item = { v: value, exp: Date.now() + Number(ttlMs || 0) };
    localStorage.setItem(key, JSON.stringify(item));
  },
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const item = JSON.parse(raw);
      if (!item || typeof item !== "object") {
        localStorage.removeItem(key);
        return null;
      }
      if (!Number.isFinite(item.exp) || Date.now() > item.exp) {
        localStorage.removeItem(key); // hết hạn → xóa
        return null;
      }
      return item.v;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};
