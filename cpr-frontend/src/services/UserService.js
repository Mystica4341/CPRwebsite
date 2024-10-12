import axios from "./custom_axios";

const getAllUsers = async () => {
  return await axios.get("api/users");
};

export { getAllUsers };