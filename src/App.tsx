import { Routes, Route, Outlet } from "react-router-dom";

import Customers from "./Routes/Customers/Customers";
import Orders from "./Routes/Orders/Orders";
import Workflow from "./Routes/Workflow/Workflow";

import "./App.css";

import Reports from "./Routes/Reports/Reports";
import Sidebar from "./Components/Sidebar/Sidebar";
import useIsMobile from "./Hooks/useIsMobile";

function App() {
  const isMobile = useIsMobile();

  return (
    <div
      className={`App relative max-w-[1420px] mx-auto bg-gray-50 min-h-screen overflow-hidden ${
        isMobile && "pb-20"
      }`}
    >
      <Sidebar />
      <div className="md:ml-36">
        <Outlet />
        <Routes>
          <Route path="/" element={<Workflow />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
