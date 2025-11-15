// src/components/OnboardingGate.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OnboardingModal from "@pages/Auth/OnboardingModal";
import { isOnboardingDone, markOnboardingDone } from "@utils/onboarding";
import { useGetMyTagsQuery, useGetMyRestaurantTagsQuery } from "@redux/api/Tag/tagApi"; // nếu server có

const selectAuth = (s) => s.auth || {};

export default function OnboardingGate() {
  const { accessToken, user } = useSelector(selectAuth);
  const userId = user?.id;

  const [open, setOpen] = useState(false);

  // Check if user is restaurant owner
  const isRestaurantOwner = user?.roleId === 1 || 
                           user?.roleName?.toLowerCase() === "restaurant owner" ||
                           user?.role?.toLowerCase() === "restaurant owner";

  // ——— client fallback: chưa từng onboarding trên máy này
  const needClient = !!(accessToken && userId && !isOnboardingDone(userId));

  // ——— server check: use appropriate API based on user role
  const { data: userTagsData, isSuccess: isUserTagsSuccess } = useGetMyTagsQuery(undefined, { 
    skip: !needClient || isRestaurantOwner 
  });
  const { data: restaurantTagsData, isSuccess: isRestaurantTagsSuccess } = useGetMyRestaurantTagsQuery(undefined, { 
    skip: !needClient || !isRestaurantOwner 
  });

  // Use appropriate data based on user type
  const data = isRestaurantOwner ? restaurantTagsData : userTagsData;
  const isSuccess = isRestaurantOwner ? isRestaurantTagsSuccess : isUserTagsSuccess;

  useEffect(() => {
    if (!needClient) return setOpen(false);

    // Nếu server trả có tag → đánh dấu done và không mở
    if (isSuccess) {
      // Handle both array and object with data property
      const tagsList = Array.isArray(data) ? data : (data?.data ?? []);
      if (Array.isArray(tagsList) && tagsList.length > 0) {
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
