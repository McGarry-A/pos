import OrderTable from "../../Components/OrderTable/OrderTable";
import { useAppDispatch, useAppSelector } from "../../Store";
import orderSlice from "../../Store/orderSlice";

const Cleaning = () => {
  const cleaningOrders = useAppSelector((state) => state.orders.cleaning);
  

  const handleClick = () => {};

  return <OrderTable data={cleaningOrders}/>
};

export default Cleaning;
