import useIsMobile from "../../Hooks/useIsMobile";
import { OrderBody } from "../OrderInterface";

import { TiTick } from "react-icons/ti";

interface Props {
  handleClick: (orderId: string, current: "cleaning" | "delivery") => void;
  data: OrderBody;
  current: "cleaning" | "delivery";
}

const OrderCard: React.FC<Props> = ({ handleClick, data, current }) => {
  const {
    orderId,
    orderNotes,
    items,
    paymentInfo: { payment, date, time },
    customer: { firstName, lastName },
  } = data;

  return (
    <div className="grid grid-cols-2 border-2 p-3 m-3 rounded max-w-lg">
      <div className="grid grid-cols-2 col-span-2 justify-between gap-y-3">
        <span className="text-xs opacity-50">{orderId}</span>
        <div className="text-right">
          {payment === "credit" ? (
            <span className="px-3 w-full py-1 rounded text-white bg-red-600">
              Unpaid
            </span>
          ) : (
            <span className="px-3 w-full py-1 rounded text-white bg-green-600">
              Paid
            </span>
          )}
        </div>
        <div className="text-gray-700 text-lg col-span-2">
          {firstName} {lastName}
        </div>
        <div className="text-gray-500 col-span-2">
          <p className="text-sm">{orderNotes}</p>
        </div>
        <div className="flex space-x-2">
          <div className="text-gray-600 text-sm font-light">{date}</div>
          <div className="text-gray-600 text-sm font-light">{time}</div>
        </div>
        <div
          className="justify-end cursor-pointer"
          onClick={() => handleClick(orderId, current)}
        >
          <TiTick className="ml-auto" size={"1.3rem"} />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
