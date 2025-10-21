import React, { useState } from "react";
import { Star, ThumbsUp, MessageCircle, Camera, X, Send, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { endPoint } from "@routes/router";
import { BASE_URL } from "@redux/api/baseApi";
import { useCreateReviewMutation } from "@redux/api/User/userApi";
import { useGetSignatureFoodsQuery } from "@redux/api/Restaurant/restaurantApi";
import { usePresignUploadMutation, useUploadMutation } from "@redux/api/Storage/storageApi";
import { toast } from "react-hot-toast";

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
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Auto-open form if URL has #reviews-section
  React.useEffect(() => {
    if (window.location.hash === '#reviews-section') {
      setShowReviewForm(true);
    }
  }, []);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [signatureFoodName, setSignatureFoodName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();
  const { data: menuItems, isLoading: menuLoading, error: menuError } = useGetSignatureFoodsQuery(restaurant.id);
  const [presignUpload] = usePresignUploadMutation();
  const [uploadFile] = useUploadMutation();


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá");
      return;
    }

    try {
      let imageUrl = "";
      
      // Upload image if exists
      if (imageFile) {
        try {
          // Try direct upload first
          const uploadResult = await uploadFile({ file: imageFile }).unwrap();
          imageUrl = uploadResult.key;
        } catch (uploadError) {
          // Fallback to presigned upload
          const presignResult = await presignUpload({ file: imageFile }).unwrap();
          
          // Upload to presigned URL
          const uploadResponse = await fetch(presignResult.url, {
            method: 'PUT',
            body: imageFile,
            headers: {
              'Content-Type': imageFile.type,
            },
          });
          
          if (uploadResponse.ok) {
            imageUrl = presignResult.key;
          } else {
            throw new Error("Presigned upload failed");
          }
        }
      }

      const reviewData = {
        restaurantId: restaurant.id,
        signatureFoodName: signatureFoodName || "",
        content: content.trim(),
        imageUrl: imageUrl,
        rating: rating
      };

      const result = await createReview(reviewData).unwrap();
      
      toast.success("Đánh giá đã được gửi thành công!");
      
      // Reset form
      setContent("");
      setSignatureFoodName("");
      setRating(5);
      removeImage();
      setShowReviewForm(false);
    } catch (error) {
      console.error("❌ Review submission error:", error);
      toast.error("Có lỗi xảy ra khi gửi đánh giá");
    }
  };

  return (
    <div id="reviews-section" className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Đánh giá từ khách hàng
        </h2>
        <div className="flex items-center space-x-3">
          {/* Highlight badge */}
          {!showReviewForm && (
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          )}
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 relative ${
              showReviewForm 
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-red-300 hover:border-red-400" 
                : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-pink-300 hover:border-pink-400"
            }`}
          >
            {showReviewForm ? <X size={18} /> : <MessageSquare size={18} />}
            <span>{showReviewForm ? "Hủy" : "Viết đánh giá"}</span>
          </button>
          <Link
            to={endPoint.RESTAURANT_REVIEWS(restaurant.id)}
            state={{ restaurant, reviews }} // tuỳ chọn: mang sẵn data qua
            className="text-pink-600 hover:text-pink-700 font-medium"
          >
            Xem tất cả
          </Link>
        </div>
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

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Viết đánh giá của bạn</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đánh giá của bạn
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">{rating}/5 sao</span>
              </div>
            </div>

            {/* Signature Food Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Món ăn đã thử (tùy chọn)
              </label>
              <select
                value={signatureFoodName}
                onChange={(e) => setSignatureFoodName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                disabled={menuLoading}
              >
                <option value="">Chọn món ăn...</option>
                {menuItems && menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    {menuLoading ? "Đang tải..." : "Không có món ăn"}
                  </option>
                )}
              </select>
              
              {/* Debug info */}
              <div className="mt-1 text-xs text-gray-500">
                {menuLoading && "Đang tải menu..."}
                {menuError && `Lỗi: ${menuError.message || 'Không thể tải menu'}`}
                {!menuLoading && !menuError && menuItems && (
                  `Có ${menuItems.length} món ăn`
                )}
                {!menuLoading && !menuError && (!menuItems || menuItems.length === 0) && (
                  "Không có món ăn nào"
                )}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung đánh giá *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn về nhà hàng này..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                rows={4}
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hình ảnh (tùy chọn)
              </label>
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="review-image"
                  />
                  <label
                    htmlFor="review-image"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Camera className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Nhấn để chọn ảnh</span>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  isSubmitting || !content.trim()
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-green-300 hover:border-green-400"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi đánh giá</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

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

                {review.signatureFoodName && (
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 bg-pink-100 text-pink-600 rounded text-sm font-medium">
                      📍 {review.signatureFoodName}
                    </span>
                  </div>
                )}

                {!!review.images?.length && (
                  <div className="flex gap-2 mb-3">
                    {review.images.map((img, idx) => {
                      // Skip blob URLs and invalid images
                      if (img.startsWith('blob:') || !img) return null;
                      
                      const imageUrl = img.startsWith('http') ? img : `${BASE_URL}/Storage/view?key=${img}`;
                      
                      return (
                        <img
                          key={idx}
                          src={imageUrl}
                          alt="Review"
                          className="w-28 h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                          onLoad={() => {
                            // Image loaded successfully
                          }}
                        />
                      );
                    })}
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
