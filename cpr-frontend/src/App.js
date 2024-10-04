import Home from './components/home/Home';
import Menu from './components/menu/Menu';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ClientRoute from './components/routes/ClientRoute';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientRoute children={<Home/>}  />} />
          <Route path="/menu" element={<ClientRoute children={<Menu/>} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
