import { FormEvent, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { OrderInterface, PaymentType } from "../../Components/OrderInterface";
import WorkflowOrders from "../../Components/WorkflowOrders/WorkflowOrders";
import useFormField from "../../Hooks/useFormField";
import { useAppSelector } from "../../Store";
import { Link } from "react-router-dom";

type sectionType = "cleaning" | "delivery" | "done" | null;

const Orders = () => {
  const ordersWithSections = useAppSelector((state) => state.orders);
  const { cleaning, deliver, done } = ordersWithSections;
  const orders = { ...cleaning, ...deliver, ...done };

  const [allOrdersState, setAllOrdersState] = useState<OrderInterface>(orders);
  const [filteredOrders, setFilteredOrders] = useState<OrderInterface | null>(
    null
  );

  const nameField = useFormField();
  const orderIdField = useFormField();
  const [paymentFilter, setPaymentFilter] = useState<PaymentType | null>(null);
  const [sectionFilter, setSectionFilter] = useState<sectionType | null>(null);

  useEffect(() => {
    setAllOrdersState(orders);
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameField.value;
    const orderId = orderIdField.value;

    const queries = [
      { query: name, action: "FILTER_NAME" },
      { query: orderId, action: "FILTER_ORDERID" },
      { query: paymentFilter, action: "FILTER_PAID" },
      { query: sectionFilter, action: "FILTER_SECTION" },
    ]
      .filter((el) => el.query !== null)
      .filter((el) => el.query!.length > 2);

    const filterOrders = () => {
      console.log(queries.length);
      if (!allOrdersState) return;
      if (queries.length === 0) return setFilteredOrders(null);
      let allOrders = {};

      queries.forEach((el) => {
        const { query, action } = el;

        switch (action) {
          case "FILTER_NAME":
            const matchingNames = Object.values(
              Object.keys(allOrders).length === 0 ? allOrdersState : allOrders
            ).filter((el) => el.customer.name.includes(query!));
            const matchingNamesArray = matchingNames.map((el) => {
              return [[el.orderId], el];
            });
            allOrders = {
              ...Object.fromEntries(matchingNamesArray),
              ...allOrders,
            };
            break;
          case "FILTER_ORDERID":
            const matchingOrderIds = Object.values(
              Object.keys(allOrders).length === 0 ? allOrdersState : allOrders
            ).filter((el) => el.orderId.includes(query!));
            const matchingOrderIdsArray = matchingOrderIds.map((el) => {
              return [[el.orderId], el];
            });
            allOrders = {
              ...Object.fromEntries(matchingOrderIdsArray),
            };
            break;
          case "FILTER_PAID":
            const matchingPaid = Object.values(
              Object.keys(allOrders).length === 0 ? allOrdersState : allOrders
            ).filter((el) => el.paymentInfo.payment === query);
            const matchingPaidArray = matchingPaid.map((el) => {
              return [[el.orderId], el];
            });
            allOrders = {
              ...Object.fromEntries(matchingPaidArray),
            };
            break;
          case "FILTER_SECTION":
            const matchingSections = Object.values(
              Object.keys(allOrders).length === 0 ? allOrdersState : allOrders
            ).filter((el) => el.current === query);
            const matchingSectionsArray = matchingSections.map((el) => [
              [el.orderId],
              el,
            ]);
            allOrders = {
              ...Object.fromEntries(matchingSectionsArray),
            };
            break;
          default:
            break;
        }
      });

      setFilteredOrders(allOrders);
    };

    filterOrders();
  };
  return (
    <div>
      <div className="space-y-2 px-4 py-2 mt-8">
        <h2 className="text-2xl text-gray-800 mt-4">Order Search</h2>
      </div>
      <form onSubmit={(e) => handleFormSubmit(e)} className="my-6 px-4 mx-auto">
        <div className="grid grid-cols-4 gap-5 max-w-2xl">
          <div className="col-span-1">
            <label className="text-xs text-gray-700 font-light">Order ID</label>
            <input type="text" className="" {...orderIdField} />
          </div>
          <div className="col-span-3">
            <label className="text-xs text-gray-700 font-light">
              Full Name
            </label>
            <input type="text" className="" {...nameField} />
          </div>
          <div className="col-span-1">
            <label className="text-xs text-gray-700 font-light">Paid</label>
            <select
              className="border px-2 py-1"
              onChange={(e) => setPaymentFilter(e.target.value as PaymentType)}
            >
              <option value="none"></option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="credit">Credit</option>
            </select>
          </div>
          <div className="w-full col-span-1">
            <label className="text-xs text-gray-700 font-light">Section</label>
            <select
              className="border px-2 py-1"
              onChange={(e) => setSectionFilter(e.target.value as sectionType)}
            >
              <option></option>
              <option value="cleaning">Cleaning</option>
              <option value="delivery">Delivery</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 col-span-2 justify-self-end">
            <button
              className="border-gray-300 border p-3 text-gray-500 text-xs font-semibold uppercase rounded"
              type="button"
              onClick={() => {
                setFilteredOrders({
                  ...ordersWithSections.cleaning,
                  ...ordersWithSections.deliver,
                  ...ordersWithSections.done,
                });
                console.log("CLEAR");
              }}
            >
              CLEAR
            </button>
            <button
              type="submit"
              className="bg-blue-600 border p-3 text-gray-50 text-xs font-semibold uppercase rounded hover:bg-blue-500"
            >
              Find Results
            </button>
          </div>
        </div>
      </form>
      <div className="flex justify-end max-w-5xl mx-4 md:mx-0">
        <p className="flex items-center opacity-60 text-sm">
          Create a new order{" "}
          <Link
            to="/"
            className="ml-2 border border-gray-600 p-1 cursor-pointer"
          >
            <AiOutlinePlus />
          </Link>
        </p>
      </div>
      <div className="mt-4">
        <WorkflowOrders
          data={filteredOrders === null ? allOrdersState : filteredOrders}
          showCurrent={true}
        />
      </div>
    </div>
  );
};

export default Orders;
