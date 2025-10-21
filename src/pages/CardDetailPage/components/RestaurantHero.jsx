import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

const RestaurantHero = ({ restaurant }) => {
  const { image, name } = restaurant;
  const [imageError, setImageError] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(image);
  
  const handleImageError = () => {
    if (!imageError) {
      // Fallback to Unsplash placeholder
      const fallbackImage = "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=960&h=540&fit=crop&auto=format";
      setCurrentImageSrc(fallbackImage);
      setImageError(true);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden mb-6">
      <img 
        src={currentImageSrc} 
        alt={name} 
        className="w-full h-80 object-cover" 
        onError={handleImageError}
      />
      <button className="absolute bottom-4 right-4 flex items-center space-x-2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors">
        <ImageIcon size={16} />
        <span className="text-sm font-medium">Xem ảnh</span>
      </button>
    </div>
  );
};

export default React.memo(RestaurantHero);
