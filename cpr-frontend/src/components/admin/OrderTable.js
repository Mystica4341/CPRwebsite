// src/components/admin/OrderTable.js
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { getAllOrders } from "../../services/OrderService"; // Đảm bảo rằng bạn đã tạo OrderService.js

export default function OrderTable() {
  const [listOrders, setListOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all orders when the component is mounted
  useEffect(() => {
    getOrders();
  }, [currentPage]);

  // Fetch all orders
  const getOrders = async () => {
    try {
      let res = await getAllOrders(); // Đảm bảo rằng bạn đã định nghĩa hàm này trong OrderService.js
      if (res) {
        setListOrders(res);
        // Bạn có thể cập nhật tổng số trang ở đây nếu API trả về thông tin này
        setTotalPages(Math.ceil(res.length / 10)); // Thay đổi 10 thành số mục mỗi trang mà bạn muốn
      }
    } catch (error) {
      console.log("Error with fetching orders: ", error);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  const handleEditOrder = (order) => {
    console.log("Edit order: ", order);
  };

  const handleDeleteOrder = (order) => {
    console.log("Delete order: ", order);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Order Table</h1>
          <button className="bg-sky-400 text-white px-4 py-2 rounded-md">
            Add new Order
          </button>
        </div>
        <div className="">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {listOrders.length > 0 ? (
                listOrders.map((item) => (
                  <tr key={item.order_id} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.order_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.user_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(item.order_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.total_amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.status}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex float-right">
                        <GoPencil
                          className="text-xl text-yellow-400 hover:text-yellow-200 mr-5"
                          onClick={() => handleEditOrder(item)}
                        />
                        <FaTrashAlt
                          className="text-xl text-red-400 hover:text-red-200"
                          onClick={() => handleDeleteOrder(item)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No Orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ReactPaginate
        previousLabel={<span className="text-gray-500">← Previous</span>}
        nextLabel={<span className="text-gray-500">Next →</span>}
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center mt-4 space-x-2"
        pageClassName="text-white-700 hover:bg-sky-200 rounded-full w-8 h-8 flex items-center justify-center"
        activeClassName="bg-sky-400 text-white rounded-full"
      />
    </>
  );
}
