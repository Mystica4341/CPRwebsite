// src/services/ItemService.js
import axios from "./custom_axios";

const getAllItems = async (searchTerm, page) => {
  return await axios.get(`api/item?searchTerm=${searchTerm}&page=${page}&limit=5`);
};

const getItem = async (term) => {
  return await axios.get(`api/item/${term}`);
};

const addItem = async (itemName, category, itemUrl, description, price, status) => {
  return await axios.post("api/item", { itemName, category, itemUrl, description, price, status });
};

const updateItem = async ( itemName, category, itemUrl, description, price, status) => {
  return await axios.put(`api/item/${itemName}`, { itemName, category, itemUrl, description, price, status });
};

const deleteItem = async (itemName) => {
  return await axios.delete(`api/item/${itemName}`);
};

export { getAllItems, getItem, addItem, updateItem, deleteItem };
