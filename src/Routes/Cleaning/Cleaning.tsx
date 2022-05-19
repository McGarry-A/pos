import { useAppDispatch, useAppSelector } from "../../Store";
import orderSlice from "../../Store/orderSlice";

const Cleaning = () => {
  const cleaningOrders = useAppSelector((state) => state.orders.cleaning);
  const dispatch = useAppDispatch();
  const { process } = orderSlice.actions;

  const handleClick = () => {};

  return <div>{JSON.stringify(cleaningOrders)}</div>;
};

export default Cleaning;
