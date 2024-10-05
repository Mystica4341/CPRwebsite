import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-pink-100 py-8">
    <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
        </div>
        <div className="flex justify-center items-center space-x-2 text-sm">
            <img src="https://imgur.com/HxUij9o.jpeg" alt="Footer logo" className="w-40 h-30"/>
            <div className="ml-96"><b>
                <p>Số điện thoại: 0987654321</p>
                <p>Email: cpr.store@gmail.com</p>
                <p>Địa chỉ cửa hàng:</p>
                <p>69/68 Đường Quang Trung, Quận Bình Thạnh, TP.HCM</p>
                <p>45 Nguyễn Thái Học, Quận 1, TP.HCM</p>
                <p>233A Phan Văn Trị, Quận Bình Thạnh, TP.HCM</p>
                </b>
            </div>
        </div>
    </div>
</footer>
  )
}
