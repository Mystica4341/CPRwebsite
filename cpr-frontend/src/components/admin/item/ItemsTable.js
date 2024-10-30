import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { getAllItems } from "../../../services/ItemService"; // Đảm bảo rằng bạn đã tạo một service để lấy danh sách items

export default function ItemTable() {
  const [listItems, setListItems] = useState([]);
  const [totalPages, setTotalPages] = useState(2); // Bạn có thể cập nhật totalPages nếu cần
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all items when the component is mounted
  useEffect(() => {
    getItems();
  }, [currentPage]);

  // Fetch all items
  const getItems = async () => {
    try {
      let res = await getAllItems(); // Gọi API để lấy danh sách items
      if (res) {
        setListItems(res);
      }
    } catch (error) {
      console.log("Error with fetching items: ", error);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  const handleEditItem = (item) => {
    console.log("Edit item: ", item);
  };

  const handleDeleteItem = (item) => {
    console.log("Delete item: ", item);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Item Table</h1>
          <button className="bg-sky-400 text-white px-4 py-2 rounded-md">
            Add new Item
          </button>
        </div>
        <div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Item ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Category ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Image
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {listItems.length > 0 ? (
                listItems.map((item) => (
                  <tr key={item.item_id} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.item_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.category_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.item_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <img
                        src={item.image_url}
                        alt={item.item_name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex float-right">
                        <GoPencil
                          className="text-xl text-yellow-400 hover:text-yellow-200 mr-5"
                          onClick={() => handleEditItem(item)}
                        />
                        <FaTrashAlt
                          className="text-xl text-red-400 hover:text-red-200"
                          onClick={() => handleDeleteItem(item)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No Items available.
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
