import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
export default function Header() {
  return (
    
    <div className='flex justify-between space-x-3, pl-12'>
      
     <img className='h-20 w-auto' src='https://i.imgur.com/FyrBIo2.jpeg' ></img>
     
     
     <div className='space-x-5 my-auto font-bold text-black'>
      <a className=' hover:text-red-500 transition-colors duration-300-600'>Home</a>
      <a className=' hover:text-red-500 transition-colors duration-300'>Menu</a>
      <a className=' hover:text-red-500 transition-colors duration-300' >Drink</a>
      <a className=' hover:text-red-500 transition-colors duration-300' >About Us</a>
      </div>

      <div className='flex space-x-2 hover:text-red-500 transition-colors duration-300'>
      <MdAddShoppingCart className='my-auto '/>
        <FaRegUser className='my-auto '/>
        <p className='my-auto pr-4 font-semigbold'>Login</p>
      </div>

    </div>
  )
}
