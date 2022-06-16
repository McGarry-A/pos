import { OrderBody } from "../OrderInterface";
import { GrFormNext } from "react-icons/gr";
import PaymentBadge from "../PaymentBadge/PaymentBadge";
import MarkAsPaidForm from "../MarkAsPaidForm/MarkAsPaidForm";
import { useState } from "react";

interface Props {
  handleClick: (orderId: string) => void;
  data: OrderBody;
}

const OrderCard: React.FC<Props> = ({ handleClick, data }) => {
  const {
    orderId,
    orderNotes,
    current,
    paymentInfo: { payment, date, time },
    customer: { name },
  } = data;

  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);

  const handleProcess = (orderId: string) => {
    handleClick(orderId);
  };

  return (
    <div
      className={`grid grid-cols-2 p-3 my-4 mx-auto w-full rounded max-w-sm shadow-sm border bg-white`}
    >
      <div className="grid grid-cols-2 col-span-2 justify-between gap-y-3">
        <div className="flex items-center">
          <span className="text-xs opacity-50">{orderId}</span>
          <span className="text-xs uppercare ml-4 opacity-50 uppercase">
            {current}
          </span>
          <span
            className={`rounded-full ${
              current === "cleaning" ? `bg-green-600` : `bg-blue-600`
            } w-2 h-2 ml-1 animate-pulse`}
          ></span>
        </div>
        <div className="text-right">
          <PaymentBadge
            payment={payment}
            setPortalIsHidden={setPortalIsHidden}
          />
          <MarkAsPaidForm
            current={current}
            orderId={orderId}
            portalIsHidden={portalIsHidden}
            setPortalIsHidden={setPortalIsHidden}
          />
        </div>
        <div className="text-gray-700 text-lg col-span-2 border-b-4 border-blue-500 w-max">
          {name}
        </div>
        <div className="text-gray-500 col-span-2">
          <p className="text-sm">{orderNotes}</p>
        </div>
        <div className="flex space-x-1 items-end">
          <div className="text-gray-600 text-xs font-light">{date} at</div>
          <div className="text-gray-600 text-xs font-light">{time}</div>
        </div>
        <div
          className="justify-end cursor-pointer"
          onClick={() => handleProcess(orderId)}
        >
          <GrFormNext
            className="ml-auto hover:scale-125 transition"
            size={"2rem"}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
