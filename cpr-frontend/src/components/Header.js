import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from React Router

export default function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // This will navigate to the Login page
  };

  return (
    <div className="flex justify-between space-x-3 pl-12 rounded-sm">
      {/* Logo */}
      <img
        className="h-20 w-auto"
        src="https://i.imgur.com/HxUij9o.jpg"
        alt="Logo"
      />

      {/* Title */}
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
      </div>

      {/* Search bar */}
      <div className="space-x-5 my-auto border-black border-2 rounded-sm flex">
        <input
          type="text"
          className="w-full p-2 h-7 my-auto"
          placeholder="Search..."
        />
        <IoSearchSharp className="justify-center my-auto text-2xl pr-1" />
      </div>

      {/* User & Cart */}
      <div className="flex space-x-4 text-xl pr-3">
        <MdAddShoppingCart className="my-auto" />
        <FaRegUser
          className="my-auto cursor-pointer hover:text-red-500"
          onClick={handleLoginClick}
        />
      </div>
    </div>
  );
}
