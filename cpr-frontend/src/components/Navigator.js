import React from "react";

export default function NavigationBar() {
  return (
    <section
      className="bg-pink-100 py-4 mx-4 my-4 rounded-lg"
      style={{ margin: "25px" }}
    >
      <div className="container mx-auto flex justify-around">
        <div className="flex items-center w-24 h-24">
          <img
            src="https://imgur.com/AGqTqcW.jpeg"  alt="Bestseller icon" className="mr-2"
          />
          <a href="#" className="font-bold hover:text-red-500">
            BESTSELLER
          </a>
        </div>
        <div className="flex items-center">
          <img
            src="https://imgur.com/gNpii9J.jpeg " alt="Order icon" className="mr-2"
          />
          <a href="#" className="font-bold hover:text-red-500">
            ĐẶT HÀNG
          </a>
        </div>
        <div className="flex items-center">
          <img
            src="https://imgur.com/pZqVwte.jpeg" alt="Promotion icon" className="mr-2"
          />
          <a href="#" className="font-bold hover:text-red-500">
            KHUYẾN MÃI
          </a>
        </div>
        <div className="flex items-center">
          <img
            src="https://imgur.com/8ZY1eAS.jpeg" alt="Store icon" className="mr-2"
          />
          <a href="#" className="font-bold hover:text-red-500">
            CỬA HÀNG
          </a>
        </div>
      </div>
    </section>
  );
}
