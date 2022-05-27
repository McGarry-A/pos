import { useEffect, useState } from "react";
import { OrderInterface } from "../../Components/OrderInterface";
import WorkflowOrders from "../../Components/WorkflowOrders/WorkflowOrders";
import { useAppSelector } from "../../Store";

const Orders = () => {
  // show all orders (including done)
  // allow for search/filter options
  // allow a customer to edit orders here > redirected to workflow page
  // and their context pulls from that data.
  const [filteredOrders, setFilteredOrders] = useState<OrderInterface | null>(
    null
  );

  const ordersWithSections = useAppSelector((state) => state.orders);

  useEffect(() => {
    const { cleaning, deliver, done } = ordersWithSections;
    const orders = { ...cleaning, ...deliver, ...done };

    setFilteredOrders(orders);
  }, [ordersWithSections]);

  const handleFormSubmit = () => {};
  return (
    <div>
      <div className="space-y-2 p-2">
        <h2 className="text-2xl text-gray-800">Order Search</h2>
        <p className="text-gray-500 text-sm">
          Use this page to easily find orders, including those that are not
          currently in your workflow.
        </p>
        <p className="text-gray-500 text-sm">
          You can also make edits to orders that are in the "Cleaning" stage,
          and delete orders that have not yet been paid for.
        </p>
      </div>
      <form onSubmit={handleFormSubmit} className="my-6 px-2">
        <div className="grid grid-cols-2 gap-5 max-w-lg">
          <div>
            <label className="text-xs text-gray-700 font-light">Order ID</label>
            <input type="text" className="h-8" />
          </div>
          <div>
            <label className="text-xs text-gray-700 font-light">
              Full Name
            </label>
            <input type="" className="h-8" />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-gray-700 font-light">
              E-mail Address
            </label>
            <input type="text" className="h-8" />
          </div>
          <div className="flex">
            <div className="w-full">
              <label className="text-xs text-gray-700 font-light">Paid</label>
              <select className="border px-2 py-1 text-sm">
                <option>Cash</option>
                <option>Card</option>
                <option>Unpaid</option>
              </select>
            </div>
            <div className="w-full ml-2">
              <label className="text-xs text-gray-700 font-light">
                Section
              </label>
              <select className="border px-2 py-1 text-sm">
                <option>Cleaning</option>
                <option>Delivery</option>
                <option>Done</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="border-gray-300 border px-2 text-gray-500 text-xs font-semibold uppercase rounded">
              Find Results
            </button>
          </div>
        </div>
      </form>
      <div className="mt-4">
        {filteredOrders && <WorkflowOrders data={filteredOrders} />}
      </div>
    </div>
  );
};

export default Orders;
