import { useAppDispatch } from "../../Store";
import orderSlice from "../../Store/orderSlice";
import { OrderInterface } from "../OrderInterface";

interface Props {
  data: OrderInterface;
}

interface ProcessInterface {
  orderId: string;
  current: "cleaning" | "delivery";
}

const OrderTable: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const {
    actions: { process },
  } = orderSlice;

  const handleProcess = (orderId: string, current: "cleaning" | "delivery") => {
    dispatch(process({ orderId, current }));
  };

  return (
    <table>
      <thead>
        <tr>
          <td>date</td>
          <td>time</td>
          <td>customer</td>
          <td>items</td>
          <td>Total Price</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {Object.values(data).map((el, index) => {
          return (
            <tr key={index}>
              <td>{el.paymentInfo.date}</td>
              <td>{el.paymentInfo.time}</td>
              <td>{`${el.customer.firstName} ${el.customer.lastName}`}</td>
              <td>
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
              <td></td>
              <td>
                <button
                  className="border bg-green-600 text-white px-4 py-1"
                  onClick={() => handleProcess(el.orderId, "cleaning")}
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
