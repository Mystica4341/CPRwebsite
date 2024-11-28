import { useState, useEffect, React } from "react";
import ItemsList from "../Item";
import { getAllItems } from "../../services/ItemService";
import ReactPaginate from "react-paginate";
import MenuCategories from "../MenuCartegory";
import { useSearch } from "../../context/SearchContext";

export default function Home() {
  const [listItems, setListItems] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Quản lý trạng thái popup
  const [selectedSortText, setSelectedSortText] = useState("Giá"); // Text đã chọn

  const { searchTerm, setSearchTerm } = useSearch();

  useEffect(() => {
    getItems(searchTerm, currentPage, limit);
  }, [currentPage, searchTerm]);

  const getItems = async (searchTerm, page, limit) => {
    try {
      let res = await getAllItems(searchTerm, page, limit, "Active"); // Only show active items
      if (res && res.data) {
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

  const handleSortChange = (sortOrder, text) => {
    setSelectedSortText(text); // Cập nhật text đã chọn
    setIsPopupOpen(false); // Đóng popup
    // TODO: Gọi API hoặc thực hiện sắp xếp dữ liệu theo sortOrder
    listItems.sort((a, b) =>
      sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price
    );
  };

  return (
    <div>
      <MenuCategories />

      <div className="flex justify-between items-center pl-40">
        {/* Nút lọc giá */}
        <div
          className="relative"
          onMouseEnter={() => setIsPopupOpen(true)} // Hiển thị popup khi rê chuột
          onMouseLeave={() => setIsPopupOpen(false)} // Ẩn popup khi rê chuột ra ngoài
        >
          {/* Nút hiển thị giá trị đã chọn */}
          <button className="flex items-center justify-between border border-gray-300 rounded px-6 py-2 w-60 bg-white text-black hover:bg-gray-200">
            <span>{selectedSortText}</span>
            <img
              src="https://i.imgur.com/U80uWaY.png" // Icon xổ xuống
              alt="Dropdown"
              className="w-4 h-4"
            />
          </button>

          {/* Popup hiển thị */}
          {isPopupOpen && (
            <ul className="absolute left-0 top-full border border-gray-300 rounded bg-white shadow-md z-10">
              <li
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() =>
                  handleSortChange("lowToHigh", "Giá: Thấp đến Cao")
                }
              >
                Giá: Thấp đến Cao
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() =>
                  handleSortChange("highToLow", "Giá: Cao đến Thấp")
                }
              >
                Giá: Cao đến Thấp
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-4 gap-4 p-4">
        {listItems && listItems.length > 0 ? (
          listItems.map((item, index) => <ItemsList key={index} {...item} />)
        ) : (
          <tr>
            <td colSpan={4} className="px-6 py-4 text-center text-md">
              No items found
            </td>
          </tr>
        )}
      </div>

      <ReactPaginate
        previousLabel={<span className="text-gray-500">← Previous</span>}
        nextLabel={<span className="text-gray-500">Next →</span>}
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center mt-4 space-x-2 pb-5"
        pageClassName="text-white-700 hover:bg-red-400 rounded-full w-8 h-8 flex items-center justify-center"
        activeClassName="bg-red-500 text-white rounded-full"
      />
    </div>
  );
}
