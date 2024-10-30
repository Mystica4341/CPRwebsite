// src/components/admin/OrderTable.js
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { getAllOrders } from "../../../services/OrderService"; // Ensure OrderService.js is created

export default function OrderTable() {
  const [listOrders, setListOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all orders when the component is mounted or page changes
  useEffect(() => {
    getOrders(searchTerm, currentPage);
  }, [currentPage]);

  // Fetch all orders with optional search term
  const getOrders = async (searchTerm, page) => {
    try {
      let res = await getAllOrders(searchTerm, page);
      if (res) {
        setListOrders(res.data);
        setTotalPages(res.totalPages);
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

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    getOrders(term, 1);
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
        <div className="flex justify-start mt-4 mb-4">
          <input
            id="searchTerm"
            name="searchTerm"
            type="text"
            placeholder="Search Order here..."
            onChange={(event) => handleSearch(event)}
            className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
          />
        </div>
        <div className="">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Username</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Order Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {listOrders.length > 0 ? (
                listOrders.map((order, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-900">{order.orderId}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.total}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.status}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex float-right">
                        <GoPencil
                          className="text-xl text-yellow-400 hover:text-yellow-200 mr-5"
                          onClick={() => handleEditOrder(order)}
                        />
                        <FaTrashAlt
                          className="text-xl text-red-400 hover:text-red-200"
                          onClick={() => handleDeleteOrder(order)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
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