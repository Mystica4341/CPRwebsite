import React from "react";

export default function AboutUs() {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold text-red-600 mb-6">About Us</h1>

      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center items-center space-x-6">
          <img
            src="https://i.imgur.com/w6fQnzY.jpeg"
            className="w-80 h-auto rounded-lg mb-6"
          />
          <img
            src="https://i.imgur.com/dDTR9do.jpeg"
            className="w-80 h-auto rounded-lg mb-6"
          />
        </div>

        <blockquote className="italic text-lg text-center max-w-xl mb-4">
          “Những kẻ chê bai tôi thường là những kẻ chẳng hiểu gì về cà phê và gà
          rán” thích thiền sư: Lưu Tiến Tài
        </blockquote>
        <p className="font-bold text-lg">CHEF: Nguyen Kong Fuong</p>
        <button className="bg-red-600 text-white py-2 px-6 rounded-lg mt-6 text-lg hover:bg-red-700 transition">
          Learn More
        </button>
      </div>
    </div>
  );
}
