import React, { useEffect, useRef, useState } from "react";
import { TrendingUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SortMenu = ({ sortBy, setSortBy }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const options = [
    { key: "popular", label: "Độ phổ biến" },
    { key: "rating", label: "Đánh giá cao" },
    { key: "distance", label: "Gần bạn" },
    { key: "reviews", label: "Nhiều đánh giá" },
  ];

  const current = options.find((o) => o.key === sortBy)?.label ?? "Độ phổ biến";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 text-gray-700 hover:border-pink-300 hover:text-pink-600 transition"
        aria-expanded={open}
      >
        <TrendingUp size={16} />
        <span className="text-sm font-medium">Sắp xếp: {current}</span>
        <ChevronDown size={16} className={`${open ? "rotate-180" : ""} transition-transform`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {options.map((o) => (
              <button
                key={o.key}
                onClick={() => {
                  setSortBy(o.key);
                  setOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-sm transition ${
                  o.key === sortBy
                    ? "bg-pink-50 text-pink-700"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                {o.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(SortMenu);
