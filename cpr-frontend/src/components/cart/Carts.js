import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom"; // Thêm import này

export default function Carts() {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Hàm tăng số lượng sản phẩm
  const handleIncrease = (itemName) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemName === itemName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm giảm số lượng sản phẩm
  const handleDecrease = (itemName) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemName === itemName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Hàm xóa sản phẩm khỏi giỏ
  const handleRemove = (itemName) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.itemName !== itemName));
  };

  // Hàm thanh toán
  const handleCheckout = () => {
    if (cartItems.length > 0) { // Kiểm tra giỏ hàng không trống
      navigate('/payment'); // Chuyển hướng đến trang thanh toán
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Giỏ hàng của bạn đang trống. Không thể thanh toán.</p>
        </div>
      ) : (
        cartItems.map((item) => (
          <div key={item.itemName} className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
              <img
                src={item.itemUrl}
                alt={item.itemName}
                className="h-16 w-16 object-cover mr-4"
              />
              <div>
                <h3 className="font-bold">{item.itemName}</h3>
                <p>{item.description}</p>
                <p>{item.price.toLocaleString("vi-VN")}đ x {item.quantity} = {(item.price * item.quantity).toLocaleString("vi-VN")}đ</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                onClick={() => handleIncrease(item.itemName)}
              >
                +
              </button>
              <span>{item.quantity}</span>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                onClick={() => handleDecrease(item.itemName)}
              >
                -
              </button>
              <button
                className="bg-red-700 text-white px-2 py-1 rounded-md ml-8"
                onClick={() => handleRemove(item.itemName)}
              >
                Xóa
              </button>
            </div>
          </div>
        ))
      )}
      {cartItems.length > 0 && ( // Chỉ hiện tổng cộng và nút thanh toán nếu giỏ hàng không trống
        <div className="mt-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Tổng cộng:</h3>
            <p className="text-xl">
              {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString('vi-VN')}đ
            </p>
          </div>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md ml-4"
            onClick={handleCheckout} // Nút thanh toán
          >
            Thanh toán
          </button>
        </div>
      )}
    </div>
  );
}
