import React from "react";
import { MessageSquare } from "lucide-react";
import QuickActions from "./QuickActions";
import OpeningHours from "./OpeningHours";

const RightSidebar = () => {
  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      // Add hash to URL
      window.location.hash = '#reviews-section';
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Review Button */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Đánh giá nhà hàng</h3>
        <button
          onClick={scrollToReviews}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
        >
          <MessageSquare size={20} />
          <span>Viết đánh giá</span>
        </button>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Chia sẻ trải nghiệm của bạn
        </p>
      </div>
      
      <QuickActions />
      <OpeningHours />
    </div>
  );
};

export default React.memo(RightSidebar);
