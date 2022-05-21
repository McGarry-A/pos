// import OrderTable from "../../Components/OrderTable/OrderTable";

import OrderTable from "../../Components/OrderTable/OrderTable";
import { useAppSelector } from "../../Store";

const Delivery = () => {
  const deliverOrders = useAppSelector((state) => state.orders.deliver);
  
  return <OrderTable data={deliverOrders} current='delivery' />
};

export default Delivery;
