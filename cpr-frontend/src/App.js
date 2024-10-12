// src/App.js
import Home from "./components/home/Home";
import Menu from "./components/menu/Menu";
import Cart from "./components/cart/Carts";
import AboutUs from "./components/AboutUs";
// import Sidebar from "./components/admin/Sidebar";
import UserTable from "./components/admin/UserTable";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext'; 
import ClientRoute from "./components/routes/ClientRoute";
import AdminRoute from "./components/routes/AdminRoute";
import { getAllUsers } from "./services/UserService";

function App() {
  return (
    <BrowserRouter>
     <CartProvider>
      <Routes>
        <Route path="/" element={<ClientRoute children={<Home />} />} />
        <Route path="/menu" element={<ClientRoute children={<Menu />} />} />
        <Route path="/cart" element={<ClientRoute children={<Cart />} />} />
        <Route path="/AboutUs" element={<ClientRoute children={<AboutUs />} />}/>
        <Route path="/Login" element={<ClientRoute children={<Login />} />} />


        {/* AdminRoute */}
        <Route path="/UserTable" element={<AdminRoute children={<UserTable />} />} />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
