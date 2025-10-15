// XÓA SẠCH TOKEN + CACHE + REDUX STATE rồi chuyển về trang chỉ định (KHÔNG thêm ?__ts)
import { logout } from "@redux/features/authSlice";
import { baseApi } from "@redux/api/baseApi";

const LOGIN_KEYS = [
  "auth",
  "accessToken",
  "token",
  "persist:auth",
  "persist:user",
  "user",
];

function clearStorage(store) {
  try {
    LOGIN_KEYS.forEach((k) => store.removeItem(k));
    for (let i = store.length - 1; i >= 0; i--) {
      const k = store.key(i) || "";
      if (/^persist:/.test(k) || /^rtkq/.test(k) || /^redux/.test(k)) {
        store.removeItem(k);
      }
    }
  } catch {}
}

function clearAllCookies() {
  try {
    const cookies = (document.cookie || "")
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean);
    const domain = location.hostname.replace(/^www\./, "");
    cookies.forEach((c) => {
      const eq = c.indexOf("=");
      const name = eq > -1 ? c.substring(0, eq) : c;
      // Không xóa được httpOnly; phần dưới chỉ xóa được cookie phía client
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    });
  } catch {}
}

export async function cleanLogout(dispatch, opts = {}) {
  const {
    redirect = "/", // URL muốn quay về
    apis = [baseApi], // RTK Query apis để reset cache
    forceReload = true, // ép reload trang (vẫn KHÔNG thêm query)
  } = opts;

  try {
    apis.forEach((api) => dispatch(api.util.resetApiState()));
  } catch {}
  try {
    dispatch(logout());
  } catch {}

  clearStorage(localStorage);
  clearStorage(sessionStorage);
  clearAllCookies();

  // Điều hướng mà KHÔNG thêm cache-buster
  if (!forceReload) {
    window.location.replace(redirect);
    return;
  }

  const currentPath = window.location.pathname.replace(/\/+$/, "");
  const targetPath = new URL(redirect, window.location.origin).pathname.replace(
    /\/+$/,
    ""
  );
  // Dù là cùng path cũng điều hướng lại để trình duyệt nạp lại tài nguyên
  if (currentPath === targetPath) {
    window.location.replace(redirect);
  } else {
    window.location.replace(redirect);
  }
}
