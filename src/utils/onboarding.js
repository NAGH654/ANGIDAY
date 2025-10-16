// src/utils/onboarding.js
export const ONBOARDING_VERSION = "v1";

const key = (userId) => `onboarding_done_${ONBOARDING_VERSION}:${userId ?? "anon"}`;

export const isOnboardingDone = (userId) =>
  typeof window !== "undefined" && localStorage.getItem(key(userId)) === "1";

export const markOnboardingDone = (userId) => {
  try { localStorage.setItem(key(userId), "1"); } catch {}
};

export const clearOnboardingFlag = (userId) => {
  try { localStorage.removeItem(key(userId)); } catch {}
};
