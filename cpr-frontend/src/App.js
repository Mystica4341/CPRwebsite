// src/App.js
import Home from "./components/home/Home";
import Menu from "./components/menu/Menu";
import Cart from "./components/cart/Carts";
import AboutUs from "./components/AboutUs";
// Import thêm các thành phần admin
import UserTable from "./components/admin/UserTable";
import ItemsTable from "./components/admin/ItemsTable";
import CategoryTable from "./components/admin/CategoryTable";
import OrderTable from "./components/admin/OrderTable";
import SettingTable from "./components/admin/SettingTable";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ClientRoute from "./components/routes/ClientRoute";
import AdminRoute from "./components/routes/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<ClientRoute children={<Home />} />} />
          <Route path="/menu" element={<ClientRoute children={<Menu />} />} />
          <Route path="/cart" element={<ClientRoute children={<Cart />} />} />
          <Route
            path="/AboutUs"
            element={<ClientRoute children={<AboutUs />} />}
          />
          <Route path="/Login" element={<ClientRoute children={<Login />} />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Routes>
                  <Route path="UserTable" element={<UserTable />} />
                  <Route path="ItemsTable" element={<ItemsTable />} />
                  <Route path="CategoryTable" element={<CategoryTable />} />
                  <Route path="OrderTable" element={<OrderTable />} />
                  <Route path="SettingTable" element={<SettingTable />} />

                  <Route
                    path="/"
                    element={
                      <h1 className="text-2xl font-bold">
                        Welcome to Admin Dashboard
                      </h1>
                    }
                  />
                  {/* Trang mặc định cho admin */}
                </Routes>
              </AdminRoute>
            }
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
