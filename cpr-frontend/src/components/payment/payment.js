import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useCart } from "../../context/CartContext";
import { districtData } from "../../data/data"; // Import dữ liệu quận/huyện

export default function Payment() {
  const navigate = useNavigate(); // Khai báo useNavigate
  const { cartItems } = useCart(); // Lấy thông tin giỏ hàng
  const [isGuest, setIsGuest] = useState(false); // Kiểm tra nếu là khách lẻ
  const [paymentMethod, setPaymentMethod] = useState(""); // Phương thức thanh toán

  // State cho thông tin khách lẻ
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    district: "",
    address: "",
  });

  const handleGuestToggle = () => {
    setIsGuest(!isGuest);
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCustomerInfo((prev) => ({
      ...prev,
      city: selectedCity,
      district: "", // Reset quận/huyện khi thay đổi tỉnh/thành phố
    }));
  };

  const handleDistrictChange = (e) => {
    setCustomerInfo((prev) => ({
      ...prev,
      district: e.target.value,
    }));
  };

  // Tính tổng tiền
  const shippingFee = 30000; // Phí ship cố định
  let totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const isShippingApplicable = paymentMethod === "cod";

  if (isShippingApplicable && cartItems.length > 0) {
    totalAmount += shippingFee; // Cộng phí ship vào tổng tiền
  }

  const handleConfirm = () => {
    // Validate required fields
    if (isGuest) {
      const { fullName, phoneNumber, city, district, address } = customerInfo;
      if (!fullName || !phoneNumber || !city || !district || !address) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return; // Prevent navigation
      }
    }

    // Generate order code: first four letters of full name + random five-digit number
    const orderCode =
      customerInfo.fullName.slice(0, 4).toUpperCase() +
      Math.floor(10000 + Math.random() * 90000);

    // Navigate to confirmation page
    navigate("/confirm", {
      state: {
        customerInfo,
        cartItems,
        totalAmount,
        orderCode, // Pass the order code to confirmation
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phần bên trái */}
        <div className="bg-white p-4 border rounded-md">
          <h2 className="text-xl font-bold mb-4">Thông Tin Thanh Toán</h2>

          {/* Nút đăng nhập */}
          <button className="bg-blue-500 hover:bg-red-600 text-white px-4 py-2 mb-4 rounded-md">
            Đăng Nhập
          </button>

          {/* Khách lẻ checkbox */}
          <div className="mb-4">
            <label>
              <input
                type="checkbox"
                checked={isGuest}
                onChange={handleGuestToggle}
                className="mr-2"
              />
              Khách lẻ
            </label>
          </div>

          {/* Hiện form thông tin khách lẻ nếu checkbox được chọn */}
          {isGuest && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Họ và Tên"
                value={customerInfo.fullName}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, fullName: e.target.value })
                }
                className="border px-4 py-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Số Điện Thoại"
                value={customerInfo.phoneNumber}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    phoneNumber: e.target.value,
                  })
                }
                className="border px-4 py-2 w-full mb-2"
              />

              {/* Dropdown cho Tỉnh/Thành Phố */}
              <select
                value={customerInfo.city}
                onChange={handleCityChange}
                className="border px-4 py-2 w-full mb-2"
              >
                <option value="" disabled>
                  Chọn Tỉnh/Thành Phố
                </option>
                {Object.keys(districtData).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              {/* Dropdown cho Quận/Huyện */}
              <select
                value={customerInfo.district}
                onChange={handleDistrictChange}
                className="border px-4 py-2 w-full mb-2"
                disabled={!customerInfo.city} // Vô hiệu hóa nếu chưa chọn tỉnh/thành phố
              >
                <option value="" disabled>
                  Chọn Quận/Huyện
                </option>
                {customerInfo.city &&
                  districtData[customerInfo.city].map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>

              <input
                type="text"
                placeholder="Địa Chỉ Cụ Thể"
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, address: e.target.value })
                }
                className="border px-4 py-2 w-full mb-2"
              />
            </div>
          )}

          {/* Chọn phương thức thanh toán */}
          <div className="mb-4">
            <h3 className="font-bold mb-2">Phương Thức Thanh Toán</h3>
            <label className="block">
              <input
                type="radio"
                name="payment"
                value="cod"
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Thanh Toán Khi Nhận Hàng
            </label>
            <label className="block">
              <input
                type="radio"
                name="payment"
                value="storePickup"
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Đến Nơi Nhận Hàng
            </label>
          </div>
        </div>

        {/* Phần bên phải - Thông tin giỏ hàng */}
        <div className="bg-white p-4 border rounded-md">
          <h2 className="text-xl font-bold mb-4">Thông Tin Giỏ Hàng</h2>

          {/* Tiêu đề cho thông tin sản phẩm */}
          <div className="flex justify-between font-bold mb-2">
            <span>Tên Sản Phẩm</span>
            <span>SL</span>
            <span>Thành Tiền</span>
          </div>

          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{item.itemName}</span>
              <span>x{item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString("vi-VN")}đ</span>
            </div>
          ))}

          {/* Hiển thị phí ship nếu phương thức thanh toán là "Thanh Toán Khi Nhận Hàng" */}
          {paymentMethod === "cod" && (
            <div className="flex justify-between mb-2">
              <span>Phí Ship:</span>
              <span>{(cartItems.length > 0 ? shippingFee : 0).toLocaleString("vi-VN")}đ</span>
            </div>
          )}

          {/* Tổng tiền hàng */}
          <div className="border-t mt-4 pt-2 flex justify-between font-bold">
            <span>Tổng Tiền Hàng:</span>
            <span>{totalAmount.toLocaleString("vi-VN")}đ</span>
          </div>

          {/* Nút Quay lại và Xác nhận ở dưới tổng tiền hàng */}
          <div className="flex justify-between mt-4">
            <Link
              to="/cart"
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              ⟲ Quay Lại Giỏ Hàng
            </Link>
            <button
              onClick={handleConfirm} // Gọi hàm khi nhấn nút
              className="bg-black hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
