import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { getAllItems } from "../../../services/ItemService";

export default function ItemTable() {
  const [listItems, setListItems] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch items when the component is mounted or page/searchTerm changes
  useEffect(() => {
    getItems(searchTerm, currentPage);
  }, [currentPage, searchTerm]);

  // Fetch all items with pagination and search term
  const getItems = async (searchTerm, page) => {
    try {
      let res = await getAllItems(searchTerm, page);
      if (res) {
        setListItems(res.data);
        setTotalPages(res.totalPages);
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

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page for new search term
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
        <div className="flex justify-start mt-4 mb-4">
          <input
            type="text"
            placeholder="Search Item here..."
            onChange={handleSearch}
            className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
          />
        </div>
        <div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Item ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Cartegory Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {listItems.length > 0 ? (
                listItems.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {index+1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.category.map((category) => category).join(", ")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.price}
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
