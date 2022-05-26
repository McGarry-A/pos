import { Routes, Route, Outlet } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";

import Delivery from "./Components/Delivery/Delivery";
import Cleaning from "./Components/Cleaning/Cleaning";
import Search from "./Routes/Search/Search";
import Reports from "./Routes/Reports/Reports";
import Contact from "./Routes/Contact/Contact";
import Workflow from "./Routes/Workflow/Workflow";

import "./App.css";
import { useState } from "react";

function App() {
  const [navIsOpen, setNavIsOpen] = useState<boolean>(true);

  return (
    <div className="App relative">
      <header className="py-4 px-6 flex text-gray-700 items-center justify-between">
        <div className="flex items-center">
          <h2 className="sm:block text-xl">BusinessLogo</h2>
        </div>
        <nav className="sm:block flex items-center">
          <ul className="hidden sm:flex list-none">
            <li>Workflow</li>
            <li>Customers</li>
            <li>Orders</li>
            <li>Contact</li>
          </ul>
          {navIsOpen && (
            <button>
              <GiHamburgerMenu size={"1.8rem"} color={""} />
            </button>
          )}
        </nav>
      </header>
      <div className="w-fit mx-auto">
        <Outlet />
        <Routes>
          <Route path="/" element={<Workflow />} />
          <Route path="/cleaning" element={<Cleaning />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/search" element={<Search />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
