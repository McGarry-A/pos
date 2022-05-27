import { Routes, Route, Outlet, NavLink } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";

import Customers from "./Routes/Customers/Customers";
import Orders from "./Routes/Orders/Orders";
import Contact from "./Routes/Contact/Contact";
import Workflow from "./Routes/Workflow/Workflow";

import "./App.css";
import { useState } from "react";

function App() {
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);

  const handleToggleNav = () => {
    setNavIsOpen(!navIsOpen);
    console.log(navIsOpen);
  };

  return (
    <div className="App relative max-w-[1920px] mx-auto">
      <header className="py-6 px-6 flex text-gray-700 items-center justify-between sm:space-x-16">
        <div className="flex items-center">
          <h2 className="sm:block text-2xl">BusinessLogo</h2>
        </div>
        <div className="hidden list-none sm:flex space-x-12 sm:items-center">
          <NavLink to="/">Workflow</NavLink>
          <NavLink to="/customers">Customers</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <nav className="flex items-center sm:flex-1">
          <button className="sm:hidden" onClick={handleToggleNav}>
            <GiHamburgerMenu size={"1.8rem"} color={""} />
          </button>
        </nav>
      </header>
      <div className="w-fit mx-auto">
        <Outlet />
        <Routes>
          <Route path="/" element={<Workflow />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
