import { Link } from "react-router-dom";
import { BasketItemInterface } from "../../Context";
import { useAppDispatch } from "../../Store";
import orderSlice from "../../Store/orderSlice";
import { OrderInterface, PaymentType } from "../OrderInterface";
import { TiTick } from "react-icons/ti";
import useIsMobile from "../../Hooks/useIsMobile";

interface Props {
  data: OrderInterface;
  current: "cleaning" | "delivery";
}

const OrderTable: React.FC<Props> = ({ data, current }) => {
  const dispatch = useAppDispatch();
  const {
    actions: { process },
  } = orderSlice;

  const isMobile = useIsMobile();

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

  const renderPaymentBadge = (paymentMethod: PaymentType) => {
    if (paymentMethod === "credit") {
      return (
        <span className="px-3 w-full py-1 rounded text-white bg-red-600">
          Unpaid
        </span>
      );
    }

    return (
      <span className="px-3 w-full py-1 rounded text-white bg-green-600">
        Paid
      </span>
    );
  };

  const renderTable = () => {
    return (
      <table className="hidden md:block">
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
            const {
              orderId,
              orderNotes,
              items,
              paymentInfo: { payment, date, time },
              customer: { firstName, lastName },
            } = el;

            return (
              <tr
                key={index}
                className={`h-fit min-h-12 hover:bg-gray-100 ${
                  index % 2 !== 0 && `bg-gray-100 hover:bg-gray-200`
                }`}
              >
                <td className="p-3 text-sm text-gray-700">{date}</td>
                <td className="p-3 text-sm text-gray-700">{time}</td>
                <td className="p-3 text-sm text-gray-700">{`${firstName} ${lastName}`}</td>
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
                  {renderPaymentBadge(payment)}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <button
                    className="px-4 py-1"
                    onClick={() => handleProcess(orderId, current)}
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

  const renderOrderCard = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
        {Object.values(data).map((el, index) => {
          const {
            orderId,
            orderNotes,
            paymentInfo: { payment, date, time },
            customer: { firstName, lastName },
          } = el;

          return (
            <div
              key={index}
              className="grid grid-cols-2 border-2 p-3 m-3 rounded max-w-lg"
            >
              <div className="grid grid-cols-2 col-span-2 justify-between gap-y-3">
                <span className="text-xs opacity-50">{orderId}</span>
                <div className="text-right">{renderPaymentBadge(payment)}</div>
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
                  onClick={() => handleProcess(orderId, current)}
                >
                  <TiTick className="ml-auto" size={"1.3rem"} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section>
      {Object.keys(data).length < 1 ? (
        renderNoOrders()
      ) : (
        <>{isMobile ? renderOrderCard() : renderTable()}</>
      )}
    </section>
  );
};

export default OrderTable;
