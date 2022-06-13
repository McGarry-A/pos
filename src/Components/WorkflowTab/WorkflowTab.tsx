import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";
import { useAppSelector } from "../../Store";

type Workflow = "NewOrder" | "Cleaning" | "Delivery";

interface Props {
  tab: Workflow;
  activeTab: Workflow;
  setState: Dispatch<SetStateAction<Workflow>>;
  Icon: IconType;
}

const WorkflowTab: React.FC<Props> = ({ tab, activeTab, setState, Icon }) => {
  const isActive = activeTab === tab ? true : false;
  const orders = useAppSelector((state) => state.orders);

  const { cleaning, deliver } = orders;

  const cleaningToDo = Object.keys(cleaning).length;
  const deliverToDo = Object.keys(deliver).length;

  return (
    <button
      className={`flex items-center py-2 border px-4 rounded-lg shadow-md transition duration-150 ${
        isActive ? "bg-blue-800" : "bg-white"
      }`}
      onClick={() => setState(tab)}
    >
      <div className="p-2 mr-2 bg-gray-100 rounded-xl shadow-sm">
        <Icon size="2rem" className={`${isActive ? "text-blue-800" : ""}`} />
      </div>
      <div className={`${isActive ? "text-gray-50" : "text-gray-800"}`}>
        <p className="text-lg text-left">{tab}</p>
        <p className={`text-left text-xs ${isActive ? "text-gray-100" : ""}`}>
          {tab === "Cleaning" && <>{cleaningToDo} items to clean</>}
        </p>
        <p className={`text-left text-xs ${isActive ? "text-gray-100" : ""}`}>
          {tab === "Delivery" && <>{deliverToDo} items to deliver</>}
        </p>
      </div>
    </button>
  );
};

export default WorkflowTab;
