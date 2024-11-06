import { useState, useEffect, React} from 'react';
import ItemsList from '../Item';
import { getAllItems } from '../../services/ItemService';
import ReactPaginate from "react-paginate";
import MenuCategories from "../MenuCartegory"; 
import { categories } from "../../data/data";

export default function Home() {
  const [listItems, setListItems] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch items when the component is mounted or page/searchTerm changes
  useEffect(() => {
    getItems(searchTerm, currentPage, limit);
  }, [currentPage, searchTerm]);

  const getItems = async (searchTerm, page, limit) => {
    try {
      let res = await getAllItems(searchTerm, page, limit);
      if (res) {
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
    if (name === "Tất Cả") {
      setSearchTerm('');
    } else {
      setSearchTerm(name);
    }
  }

  return (
    <div>
      <div>
      {/* <MenuCategories /> */}
      <div className="flex justify-center gap-4 py-4">
        {categories.map((category) => (
          <div className="flex flex-col items-center bg-red-100 rounded-lg p-4 hover:bg-red-600 hover:text-white" onClick={event => HandleClick(event, category.name)}>
            <img
              src={`assets/${category.id}.png`} // Dynamically load the image based on id
              alt={category.name}
              className="w-12 h-12 mb-2"/>
            <span className="text-sm font-bold">{category.name}</span>
          </div>
          ))}
        </div>
        {/* Body */}
        <div className='grid grid-cols-4 gap-4 p-4'>
          {listItems.map((item, index) => (
            <ItemsList key={index} {...item} />
          ))}
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



