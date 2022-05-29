import { TiTick } from "react-icons/ti";
import { BasketItemInterface } from "../../Context";
import { useAppDispatch } from "../../Store";
import orderSlice from "../../Store/orderSlice";
import { OrderInterface } from "../OrderInterface";

interface Props {
  handleClick: (
    orderId: string,
    current: "cleaning" | "delivery" | "done"
  ) => void;
  data: OrderInterface;
  showCurrent: boolean;
}

const OrderTable: React.FC<Props> = ({ handleClick, data, showCurrent }) => {
  const dispatch = useAppDispatch();

  const {
    actions: { markAsPaid },
  } = orderSlice;

  const calculateTotal = (items: BasketItemInterface): number => {
    const priceArray = Object.values(items).map(
      (item) => item.price * item.quantity
    );
    return Number(priceArray.reduce((prev, cur) => prev + cur).toFixed(2));
  };

  const renderTableHead = () => {
    return (
      <thead className="bg-gray-100 border-b-2 border-gray-200">
        <tr className="">
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            Order ID
          </th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            Date
          </th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            Time
          </th>
          {showCurrent && (
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Section
            </th>
          )}
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            Customer
          </th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            Order Notes
          </th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            Items
          </th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            Total Price
          </th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">
            Paid
          </th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody className="p-4 font-light text-gray-600">
        {Object.values(data).map((el, index) => {
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
              className={`h-fit min-h-12 hover:bg-gray-100 ${
                index % 2 !== 0 && `bg-gray-100 hover:bg-gray-200`
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
                <div>
                  {Object.values(el.items).map((item, index) => {
                    const { title, quantity } = item;
                    return (
                      <p key={index} className="">
                        <span className="text-xs">x{quantity}</span> {title}
                      </p>
                    );
                  })}
                </div>
              </td>
              <td className="p-3 text-sm text-gray-700">
                £{calculateTotal(items)}
              </td>
              <td className="p-3 text-sm text-gray-700">
                {payment === "credit" ? (
                  <span
                    className={`px-3 w-full py-1 rounded text-white bg-red-600 ${
                      current ? "cursor-pointer" : "cursor-error"
                    }`}
                    onClick={() =>
                      current && dispatch(markAsPaid({ current, orderId }))
                    }
                  >
                    Unpaid
                  </span>
                ) : (
                  <span className="px-3 w-full py-1 rounded text-white bg-green-600">
                    Paid
                  </span>
                )}
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
        })}
      </tbody>
    );
  };
  return (
    <table className="hidden md:block">
      {renderTableHead()}
      {renderTableBody()}
    </table>
  );
};

export default OrderTable;
