import { Link } from "react-router-dom";
import { BasketItemInterface } from "../../Context";
import { useAppDispatch } from "../../Store";
import orderSlice from "../../Store/orderSlice";
import { OrderInterface } from "../OrderInterface";

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
    return priceArray.reduce((prev, cur) => prev + cur);
  };

  const renderNoOrders = () => {
    return (
      <div className="text-gray-700 flex flex-col justify-center items-center space-y-4">
        <p className="text-xl">You have no orders!</p>
        <Link
          to="/new-order"
          className="block border bg-green-600 text-white text-bold px-4 py-2 hover:bg-green-500 hover:shadow-md active:scale-90 transition duration-150"
        >
          Create Order
        </Link>
      </div>
    );
  };

  const renderTable = () => {
    return (
      <table className="text-sm text-left text-gray-500 border border-separate table-auto">
        <thead className="uppercase text-gray-700 bg-slate-50 py-2 h-12">
          <tr className="">
            <td className="">Date</td>
            <td className="">Time</td>
            <td className="">Customer</td>
            <td className="">Items</td>
            <td className="">Total Price</td>
            <td className=""></td>
          </tr>
        </thead>
        <tbody className="p-4 font-light text-gray-600">
          {Object.values(data).map((el, index) => {
            return (
              <tr
                key={index}
                className={`h-fit min-h-12 ${index % 2 !== 0 && `bg-slate-50`}`}
              >
                <td className="w-24">{el.paymentInfo.date}</td>
                <td className="w-24">{el.paymentInfo.time}</td>
                <td className="w-24 whitespace-nowrap">{`${el.customer.firstName} ${el.customer.lastName}`}</td>
                <td className="w-24">
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
                <td className="w-24 min-w-fit">£{calculateTotal(el.items)}</td>
                <td className="w-24 min-w-fit">
                  <button
                    className="border bg-green-600 text-white px-4 py-1"
                    onClick={() => handleProcess(el.orderId, current)}
                  >
                    Process
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
