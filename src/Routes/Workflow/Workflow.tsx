import { useState } from "react";
import { useAppSelector } from "../../Store";

import NewOrder from "../../Components/NewOrder/NewOrder";

import WorkflowOrders from "../../Components/WorkflowOrders/WorkflowOrders";

const Workflow = () => {
  type Workflow = "NewOrder" | "Cleaning" | "Delivery";

  const orders = useAppSelector((state) => state.orders);
  const { cleaning, deliver } = orders;

  // Use this to create the bubbles that show
  // how many orders are in this section

  const cleaningToDo = Object.keys(cleaning).length;
  const deliverToDo = Object.keys(deliver).length;

  const [activeTab, setActiveTab] = useState<Workflow>("NewOrder");

  const deliverOrders = useAppSelector((state) => state.orders.deliver);
  const cleaningOrders = useAppSelector((state) => state.orders.cleaning);

  const tabClass = "";
  const activeTabClass =
    "border-b-2 border-green-600 transition-colors font-medium";

  const renderNewOrderTab = () => {
    if (activeTab === "NewOrder") {
      return <NewOrder />;
    }
  };
  const renderCleaningTab = () => {
    if (activeTab === "Cleaning") {
      return <WorkflowOrders current="cleaning" data={cleaningOrders} />;
    }
  };

  const renderDeliveryTab = () => {
    if (activeTab === "Delivery") {
      return <WorkflowOrders current="cleaning" data={deliverOrders} />;
    }
  };

  const renderNav = () => {
    return (
      <nav className="flex justify-center space-x-12 py-12">
        <button>
          <h3
            onClick={() => setActiveTab("NewOrder")}
            className={
              activeTab === "NewOrder" ? `${activeTabClass}` : `${tabClass}`
            }
          >
            New Order
          </h3>
        </button>
        <button className="relative">
          <h3
            onClick={() => setActiveTab("Cleaning")}
            className={
              activeTab === "Cleaning" ? `${activeTabClass}` : `${tabClass}`
            }
          >
            Cleaning
          </h3>
          {cleaningToDo > 0 && (
            <span className="text-xs rounded-full text-white bg-red-500 absolute top-0 -right-4 px-1">
              {" "}
              {cleaningToDo}
            </span>
          )}
        </button>
        <button className="relative">
          <h3
            onClick={() => setActiveTab("Delivery")}
            className={
              activeTab === "Delivery" ? `${activeTabClass}` : `${tabClass}`
            }
          >
            Delivery
          </h3>

          {deliverToDo > 0 && (
            <span className="text-xs rounded-full text-white bg-red-500 absolute top-0 -right-4 px-1">
              {deliverToDo}
            </span>
          )}
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
