import { useState } from "react";
import { useAppSelector } from "../../Store";

import { MdDeliveryDining, MdOutlineCleaningServices } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";

import NewOrder from "../../Components/NewOrder/NewOrder";

import WorkflowOrders from "../../Components/WorkflowOrders/WorkflowOrders";

const Workflow = () => {
  type Workflow = "NewOrder" | "Cleaning" | "Delivery";

  const orders = useAppSelector((state) => state.orders);
  const { cleaning, deliver } = orders;

  const cleaningToDo = Object.keys(cleaning).length;
  const deliverToDo = Object.keys(deliver).length;

  const [activeTab, setActiveTab] = useState<Workflow>("NewOrder");

  const deliverOrders = useAppSelector((state) => state.orders.deliver);
  const cleaningOrders = useAppSelector((state) => state.orders.cleaning);

  const renderNewOrderTab = () => {
    if (activeTab === "NewOrder") {
      return <NewOrder />;
    }
  };
  const renderCleaningTab = () => {
    if (activeTab === "Cleaning") {
      return <WorkflowOrders data={cleaningOrders} showCurrent={false} />;
    }
  };

  const renderDeliveryTab = () => {
    if (activeTab === "Delivery") {
      return <WorkflowOrders data={deliverOrders} showCurrent={false} />;
    }
  };

  const newOrderActive = activeTab === "NewOrder" ? true : false;
  const cleaningActive = activeTab === "Cleaning" ? true : false;
  const deliveryActive = activeTab === "Delivery" ? true : false;

  const renderNav = () => {
    return (
      <nav className="flex space-x-4 mt-12">
        <p className="text-black">{deliveryActive}</p>
        <button
          className={`flex items-center py-2 border px-4 rounded-lg shadow-md transition duration-150 ${
            newOrderActive ? "bg-blue-800" : "bg-white"
          }`}
          onClick={() => setActiveTab("NewOrder")}
        >
          <div className="p-2 mr-2 bg-gray-100 rounded-xl shadow-sm">
            <HiOutlinePencilAlt
              size="2rem"
              className={`${newOrderActive ? "text-blue-800" : ""}`}
            />
          </div>
          <div
            className={`${newOrderActive ? "text-gray-50" : "text-gray-800"}`}
          >
            <p className="text-lg">New Order</p>
          </div>
        </button>

        <button
          className={`flex items-center py-2 border px-4 rounded-lg shadow-md transition duration-150 ${
            cleaningActive ? "bg-blue-800" : "bg-gray-50"
          }`}
          onClick={() => setActiveTab("Cleaning")}
        >
          <div className="p-2 mr-2 bg-gray-100 rounded-xl shadow-sm">
            <MdOutlineCleaningServices
              size="2rem"
              className={`${cleaningActive ? "text-blue-800" : "bg-white"}`}
            />
          </div>
          <div
            className={`${cleaningActive ? "text-gray-50" : "text-gray-900"}`}
          >
            <p className="text-left text-lg">Cleaning</p>
            {cleaningToDo > 0 && (
              <p className="text-xs text-left opacity-70">
                {cleaningToDo} items in cleaning
              </p>
            )}
          </div>
        </button>

        <button
          className={`flex items-center py-2 border px-4 rounded-lg shadow-md transition duration-150 ${
            deliveryActive ? "bg-blue-800" : "bg-gray-50"
          }`}
          onClick={() => setActiveTab("Delivery")}
        >
          <div className="p-2 mr-2 bg-gray-100 rounded-xl shadow-sm">
            <MdDeliveryDining
              size="2rem"
              className={`${deliveryActive ? "text-blue-800" : "bg-white"}`}
            />
          </div>
          <div
            className={`${deliveryActive ? "text-gray-50" : "text-gray-900"}`}
          >
            <p className="text-left text-lg">Delivery</p>
            {deliverToDo > 0 && (
              <p className="text-xs text-left opacity-70">
                {deliverToDo} items in delivery
              </p>
            )}
          </div>
        </button>
      </nav>
    );
  };

  const renderMain = () => {
    return (
      <main>
        {renderNewOrderTab()}
        {renderCleaningTab()}
        {renderDeliveryTab()}
      </main>
    );
  };

  return (
    <div>
      {renderNav()}
      {renderMain()}
    </div>
  );
};

export default Workflow;
