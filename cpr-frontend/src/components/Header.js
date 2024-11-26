import React, { useState, useEffect, useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Lấy cart từ context
import { UserContext } from "../context/UserContext";
import { getAllItems } from "../services/ItemService"; // Import hàm lấy dữ liệu

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Header() {
  const { logout, user, admin } = useContext(UserContext);
  const navigate = useNavigate();
  const { getCartQuantity } = useCart(); // Lấy số lượng sản phẩm

  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Load danh sách món ăn khi component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getAllItems("", 1, 5, "Active"); // Lấy dữ liệu từ API
        setItems(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách món ăn:", error);
      }
    };
    fetchItems();
  }, []);

  // Lọc danh sách món ăn theo từ khóa tìm kiếm
  useEffect(() => {
    if (searchTerm) {
      const results = items.filter((item) =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm, items]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between space-x-3 pl-12 rounded-sm">
      <img
        className="h-20 w-auto cursor-pointer"
        src="https://i.imgur.com/HxUij9o.jpg"
        alt="Logo"
        onClick={() => navigate("/")}
      />
      <div className="space-x-5 my-auto font-bold text-black">
        <Link to="/" className="hover:text-red-500 transition-colors duration-300">
          Món Ăn
        </Link>
        <Link to="/menu" className="hover:text-red-500 transition-colors duration-300">
          Menu
        </Link>
        <a className="hover:text-red-500 transition-colors duration-300">Đồ Uống</a>
        <a className="hover:text-red-500 transition-colors duration-300">Combo</a>
        <Link to="/AboutUs" className="hover:text-red-500 transition-colors duration-300">
          About Us
        </Link>
        <Link to="/admin" className="hover:text-red-500 transition-colors duration-300">
          Admin
        </Link>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="relative space-x-0 my-auto border-black border-2 rounded-sm flex">
        <input
          type="text"
          className="w-full p-2 h-7 my-auto focus:outline-none"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoSearchSharp className="justify-center my-auto text-2xl pr-1" />
        {filteredItems.length > 0 && (
          <div className="absolute bg-white border border-gray-300 rounded-md mt-8 w-full max-h-60 overflow-y-auto shadow-lg z-20">
            {filteredItems.map((item) => (
              <div
                key={item._id.$oid}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate(`/item/${item.itemName}`); // Redirect đến chi tiết món ăn
                  setSearchTerm(""); // Clear search
                  setFilteredItems([]); // Ẩn danh sách gợi ý
                }}
              >
                <p className="font-medium">{item.itemName}</p>
                <p className="text-sm text-gray-500 pr-2">{item.category}</p>
              </div>   
            ))}
          </div>
        )}
        
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
        <div>
          {(user && user.auth === true) || (admin && admin.auth === true) ? (
            <div className="lg:flex hidden">
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                  <span>{user ? `${user.email}` : `${admin?.email}`}</span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </PopoverButton>
                <PopoverPanel className="absolute z-20 mt-3 w-full transform -translate-x-1/2 left-1/2">
                  <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    {admin ? (
                      <div className="p-4">
                        <div className="flex flex-col gap-y-2">
                          <a
                            className="block text-gray-900 cursor-pointer text-md"
                            onClick={() => navigate("/admin")}
                          >
                            Dashboard
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className=""></div>
                    )}
                    <div className="p-4">
                      <div className="flex flex-col gap-y-2">
                        <a
                          className="block text-gray-900 cursor-pointer text-md"
                          onClick={handleLogout}
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
            </div>
          ) : (
            <FaRegUser
              className="cursor-pointer hover:text-blue-500 "
              onClick={() => navigate("/login")}
            />
          )}
        </div>
      </div>
    </div>
  );
}