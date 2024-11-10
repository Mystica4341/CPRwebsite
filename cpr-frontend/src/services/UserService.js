import axios from "./custom_axios";

const getAllUsers = async (searchTerm, page) => {
  return await axios.get(`api/user?searchTerm=${searchTerm}&page=${page}&limit=5`);
};

const getUser = async (username) => {
  return await axios.get(`api/user/${username}`);
};

//need to change from object to attribute in obj in order to understand
const addUser = async (username, email, phoneNumber, address, password, role, status) => {
  return await axios.post("api/user", {username, email, phoneNumber, address, password, role, status});
};

//need to change from object to attribute in obj in order to understand
const updateUser = async (username, email, phoneNumber, address, password, role, status) => {
  return await axios.put(`api/user/${username}`, {username, email, phoneNumber, address, password, role, status});
};

const deleteUser = async (username) => {
  return await axios.delete(`api/user/${username}`);
};

export { getAllUsers, getUser, addUser, updateUser, deleteUser };
