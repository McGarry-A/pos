import Basket from "../Basket/Basket";
import NewOrderForm from "../NewOrderForm/NewOrderForm";

const NewOrderPanel = () => {
  return (
    <div>
      <NewOrderForm />
      <Basket />
    </div>
  );
};

export default NewOrderPanel;
