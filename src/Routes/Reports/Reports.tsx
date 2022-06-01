import { useAppSelector } from "../../Store";

const Reports = () => {
  const redux = useAppSelector((state) => state);
  const { orders } = redux;

  const { cleaning, deliver, done } = orders;

  const ordersInCleaning = Object.keys(cleaning).length;
  const ordersInDeliver = Object.keys(deliver).length;
  const ordersInDone = Object.keys(done).length;
  const totalOrders = ordersInCleaning + ordersInDeliver + ordersInDone;

  return (
    <div className="w-screen max-w-[1620px]">
      <h1 className="mx-8 my-4 text-2xl">Reports</h1>
      <div className="flex justify-center sm:justify-end space-x-4 mx-8">
        <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
          <span className="bg-gray-300 py-5 px-7 rounded">
            <h2 className="text-xl font-bold">{ordersInCleaning}</h2>
          </span>
          <h3 className="text-sm text-gray-600 text-center">
            Orders in Cleaning
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
          <span className="bg-gray-300 py-5 px-7 rounded">
            <h2 className="text-xl font-bold">{ordersInDeliver}</h2>
          </span>
          <h3 className="text-sm text-gray-600 text-center">
            Orders in Delivery
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
          <span className="bg-gray-300 py-5 px-7 rounded">
            <h2 className="text-xl font-bold">{ordersInDone}</h2>
          </span>
          <h3 className="text-sm text-gray-600 text-center">Orders Complete</h3>
        </div>
        <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
          <span className="bg-gray-300 py-5 px-7 rounded">
            <h2 className="text-xl font-bold">{totalOrders}</h2>
          </span>
          <h3 className="text-sm text-gray-600 text-center">Total orders</h3>
        </div>
      </div>
    </div>
  );
};

export default Reports;
