import axios from "./custom_axios";
// import axios from "axios";

const getAllUsers = async () => {
  return await axios.get("api/user");
};

export { getAllUsers };