import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context, temporary memory
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

function useSearch() {
  return useContext(SearchContext);
}

export { SearchProvider, useSearch };