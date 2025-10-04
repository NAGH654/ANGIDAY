import React, { useState } from "react";
import { Star } from "lucide-react";

const WriteReviewCard = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submit = () => {
    if (!rating || !comment.trim()) return;
    alert(`Đã gửi đánh giá: ${rating}★ - "${comment}"`);
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-4">Viết đánh giá</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 mb-2 block">Chất lượng</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? "text-yellow-400 fill-current" : "text-gray-300 hover:text-yellow-200"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Chia sẻ trải nghiệm của bạn..."
          className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
          rows="4"
        />
        <button
          onClick={submit}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
  );
};

export default React.memo(WriteReviewCard);
