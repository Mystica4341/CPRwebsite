import React, { createContext, useState, useContext } from 'react';

// Tạo Context, bộ nhớ tạm
const CartContext = createContext();

// Provider để bọc các component cần dùng cart
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Hàm để thêm sản phẩm vào giỏ
// Hàm để thêm sản phẩm vào giỏ
const addToCart = (item) => {
  setCartItems((prevItems) => {
    // Kiểm tra sản phẩm đã có trong giỏ theo itemName thay vì id
    const itemExists = prevItems.find((i) => i.itemName === item.itemName);
    if (itemExists) {
      // Nếu sản phẩm đã tồn tại trong giỏ, tăng số lượng
      return prevItems.map((i) =>
        i.itemName === item.itemName ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      // Nếu sản phẩm chưa có, thêm vào với quantity = 1
      return [...prevItems, { ...item, quantity: 1 }];
    }
  });
};


  // Hàm để lấy số lượng sản phẩm
  const getCartQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Cung cấp context cho các component
  return (
    <CartContext.Provider value={{ cartItems, addToCart, getCartQuantity, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook để sử dụng cart trong các component
export function useCart() {
  return useContext(CartContext);
}
