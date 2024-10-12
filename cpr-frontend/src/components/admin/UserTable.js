import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

export default function UserTable() {
    const [listUsers, setListUsers] = useState([
        { Id: 1, Name: "John Doe", Email: "john@example.com", Status: 1 },
        { Id: 2, Name: "Jane Smith", Email: "jane@example.com", Status: 0 }
    ]); // Mock Data for Users
    const [totalPages, setTotalPages] = useState(2); // Example of total pages
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // No backend call, just update the list from mock data
    }, [currentPage]);

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
    };

    const handleEditUser = (user) => {
        console.log("Edit user: ", user); // Mock Edit
    };

    const handleDeleteUser = (user) => {
        console.log("Delete user: ", user); // Mock Delete
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
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Id</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers.length > 0 ? (
                                listUsers.map((item) => (
                                    <tr key={item.Id} className="border-t border-gray-200">
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.Id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{item.Name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{item.Email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{item.Status === 1 ? "Active" : "Inactive"}</td>
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
                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
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
