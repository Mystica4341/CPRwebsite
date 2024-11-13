import React from 'react'
import { useParams } from "react-router-dom";
import { getItem } from '../../services/ItemService';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
export default function ItemDetail() {
  const [itemDetail, setItemDetail] = useState("");
  const { itemName } = useParams();
  const {  setCartItems } = useCart();
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const handleIncrease = (itemName) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemName === itemName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const handleDecrease = (itemName) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.itemName === itemName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
 
  useEffect(() => {
    getItemDetail(itemName);
  }, [itemName]);
  const getItemDetail = async (itemName) => { 
    try{
      let res = await getItem(itemName);
    
      if (res && res.data) {
        setItemDetail(res.data);
     
      }
    }
    catch(error){
      console.log("Error with fetching items: ", error);
    };
  };

  if (!itemDetail) {
    return <div>Item not found</div>;
  }
  return(
<div className="flex items-center bg-white text-black p-8 gap-5 h-screen">
    {/* Image Section */}
    <div className="w-1/2 flex justify-end">
      <img
        src={itemDetail.itemUrl} // Replace with the actual path to your image
        
        className="max-w-xs"
      />
    </div>

    {/* Text Section */}
    <div className="w-1/2 ml-8">
      <h2 className="text-4xl font-bold">{itemDetail.itemName}</h2>
      <p className="text-lg mt-2">{itemDetail.description}</p>
      <p className="text-3xl font-semibold mt-4">{itemDetail.price}</p>
      <div>
                <h3 className="font-bold">{item.itemName}</h3>
                <p>{item.description}</p>
                <p>{item.price.toLocaleString("vi-VN")}đ x {item.quantity} = {(item.price * item.quantity).toLocaleString("vi-VN")}đ</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                onClick={() => handleIncrease(item.itemName)}
              >
                +
              </button>
              <span>{item.quantity}</span>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                onClick={() => handleDecrease(item.itemName)}
              >
                -
              </button>
              
            </div>
          

      {/* Button */}
      <button className="mt-6 px-6 py-2 border border-black rounded-full hover:bg-red-500 hover:text-white transition-colors ">
        Thêm vào giỏ
      </button>
    </div>
  
  
  );
}
