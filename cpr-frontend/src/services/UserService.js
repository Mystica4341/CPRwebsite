import axios from "./custom_axios";

const getAllUsers = async () => {
  return await axios.get("api/user");
};

const getUser = async (username) => {
  return await axios.get(`api/user/${username}`);
};

//need to change from object to attribute in obj in order to understand
const addUser = async (user) => {
  return await axios.post("api/user", user);
};

//need to change from object to attribute in obj in order to understand
const updateUser = async (username, user) => {
  return await axios.put(`api/user/${username}`, user)
};

export { getAllUsers, getUser, addUser, updateUser };
