import OrderTable from "../../Components/OrderTable/OrderTable";
import { useAppSelector } from "../../Store";

const Cleaning = () => {
  const cleaningOrders = useAppSelector((state) => state.orders.cleaning);

  return <OrderTable data={cleaningOrders} current="cleaning" />;
};

export default Cleaning;
