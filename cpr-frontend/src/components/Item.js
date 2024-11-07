import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ItemsList(props) {
  const { addToCart } = useCart(); // Use hook from context

  const handleAddToCart = () => {
    const product = {
      itemName: props.itemName, // Thay id bằng itemName
      itemUrl: props.itemUrl,
      description: props.description,
      price: props.price,
      quantity: 1, // Mặc định là 1 khi thêm mới vào giỏ
    };
    addToCart(product); // Thêm sản phẩm vào giỏ hàng
    alert("Đã thêm vào giỏ hàng thành công!"); // Thông báo thành công
  };
  

  return (
    <div className="flex flex-col h-full w-full max-w-xs"> {/* Ensure max height and width */}
      <div
        key={props.index}
        className="border border-gray-300 rounded-lg shadow-md h-full flex flex-col"
      >
        <div className="relative flex-grow"> {/* Flex-grow for full image height */}
          {/* Dynamically load combo image based on ID */}
          <Link to={`/product/${props.itemName}`}>
            <img
              src={`${props.itemUrl}`}
              alt={props.itemName}
              className="w-full h-60 object-cover rounded-t-lg"
            />
          </Link>
          {/* Price label on top of the image */}
          <div className="absolute top-0 left-0 bg-red-500 text-white p-2 rounded-br-lg">
            Chỉ {props.price / 1000}K
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow"> {/* Ensure content takes remaining space */}
          {/* Combo name and description */}
          <h3 className="text-lg font-bold">{props.itemName}</h3>
          <p className="text-sm text-gray-600">{props.description}</p>

          {/* Price and original price */}
          <div className="flex items-center mt-2">
            <span className="text-red-500 font-bold text-lg">
              {props.price.toLocaleString("vi-VN")}đ
            </span>
            {props.originalPrice && (
              <span className="text-gray-400 line-through ml-2">
                {props.originalPrice.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>

          {/* Add to cart button */}
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
