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
    <div className="mt-2 max-w-xl">
      <div className="">
        <p className="block text-gray-900">Delivery Options</p>
        <div className="flex space-x-3 my-2 w-full">
          <div
            className={`${
              delivery === "standard" ? "border-blue-900 border-2" : ""
            } bg-blue-600 bg-opacity-10 p-4 rounded-2xl text-blue-900 text-xs flex justify-center items-center flex-col w-24 cursor-pointer`}
            onClick={() => setDelivery("standard")}
          >
            <HiOutlineTruck
              size={"2rem"}
              className={`${
                delivery === "standard" ? "opacity-1" : "opacity-40"
              } text-blue-900 mb-1`}
            />
            <p
              className={` ${
                delivery === "standard" ? "opacity-1" : "opacity-40"
              } tracking-tighter font-bold}`}
            >
              Standard
            </p>
          </div>
          <div
            className={`${
              delivery === "premium" ? "border-blue-900 border-2" : ""
            } bg-blue-600 bg-opacity-10 p-4 rounded-2xl text-blue-900 text-xs flex justify-center items-center flex-col w-24 cursor-pointer`}
            onClick={() => setDelivery("premium")}
          >
            <SiExpress
              size={"2rem"}
              className={`${
                delivery === "premium" ? "opacity-1" : "opacity-40"
              } text-blue-900 mb-1`}
            />
            <p
              className={` ${
                delivery === "premium" ? "opacity-1" : "opacity-40"
              } tracking-tighter font-bold}`}
            >
              Premium
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <p className="block text-gray-900">Payment Method</p>
        <div className="flex space-x-3 my-2 w-full">
          <div
            className={`${
              payment === "cash" ? "border-blue-900 border-2" : ""
            } bg-blue-600 bg-opacity-10 p-4 rounded-2xl text-blue-900 text-xs flex justify-center items-center flex-col w-24 cursor-pointer`}
            onClick={() => setPayment("cash")}
          >
            <BsCash
              size={"2rem"}
              className={`${
                payment === "cash" ? "opacity-1" : "opacity-40"
              } text-blue-900 mb-1`}
            />
            <p
              className={` ${
                payment === "cash" ? "opacity-1" : "opacity-40"
              } tracking-tighter font-bold}`}
            >
              Cash
            </p>
          </div>
          <div
            className={`${
              payment === "card" ? "border-blue-900 border-2" : ""
            } bg-blue-600 bg-opacity-10 p-4 rounded-2xl text-blue-900 text-xs flex justify-center items-center flex-col w-24 cursor-pointer`}
            onClick={() => setPayment("card")}
          >
            <BsCreditCard2Back
              size={"2rem"}
              className={`${
                payment === "card" ? "opacity-1" : "opacity-40"
              } text-blue-900 mb-1`}
            />
            <p
              className={` ${
                payment === "card" ? "opacity-1" : "opacity-40"
              } tracking-tighter font-bold}`}
            >
              Debit Card
            </p>
          </div>
          <div
            className={`${
              payment === "credit" ? "border-blue-900 border-2" : ""
            } bg-blue-600 bg-opacity-10 p-4 rounded-2xl text-blue-900 text-xs flex justify-center items-center flex-col w-24 cursor-pointer`}
            onClick={() => setPayment("credit")}
          >
            <FaRegHandshake
              size={"2rem"}
              className={`${
                payment === "credit" ? "opacity-1" : "opacity-40"
              } text-blue-900 mb-1`}
            />
            <p
              className={` ${
                payment === "credit" ? "opacity-1" : "opacity-40"
              } tracking-tighter font-bold}`}
            >
              Cash
            </p>
          </div>
        </div>
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
        className="w-full py-3 rounded-lg mt-2 border-2 text-gray-900 text-sm shadow-md font-semibold antialiased"
        onClick={() => clearBasket()}
      >
        Clear Basket
      </button>
      <button
        className="w-full bg-blue-800 py-3 text-gray-100 rounded-lg my-2 shadow-md font-semibold antialiased"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default PaymentOptions;
