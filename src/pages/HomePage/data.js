 const categories = [
    { name: 'Tất cả', icon: '🍽️', color: 'bg-pink-500' },
    { name: 'Nhà hàng', icon: '🏪', color: 'bg-blue-500' },
    { name: 'Ăn vặt', icon: '🍿', color: 'bg-orange-500' },
    { name: 'Món Việt', icon: '🍜', color: 'bg-green-500' },
    { name: 'Món Hàn', icon: '🍱', color: 'bg-red-500' },
    { name: 'Món Nhật', icon: '🍣', color: 'bg-purple-500' },
    { name: 'Món Âu', icon: '🍝', color: 'bg-yellow-500' }
  ];

  const restaurants = [
    {
      id: 1,
      name: 'Phở Hà Nội Truyền Thống',
      rating: 4.8,
      reviews: 1258,
      address: 'Quận 1, TP. Hồ Chí Minh',
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
      category: 'Món Việt',
      deliveryTime: '20-30 phút',
      isFavorite: false,
      isOnline: true
    },
    {
      id: 2,
      name: 'Pizza 4P\'s',
      rating: 4.8,
      reviews: 912,
      address: 'Quận 1, TP. Hồ Chí Minh',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      category: 'Món Âu',
      deliveryTime: '30-40 phút',
      isFavorite: true,
      isOnline: true
    },
    {
      id: 3,
      name: 'Cơm Tấm Sài Gòn',
      rating: 4.7,
      reviews: 889,
      address: 'Quận 3, TP. Hồ Chí Minh',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop',
      category: 'Món Việt',
      deliveryTime: '15-25 phút',
      isFavorite: false,
      isOnline: false
    },
    {
      id: 4,
      name: 'Bún Chả Hà Nội',
      rating: 4.6,
      reviews: 1203,
      address: 'Quận 1, TP. Hồ Chí Minh',
      image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&h=300&fit=crop',
      category: 'Món Việt',
      deliveryTime: '20-30 phút',
      isFavorite: false,
      isOnline: false
    },
    {
      id: 5,
      name: 'Bánh Mì Huỳnh Hoa',
      rating: 4.9,
      reviews: 978,
      address: 'Quận 1, TP. Hồ Chí Minh',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      category: 'Ăn vặt',
      deliveryTime: '10-15 phút',
      isFavorite: false,
      isOnline: false
    },
    {
      id: 6,
      name: 'Sushi Hokkaido',
      rating: 4.7,
      reviews: 1445,
      address: 'Quận 2, TP. Hồ Chí Minh',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
      category: 'Món Nhật',
      deliveryTime: '25-35 phút',
      isFavorite: false,
      isOnline: false
    }
  ];

export { categories, restaurants };