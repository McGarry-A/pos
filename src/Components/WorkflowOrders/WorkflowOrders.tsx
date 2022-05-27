import { Link } from "react-router-dom";
import { useAppDispatch } from "../../Store";
import orderSlice from "../../Store/orderSlice";
import { OrderInterface } from "../OrderInterface";
import useIsMobile from "../../Hooks/useIsMobile";
import OrderCard from "../OrderCard/OrderCard";
import OrderTable from "../OrderTable/OrderTable";

interface Props {
  data: OrderInterface;
  current: "cleaning" | "delivery";
}

const WorkflowOrders: React.FC<Props> = ({ data, current }) => {
  const dispatch = useAppDispatch();
  const {
    actions: { process },
  } = orderSlice;

  const isMobile = useIsMobile();
  const isOrders = Object.keys(data).length < 1 ? false : true;

  const handleProcess = (orderId: string, current: "cleaning" | "delivery") => {
    dispatch(process({ orderId, current }));
  };

  const renderNoOrders = () => {
    if (isOrders) return;

    return (
      <div className="text-gray-700 flex flex-col justify-center items-center space-y-4">
        <p className="text-xl">You have no orders!</p>
        <Link
          to="/"
          className="block border bg-green-600 text-white text-bold px-4 py-2 hover:bg-green-500 hover:shadow-md active:scale-90 transition duration-150"
        >
          Create Order
        </Link>
      </div>
    );
  };

  const renderOrderCards = () => {
    if (!isOrders || !isMobile) return;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
        {Object.values(data).map((el, index) => {
          return (
            <OrderCard
              handleClick={handleProcess}
              data={el}
              current={current}
            />
          );
        })}
      </div>
    );
  };

  const renderTable = () => {
    if (!isOrders || isMobile) return;

    return (
      <OrderTable handleClick={handleProcess} data={data} current={current} />
    );
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
