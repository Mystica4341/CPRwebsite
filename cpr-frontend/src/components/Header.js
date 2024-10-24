import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Lấy cart từ context

export default function Header() {
  const navigate = useNavigate();
  const { getCartQuantity } = useCart(); // Lấy số lượng sản phẩm

  return (
    <div className="flex justify-between space-x-3 pl-12 rounded-sm">
      <img
        className="h-20 w-auto cursor-pointer"
        src="https://i.imgur.com/HxUij9o.jpg"
        alt="Logo"
        onClick={() => navigate("/")}
      />
      <div className="space-x-5 my-auto font-bold text-black">
        <Link
          to="/"
          className="hover:text-red-500 transition-colors duration-300"
        >
          Món Ăn
        </Link>
        <Link
          to="/menu"
          className="hover:text-red-500 transition-colors duration-300"
        >
          Menu
        </Link>
        <a className="hover:text-red-500 transition-colors duration-300">
          Đồ Uống
        </a>
        <a className="hover:text-red-500 transition-colors duration-300">
          Combo
        </a>
        <Link
          to="/AboutUs"
          className="hover:text-red-500 transition-colors duration-300"
        >
          About Us
        </Link>
        <Link
          to="/admin"
          className="hover:text-red-500 transition-colors duration-300"
        >
          Admin
        </Link>
      </div>

      <div className="space-x-5 my-auto border-black border-2 rounded-sm flex">
        <input
          type="text"
          className="w-full p-2 h-7 my-auto"
          placeholder="Search..."
        />
        <IoSearchSharp className="justify-center my-auto text-2xl pr-1" />
      </div>

      {/* Cart and user icon */}
      <div className="flex space-x-4 text-xl items-center pr-10 ">
        <div className="relative ml-7">
          <MdAddShoppingCart
            className="cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/cart")}
          />
          {getCartQuantity() > 0 && (
            <span className="absolute bottom-4 left-3 bg-red-500 text-white rounded-full w-4 h-4 text-sm flex justify-center items-center">
              {getCartQuantity()}
            </span>
          )}
        </div>
        <FaRegUser
          className="cursor-pointer hover:text-blue-500 "
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
}
