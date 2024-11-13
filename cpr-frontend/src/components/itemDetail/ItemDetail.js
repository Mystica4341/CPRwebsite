import React from 'react'
import { useParams } from "react-router-dom";
import { getItem } from '../../services/ItemService';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ItemDetail() {
  const { itemName } = useParams();
  const [itemDetail, setItemDetail] = useState("");
  const [ originalPrice, setOriginalPrice ] = useState(0)
  const [quantities, setquantities] = useState(1);

  const { addToCart } = useCart(); 

  useEffect(() => {
    getItemDetail(itemName);
  }, [itemName]);

  const HandleAddtoCart = () => {
    const product = {
      itemName: itemDetail.itemName, // Thay id bằng itemName
      itemUrl: itemDetail.itemUrl,
      description: itemDetail.description,
      price: itemDetail.price,
      originalPrice: originalPrice,
      quantity: quantities, // Mặc định là 1 khi thêm mới vào giỏ
    };
    addToCart(product); // Thêm sản phẩm vào giỏ hàng
    alert("Đã thêm vào giỏ hàng thành công!"); // Thông báo thành công
  }

  // Hàm tăng số lượng sản phẩm
  const handleIncrease = () => {
    setquantities(quantities+1)
  };
  
  // Hàm giảm số lượng sản phẩm
  const handleDecrease = () => {
    if (quantities > 1) {
    setquantities(quantities-1)
    }
  };

  const getItemDetail = async (itemName) => { 
    try{
      let res = await getItem(itemName);
      if (res && res.data) {
        setItemDetail(res.data);
        setOriginalPrice(res.data.price + 20000)
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
        src={itemDetail.itemUrl}// Replace with the actual path to your image
        className="max-w-xs"
      />
    </div>

    {/* Text Section */}
    <div className="w-1/2 ml-8">
      <h2 className="text-4xl font-bold">{itemDetail.itemName}</h2>

      <p className="text-lg mt-2">{itemDetail.description}</p>

      <div className="flex items-center mt-4">
        <p className="text-3xl font-semibold mt-4 text-red-500">{itemDetail.price.toLocaleString("vi-VN")}đ</p>
        <p className="text-gray-400 line-through ml-2 mt-5">{originalPrice.toLocaleString("vi-VN")}đ</p>
      </div>

      <div className="flex items-center mt-4 text-center">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-md mr-2 w-7"
          onClick={() => handleIncrease(itemDetail.itemName)}>+</button>
        <span>{quantities}</span>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-md ml-2 w-7"
          onClick={() => handleDecrease(itemDetail.itemName)}>-</button>
      </div>

      {/* Button */}
      <button 
        className="mt-6 px-6 py-2 border rounded-xl bg-red-500 text-white hover:bg-black hover:text-white transition-colors" 
        onClick={HandleAddtoCart}>
        Thêm vào giỏ
      </button>
    </div>
  </div>
  );
}