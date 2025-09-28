import React, { useEffect, useRef, useState } from "react";
import { Filter, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CategoryFilter = ({ categories, selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!menuRef.current || !anchorRef.current) return;
      if (!menuRef.current.contains(e.target) && !anchorRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const label = selected && selected !== "Tất cả" ? `Bộ lọc: ${selected}` : "Bộ lọc";

  return (
    <div className="relative" ref={anchorRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:text-pink-600 hover:border-pink-300 transition"
        aria-expanded={open}
      >
        <Filter size={16} />
        <span className="text-sm font-medium">{label}</span>
        <ChevronDown size={16} className={`${open ? "rotate-180" : ""} transition-transform`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Danh mục</p>
            </div>
            <div className="max-h-72 overflow-auto py-1">
              {categories.map((cat) => {
                const active = selected === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => { onChange(cat); setOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition text-left ${
                      active ? "bg-pink-50 text-pink-700" : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span>{cat}</span>
                    {active && <Check size={16} className="text-pink-600" />}
                  </button>
                );
              })}
            </div>
            <div className="px-4 py-3 border-t border-gray-100">
              <button
                onClick={() => { onChange("Tất cả"); setOpen(false); }}
                className="w-full text-center text-sm font-medium text-gray-600 hover:text-pink-600 transition"
              >
                Xoá bộ lọc
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(CategoryFilter);
