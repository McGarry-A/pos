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

const labels = ["Cleaning", "Delivery", "Done"];

export const data = {
  labels,
  datasets: [
    {
      label: "Unpaid",
      data: [21, 34, 56],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Total",
      data: [26, 44, 96],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
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
        large ? "" : "max-w-xs md:max-w-sm"
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

  const ordersInCleaning = Object.keys(cleaning).length;
  const ordersInDeliver = Object.keys(deliver).length;
  const ordersInDone = Object.keys(done).length;
  const totalOrders = ordersInCleaning + ordersInDeliver + ordersInDone;

  return (
    <div className="w-screen max-w-[1620px]">
      <h1 className="mx-8 my-8 text-4xl text-center md:text-left">Reports</h1>

      {/* WORKFLOW COUNT */}
      <div className="flex justify-center sm:justify-end space-x-12 mx-8">
        <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
          <span className="bg-gray-300 py-5 px-7 rounded">
            <h2 className="text-3xl font-bold">{ordersInCleaning}</h2>
          </span>
          <h3 className="text-sm text-gray-600 text-center">
            Orders in Cleaning
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
          <span className="bg-gray-300 py-5 px-7 rounded">
            <h2 className="text-3xl font-bold">{ordersInDeliver}</h2>
          </span>
          <h3 className="text-sm text-gray-600 text-center">
            Orders in Delivery
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
          <span className="bg-gray-300 py-5 px-7 rounded">
            <h2 className="text-3xl font-bold">{ordersInDone}</h2>
          </span>
          <h3 className="text-sm text-gray-600 text-center">Orders Complete</h3>
        </div>
        <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
          <span className="bg-gray-300 py-5 px-7 rounded">
            <h2 className="text-3xl font-bold">{totalOrders}</h2>
          </span>
          <h3 className="text-sm text-gray-600 text-center">Total orders</h3>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <h2 className="text-gray-700 text-2xl text-center sm:text-left sm:ml-4">
          Sales & Workflow
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full my-5 space-y-4 justify-items-center">
          <ChartWrapper large chartTitle="Sales in Workflow">
            <Bar data={data} />
          </ChartWrapper>
          <div className="grid grid-cols-2 grid-rows-2 w-full gap-6">
            <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
              <span className="bg-gray-300 py-5 px-7 rounded">
                <h2 className="text-xl font-bold">£435.99</h2>
              </span>
              <h3 className="text-sm text-gray-600 text-center">Total Sales</h3>
            </div>
            <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
              <span className="bg-gray-300 py-5 px-7 rounded">
                <h2 className="text-xl font-bold">£435.99</h2>
              </span>
              <h3 className="text-sm text-gray-600 text-center">
                Value in Cleaning
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
              <span className="bg-gray-300 py-5 px-7 rounded">
                <h2 className="text-xl font-bold">£435.99</h2>
              </span>
              <h3 className="text-sm text-gray-600 text-center">
                Value in Delivery
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2">
              <span className="bg-gray-300 py-5 px-7 rounded">
                <h2 className="text-xl font-bold">£435.99</h2>
              </span>
              <h3 className="text-sm text-gray-600 text-center">
                Value of Done
              </h3>
            </div>
          </div>
        </div>
      </div>

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
