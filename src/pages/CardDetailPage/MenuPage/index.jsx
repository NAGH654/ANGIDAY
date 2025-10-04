import React, { useState } from 'react';
import { ArrowLeft, Search, Heart, Star, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomerSideBar from '@layout/SideBar';
import HeaderMenuPage from '@components/HeaderMenuPage';

function MenuPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  const menuItems = [
    {
      id: 1,
      name: 'Pizza Margherita Classica',
      description: 'Pizza truyền thống với phô mai mozzarella tự làm, cà chua San Marzano & húng quế tươi',
      price: '285.000đ',
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop',
      badge: 'Phổ biến',
      badgeColor: 'bg-pink-500'
    },
    {
      id: 2,
      name: 'Pizza Quattro Stagioni',
      description: 'Pizza 4 mùa với nấm, ô liu, artichoke và prosciutto di Parma',
      price: '345.000đ',
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
      badge: 'Phổ biến',
      badgeColor: 'bg-pink-500'
    },
    {
      id: 3,
      name: 'Pizza Diavola',
      description: 'Pizza cay với salami picante, ớt và phô mai mozzarella',
      price: '325.000đ',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop',
      badge: null
    },
    {
      id: 4,
      name: 'Burrata Salad',
      description: 'Salad burrata tươi với cà chua cherry, rau arugula và dầu olive extra virgin',
      price: '195.000đ',
      rating: 4.7,
      reviews: 143,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
      badge: null
    },
    {
      id: 5,
      name: 'Antipasto Italiano',
      description: 'Đĩa khai vị với prosciutto, salami, phô mai và ô liu',
      price: '245.000đ',
      rating: 4.6,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=300&h=200&fit=crop',
      badge: 'Phổ biến',
      badgeColor: 'bg-red-500'
    },
    {
      id: 6,
      name: 'Spaghetti Carbonara',
      description: 'Mì Ý truyền thống với bánh lưng xông khói, trứng và phô mai Pecorino Romano',
      price: '225.000đ',
      rating: 4.8,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&h=200&fit=crop',
      badge: null
    },
    {
      id: 7,
      name: 'Tiramisu Homemade',
      description: 'Tiramisu truyền thống làm từ mascarpone, cà phê espresso và bánh ladyfinger',
      price: '125.000đ',
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop',
      badge: 'Phổ biến',
      badgeColor: 'bg-pink-500'
    },
    {
      id: 8,
      name: 'Panna Cotta',
      description: 'Bánh panna cotta mềm mịn với sốt dâu tây tự nhiên',
      price: '95.000đ',
      rating: 4.6,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop',
      badge: null
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <CustomerSideBar />

      <main className="lg:ml-20">
        {/* Header */}
        <HeaderMenuPage
          title="Menu Pizza 4P's"
          subtitle={`${menuItems.length} món`}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onBack={() => navigate(-1)}
          onAdd={() => console.log("Thêm món")}
          onFilter={() => console.log("Mở bộ lọc")}
        />

        {/* Menu Grid */}
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Badge */}
                  {item.badge && (
                    <div className={`absolute top-3 left-3 ${item.badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {item.badge}
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                  >
                    <Heart
                      size={18}
                      className={favorites.includes(item.id) ? 'text-pink-500 fill-current' : 'text-gray-600'}
                    />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-pink-600">
                      {item.price}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-bold text-gray-900">{item.rating}</span>
                      <span className="text-sm text-gray-500">({item.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Không tìm thấy món ăn
              </h3>
              <p className="text-gray-500">
                Thử tìm kiếm với từ khóa khác
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MenuPage;