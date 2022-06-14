import { useState } from "react";
import { useAppSelector } from "../../Store";

import { MdDeliveryDining, MdOutlineCleaningServices } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Logo from "../../icons/Logo.png";

import { FiFilter } from "react-icons/fi";

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
      return (
        <div className="mt-12 flex justify-center w-full">
          <WorkflowOrders data={cleaningOrders} showCurrent={false} />
        </div>
      );
    }
  };

  const renderDeliveryTab = () => {
    if (activeTab === "Delivery") {
      return (
        <div className="mt-12 flex justify-center">
          <WorkflowOrders data={deliverOrders} showCurrent={false} />
        </div>
      );
    }
  };

  const renderNav = () => {
    return (
      <nav className="flex space-x-6 mt-6 md:mt-12 pl-4 overflow-x-scroll">
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
      <div className="md:ml-4 md:mt-8 flex items-center justify-between p-4 md:px-0 bg-white md:bg-gray-50">
        <div className="md:w-2/5 w-full">
          <h1 className="text-2xl">WashClub</h1>
          <h3 className="opacity-50 italic ">Take em to the Cleanerz!</h3>
        </div>
        <div className="w-full flex justify-end md:hidden">
          <img
            src={Logo}
            alt="Cleaners Logo"
            className="w-1/2 justify-self-end"
          />
        </div>
        <div className="w-full hidden md:flex md:ml-12 flex-grow">
          <div className="flex items-center bg-white w-80 px-2 rounded border">
            <BiSearch size="1.3rem" />
            <input
              placeholder="This input does not do anything.."
              className="w-72 outline-none border-none text-sm"
            />
          </div>
          <button className="mx-2 py-1 px-3 rounded bg-white border active:scale-110">
            <FiFilter className="" />
          </button>
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
