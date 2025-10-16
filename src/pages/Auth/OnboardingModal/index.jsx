// src/pages/Onboarding/OnboardingModal.jsx
import React, { useMemo, useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { useGetTagsQuery, useChooseTagsMutation } from "@redux/api/Tag/tagApi";
import { markOnboardingDone } from "@utils/onboarding";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import LoadingSpinner from "@components/LoadingSpinner";

/** Icon emoji theo key chuẩn hoá (không #, không khoảng trắng, lowercase) */
const ICONS = {
  luxury: "💎",
  traditional: "🏺",
  streetfood: "🍢",
  vegetarian: "🥦",
  spicy: "🌶️",
  sweet: "🍰",
  healthy: "🥗",
  fastfood: "🍔",
  seafood: "🦐",
  bbq: "🍖",
  dessert: "🍰",
  coffee: "☕",
  international: "🌍",
  romantic: "💖",
  familyfriendly: "👨‍👩‍👧‍👦",
  vietnamese: "🍲",
};

const toKey = (name) =>
  String(name || "")
    .replace(/^#/, "")
    .toLowerCase()
    .replace(/\s+/g, "");

const toLabel = (name) => {
  const s = String(name || "").trim();
  return s.startsWith("#") ? s : `#${s}`;
};

function Tile({ selected, label, emoji, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative w-full h-24 rounded-2xl border-2 flex flex-col items-center justify-center
                  transition-all duration-200 select-none overflow-hidden active:scale-[0.98]
                  ${
                    selected
                      ? "border-pink-500 bg-pink-50 text-pink-700"
                      : "border-gray-200 hover:border-pink-300"
                  } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      title={label}
    >
      {/* ánh sáng nền khi hover */}
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(120px_80px_at_50%_0%,rgba(236,72,153,0.08),transparent)]" />
      {/* icon */}
      <div
        className={`mb-2 flex items-center justify-center w-9 h-9 rounded-xl ${
          selected ? "bg-pink-100" : "bg-gray-100"
        }`}
      >
        <span className="text-lg leading-none">{emoji || "🍽️"}</span>
      </div>
      <div
        className={`text-sm font-medium ${
          selected ? "text-pink-700" : "text-gray-800"
        }`}
      >
        {label}
      </div>

      {/* tick khi chọn */}
      {selected && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center">
          <Check className="w-3.5 h-3.5" />
        </span>
      )}
    </button>
  );
}

export default function OnboardingModal({ open, onClose, userId }) {
  const { data, isFetching, isError, refetch } = useGetTagsQuery(undefined, {
    skip: !open,
  });
  const [chooseTags, { isLoading: saving }] = useChooseTagsMutation();

  // lưu key đã chọn (key = name chuẩn hoá)
  const [picked, setPicked] = useState(() => new Set());
  const [showSuccessFx, setShowSuccessFx] = useState(false);

  // đóng bằng ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const tags = useMemo(() => {
    const arr = data?.data ?? [];
    return arr.map((t) => {
      const key = toKey(t.name);
      return {
        id: t.id,
        rawName: t.name, // POST cần đúng tên server
        key,
        label: toLabel(t.name),
        description: t.description,
        emoji: ICONS[key] || "🍽️",
      };
    });
  }, [data]);

  const byKey = useMemo(() => {
    const map = new Map();
    tags.forEach((t) => map.set(t.key, t));
    return map;
  }, [tags]);

  const toggle = (key) => {
    setPicked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleContinue = async () => {
    if (!picked.size) return;
    const body = Array.from(picked).map((k) => {
      const it = byKey.get(k);
      return { tagName: it?.rawName ?? `#${k}`, isDeleted: false };
      // vẫn gửi lại đúng "tagName" server trả (# hoặc không # tuỳ server)
    });

    try {
      await chooseTags(body).unwrap();
      markOnboardingDone?.(userId);
      toast.success("Đã lưu sở thích!");

      // hiệu ứng mừng nho nhỏ rồi đóng
      setShowSuccessFx(true);
      setTimeout(() => {
        setShowSuccessFx(false);
        onClose?.();
      }, 1000);
    } catch (e) {
      toast.error(e?.data?.message || e?.message || "Không thể lưu lựa chọn");
    }
  };

  if (!open) return null;

  const count = picked.size;
  const canContinue = count > 0;

  return (
    <div className="fixed inset-0 z-[1000]">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* panel */}
      <div className="absolute inset-0 p-4 flex items-start md:items-center justify-center">
        <div
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* nút đóng */}
          <motion.button
            whileHover={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="absolute right-4 top-4 w-9 h-9 rounded-md hover:bg-gray-100 flex items-center justify-center"
            onClick={onClose}
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* header */}
          <div className="px-6 pt-6 pb-3 border-b border-gray-100">
            <div className="w-16 h-1 rounded mx-auto bg-gray-200 mb-4" />
            <h2 className="text-center text-xl md:text-2xl font-bold text-gray-900">
              Bạn có tâm trạng muốn ăn gì?
            </h2>
            <p className="text-center text-gray-500 mt-1 mb-2 text-sm">
              Chọn hashtag phù hợp để chúng tôi gợi ý những địa điểm tuyệt vời
              nhất
            </p>
          </div>

          {/* body */}
          <div className="px-6 py-5">
            {isFetching ? (
              <div className="py-10">
                <LoadingSpinner size="10" color="gray" />
              </div>
            ) : isError ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-3">
                  Không tải được danh sách hashtag.
                </p>
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:brightness-95"
                >
                  Thử lại
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
                  {tags.map((t) => (
                    <Tile
                      key={t.key}
                      selected={picked.has(t.key)}
                      label={t.label}
                      emoji={t.emoji}
                      onClick={() => toggle(t.key)}
                      disabled={saving}
                    />
                  ))}
                </div>

                {/* footer CTA */}
                <div className="mt-8">
                  <button
                    onClick={handleContinue}
                    disabled={!canContinue || saving}
                    className={`w-full h-12 rounded-xl font-semibold transition-all flex items-center justify-center gap-2
                    ${
                      canContinue
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:brightness-95"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {saving && (
                      <LoadingSpinner
                        inline
                        size="5"
                        color="white"
                        className="border-3"
                      />
                    )}
                    {canContinue
                      ? `Tiếp tục với ${count} sở thích`
                      : "Chọn ít nhất 1 hashtag để tiếp tục"}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* hiệu ứng success ngắn */}
          {showSuccessFx && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden">
                {["🎉", "🍣", "🥗", "🍰", "☕", "🌶️", "💎", "🦐"].map(
                  (emo, i) => (
                    <span
                      key={i}
                      className="absolute text-2xl animate-float"
                      style={{
                        left: `${10 + i * 10}%`,
                        bottom: "-8%",
                        animationDelay: `${i * 80}ms`,
                      }}
                    >
                      {emo}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          {/* keyframes cho confetti nhẹ */}
          <style>{`
            @keyframes floatUp {
              0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
              10%  { opacity: 1; }
              100% { transform: translateY(-120%) rotate(25deg); opacity: 0; }
            }
            .animate-float {
              animation: floatUp 900ms ease-in forwards;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
