import { useEffect, useState } from "react";
import useId from "../../Hooks/useId";
import { useDispatch } from "react-redux";
import useBasket from "../../Context/BasketProvider";
import orderSlice from "../../Store/orderSlice";
import getDateAndTime from "../../utils/getDateAndTime";
import { MdStickyNote2 } from "react-icons/md";

import { OrderInterface } from "../OrderInterface";

import { PaymentType, DeliveryType } from "../OrderInterface";
import PaymentOption from "../PaymentOption/PaymentOption";
import data from "./PaymentOptionData";

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
    basket: { items },
    currentCustomer,
  } = basketContext;

  useEffect(() => {
    setError("");
  }, [currentCustomer, items]);

  useEffect(() => {
    const handleChangeDelivery = () => {
      const {
        actions: { changeDelivery },
      } = basketContext;

      changeDelivery(delivery);
    };

    handleChangeDelivery();
  }, [delivery, basketContext]);

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
        delivery,
        totalPrice,
        orderNotes,
        current: "cleaning",
        paymentInfo: { payment, date, time },
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
      <div className="mt-4">
        <div className="flex items-center border h-10 rounded p-1">
          <MdStickyNote2 className="opacity-50" size="2rem" />
          <input
            type="text"
            placeholder="Enter order preferences here!"
            className="border-none block w-full text-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOrderNote(e.target.value)
            }
          />
        </div>
      </div>
    );
  };

  const renderDeliveryOptions = () => {
    return (
      <>
        <p className="block text-gray-900 text-sm my-1">Delivery</p>
        <div className="flex space-x-3 my-2 w-full">
          {data.delivery.map((el, index) => {
            return (
              <PaymentOption
                {...el}
                key={index}
                state={delivery}
                setState={setDelivery}
              />
            );
          })}
        </div>
      </>
    );
  };

  const renderPaymentOptions = () => {
    return (
      <>
        <p className="block text-gray-900 text-sm my-1">Payment</p>
        <div className="flex space-x-3 my-2 w-full">
          {data.payments.map((el, index) => {
            return (
              <PaymentOption
                {...el}
                key={index}
                state={payment}
                setState={setPayment}
              />
            );
          })}
        </div>
      </>
    );
  };

  const renderButtons = () => {
    return (
      <>
        <button
          className="w-full bg-blue-600 py-3 text-gray-100 rounded my-2 shadow hover:bg-blue-500"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </>
    );
  };

  const renderError = () => {
    return (
      <p
        className={`${
          error ? "block" : "hidden"
        } text-xs text-red-500 font-bold text-center my-2`}
      >
        *{error}
      </p>
    );
  };

  return (
    <div className="max-w-xl px-5 md:p-0">
      {renderDeliveryOptions()}
      {renderPaymentOptions()}
      {renderError()}
      {renderNote()}
      {renderButtons()}
    </div>
  );
};

export default PaymentOptions;
