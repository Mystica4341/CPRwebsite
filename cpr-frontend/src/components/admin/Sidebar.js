import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import { HiOutlineCog } from "react-icons/hi";
import { GiChickenLeg } from "react-icons/gi";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-gray-900 text-white w-64 space-y-6 py-7 px-2 h-screen">
      <nav className="space-y-4">
        <NavLink
          to="/" // Chuyển đến UserTable khi vào admin
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <IoHomeOutline className="inline-block h-5 w-5 mr-2" />
          Home
        </NavLink>
        <NavLink
          to="/admin/UserTable"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <FaRegUser className="inline-block h-5 w-5 mr-2" />
          Users
        </NavLink>
        <NavLink
          to="/admin/ItemsTable"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <GiChickenLeg className="inline-block h-5 w-5 mr-2" />
          Items
        </NavLink>

        <NavLink
          to="/admin/OrderTable"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <GiChickenLeg className="inline-block h-5 w-5 mr-2" />
          Orders
        </NavLink>

        <NavLink
          to="/admin/CategoryTable"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <MdBorderColor className="inline-block h-5 w-5 mr-2" />
          Categories
        </NavLink>
        <NavLink
          to="/admin/SettingTable"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <HiOutlineCog className="inline-block h-5 w-5 mr-2" />
          Settings
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
