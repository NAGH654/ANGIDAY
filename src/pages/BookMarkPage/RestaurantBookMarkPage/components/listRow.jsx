import React from "react";
import { Link } from "react-router-dom";
import { endPoint } from "@routes/router";
import { Heart, Star, MapPin, Clock, Award } from "lucide-react";

const ListRow = ({ r, isFav, onToggleFav }) => {
  const detailTo = endPoint.RESTAURANT_DETAIL(r.id);
  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-white/60 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="relative flex-shrink-0">
          <Link to={detailTo}>
            <img
              src={r.image}
              alt={r.name}
              className="w-full md:w-32 h-40 md:h-32 object-cover rounded-2xl shadow-lg"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNNjQgNjRDNjQgNzMuNyA2NiA4MyA2OCA4NEM2OSA4NSA3OSA4NiA4OSA4NkM5OSA4NiAxMDkgODUgMTEwIDg0QzExMiA4MyAxMTQgNzMuNyAxMTQgNjRDMTE0IDU0LjMgMTEyIDQ0IDExMCA0M0MxMDkgNDIgOTkgNDEgODkgNDFDNzkgNDEgNjkgNDIgNjggNDNDNjYgNDQgNjQgNTQuMyA2NCA2NFoiIGZpbGw9IiNEMUQ1REIiLz48L3N2Zz4=";
              }}
            />
          </Link>
          {r.isOnline && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg">
              <div className="w-full h-full bg-green-400 rounded-full animate-ping" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                  <Link to={detailTo}>{r.name}</Link>
                </h3>
                {r.isPopular && (
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                    <Award size={12} />
                    HOT
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-lg mb-2 flex items-center gap-2"><MapPin size={16} />{r.address}</p>
              {r.description && (
                <p className="text-gray-600 mb-3 line-clamp-2">{r.description}</p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-900 text-base">{r.rating}</span>
                  <span>({r.reviews} đánh giá)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{r.openTime}</span>
                </div>
              </div>

              <p className="text-gray-600 mt-3 font-medium">{r.address}</p>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={(e) => { e.stopPropagation(); onToggleFav(r.id); }}
                className="w-12 h-12 bg-pink-100 hover:bg-pink-200 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label={isFav ? "Bỏ lưu" : "Lưu"}
              >
                <Heart size={20} className={`${isFav ? "text-pink-500 fill-current" : "text-pink-500"}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ListRow);
