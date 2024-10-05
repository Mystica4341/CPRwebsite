import React from 'react'
import { FaIcons, FaRegUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
export default function Header() {
  return (
    <div className='flex justify-between space-x-3, pl-12 rounded-sm'>

      {/* Logo */}
     <img className='h-20 w-auto' src='https://i.imgur.com/jjcnpGG.jpeg' ></img>


      {/* Title */}
      <div className='space-x-5 my-auto font-bold text-black'>
        <a className='hover:text-red-500 transition-colors duration-300-600'>Món Ăn</a>
        <a className='hover:text-red-500 transition-colors duration-300'>Đồ Uống</a>
        <a className='hover:text-red-500 transition-colors duration-300'>Combo</a>
        <a className='hover:text-red-500 transition-colors duration-300'>Thông Tin</a> 
      </div>

      {/* Search bar */}
      <div className='space-x-5 my-auto border-black border-2 rounded-sm flex'>
        <input type="text" class="w-full p-2 h-7 my-auto" placeholder="Search..."/>
        <IoSearchSharp className='justify-center my-auto text-2xl pr-1'/>
      </div>

      {/* User & Cart */}
      <div className='flex space-x-4 text-xl pr-3'>
        <MdAddShoppingCart className='my-auto '/>
        <FaRegUser className='my-auto '/>
      </div>
    </div>
  )
}
