import React from "react";

/**
 * Tabs danh mục – tách riêng để hạn chế re-render.
 * Memo hóa vì props dạng primitive/array ít thay đổi.
 */
const CategoryTabs = ({ categories, activeCategory, onChange }) => {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex space-x-2 ">
          {categories.map((category) => {
            const active = activeCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => onChange(category.name)}
                className={`flex items-center space-x-2 px-4 py-2 shadow-sm hover:shadow-md hover:scale-[1.01] rounded-2xl whitespace-nowrap font-medium transition-all duration-200 ease-out ${
                  active
                    ? "bg-gradient-to-br from-pink-500 via-pink-400 to-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-pink-100"
                }`}
                aria-pressed={active}
              >
                <span className="text-sm">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(CategoryTabs);
