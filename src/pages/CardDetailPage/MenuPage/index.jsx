import React from "react";
import { useParams } from "react-router-dom";
import CustomerSideBar from "@layout/SideBar";
import { useGetSignatureFoodsQuery } from "@redux/api/Restaurant/restaurantApi";

const MenuPage = () => {
  const { id } = useParams();
  const { data: foods = [], isLoading } = useGetSignatureFoodsQuery(id);

  if (isLoading) {
    return (
      <div className="bg-gray-50">
        <CustomerSideBar />
        <main className="lg:ml-20">
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="h-48 bg-gray-100 animate-pulse rounded-xl" />
                <div className="mt-3 h-5 bg-gray-100 animate-pulse rounded w-2/3" />
                <div className="mt-2 h-4 bg-gray-100 animate-pulse rounded w-1/2" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <CustomerSideBar />
      <main className="lg:ml-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold mb-4">Menu nổi bật</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((f) => (
              <div key={f.id} className="bg-white rounded-2xl p-4 border border-gray-100">
                {f.imageUrl && (
                  <img src={f.imageUrl} alt={f.name} className="w-full h-48 object-cover rounded-xl" />
                )}
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-900">{f.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{f.description}</p>
                  {typeof f.referencePrice !== "undefined" && (
                    <div className="mt-2 text-pink-600 font-semibold">{f.referencePrice}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MenuPage;