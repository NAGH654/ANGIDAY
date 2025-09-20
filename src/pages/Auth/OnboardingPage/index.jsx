import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    country: 'Viet Nam',
    language: 'Tiếng Việt',
    interests: [],
    styles: []
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    console.log('Onboarding completed with data:', formData);
    // Redirect to main app or dashboard
    // window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-pink-50 flex items-center justify-center p-4">
      {currentStep === 1 && (
        <NameStep 
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          currentStep={currentStep}
        />
      )}
      {currentStep === 2 && (
        <GenderStep 
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          currentStep={currentStep}
        />
      )}
      {currentStep === 3 && (
        <LocationStep 
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          currentStep={currentStep}
        />
      )}
      {currentStep === 4 && (
        <InterestStep 
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          currentStep={currentStep}
        />
      )}
      {currentStep === 5 && (
        <FashionStyleStep 
          formData={formData}
          updateFormData={updateFormData}
          prevStep={prevStep}
          completeOnboarding={completeOnboarding}
          currentStep={currentStep}
        />
      )}
    </div>
  );
};

// Components
const ProgressBar = ({ currentStep, totalSteps = 3 }) => (
  <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
    <div className="flex space-x-1">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div 
          key={index}
          className={`w-12 h-1 rounded ${
            index < currentStep 
              ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  </div>
);

const BackButton = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
  >
    <ArrowLeft size={20} className="text-gray-600" />
  </button>
);

const AuthButton = ({ children, onClick, disabled = false, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full font-semibold py-4 rounded-xl flex items-center justify-center
               shadow-lg hover:shadow-xl transition-all duration-300 ${
      disabled 
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
        : 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:brightness-90'
    } ${className}`}
  >
    {children}
  </button>
);

// Step Components
const NameStep = ({ formData, updateFormData, nextStep, currentStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      nextStep();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
      <ProgressBar currentStep={currentStep} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Rất vui được gặp bạn! Bạn tên là gì?
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Câu trả lời của bạn cho những câu hỏi tiếp theo sẽ giúp chúng tôi tìm ra những ý tưởng phù hợp nhất cho bạn
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Tên</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="Nhập tên của bạn"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-800"
              required
            />
            <p className="text-gray-400 text-sm mt-2">example@gmail.com</p>
          </div>

          <AuthButton disabled={!formData.name.trim()}>
            Tiếp tục
          </AuthButton>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Bạn đã có tài khoản? <button className="text-gray-700 font-medium underline">Hãy đăng nhập</button>
          </p>
        </div>
      </div>
    </div>
  );
};

const GenderStep = ({ formData, updateFormData, nextStep, prevStep, currentStep }) => {
  const genders = ['Nữ', 'Nam', 'Khác'];

  const handleGenderSelect = (gender) => {
    updateFormData('gender', gender);
    // Auto-advance after selection with small delay for UX
    setTimeout(() => {
      nextStep();
    }, 300);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
      <ProgressBar currentStep={currentStep} />
      <BackButton onClick={prevStep} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Hãy giới thiệu về bản thân mình
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Thông tin này sẽ luôn ở chế độ riêng tư
        </p>

        <div className="space-y-3 mb-8">
          {genders.map((gender) => (
            <button
              key={gender}
              onClick={() => handleGenderSelect(gender)}
              className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 ${
                formData.gender === gender
                  ? 'border-pink-500 bg-pink-50 text-pink-700'
                  : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const LocationStep = ({ formData, updateFormData, nextStep, prevStep, currentStep }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
      <ProgressBar currentStep={currentStep} />
      <BackButton onClick={prevStep} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Bạn sống ở đâu và bạn nói ngôn ngữ nào?
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Thông tin này sẽ luôn ở chế độ riêng tư
        </p>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Quốc gia</label>
            <div className="relative">
              <input
                type="text"
                value={formData.country}
                onChange={(e) => updateFormData('country', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <X 
                size={20} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={() => updateFormData('country', '')}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Ngôn ngữ</label>
            <div className="relative">
              <input
                type="text"
                value={formData.language}
                onChange={(e) => updateFormData('language', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <X 
                size={20} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={() => updateFormData('language', '')}
              />
            </div>
          </div>
        </div>

        <AuthButton onClick={nextStep}>
          Tiếp tục
        </AuthButton>
      </div>
    </div>
  );
};

const InterestStep = ({ formData, updateFormData, nextStep, prevStep, currentStep }) => {
  const interests = [
    { name: 'Hình nền điện thoại', emoji: '📱' },
    { name: 'Mỹ học', emoji: '🎨' },
    { name: 'Ý tưởng trang phục', emoji: '👗' },
    { name: 'Du lịch', emoji: '✈️' },
    { name: 'Trang trí nhà cửa', emoji: '🏠' },
    { name: 'Động vật', emoji: '🐕' },
    { name: 'Nấu ăn', emoji: '🍳' },
    { name: 'Điểm ảnh', emoji: '📸' }
  ];

  const toggleInterest = (interest) => {
    const currentInterests = formData.interests || [];
    const newInterests = currentInterests.includes(interest) 
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    
    updateFormData('interests', newInterests);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
      <ProgressBar currentStep={currentStep} />
      <BackButton onClick={prevStep} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Bạn có tâm trạng muốn làm gì?
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {interests.map((interest, index) => (
            <button
              key={index}
              onClick={() => toggleInterest(interest.name)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                (formData.interests || []).includes(interest.name)
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300'
              }`}
            >
              <div className="text-4xl mb-2">{interest.emoji}</div>
              <h3 className="font-semibold text-gray-900 text-sm">{interest.name}</h3>
            </button>
          ))}
        </div>

        <AuthButton 
          onClick={nextStep}
          disabled={!formData.interests || formData.interests.length === 0}
        >
          {!formData.interests || formData.interests.length === 0 ? 'Chọn 1 trở lên để tiếp tục' : 'Tiếp tục'}
        </AuthButton>
      </div>
    </div>
  );
};

const FashionStyleStep = ({ formData, updateFormData, prevStep, completeOnboarding, currentStep }) => {
  const styles = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Style ${i + 1}`,
    selected: i === 1 // Style 2 is pre-selected
  }));

  const toggleStyle = (styleId) => {
    const currentStyles = formData.styles || [];
    const newStyles = currentStyles.includes(styleId) 
      ? currentStyles.filter(id => id !== styleId)
      : [...currentStyles, styleId];
    
    updateFormData('styles', newStyles);
  };

  const selectedCount = (formData.styles || []).length;
  const canContinue = selectedCount >= 3;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
      <ProgressBar currentStep={currentStep} />
      <BackButton onClick={prevStep} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tuyệt! Hãy chọn từ 3 Ghim trở lên để bắt đầu tuyển chọn cảm giác
        </h2>
        <p className="text-pink-500 font-medium mb-8">Ý tưởng trang phục</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {styles.map((style) => {
            const isSelected = (formData.styles || []).includes(style.id);
            const isPreselected = style.selected && !isSelected;
            
            return (
              <button
                key={style.id}
                onClick={() => toggleStyle(style.id)}
                className={`relative aspect-square rounded-2xl overflow-hidden border-4 transition-all duration-200 ${
                  isSelected || isPreselected
                    ? 'border-pink-500'
                    : 'border-transparent hover:border-pink-300'
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">{style.name}</span>
                </div>
                
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                )}
                
                {isPreselected && (
                  <div className="absolute inset-0 bg-pink-500 bg-opacity-20">
                    <div className="absolute top-3 right-3 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Lựa chọn
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <AuthButton 
          onClick={completeOnboarding}
          disabled={!canContinue}
        >
          {canContinue ? 'Hoàn thành' : `Chọn ${3 - selectedCount} Ghim để tiếp tục`}
        </AuthButton>
      </div>
    </div>
  );
};

export default OnboardingPage;