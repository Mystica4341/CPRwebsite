import React from 'react';

const Banner = () => {
  return (
    <div className="mt-7 relative w-full h-96 bg-gray-800 overflow-hidden">
      <img
        src="https://www.lotteria.vn/media/banner/b/a/banner_si_u_sao_g_p_th__banner_web.jpg" 
        alt="Banner"
        className="absolute inset-0 object-cover w-full h-full opacity-70"
      />
      <div className=" relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl font-bold mb-2">Chào Mừng Đến Với CPR</h1>
        <p className="mb-4">Khám phá nội dung thú vị và khuyến mãi mới nhất.</p>
        <a
          href="#"
          className="px-6 py-2 text-lg font-semibold text-white bg-red-600 rounded hover:bg-blue-500 transition"
        >
          Khám Phá Ngay
        </a>
      </div>
    </div>
  );
};

export default Banner;
