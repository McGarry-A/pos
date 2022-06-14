import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { BasketItemInterface } from "../../Context";
import MarkAsPaidForm from "../MarkAsPaidForm/MarkAsPaidForm";
import { OrderBody, OrderInterface } from "../OrderInterface";
import PaymentBadge from "../PaymentBadge/PaymentBadge";

interface Props {
  handleClick: (
    orderId: string,
    current: "cleaning" | "delivery" | "done"
  ) => void;
  data: OrderInterface;
  showCurrent: boolean;
}

interface portalInterface {
  current: "cleaning" | "delivery" | "done";
  orderId: string;
}

const OrderTable: React.FC<Props> = ({ handleClick, data, showCurrent }) => {
  const [portalIsHidden, setPortalIsHidden] = useState<boolean>(false);
  const [portalProps, setPortalProps] = useState<portalInterface>();

  const calculateTotal = (items: BasketItemInterface): number => {
    const priceArray = Object.values(items).map(
      (item) => item.price * item.quantity
    );
    return Number(priceArray.reduce((prev, cur) => prev + cur).toFixed(2));
  };

  const renderTableHead = () => {
    return (
      <thead className="w-full">
        <tr className="text-xs uppercase">
          <th className="p-3 text-xs tracking-wide font-medium text-gray-400 text-left">
            Order ID
          </th>
          <th className="p-3 text-xs tracking-wide font-medium text-gray-400 text-left">
            Date
          </th>
          <th className="p-3 text-xs tracking-wide font-medium text-gray-400 text-left">
            Time
          </th>
          {showCurrent && (
            <th className="p-3 text-xs tracking-wide font-medium text-gray-400 text-left">
              Section
            </th>
          )}
          <th className="p-3 text-xs tracking-wide font-medium text-gray-400 text-left">
            Customer
          </th>
          <th className="p-3 text-xs tracking-wide font-medium text-gray-400 text-left">
            Order Notes
          </th>
          <th className="p-3 text-xs tracking-wide font-medium text-gray-400 text-left">
            Items
          </th>
          <th className="p-3 text-xs tracking-wide font-medium text-gray-400 text-left">
            Price
          </th>
          <th className="p-3 text-xs tracking-wide font-medium text-gray-400 text-left">
            Paid
          </th>
          <th className="p-3 text-xs tracking-wide font-medium text-gray-400 text-left"></th>
        </tr>
      </thead>
    );
  };

  const renderItems = (
    item: {
      id: string;
      title: string;
      price: number;
      quantity: number;
    },
    index: number
  ) => {
    const { title, quantity } = item;
    return (
      <p key={index} className="">
        <span className="text-xs">x{quantity}</span> {title}
      </p>
    );
  };

  const renderTableRow = (el: OrderBody, index: number) => {
    const {
      orderId,
      orderNotes,
      items,
      current,
      paymentInfo: { payment, date, time },
      customer: { name },
    } = el;

    return (
      <tr
        key={index}
        className={`h-fit min-h-12 hover:bg-gray-100 my-1 bg-white border ${
          index % 2 !== 0 && `bg-white`
        }`}
      >
        <td className="p-3 text-sm text-gray-700">{orderId}</td>
        <td className="p-3 text-sm text-gray-700">{date}</td>
        <td className="p-3 text-sm text-gray-700">{time}</td>
        {showCurrent && (
          <td className="p-3 text-sm text-gray-700">{current}</td>
        )}
        <td className="p-3 text-sm text-gray-700">{name}</td>
        <td className="p-3 text-sm text-gray-700">{`${orderNotes}`}</td>
        <td className="p-3 text-sm text-gray-700">
          {Object.values(el.items).map(renderItems)}
        </td>
        <td className="p-3 text-sm text-gray-700">£{calculateTotal(items)}</td>
        <td className="p-3 text-sm text-gray-700">
          <PaymentBadge
            payment={payment}
            setPortalIsHidden={setPortalIsHidden}
            setPortalProps={setPortalProps}
            orderId={orderId}
            current={current}
          />
        </td>
        <td className="p-3 text-sm text-gray-700">
          <button
            className="px-4 py-1"
            onClick={() => handleClick(orderId, current)}
          >
            <TiTick size={"1.3rem"} />
          </button>
        </td>
      </tr>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody className="p-4 font-light text-gray-600">
        {Object.values(data).map(renderTableRow)}
      </tbody>
    );
  };

  const renderMarkAsPaidForm = () => {
    if (portalProps) {
      return (
        <MarkAsPaidForm
          {...portalProps}
          portalIsHidden={portalIsHidden}
          setPortalIsHidden={setPortalIsHidden}
        />
      );
    }
  };

  return (
    <>
      <table className="hidden md:table md:bg-gray-50 md:w-full md:max-w-5xl md:ml-4">
        {renderTableHead()}
        {renderTableBody()}
      </table>
      {renderMarkAsPaidForm()}
    </>
  );
};

export default OrderTable;
