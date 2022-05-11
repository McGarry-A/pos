import Basket from "../../Components/Basket/Basket";
import NewOrderForm from "../../Components/NewOrderForm/NewOrderForm";
import ProductGrid from "../../Components/ProductsGrid/ProductsGrid";
import { BasketProvider } from "../../Context/BasketProvider";

const NewOrder = () => {
  return (
    <BasketProvider className="py-2 px-4">
      <NewOrderForm />
      <ProductGrid />
      <Basket />
      <button className="w-full uppercase tracking-widest">
        Submit
      </button>
    </BasketProvider>
  );
};

export default NewOrder;
