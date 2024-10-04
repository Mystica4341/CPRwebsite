import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
export default function Header() {
  return (
    
    <div className='flex justify-between space-x-3, pl-12'>
     <img className='w-20 h-20' src='https://i.imgur.com/FyrBIo2.jpeg'></img>
     
     <div className='space-x-5 my-auto'>
      <a className='font-bold text-black hover:text-red-500 transition-colors duration-300-600 mt-5 '>Chicken Frield</a>
      <a className='font-bold text-black hover:text-red-500 transition-colors duration-300 mt-5 '>Cafe</a>
      <a className='font-bold text-black hover:text-red-500 transition-colors duration-300 mt-5 ' >Drink</a>
      <a className='font-bold text-black hover:text-red-500 transition-colors duration-300 mt-5 ' >About Us</a>
      
      </div>

      <div className='flex space-x-2 hover:text-red-500 transition-colors duration-300'>
      <MdAddShoppingCart className='my-auto '/>
        <FaRegUser className='my-auto '/>
        <p className='my-auto pr-4 font-semigbold'>Login</p>
      </div>

    </div>
  )
}
