import { Link } from "react-router-dom";
import { BasketItemInterface } from "../../Context";
import { useAppDispatch } from "../../Store";
import orderSlice from "../../Store/orderSlice";
import { OrderInterface } from "../OrderInterface";
import { TiTick } from "react-icons/ti";

interface Props {
  data: OrderInterface;
  current: "cleaning" | "delivery";
}

const OrderTable: React.FC<Props> = ({ data, current }) => {
  const dispatch = useAppDispatch();
  const {
    actions: { process },
  } = orderSlice;

  const handleProcess = (orderId: string, current: "cleaning" | "delivery") => {
    dispatch(process({ orderId, current }));
  };

  const calculateTotal = (items: BasketItemInterface): number => {
    const priceArray = Object.values(items).map(
      (item) => item.price * item.quantity
    );
    return Number(priceArray.reduce((prev, cur) => prev + cur).toFixed(2));
  };

  const renderNoOrders = () => {
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

  const renderTable = () => {
    return (
      <table className="">
        <thead className="bg-gray-100 border-b-2 border-gray-200">
          <tr className="">
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Date
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Time
            </th>
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
        <tbody className="p-4 font-light text-gray-600">
          {Object.values(data).map((el, index) => {
            return (
              <tr
                key={index}
                className={`h-fit min-h-12 hover:bg-gray-100 ${
                  index % 2 !== 0 && `bg-gray-100 hover:bg-gray-200`
                }`}
              >
                <td className="p-3 text-sm text-gray-700">
                  {el.paymentInfo.date}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {el.paymentInfo.time}
                </td>
                <td className="p-3 text-sm text-gray-700">{`${el.customer.firstName} ${el.customer.lastName}`}</td>
                <td className="p-3 text-sm text-gray-700">{`${el.orderNotes}`}</td>
                <td className="p-3 text-sm text-gray-700">
                  <div>
                    {Object.values(el.items).map((item, index) => {
                      return (
                        <p key={index} className="">
                          <span className="text-xs">x{item.quantity}</span>{" "}
                          {item.title}
                        </p>
                      );
                    })}
                  </div>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  £{calculateTotal(el.items)}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {el.paymentInfo.payment === "credit" ? (
                    <span className="px-3 w-full py-1 rounded text-white bg-red-600">
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
                    onClick={() => handleProcess(el.orderId, current)}
                  >
                    <TiTick size={"1.3rem"} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return Object.keys(data).length < 1 ? renderNoOrders() : renderTable();
};

export default OrderTable;
