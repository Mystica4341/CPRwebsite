import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { getAllUsers } from "../../../services/UserService";
import ModalAddUser from "./ModalAddUser";
import ModelEditUser from "./ModelEditUser";
import ModalDeleteUser from "./ModalDeleteUser";

export default function UserTable() {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModelDeleteOpen, setIsModelDeleteOpen] = useState(false);
  const [dataUser, setDataUser] = useState({});

  // Fetch all users when the component is mounted
  useEffect(() => {
    getUsers(searchTerm, currentPage);
  }, [currentPage]);

  // Fetch all users
  const getUsers = async (searchTerm, page) => {
    try {
      let res = await getAllUsers(searchTerm, page);
      if (res && res.data) {
        setListUsers(res.data);
        setTotalPages(res.totalPages);
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
    setDataUser(user);
    setIsModalEditOpen(true);
  };

  const handleDeleteUser = (user) => {
    setDataUser(user);
    setIsModelDeleteOpen(true);
  };

  const handelAddUser = () => {
    setIsModalAddOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalEditOpen(false);
		setIsModalAddOpen(false);
    setIsModelDeleteOpen(false);
	};

  const handleSubmit = (event) => {
		event.preventDefault();
		setIsModalAddOpen(false);
	};

  const handleSearch = (event) => {
		let term = event.target.value;
		if (term) {
			getUsers(term, currentPage);
		} else {
			getUsers(searchTerm, currentPage);
		}
	};

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">User Table</h1>
          <button onClick={handelAddUser} className="bg-sky-400 text-white px-4 py-2 rounded-md">
            Add new User
          </button>
        </div>
        <div className="flex justify-start mt-4 mb-4">
					<input
						id="searchTerm"
						name="searchTerm"
						type="text"
						placeholder="Search User here..."
						onChange={(event) => handleSearch(event)}
						className="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
					/>
				</div>
        <div className="">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Id</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {listUsers.length > 0 ? (
                listUsers.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {index + 1}
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
                    className="px-6 py-4 text-center text-sm text-gray-500">
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
        pageClassName="text-white-700 hover:bg-sky-200 rounded-full w-8 h-8 flex items-center justify-center my-auto"
        activeClassName="bg-sky-400 text-white rounded-full"
      />
      <ModalAddUser
				isOpen={isModalAddOpen}
				onClose={handleCloseModal}
				onSubmit={handleSubmit}
				onCreateSuccess={() => getUsers(searchTerm, 1)}
			/>
      <ModelEditUser
        isOpen={isModalEditOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        dataUserEdit={dataUser}
        onEditSuccess={() => getUsers(searchTerm, currentPage)}
      />
      <ModalDeleteUser
        isOpen={isModelDeleteOpen}
        onClose={handleCloseModal}
        dataUser={dataUser}
        onDeleteSuccess={() => getUsers(searchTerm, currentPage)}
      />
    </>
  );
}
