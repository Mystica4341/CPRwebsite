// src/services/OrderService.js
import axios from "axios";

const API_URL = "http://your-api-url.com/api/orders"; // Thay đổi URL thành API của bạn

export const getAllOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Giả sử API trả về dữ liệu trong response.data
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Để xử lý lỗi ở nơi gọi
  }
};
