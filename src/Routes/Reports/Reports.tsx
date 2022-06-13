import { useAppSelector } from "../../Store";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

///
export const donughtData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
///

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

///
interface props {
  children: React.ReactNode;
  chartTitle: string;
  large?: boolean;
}
const ChartWrapper: React.FC<props> = ({ children, chartTitle, large }) => {
  return (
    <div
      className={`w-full grid justify-center ${
        large ? "col-span-2" : "max-w-xs md:max-w-sm"
      }`}
    >
      <h3 className="text-center text-gray-700 opacity-60 mb-2 text-sm">
        {chartTitle}
      </h3>
      {children}
    </div>
  );
};

const Reports = () => {
  const redux = useAppSelector((state) => state);
  const { orders } = redux;

  const { cleaning, deliver, done } = orders;

  const labels = ["Cleaning", "Delivery", "Done"];

  const ordersInCleaning = Object.keys(cleaning).length;
  const unpaidInCleaning = Object.values(cleaning).filter(
    (el) => el.paymentInfo.payment === "credit"
  ).length;
  const totalPriceOfItemsInCleaning =
    Object.values(cleaning).length > 1
      ? Object.values(cleaning)
          .map((el) => el.totalPrice)
          .reduce((prev, cur) => prev + cur)
      : 0;

  const ordersInDeliver = Object.keys(deliver).length;
  const unpaidInDeliver = Object.values(deliver).filter(
    (el) => el.paymentInfo.payment === "credit"
  ).length;
  const totalPriceOfItemsInDeliver =
    Object.values(deliver).length > 1
      ? Object.values(deliver)
          .map((el) => el.totalPrice)
          .reduce((prev, cur) => prev + cur)
      : 0;

  const ordersInDone = Object.keys(done).length;
  const unpaidInDone = Object.values(done).filter(
    (el) => el.paymentInfo.payment === "credit"
  ).length;
  const totalPriceOfItemsInDone =
    Object.values(done).length > 1
      ? Object.values(done)
          .map((el) => el.totalPrice)
          .reduce((prev, cur) => prev + cur)
      : 0;

  const totalSales =
    totalPriceOfItemsInCleaning +
    totalPriceOfItemsInDeliver +
    totalPriceOfItemsInDone;

  const data = {
    labels,
    datasets: [
      {
        label: "Unpaid",
        data: [unpaidInCleaning, unpaidInDeliver, unpaidInDone],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Total",
        data: [ordersInCleaning, ordersInDeliver, ordersInDone],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const totalOrders = ordersInCleaning + ordersInDeliver + ordersInDone;

  return (
    <div className="">
      <h1 className="mx-8 my-8 text-4xl text-center md:text-left">Reports</h1>

      <div className="space-y-4 mt-6">
        <h2 className="text-gray-700 text-2xl text-center sm:text-left sm:ml-4">
          Sales & Workflow
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full justify-items-center">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2 bg-gray-700 text-gray-50 p-4">
              <span className="p-5">
                <h2 className="text-3xl font-bold">{ordersInCleaning}</h2>
              </span>
              <h3 className="text-center tracking-tight">Orders in Cleaning</h3>
            </div>
            <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2 bg-gray-700 text-gray-50 p-4">
              <span className="p-5">
                <h2 className="text-3xl font-bold">{ordersInDeliver}</h2>
              </span>
              <h3 className="text-center tracking-tight">Orders in Delivery</h3>
            </div>

            <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2 bg-gray-700 text-gray-50 p-4">
              <span className="p-5">
                <h2 className="text-3xl font-bold">{ordersInDone}</h2>
              </span>
              <h3 className="text-center tracking-tight">Orders Complete</h3>
            </div>
            <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2 bg-gray-700 text-gray-50 p-4">
              <span className="p-5 ">
                <h2 className="text-3xl font-bold">{totalOrders}</h2>
              </span>
              <h3 className="text-center tracking-tight">Total orders</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 w-full gap-2 px-2">
            <div className="flex flex-col items-center justify-center space-y-2 bg-gray-700 p-2">
              <span className="p-5 rounded">
                <h2 className="text-xl font-bold text-gray-50">
                  £{totalSales}
                </h2>
              </span>
              <h3 className="text-gray-50 text-center tracking-tight">
                Total Sales
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 bg-gray-700 p-2">
              <span className="bg-gray-700 p-5 rounded">
                <h2 className="text-xl font-bold text-gray-50">
                  £{totalPriceOfItemsInCleaning}
                </h2>
              </span>
              <h3 className="text-gray-50 text-center tracking-tight">
                Value in Cleaning
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 bg-gray-700 p-2">
              <span className="bg-gray-700 p-5 rounded">
                <h2 className="text-xl font-bold text-gray-50">
                  £{totalPriceOfItemsInDeliver}
                </h2>
              </span>
              <h3 className="text-gray-50 text-center tracking-tight">
                Value in Delivery
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 bg-gray-700 p-2">
              <span className="bg-gray-700 p-5 rounded">
                <h2 className="text-xl font-bold text-gray-50">
                  £{totalPriceOfItemsInDone}
                </h2>
              </span>
              <h3 className="text-gray-50 text-center tracking-tight">
                Value of Done
              </h3>
            </div>
          </div>
        </div>
      </div>

      <ChartWrapper large chartTitle="Sales in Workflow">
        <Bar data={data} />
      </ChartWrapper>

      {/* DONUGHT CHARTS */}
      <div className="space-y-4 mt-6">
        <h2 className="text-gray-700 text-2xl text-center sm:text-left sm:ml-4">
          Customers & Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full my-5 space-y-4 justify-items-center">
          <ChartWrapper chartTitle="Popular Products">
            <Doughnut data={donughtData} />
          </ChartWrapper>
          <ChartWrapper chartTitle="Active Customers">
            <Doughnut data={donughtData} />
          </ChartWrapper>
          <ChartWrapper chartTitle="Popular Categories">
            <Doughnut data={donughtData} />
          </ChartWrapper>
        </div>
      </div>
      {/* BARCHARTS */}
    </div>
  );
};

export default Reports;
