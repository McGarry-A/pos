import { Routes, Route, Outlet } from "react-router-dom";

import Delivery from "./Components/Delivery/Delivery";
import Cleaning from "./Components/Cleaning/Cleaning";
import Search from "./Routes/Search/Search";
import Reports from "./Routes/Reports/Reports";
import Contact from "./Routes/Contact/Contact";
import Workflow from "./Routes/Workflow/Workflow";

import "./App.css";

function App() {
  return (
    <div className="App relative">
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
