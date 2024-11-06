import { useState, useEffect, React} from 'react';
import Banner from '../Banner';
import NavigationBar from '../Navigator';
import ItemsList from '../Item';
import ReactPaginate from "react-paginate";
import { getAllItems } from '../../services/ItemService';

export default function Home() {
  const [listItems, setListItems] = useState([]);
  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
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

  return (
    <div>
      <div>
        <Banner />
        <NavigationBar />
        <div className='grid grid-cols-4 gap-4 p-4'>
          {listItems.map((item, index) => (
            <ItemsList key={index} {...item} />
          ))}
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
      </div>
    
  );
}
