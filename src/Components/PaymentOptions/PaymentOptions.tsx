import { useEffect, useState } from "react";
import useId from "../../Hooks/useId";
import { useDispatch } from "react-redux";
import useBasket from "../../Context/BasketProvider";
import orderSlice from "../../Store/orderSlice";
import getDateAndTime from "../../utils/getDateAndTime";

import { BsCash, BsCreditCard2Back } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";

import { SiExpress } from "react-icons/si";
import { HiOutlineTruck } from "react-icons/hi";

import { OrderInterface } from "../OrderInterface";

import { PaymentType, DeliveryType } from "../OrderInterface";
import PaymentOption from "../PaymentOption/PaymentOption";

const PaymentOptions = () => {
  const [payment, setPayment] = useState<PaymentType>("cash");
  const [delivery, setDelivery] = useState<DeliveryType>("standard");
  const [error, setError] = useState<string>();

  const dispatch = useDispatch();
  const {
    actions: { create },
  } = orderSlice;

  const orderId = useId("sku-");
  const basketContext = useBasket();
  const {
    actions: { clearBasket },
    basket: { items },
    currentCustomer,
  } = basketContext;

  useEffect(() => {
    setError("");
  }, [currentCustomer, items]);

  const handleSubmit = () => {
    const { date, time } = getDateAndTime();
    const { basket, actions, currentCustomer, setCurrentCustomer, totalPrice } =
      basketContext;
    const { items, orderNotes } = basket;

    if (!currentCustomer) {
      setError("Please select a customer");
      return;
    }

    if (Object.keys(items).length === 0) {
      setError("Please add an item to your basket!");
      return;
    }

    const order: OrderInterface = {
      [orderId]: {
        orderId,
        items,
        totalPrice,
        orderNotes,
        current: "cleaning",
        paymentInfo: { payment, delivery, date, time },
        customer: {
          ...currentCustomer,
        },
      },
    };

    dispatch(create(order));

    actions.clearBasket();
    setCurrentCustomer(null);
  };

  const renderNote = () => {
    const {
      actions: { setOrderNote },
    } = basketContext;

    return (
      <div className="my-2">
        <p className="block text-gray-900">Order Notes</p>
        <input
          type="text"
          placeholder="No starch please!"
          className="my-1 border-2 block w-full rounded-md h-12 text-sm"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOrderNote(e.target.value)
          }
        />
      </div>
    );
  };

  return (
    <div className="mt-2 max-w-xl p-4 md:p-0">
      <p className="block text-gray-900">Delivery Options</p>
      <div className="flex space-x-3 my-2 w-full">
        <PaymentOption
          state={delivery}
          setState={setDelivery}
          Icon={HiOutlineTruck}
          current="standard"
          title="Standard"
        />
        <PaymentOption
          state={delivery}
          setState={setDelivery}
          Icon={SiExpress}
          current="premium"
          title="Premium"
        />
      </div>

      <p className="block text-gray-900">Payment Method</p>
      <div className="flex space-x-3 my-2 w-full">
        <PaymentOption
          state={payment}
          setState={setPayment}
          current={"cash"}
          Icon={BsCash}
          title="Cash"
        />
        <PaymentOption
          state={payment}
          setState={setPayment}
          current={"card"}
          Icon={BsCreditCard2Back}
          title="Card"
        />
        <PaymentOption
          state={payment}
          setState={setPayment}
          current={"credit"}
          Icon={FaRegHandshake}
          title="Credit"
        />
      </div>
      <p
        className={`${
          error ? "block" : "hidden"
        } text-xs text-red-500 font-bold text-center my-2`}
      >
        *{error}
      </p>
      {renderNote()}
      <button
        className="w-full py-3 rounded-lg mt-2 border text-gray-900 text-sm shadow"
        onClick={() => clearBasket()}
      >
        Clear Basket
      </button>
      <button
        className="w-full bg-blue-600 py-3 text-gray-100 rounded-lg my-2 shadow-md font-semibold hover:bg-blue-500"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default PaymentOptions;
