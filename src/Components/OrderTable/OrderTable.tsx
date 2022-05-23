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

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="uppercase text-gray-700 bg-slate-50 py-2">
        <tr className="">
          <td>Date</td>
          <td>Time</td>
          <td>Customer</td>
          <td>Items</td>
          <td>Total Price</td>
          <td></td>
        </tr>
      </thead>
      <tbody className="p-4 font-light text-gray-600">
        {Object.values(data).map((el, index) => {
          return (
            <tr
              key={index}
              className={`py-2 ${index % 2 !== 0 && `bg-slate-50`}`}
            >
              <td className="">{el.paymentInfo.date}</td>
              <td className="">{el.paymentInfo.time}</td>
              <td className="">{`${el.customer.firstName} ${el.customer.lastName}`}</td>
              <td className="">
                <div>
                  {Object.values(el.items).map((item, index) => {
                    return (
                      <p key={index}>
                        x{item.quantity} {item.title}
                      </p>
                    );
                  })}
                </div>
              </td>
              <td className="">£{calculateTotal(el.items)}</td>
              <td className="">
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

export default OrderTable;
