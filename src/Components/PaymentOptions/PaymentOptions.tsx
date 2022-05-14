import { useState } from "react";
import useBasket from "../../Context/BasketProvider";

const PaymentOptions = () => {
  type PaymentType = "cash" | "card" | "credit";
  type DeliveryType = "standard" | "premium";

  const [payment, setPayment] = useState<PaymentType>("cash");
  const [delivery, setDelivery] = useState<DeliveryType>("standard");

  const basketContext = useBasket();
  const {
    actions: { clearBasket },
  } = basketContext;

  const handleSubmit = () => {
    const { basket } = basketContext;
    const { actions } = basketContext

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const addAsOrder = {
      payment,
      delivery,
      date,
      time
    };
    
    const newOrder = {
      ...basket,
      ...addAsOrder,
    };

    actions.clearBasket()
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
