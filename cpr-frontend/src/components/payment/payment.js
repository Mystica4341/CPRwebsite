import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { addOrder, getAllOrders } from "../../services/OrderService";

export default function Payment() {
  const navigate = useNavigate(); // Khai báo useNavigate
  const { cartItems, setCartItems } = useCart(); // Lấy thông tin giỏ hàng
  const [isGuest, setIsGuest] = useState(false); // Kiểm tra nếu là khách lẻ
  const [paymentMethod, setPaymentMethod] = useState(""); // Phương thức thanh toán
  const { user, admin } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [orderId, setOrderId] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}-${String(currentDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${currentDate.getFullYear()}`;

  useEffect(() => {
    handleGetAllOrders(searchTerm);
    if (user && user.auth == true) {
      setUsername(user.username);
      setAddress(user.address);
      setPhoneNumber(user.phoneNumber);
    }
  });

  const handleGetAllOrders = async (searchTerm) => {
    try {
      let check = await getAllOrders(searchTerm, 1, 20);
      setOrderId(check.totalOrders + 1);
    } catch (error) {
      console.log("Error with fetching: ", error);
    }
  };

  const handleGuestToggle = () => {
    setIsGuest(!isGuest);
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

  const handleAddOrder = async () => {
    console.log("current orderId: ", orderId);

    let items = [];
    cartItems.map((item) => {
      items = [
        ...items,
        {
          itemName: item.itemName,
          quantity: item.quantity,
        },
      ];
    });
    console.log("items: ", items);

    let res = await addOrder(
      orderId,
      username,
      formattedDate.toString(),
      items,
      totalAmount
    );
    if (res && res.status === 201) {
      alert("Create order successfully!");
    } else {
      alert(res.data.message || "Error when creating User!");
    }
    setUsername("");
    setPhoneNumber("");
    setAddress("");
  };

  const handleConfirm = () => {
    // State cho thông tin khách lẻ
    const customerInfo = {
      fullName: username,
      phoneNumber: phoneNumber,
      address: address,
    };

    // Validate required fields
    if (isGuest) {
      const { fullName, phoneNumber, address } = customerInfo;
      if (!fullName || !phoneNumber || !address) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return; // Prevent navigation
      }
    }

    handleAddOrder();

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

    setCartItems([]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phần bên trái */}
        <div className="bg-white p-4 border rounded-md">
          <h2 className="text-xl font-bold mb-4">Thông Tin Thanh Toán</h2>

          {(user && user.auth === true) || (admin && admin.auth === true) ? (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Họ và Tên"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border px-4 py-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Số Điện Thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border px-4 py-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Địa Chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border px-4 py-2 w-full mb-2"
              />
            </div>
          ) : (
            <div>
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
            </div>
          )}

          {/* Hiện form thông tin khách lẻ nếu checkbox được chọn */}
          {isGuest && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Họ và Tên"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border px-4 py-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Số Điện Thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border px-4 py-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Địa Chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
            <span className="w-3/5">Tên Sản Phẩm</span>
            <span className="w-1/5 text-center">SL</span>
            <span className="w-1/5 text-right">Thành Tiền</span>
          </div>

          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span className="w-3/5">{item.itemName}</span>
              <span className="w-1/5 text-center">x{item.quantity}</span>
              <span className="w-1/5 text-right">
                {(item.price * item.quantity).toLocaleString("vi-VN")}đ
              </span>
            </div>
          ))}

          {/* Hiển thị phí ship nếu phương thức thanh toán là "Thanh Toán Khi Nhận Hàng" */}
          {paymentMethod === "cod" && (
            <div className="flex justify-between mb-2">
              <span>Phí Ship:</span>
              <span>
                {(cartItems.length > 0 ? shippingFee : 0).toLocaleString(
                  "vi-VN"
                )}
                đ
              </span>
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
