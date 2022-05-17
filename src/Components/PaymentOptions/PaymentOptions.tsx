import { useState } from "react";
import useBasket from "../../Context/BasketProvider";
import getDateAndTime from "../../utils/getDateAndTime";

import { OrderInterface } from "../OrderInterface";

import { PaymentType, DeliveryType, orderIdType } from "../OrderInterface";

const PaymentOptions = () => {
  const [payment, setPayment] = useState<PaymentType>("cash");
  const [delivery, setDelivery] = useState<DeliveryType>("standard");

  const basketContext = useBasket();
  const {
    actions: { clearBasket },
  } = basketContext;

  const handleSubmit = () => {
    const { date, time } = getDateAndTime();
    const { basket, actions } = basketContext;
    const { items, orderNotes } = basket;

    const orderId: orderIdType = "amg-001";

    const order: OrderInterface = {
      orderId: {
        orderId,
        items,
        orderNotes,
        paymentInfo: { payment, delivery, date, time },
        customer: {
          firstName: "Ahmed",
          lastName: "McGarry",
          country: "UK",
          postcode: "PR55AY",
        },
      },
    };

    // Send to redux orders slice OR send to redux

    actions.clearBasket();
  };

  return (
    <div className="mt-2 max-w-xl">
      <div className="flex justify-between my-1">
        <label className="block font-medium text-gray-700">
          Delivery Options
        </label>
        <select
          className="text-sm border shadow-sm py-1 px-2 rounded"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setDelivery(e.target.value as DeliveryType)
          }
        >
          <option value={"standard"}>Standard Delivery (+2.99)</option>
          <option value={"premium"}>Next Day Delivery (+£5.99)</option>
        </select>
      </div>
      <div className="flex justify-between my-1">
        <label className="block font-medium text-gray-700">Payment type</label>
        <select
          className="text-sm border shadow-sm py-1 px-2 rounded"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPayment(e.target.value as PaymentType)
          }
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="credit">Credit</option>
        </select>
      </div>
      <button
        className="w-full uppercase tracking-widest bg-gray-400 p-2 text-white rounded font-bold mt-2"
        onClick={() => clearBasket()}
      >
        Clear Basket
      </button>
      <button
        className="w-full uppercase tracking-widest bg-green-600 p-2 text-white rounded font-bold my-1"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default PaymentOptions;
