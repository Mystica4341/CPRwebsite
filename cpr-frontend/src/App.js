// src/App.js
import Home from "./components/home/Home";
import Menu from "./components/menu/Menu";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientRoute from "./components/routes/ClientRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientRoute children={<Home />} />} />
        <Route path="/menu" element={<ClientRoute children={<Menu />} />} />
        <Route
          path="/AboutUs"
          element={<ClientRoute children={<AboutUs />} />}
        />
        <Route path="/Login" element={<ClientRoute children={<Login />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
