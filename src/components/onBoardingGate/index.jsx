// src/components/OnboardingGate.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OnboardingModal from "@pages/Auth/OnboardingModal";
import { isOnboardingDone, markOnboardingDone } from "@utils/onboarding";
import { useGetMyTagsQuery } from "@redux/api/Tag/tagApi"; // nếu server có

const selectAuth = (s) => s.auth || {};

export default function OnboardingGate() {
  const { accessToken, user } = useSelector(selectAuth);
  const userId = user?.id;

  const [open, setOpen] = useState(false);

  // ——— client fallback: chưa từng onboarding trên máy này
  const needClient = !!(accessToken && userId && !isOnboardingDone(userId));

  // ——— server check (nếu backend có /UserTag/me). Nếu không có, hook này sẽ error/404 → vẫn fallback client.
  const { data, isSuccess } = useGetMyTagsQuery(undefined, { skip: !needClient });

  useEffect(() => {
    if (!needClient) return setOpen(false);

    // Nếu server trả có tag → đánh dấu done và không mở
    if (isSuccess && Array.isArray(data?.data)) {
      if (data.data.length > 0) {
        markOnboardingDone(userId);
        setOpen(false);
      } else {
        setOpen(true);
      }
      return;
    }

    // Không có server hoặc lỗi → fallback mở modal
    setOpen(true);
  }, [needClient, isSuccess, data, userId]);

  if (!open) return null;
  return <OnboardingModal open={open} onClose={() => setOpen(false)} userId={userId} />;
}
