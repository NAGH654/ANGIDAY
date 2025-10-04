import React from "react";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { endPoint } from "@routes/router";

const Stars = React.memo(({ count }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < count ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ))}
  </div>
));

const ReviewsSection = ({ restaurant, starDistribution, reviews }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Đánh giá từ khách hàng
        </h2>
        <Link
          to={endPoint.RESTAURANT_REVIEWS(restaurant.id)}
          state={{ restaurant, reviews }} // tuỳ chọn: mang sẵn data qua
          className="text-pink-600 hover:text-pink-700 font-medium"
        >
          Xem tất cả
        </Link>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <span className="text-lg font-bold">{restaurant.rating}</span>
        <span className="text-gray-500">
          • {restaurant.totalReviews} đánh giá
        </span>
      </div>

      <div className="space-y-2 mb-8">
        {starDistribution.map((item) => (
          <div key={item.stars} className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 w-2">{item.stars}</span>
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 w-8 text-right">
              {item.count}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`pb-6 border-b border-gray-100 last:border-0 ${
              review.isReply
                ? "ml-12 pl-4 border-l-4 border-pink-200 bg-pink-50/30 rounded-r-xl p-4"
                : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <img
                src={review.author.avatar}
                alt={review.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-gray-900">
                    {review.author.name}
                  </span>
                  {review.author.isRestaurant && (
                    <span className="px-2 py-0.5 bg-pink-100 text-pink-600 rounded text-xs font-medium">
                      Chủ nhà hàng
                    </span>
                  )}
                </div>

                {review.rating ? (
                  <div className="flex items-center space-x-2 mb-2">
                    <Stars count={review.rating} />
                    <span className="text-sm text-gray-500">
                      {review.timeAgo}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 mb-2">
                    {review.timeAgo}
                  </div>
                )}

                <p className="text-gray-700 mb-3">{review.content}</p>

                {!!review.images?.length && (
                  <div className="flex gap-2 mb-3">
                    {review.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Review"
                        className="w-28 h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    ))}
                  </div>
                )}

                {!review.isReply && (
                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-pink-600">
                      <ThumbsUp size={14} />
                      <span>Hữu ích ({review.likes})</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                      <MessageCircle size={14} />
                      <span>Trả lời (0)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ReviewsSection);
