import React from 'react';
import { useCart } from '../context/CartContext';

export default function ComboList(props) {
  const { addToCart } = useCart(); // Sử dụng hook từ context

  const handleAddToCart = () => {
    addToCart(props); // Thêm sản phẩm vào giỏ hàng
    alert('Đã thêm vào giỏ hàng thành công!'); // Thông báo thêm thành công
  };

  return (
    <div className="h-max-100 w-max-50">
      <div key={props.id} className="border border-gray-300 rounded-lg shadow-md">
        <div className="relative">
          {/* Hiển thị hình ảnh combo */}
          <img
            src={`assets/${props.id}.jpg`} // Đường dẫn tới hình ảnh
            alt={props.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {/* Giá hiển thị trên ảnh */}
          <div className="absolute top-0 left-0 bg-red-500 text-white p-2 rounded-br-lg">
            Chỉ {props.price / 1000}K
          </div>
        </div>
        <div className="p-4">
          {/* Tên và mô tả combo */}
          <h3 className="text-lg font-bold">{props.name}</h3>
          <p className="text-sm text-gray-600">{props.description}</p>

          {/* Giá và giá gốc */}
          <div className="flex items-center mt-2">
            <span className="text-red-500 font-bold text-lg">{props.price.toLocaleString('vi-VN')}đ</span>
            {props.originalPrice && (
              <span className="text-gray-400 line-through ml-2">
                {props.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>

          {/* Nút thêm vào giỏ */}
          <button
            className="mt-4 w-full flex justify-center items-center bg-red-500 text-white py-2 rounded-md"
            onClick={handleAddToCart}
          >
            <span className="mr-2">+</span> Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}
