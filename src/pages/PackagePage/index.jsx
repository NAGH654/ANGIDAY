import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  Users, 
  MessageCircle, 
  Crown,
  CreditCard,
  Smartphone,
  Wallet,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Gift,
  Sparkles
} from 'lucide-react';
import CustomerSideBar from '@layout/CustomerSideBar';

function PackagePage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  // Animate cards on mount
  useEffect(() => {
    setTimeout(() => setAnimateCards(true), 200);
  }, []);

  // Enhanced package data
  const packages = [
    {
      id: 'individual',
      name: 'Cá nhân',
      subtitle: 'Dành cho người dùng cá nhân',
      price: '99.000',
      originalPrice: null,
      period: '/tháng',
      color: 'pink',
      badge: 'Phổ biến',
      popular: true,
      gradient: 'from-pink-500 via-purple-500 to-indigo-500',
      features: [
        'Gợi ý địa điểm cá nhân hóa với AI',
        'Lưu trữ yêu thích không giới hạn',
        'Trò chuyện với GPT Bot thông minh',
        'Hỗ trợ ưu tiên 24/7',
        'Đánh giá và review chi tiết',
        'Thông báo ưu đãi độc quyền'
      ],
      buttonText: 'Bắt đầu ngay hôm nay',
      stats: { users: '50K+', rating: '4.9' }
    },
    {
      id: 'business',
      name: 'Chủ nhà hàng',
      subtitle: 'Dành cho chủ nhà hàng và doanh nghiệp',
      price: '299.000',
      originalPrice: '399.000',
      period: '/tháng',
      color: 'orange',
      badge: 'Tiết kiệm 25%',
      recommended: true,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      features: [
        'Dashboard quản lý chuyên nghiệp',
        'Marketing tự động trên nền tảng',
        'Tăng độ hiển thị lên 500%',
        'Tạo menu và branding mạnh mẽ',
        'Analytics & báo cáo chi tiết',
        'SEO tối ưu cho nhà hàng',
        'Hỗ trợ dedicated manager',
        'API tích hợp các nền tảng'
      ],
      buttonText: 'Nâng cấp ngay',
      stats: { users: '5K+', rating: '4.8' }
    }
  ];

  // Enhanced payment methods
  const paymentMethods = [
    {
      id: 'banking',
      name: 'Thẻ tín dụng/ghi nợ',
      description: 'Visa, Mastercard, JCB, AMEX',
      icon: <CreditCard size={24} className="text-blue-600" />,
      color: 'blue',
      popular: true
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      description: 'Thanh toán nhanh chóng, bảo mật',
      icon: <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">M</div>,
      color: 'pink',
      discount: '5%'
    },
    {
      id: 'zalopay',
      name: 'ZaloPay',
      description: 'Ưu đãi cashback đặc biệt',
      icon: <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">Z</div>,
      color: 'purple',
      cashback: '10%'
    }
  ];

  // Enhanced features info
  const featuresInfo = [
    {
      icon: <Users size={32} className="text-blue-500" />,
      title: 'Phù hợp với mọi người',
      description: 'Từ người dùng cá nhân đến doanh nghiệp lớn, chúng tôi có giải pháp phù hợp cho tất cả',
      stats: '100K+ người dùng tin tưởng'
    },
    {
      icon: <Zap size={32} className="text-yellow-500" />,
      title: 'Tính năng độc quyền',
      description: 'AI recommendation, chatbot thông minh và nhiều tính năng premium khác',
      stats: '20+ tính năng cao cấp'
    },
    {
      icon: <Shield size={32} className="text-green-500" />,
      title: 'Bảo mật & Hỗ trợ',
      description: 'Dữ liệu được bảo vệ 100%, hỗ trợ khách hàng 24/7 với đội ngũ chuyên nghiệp',
      stats: '99.9% uptime guarantee'
    }
  ];

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) return;
    
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(`Thanh toán thành công gói ${selectedPackage.name} với ${selectedPaymentMethod}!`);
    setShowPaymentModal(false);
    setSelectedPaymentMethod('');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        <CustomerSideBar />
        
        {/* Hero Header */}
        <div className="max-w-6xl mx-auto text-center pt-20 pb-16 px-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-2 mb-6">
            <Sparkles size={16} className="text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">Ưu đãi đặc biệt tháng này</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Chọn gói dịch vụ
            <br />
            <span className="text-4xl md:text-5xl">phù hợp nhất</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nâng cấp trải nghiệm với các tính năng premium, AI thông minh và hỗ trợ chuyên nghiệp
          </p>
          
          {/* Trust badges */}
          <div className="flex items-center justify-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">4.9/5 đánh giá</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">100K+ người dùng</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Bảo mật 100%</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative group transition-all duration-700 ${
                  animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${pkg.gradient} rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500 scale-105`}></div>
                
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-visible border border-white/60 hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Header with badges */}
                  <div className="relative p-8 pb-6 pt-16">
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1 whitespace-nowrap">
                          <Crown size={12} />
                          <span>PHỔ BIẾN NHẤT</span>
                        </div>
                      </div>
                    )}
                    
                    {pkg.recommended && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                          KHUYÊN DÙNG
                        </div>
                      </div>
                    )}

                    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${pkg.gradient} mb-6`}>
                      {pkg.color === 'pink' ? <Star size={16} /> : <TrendingUp size={16} />}
                      <span>{pkg.badge}</span>
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-lg">{pkg.subtitle}</p>
                  </div>

                  {/* Price section */}
                  <div className="px-8 pb-6">
                    <div className="flex items-baseline space-x-3 mb-4">
                      <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {pkg.price}
                      </span>
                      <span className="text-xl text-gray-600">{pkg.period}</span>
                    </div>
                    
                    {pkg.originalPrice && (
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl text-gray-400 line-through">{pkg.originalPrice}</span>
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                          <Gift size={14} />
                          <span>Tiết kiệm 100.000đ</span>
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users size={16} />
                        <span>{pkg.stats.users} users</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span>{pkg.stats.rating} rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="px-8 pb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Check size={18} className="text-green-500" />
                      <span>Tính năng bao gồm:</span>
                    </h4>
                    
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="flex items-start space-x-3 group/item"
                        >
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} className="text-white" />
                          </div>
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="p-8 pt-0">
                    <button
                      onClick={() => handleSelectPackage(pkg)}
                      className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-r ${pkg.gradient} hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>{pkg.buttonText}</span>
                        <Zap size={18} />
                      </span>
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                      {pkg.color === 'pink' 
                        ? 'Dùng thử miễn phí 7 ngày • Hủy bất kỳ lúc nào • Không cam kết dài hạn'
                        : 'Tư vấn miễn phí • Setup hỗ trợ • Đảm bảo kết quả trong 30 ngày'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="max-w-6xl mx-auto px-4 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn AnGiDay?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi mang đến trải nghiệm ẩm thực tốt nhất với công nghệ AI tiên tiến
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresInfo.map((feature, index) => (
              <div 
                key={index} 
                className="group text-center p-8 bg-white/60 backdrop-blur-xl rounded-2xl hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 rounded-full">
                  <TrendingUp size={14} className="text-blue-500" />
                  <span className="text-sm font-semibold text-blue-700">{feature.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-lg w-full shadow-3xl border border-white/60 overflow-hidden">
              {/* Modal Header */}
              <div className="relative p-8 bg-gradient-to-br from-gray-50/80 to-white/60">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/80 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Hoàn tất thanh toán
                </h2>
                <p className="text-gray-600">Chọn phương thức thanh toán phù hợp</p>
              </div>

              {/* Selected Package Info */}
              <div className="px-8 pb-6">
                <div className={`p-6 rounded-2xl bg-gradient-to-r ${selectedPackage?.gradient} bg-opacity-10 border border-white/40`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{selectedPackage?.name}</h3>
                      <p className="text-gray-600">{selectedPackage?.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900">
                        {selectedPackage?.price}
                        <span className="text-lg font-normal text-gray-600">{selectedPackage?.period}</span>
                      </p>
                      {selectedPackage?.originalPrice && (
                        <p className="text-sm text-gray-400 line-through">{selectedPackage?.originalPrice}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="px-8 pb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h4>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`relative flex items-center space-x-4 p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedPaymentMethod === method.id
                          ? `border-${method.color}-400 bg-${method.color}-50/50 shadow-md`
                          : 'border-gray-200 hover:border-gray-300 bg-white/60'
                      }`}
                    >
                      {method.popular && (
                        <div className="absolute -top-2 left-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Phổ biến
                        </div>
                      )}
                      
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      
                      <div className="flex-shrink-0">
                        {method.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-500">{method.description}</p>
                        
                        {(method.discount || method.cashback) && (
                          <div className="mt-2">
                            {method.discount && (
                              <span className="inline-flex items-center space-x-1 bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium">
                                <Gift size={12} />
                                <span>Giảm {method.discount}</span>
                              </span>
                            )}
                            {method.cashback && (
                              <span className="inline-flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                                <Star size={12} />
                                <span>Hoàn {method.cashback}</span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {selectedPaymentMethod === method.id && (
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div className="px-8 pb-6">
                <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/40">
                  <p className="text-sm text-blue-800">
                    <strong className="flex items-center space-x-1 mb-2">
                      <Shield size={16} />
                      <span>Cam kết bảo mật:</span>
                    </strong>
                    Thanh toán được mã hóa SSL 256-bit. Tài khoản nâng cấp ngay lập tức. 
                    Hoàn tiền 100% nếu không hài lòng trong 30 ngày đầu.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 p-8 pt-0">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Quay lại
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!selectedPaymentMethod || isLoading}
                  className={`flex-1 py-3 rounded-2xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                    selectedPaymentMethod && !isLoading
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <span>Thanh toán ngay</span>
                      <Zap size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PackagePage;