import axios from "axios";

const API_URL = "https://your-api-url.com/categories"; // Thay thế bằng URL API của bạn

// Hàm để lấy danh sách các category từ API
export const getAllCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Giả sử API trả về danh sách các category
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
