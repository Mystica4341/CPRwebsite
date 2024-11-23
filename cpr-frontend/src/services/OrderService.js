import axios from "./custom_axios";

const getAllOrders = async (searchTerm, page, limit) => {
  return await axios.get(
    `api/order?searchTerm=${searchTerm}&page=${page}&limit=${limit}`
  );
};

const getOrder = async (orderId) => {
  return await axios.get(`api/order/${orderId}`);
};

const addOrder = async (orderId, username, orderDate, items, total, status) => {
  return await axios.post("api/order", {
    orderId,
    username,
    orderDate,
    items,
    total,
    status,
  });
};

const updateOrder = async (
  orderId,
  username,
  orderDate,
  items,
  total,
  status
) => {
  return await axios.put(`api/order/${orderId}`, {
    orderId,
    username,
    orderDate,
    items,
    total,
    status,
  });
};

const deleteOrder = async (orderId) => {
  return await axios.delete(`api/order/${orderId}`);
};

export { getAllOrders, getOrder, addOrder, updateOrder, deleteOrder };
