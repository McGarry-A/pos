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
      className={`w-full justify-center ${
        large ? "col-span-1" : "max-w-xs"
      }`}
    >
      <h3 className="text-center opacity-60 mb-2 text-sm">{chartTitle}</h3>
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

  interface ReportBlockInterface {
    title: string;
    figure: number;
  }

  const ReportBlock: React.FC<ReportBlockInterface> = ({ title, figure }) => {
    return (
      <div className="flex flex-col items-center justify-center min-w-42 min-h-42 space-y-2 bg-gray-700 text-gray-50 p-4">
        <span className="p-5">
          <h2 className="text-3xl font-bold">{figure}</h2>
        </span>
        <h3 className="text-center tracking-tight">{title}</h3>
      </div>
    );
  };

  return (
    <div className="">
      <h1 className="mx-2 my-8 text-3xl text-left md:text-left">Reports</h1>

      <div className="space-y-4">
        <h2 className="text-gray-700 text-xl mx-2 sm:text-left sm:ml-4">
          Sales & Workflow
        </h2>

        <div className="grid grid-cols-4 gap-2 p-6">
          <ReportBlock title="Orders in Cleaning" figure={ordersInCleaning} />
          <ReportBlock title="Orders in Delivery" figure={ordersInDeliver} />
          <ReportBlock title="Orders Complete" figure={ordersInDone} />
          <ReportBlock title="Total Orders" figure={totalOrders} />
          <ReportBlock title="Total Sales" figure={totalSales} />
          <ReportBlock
            title="Value in Cleaning"
            figure={totalPriceOfItemsInCleaning}
          />
          <ReportBlock
            title="Value in Delivery"
            figure={totalPriceOfItemsInDeliver}
          />
          <ReportBlock title="Value in Done" figure={totalPriceOfItemsInDone} />
        </div>
      </div>

      <div className="mx-4">
        <ChartWrapper chartTitle="Sales in Workflow" large>
          <Bar data={data} />
        </ChartWrapper>
      </div>
    </div>
  );
};

export default Reports;
