import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { getAllUsers } from "../../services/UserService";

export default function UserTable() {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all users when the component is mounted
  // Fetch all users when the component is mounted
  useEffect(() => {
    getUsers();
  }, [currentPage]);

  // Fetch all users
  const getUsers = async () => {
    try {
      let res = await getAllUsers();
      if (res) {
        setListUsers(res);
      }
    } catch (error) {
      console.log("Error with fetching: ", error);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  const handleEditUser = (user) => {
    console.log("Edit user: ", user);
  };

  const handleDeleteUser = (user) => {
    console.log("Delete user: ", user);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">User Table</h1>
          <button className="bg-sky-400 text-white px-4 py-2 rounded-md">
            Add new User
          </button>
        </div>
        <div className="">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Id
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {listUsers.length > 0 ? (
                listUsers.map((item) => (
                  <tr key={item.Id} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.userId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.status}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex float-right">
                        <GoPencil
                          className="text-xl text-yellow-400 hover:text-yellow-200 mr-5"
                          onClick={() => handleEditUser(item)}
                        />
                        <FaTrashAlt
                          className="text-xl text-red-400 hover:text-red-200"
                          onClick={() => handleDeleteUser(item)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No Users available.
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
