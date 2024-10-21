// src/services/ItemService.js
import axios from "axios";

const API_URL = "http://your-api-url.com/api/items"; // Thay đổi URL thành API của bạn

export const getAllItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Giả sử API trả về dữ liệu trong response.data
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; // Để xử lý lỗi ở nơi gọi
  }
};
