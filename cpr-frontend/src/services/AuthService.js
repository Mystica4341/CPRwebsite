import axios from "./custom_axios";

const login = async (username, password) => {
  return await axios.post("api/login", { username, password });
};