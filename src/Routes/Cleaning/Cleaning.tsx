import { useAppDispatch, useAppSelector } from "../../Store";
import customerSlice from "../../Store/customerSlice";

const Cleaning = () => {
  const dispatch = useAppDispatch();
  const {
    actions: { addCustomer },
  } = customerSlice;

  const selector = useAppSelector((state) => state.customers[0]);

  const handleClick = () => {};

  return (
    <div>
      <div>{selector.firstName}</div>
      <div>
        <button onClick={() => handleClick()}>click to console log</button>
      </div>
    </div>
  );
};

export default Cleaning;
