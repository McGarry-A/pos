import { useState } from "react";
import { useAppSelector } from "../../Store";

import { MdDeliveryDining, MdOutlineCleaningServices } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import NewOrder from "../../Components/NewOrder/NewOrder";

import WorkflowOrders from "../../Components/WorkflowOrders/WorkflowOrders";
import WorkflowTab from "../../Components/WorkflowTab/WorkflowTab";

const Workflow = () => {
  type Workflow = "NewOrder" | "Cleaning" | "Delivery";

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

  const renderNav = () => {
    return (
      <nav className="flex space-x-4 mt-12 pl-4">
        <WorkflowTab
          tab={"NewOrder"}
          activeTab={activeTab}
          setState={setActiveTab}
          Icon={HiOutlinePencilAlt}
        />
        <WorkflowTab
          tab="Cleaning"
          activeTab={activeTab}
          setState={setActiveTab}
          Icon={MdOutlineCleaningServices}
        />
        <WorkflowTab
          tab="Delivery"
          activeTab={activeTab}
          setState={setActiveTab}
          Icon={MdDeliveryDining}
        />
      </nav>
    );
  };

  const renderHeader = () => {
    return (
      <div className="ml-4 mt-8 flex">
        <div className="w-3/5">
          <h1 className="text-2xl">The Cleanerz</h1>
          <h3 className="opacity-50 italic ">Take em to the Cleanerz!</h3>
        </div>
        <div className="w-full">
          <div className="flex items-center bg-white w-80 px-2 rounded shadow">
            <BiSearch size="2rem" />
            <input
              placeholder="This input does not do anything.."
              className="w-72 outline-none border-none"
            />
          </div>
        </div>
      </div>
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
      {renderHeader()}
      {renderNav()}
      {renderMain()}
    </div>
  );
};

export default Workflow;
