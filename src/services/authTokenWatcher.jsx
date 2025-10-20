import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanLogout } from "@utils/cleanLogout";

const selectAuth = (s) => s.auth || {};

function getTokenFromStorage() {
  try {
    const raw = localStorage.getItem("auth") || sessionStorage.getItem("auth");
    if (!raw) return null;
    const obj = JSON.parse(raw);
    const token = obj?.accessToken || null;
    console.log("🔍 getTokenFromStorage:", {
      hasRaw: !!raw,
      hasToken: !!token,
      tokenPreview: token?.substring(0, 20) + "...",
      source: localStorage.getItem("auth") ? "localStorage" : "sessionStorage"
    });
    return token;
  } catch (error) {
    console.error("❌ getTokenFromStorage error:", error);
    return null;
  }
}

function getCookie(name) {
  try {
    const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return m ? decodeURIComponent(m[2]) : null;
  } catch {
    return null;
  }
}

export default function AuthTokenWatcher({
  redirect = "/",
  pollMs = 800,
  cookieName,
}) {
  const dispatch = useDispatch();
  const { accessToken, expiresAtUtc } = useSelector(selectAuth);

  const lastTokenRef = useRef(getTokenFromStorage());
  const missRef = useRef(0); // đếm liên tiếp mất token trong storage
  const cookieMissRef = useRef(0); // đếm liên tiếp mất cookie (nếu dùng)

  useEffect(() => {
    const onStorage = (e) => {
      if (!e) return;
      if (e.key === "auth" || e.key === "auth:logout") {
        const after = getTokenFromStorage();
        if (!after && accessToken) cleanLogout(dispatch, { redirect });
      }
    };
    window.addEventListener("storage", onStorage);

    const timer = setInterval(() => {
      const persisted = getTokenFromStorage();

      // 1) Token biến mất → yêu cầu 2 nhịp để chắc chắn (tránh race)
      if (accessToken && !persisted) {
        missRef.current += 1;
        console.log(`🚨 AuthTokenWatcher: Token missing from storage (${missRef.current}/2)`, {
          accessToken: accessToken?.substring(0, 20) + "...",
          persisted,
          missCount: missRef.current
        });
        if (missRef.current >= 2) {
          console.log("🚨 AuthTokenWatcher: Logging out due to missing token");
          cleanLogout(dispatch, { redirect });
          return;
        }
      } else {
        missRef.current = 0;
      }

      // 2) Token storage thay đổi
      if (lastTokenRef.current !== persisted) {
        lastTokenRef.current = persisted;
        if (accessToken && !persisted) {
          missRef.current += 1;
          if (missRef.current >= 2) {
            cleanLogout(dispatch, { redirect });
            return;
          }
        }
      }

      // 3) Cookie (nếu dùng)
      if (cookieName) {
        const c = getCookie(cookieName);
        if (accessToken && !c) {
          cookieMissRef.current += 1;
          if (cookieMissRef.current >= 2) {
            cleanLogout(dispatch, { redirect });
            return;
          }
        } else {
          cookieMissRef.current = 0;
        }
      }

      // 4) Hết hạn: chỉ xử nếu mốc hợp lệ (> 2001-01-01)
      if (expiresAtUtc) {
        const exp = new Date(expiresAtUtc).getTime();
        if (Number.isFinite(exp) && exp > 978307200000) {
          if (Date.now() >= exp - 1000) {
            cleanLogout(dispatch, { redirect });
            return;
          }
        }
      }
    }, pollMs);

    const onVis = () => {
      if (document.visibilityState === "visible") {
        const persisted = getTokenFromStorage();
        if (accessToken && !persisted) {
          missRef.current += 1;
          if (missRef.current >= 2) cleanLogout(dispatch, { redirect });
        }
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVis);
      clearInterval(timer);
    };
  }, [dispatch, accessToken, expiresAtUtc, redirect, pollMs, cookieName]);

  return null;
}
