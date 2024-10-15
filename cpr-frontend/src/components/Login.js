import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

export default function Login() {
  const navigate = useNavigate();

  // Function to handle navigation back to "Món Ăn"
  const handleClose = () => {
    navigate("/"); // Navigates to the "Món Ăn" page
  };

  return (
    <div className="  bg-cover bg-center min-h-screen flex items-center justify-center">
      {/* Login form section */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {/* Close button (X) */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          &#10005; {/* This is the "X" icon */}
        </button>

        <div className="flex justify-center">
          <img
            src="https://i.imgur.com/HxUij9o.jpg" // Replace with your logo or icon
            alt="BESTSELLER"
            className="h-16 w-auto mb-4"
          />
        </div>

        <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
          Đăng nhập hoặc tạo tài khoản
        </h3>

        <div className="mt-3">
          <input
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-red-500 focus:outline-none focus:ring-red-500"
            placeholder="Nhập số điện thoại của bạn/Email"
          />
        </div>

        <div className="mt-6">
          <button className="inline-flex justify-center px-4 py-2 w-full text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Tiếp tục
          </button>
        </div>

        {/* "Mua hàng không cần tài khoản" link */}
        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-red-500 hover:underline"
            onClick={handleClose} // This will also navigate back to the "Món Ăn" page
          >
            Mua hàng không cần tài khoản
          </a>
        </div>

        <div className="mt-4 text-center text-gray-600">
          hoặc Đăng nhập bằng
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400">
            FACEBOOK
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-400">
            GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
}
