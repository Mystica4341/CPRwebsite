// src/services/ItemService.js
import axios from "./custom_axios";

const getAllItems = async (searchTerm, page) => {
  return await axios.get(`api/item?searchTerm=${searchTerm}&page=${page}&limit=5`);
};

const getItem = async (itemId) => {
  return await axios.get(`api/item/${itemId}`);
};

const addItem = async (itemName, category, itemUrl, description, price, status) => {
  return await axios.post("api/item", { itemName, category, itemUrl, description, price, status });
};

const updateItem = async (itemId, itemName, category, itemUrl, description, price, status) => {
  return await axios.put(`api/item/${itemId}`, { itemName, category, itemUrl, description, price, status });
};

const deleteItem = async (itemId) => {
  return await axios.delete(`api/item/${itemId}`);
};

export { getAllItems, getItem, addItem, updateItem, deleteItem };
