import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { getAllCategories } from "../../../services/CategoryService"; // Đã import CategoryService đúng cách

export default function CategoryTable() {
  const [listCategories, setListCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories when the component is mounted
  useEffect(() => {
    getCategories();
  }, [currentPage]);

  // Fetch all categories
  const getCategories = async () => {
    try {
      let res = await getAllCategories(); // Gọi API để lấy danh sách category
      if (res) {
        setListCategories(res);
      }
    } catch (error) {
      console.log("Error with fetching categories: ", error);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  const handleEditCategory = (category) => {
    console.log("Edit category: ", category);
  };

  const handleDeleteCategory = (category) => {
    console.log("Delete category: ", category);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Category Table</h1>
          <button className="bg-sky-400 text-white px-4 py-2 rounded-md">
            Add new Category
          </button>
        </div>
        <div className="">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Category ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Category Name
                </th>
              </tr>
            </thead>
            <tbody>
              {listCategories.length > 0 ? (
                listCategories.map((category) => (
                  <tr
                    key={category.category_id}
                    className="border-t border-gray-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {category.category_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {category.category_name}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex float-right">
                        <GoPencil
                          className="text-xl text-yellow-400 hover:text-yellow-200 mr-5"
                          onClick={() => handleEditCategory(category)}
                        />
                        <FaTrashAlt
                          className="text-xl text-red-400 hover:text-red-200"
                          onClick={() => handleDeleteCategory(category)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No Categories available.
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
        pageCount={2} // Số lượng trang đã được chỉnh lại nếu cần
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
