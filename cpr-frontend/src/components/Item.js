import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ItemsList(props) {
  const [originalPrice, setOriginalPrice] = useState(props.price + 20000);
  const [quantity, setQuantity] = useState(1); // Trạng thái số lượng
  const { addToCart } = useCart(); // Hook từ context

  const handleAddToCart = () => {
    const product = {
      itemName: props.itemName, // Thay id bằng itemName
      itemUrl: props.itemUrl,
      description: props.description,
      price: props.price,
      quantity, // Sử dụng số lượng đã chọn
    };
    addToCart(product); // Thêm sản phẩm vào giỏ hàng
    alert("Đã thêm vào giỏ hàng thành công!"); // Thông báo
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1); // Tăng số lượng
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev)); // Giảm số lượng

  return (
    <div className="flex flex-col h-full w-full max-w-xs">
      <div
        key={props.index}
        className="border border-gray-300 rounded-lg shadow-md h-full flex flex-col"
      >
        <div className="relative flex-grow">
          <Link to={`/item/${props.itemName}`}>
            <img
              src={`${props.itemUrl}`}
              alt={props.itemName}
              className="w-full h-60 object-cover rounded-t-lg"
            />
          </Link>
          <div className="absolute top-0 left-0 bg-red-500 text-white p-2 rounded-br-lg">
            Chỉ {props.price / 1000}K
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold">{props.itemName}</h3>
          <p className="text-sm text-gray-600">{props.description}</p>
          <div className="flex items-center mt-2">
            <span className="text-red-500 font-bold text-lg">
              {props.price.toLocaleString("vi-VN")}đ
            </span>
            {originalPrice && (
              <span className="text-gray-400 line-through ml-2">
                {originalPrice.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>
          {/* Nút tăng giảm số lượng */}
          <div className="flex items-center mt-4">
            <button
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded-l"
              onClick={decrementQuantity}
            >
              -
            </button>
            <span className="px-4 py-1 bg-gray-100 text-gray-800">
              {quantity}
            </span>
            <button
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded-r"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
          {/* Nút thêm vào giỏ */}
          <button
            className="mt-4 w-full flex justify-center items-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
            onClick={handleAddToCart}
          >
            <span className="mr-2">+</span> Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}
