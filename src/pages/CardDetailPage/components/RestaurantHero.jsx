import React from "react";
import { Image as ImageIcon } from "lucide-react";

const RestaurantHero = ({ restaurant }) => {
  const { heroImage, name, totalPhotos } = restaurant;
  return (
    <div className="relative rounded-2xl overflow-hidden mb-6">
      <img src={heroImage} alt={name} className="w-full h-80 object-cover" />
      <button className="absolute bottom-4 right-4 flex items-center space-x-2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors">
        <ImageIcon size={16} />
        <span className="text-sm font-medium">Xem ảnh ({totalPhotos})</span>
      </button>
    </div>
  );
};

export default React.memo(RestaurantHero);
