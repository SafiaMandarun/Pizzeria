import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./routes/Home";
import Menu from "./routes/Menu";
import Confirmation from "./routes/Confirmation";
import { Order } from "./routes/Order";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/:id/menu`} element={<Menu />} />
        <Route path={`/:id/order`} element={<Order />} />
        <Route path={`/:id/confirmation`} element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
