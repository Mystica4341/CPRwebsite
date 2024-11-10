import axios from "./custom_axios";

const login = async (account, password) => {
  return await axios.post("api/login", { account, password });
};

export default { login };