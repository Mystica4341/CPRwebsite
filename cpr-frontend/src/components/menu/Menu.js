import { useState, useEffect, React} from 'react';
import ItemsList from '../Item';
import { getAllItems } from '../../services/ItemService';
import ReactPaginate from "react-paginate";
import MenuCategories from "../MenuCartegory"; 
import { useSearch } from "../../context/SearchContext";

export default function Home() {
  const [listItems, setListItems] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const { searchTerm, setSearchTerm } = useSearch();

  // Fetch items when the component is mounted or page/searchTerm changes
  useEffect(() => {
    getItems(searchTerm, currentPage, limit);
  }, [currentPage, searchTerm]);

  const getItems = async (searchTerm, page, limit) => {
    try {
      let res = await getAllItems(searchTerm, page, limit, "Active"); //Only show active Items
      if (res && res.data) {
        setListItems(res.data);
        setTotalPages(res.totalPages);
      }
    } catch (error) {
      console.log('Error with fetching items: ', error);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  const HandleClick = (event, name) => {
    console.log(name);
    setSearchTerm(name);
  }

  return (
    <div>
      <div>
        <MenuCategories/>
        {/* Body */}
        <div className='grid grid-cols-4 gap-4 p-4'>
        {listItems && listItems.length > 0 ? (
            listItems.map((item, index) => (
              <ItemsList key={index} {...item} />
            ))
          ): (
            <tr>
              <td colSpan={4} className='px-6 py-4 text-center text-md'>No items found</td>
            </tr>
          )}
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
     containerClassName="flex justify-center mt-4 space-x-2 pb-5"
     pageClassName="text-white-700 hover:bg-red-400 rounded-full w-8 h-8 flex items-center justify-center"
     activeClassName="bg-red-500 text-white rounded-full"
   />
    </div>
  );
  
}



