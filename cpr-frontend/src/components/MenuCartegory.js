import {useState, React} from "react";
import { categories } from "../data/data";
import { useSearch } from "../context/SearchContext";

export default function MenuCategories() {
  const {searchTerm, setSearchTerm} = useSearch();

  const HandleClick = (event, name) => {
    setSearchTerm(name);
  }

  return (
    <div className="flex justify-center gap-4 py-4">
      {categories.map((category) => (
        <div className="flex flex-col items-center bg-red-100 rounded-lg p-4 hover:bg-red-600 hover:text-white" onClick={event => HandleClick(event, category.categoryTerm)}>
          <img
            src={`assets/${category.id}.png`} // Dynamically load the image based on id
            alt={category.name}
            className="w-12 h-12 mb-2"
          />
          <span className="text-sm font-bold">{category.name}</span>
        </div>
      ))}
    </div>
  );
}

