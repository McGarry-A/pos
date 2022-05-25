import { NavLink, Routes, Route, Outlet } from "react-router-dom";

import NewOrder from "./Routes/NewOrder/NewOrder";
import Delivery from "./Routes/Delivery/Delivery";
import Cleaning from "./Routes/Cleaning/Cleaning";

import "./App.css";
import { useAppSelector } from "./Store";

function App() {
  const orders = useAppSelector((state) => state.orders);
  const { cleaning, deliver } = orders;

  const cleaningToDo = Object.keys(cleaning).length;
  const deliverToDo = Object.keys(deliver).length;

  return (
    <div className="App relative">
      <nav className="flex justify-center space-x-12 uppercase text-gray-700 tracking-wider py-12 font-light">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-green-600 transition-colors font-medium"
              : ""
          }
          to="/new-order"
        >
          New Order
        </NavLink>
        <div className="relative">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-green-600 transition-colors font-medium"
                : ""
            }
            to="/cleaning"
          >
            Cleaning
          </NavLink>
          {cleaningToDo > 0 && (
            <span className="text-xs rounded-full text-white bg-red-500 absolute top-0 -right-4 px-1">
              {" "}
              {cleaningToDo}
            </span>
          )}
        </div>

        <div className="relative">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-green-600 transition-colors font-medium"
                : ""
            }
            to="/delivery"
          >
            Delivery
          </NavLink>
          {deliverToDo > 0 && (
            <span className="text-xs rounded-full text-white bg-red-500 absolute top-0 -right-5 px-1">
              {deliverToDo}
            </span>
          )}
        </div>
      </nav>
      <div className="w-fit mx-auto">
        <Outlet />
        <Routes>
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/cleaning" element={<Cleaning />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
