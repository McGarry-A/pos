import { useAppDispatch } from "../../Store";
import useIsMobile from "../../Hooks/useIsMobile";
import {useNavigate} from "react-router-dom"

import orderSlice from "../../Store/orderSlice";

import { OrderInterface } from "../OrderInterface";

import OrderCard from "../OrderCard/OrderCard";
import OrderTable from "../OrderTable/OrderTable";

interface Props {
  data: OrderInterface;
  showCurrent: boolean;
}

const WorkflowOrders: React.FC<Props> = ({ data, showCurrent }) => {
  const dispatch = useAppDispatch();
  const {
    actions: { process },
  } = orderSlice;

  const isMobile = useIsMobile();
  const isOrders = Object.keys(data).length < 1 ? false : true;

  const handleProcess = (orderId: string) => {
    dispatch(process({ orderId }));
  };
  
  const navigate = useNavigate()
  const handleRefresh = () => {
    navigate(0)  
  }

  const renderNoOrders = () => {
    if (isOrders) return;

    return (
      <div className="text-gray-700 flex flex-col justify-center items-center space-y-4">
        <p className="text-xl">You have no orders!</p>
        <button
          onClick={() => handleRefresh()}
          className="block border bg-green-600 text-white text-bold px-4 py-2 hover:bg-green-500 hover:shadow-md active:scale-90 transition duration-150"
        >
          Create Order
        </button>
      </div>
    );
  };

  const renderOrderCards = () => {
    if (!isOrders || !isMobile) return;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {Object.values(data).map((el, index) => {
          return <OrderCard handleClick={handleProcess} data={el} key={index} />;
        })}
      </div>
    );
  };

  const renderTable = () => {
    if (!isOrders || isMobile) return;

    return <OrderTable handleClick={handleProcess} data={data} showCurrent={showCurrent} />;
  };

  return (
    <section>
      {renderNoOrders()}
      {renderOrderCards()}
      {renderTable()}
    </section>
  );
};

export default WorkflowOrders;
