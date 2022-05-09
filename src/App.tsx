import { NavLink, Routes, Route, Outlet } from "react-router-dom";

import NewOrder from "./Routes/NewOrder/NewOrder";
import Delivery from "./Routes/Delivery/Delivery";
import Cleaning from "./Routes/Cleaning/Cleaning";

import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="flex justify-center space-x-6 p-6">
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "")}
          to="/new-order"
        >
          New Order
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "")}
          to="/cleaning"
        >
          Cleaning
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "font-bold" : "")}
          to="/delivery"
        >
          Delivery
        </NavLink>
      </nav>

      <Outlet />
      <Routes>
        <Route path="/new-order" element={<NewOrder />} />
        <Route path="/cleaning" element={<Cleaning />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
    </div>
  );
}

export default App;
