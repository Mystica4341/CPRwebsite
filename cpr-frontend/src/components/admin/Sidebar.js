import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import { HiOutlineCog } from "react-icons/hi";
import { GiChickenLeg } from "react-icons/gi";

function Sidebar() {
	return (
		<div className="bg-gray-900 text-white w-64 space-y-6 py-7 px-2 h-screen">
			<nav className="space-y-4">
				<a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<IoHomeOutline className="inline-block h-5 w-5 mr-2" />
					Home
				</a>
				<a href="/admin/User" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<FaRegUser className="inline-block h-5 w-5 mr-2" />
					User
				</a>
				<a href="/admin/Game" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<GiChickenLeg className="inline-block h-5 w-5 mr-2" />
					Items
				</a>
				<a href="/admin/Genre" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<MdBorderColor className="inline-block h-5 w-5 mr-2" />
					Order
				</a>
				<a href="/admin/Category" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<MdBorderColor className="inline-block h-5 w-5 mr-2" />
					Category
				</a>
				<a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
					<HiOutlineCog className="inline-block h-5 w-5 mr-2" />
					Settings
				</a>
			</nav>
		</div>
	);
}

export default Sidebar;
