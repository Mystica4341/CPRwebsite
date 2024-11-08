import React from 'react'

export default function itemDetail() {
  return (
    <div className="flex items-center bg-white text-black p-8 gap-5 h-screen">
    {/* Image Section */}
    <div className="w-1/2 flex justify-end">
      <img
        src="https://i.imgur.com/quozNxE.png" // Replace with the actual path to your image
        alt="French Fries"
        className="max-w-xs"
      />
    </div>

    {/* Text Section */}
    <div className="w-1/2 ml-8">
      <h2 className="text-4xl font-bold">Khoai Tây Chiên (size vừa)</h2>
      <p className="text-lg mt-2">Khoai tây chiên lừng danh thế giới.</p>
      <p className="text-3xl font-semibold mt-4">29,000 VNĐ</p>

      {/* Button */}
      <button className="mt-6 px-6 py-2 border border-black rounded-full hover:bg-red-500 hover:text-white transition-colors ">
        Thêm vào giỏ
      </button>
    </div>
  </div>
  )
}
