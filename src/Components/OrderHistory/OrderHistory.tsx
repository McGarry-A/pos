import { Dispatch, SetStateAction } from "react";
import { MdClear } from "react-icons/md";
import { useAppSelector } from "../../Store";
import { CustomerInterface } from "../CustomerInterface";
import WorkflowOrders from "../WorkflowOrders/WorkflowOrders";

interface Props {
  customer: CustomerInterface;
  setPortalIsHidden: Dispatch<SetStateAction<boolean>>;
}

const OrderHistory: React.FC<Props> = ({ customer, setPortalIsHidden }) => {
  const ordersWithSections = useAppSelector((state) => state.orders);
  const { cleaning, deliver, done } = ordersWithSections;
  const allOrders = { ...cleaning, ...deliver, ...done };

  const filteredOrders = Object.values(allOrders)
    .map((el) => {
      if (customer.orders.includes(el.orderId)) return el;
      else return null;
    })
    .filter((el) => el !== null);

  const ordersArray = filteredOrders.map((el) => {
    return { [el!.orderId as string]: { ...el } };
  });

  const orders = Object.assign({}, ...ordersArray);

  console.log(orders);

  return (
    <div className="bg-white max-w-md w-full p-3 md:max-w-xl shadow-md rounded relative space-y-4">
      <div
        className="absolute top-3 right-3 opacity-50 cursor-pointer"
        onClick={() => {
          console.log("clicked");
          setPortalIsHidden(false);
        }}
      >
        <MdClear size="1.3rem" />
      </div>
      <div className="border-b-4 border-blue-600 w-max">
        <h2 className="text-xl">{customer.name}'s Order History</h2>
      </div>
      {filteredOrders !== null && <WorkflowOrders data={orders} showCurrent />}
    </div>
  );
};

export default OrderHistory;
