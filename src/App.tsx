import { NavLink, Routes, Route, Outlet } from "react-router-dom";

import NewOrder from "./Routes/NewOrder/NewOrder";
import Delivery from "./Routes/Delivery/Delivery";
import Cleaning from "./Routes/Cleaning/Cleaning";

import { GoPackage } from "react-icons/go";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";

import "./App.css";
import { useAppSelector } from "./Store";

function App() {
  const orders = useAppSelector((state) => state.orders);
  const { cleaning, deliver } = orders;

  const cleaningToDo = Object.keys(cleaning).length;
  const deliverToDo = Object.keys(deliver).length;

  return (
    <div className="App relative">
      <nav className="fixed left-0 h-full w-12 border flex flex-col justify-center items-center space-y-14">
        <GoPackage
          size={"1.5rem"}
          className="hover:scale-125 hover:border-r-4 hover:border-green-500 transition cursor-pointer w-10"
        />
        <HiOutlineDocumentReport
          size={"1.5rem"}
          className="hover:scale-125 hover:border-r-4 hover:border-green-500 transition cursor-pointer w-10"
        />
        <BsPerson
          size={"1.5rem"}
          className="hover:scale-125 hover:border-r-4 hover:border-green-500 transition cursor-pointer w-10"
        />
      </nav>

      <nav className="flex justify-center space-x-12 uppercase text-gray-700 tracking-wider my-12 font-light">
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
