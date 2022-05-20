import OrderTable from "../../Components/OrderTable/OrderTable";
import { useAppDispatch, useAppSelector } from "../../Store";
import orderSlice from "../../Store/orderSlice";

const Cleaning = () => {
  const cleaningOrders = useAppSelector((state) => state.orders.cleaning);
  const dispatch = useAppDispatch();
  const { process } = orderSlice.actions;

  const handleClick = () => {};

  return <div><OrderTable data={cleaningOrders}/></div>;
};

export default Cleaning;
