import Basket from "../../Components/Basket/Basket";
import NewOrderForm from "../../Components/NewOrderForm/NewOrderForm";
import ProductGrid from "../../Components/ProductsGrid/ProductsGrid";

const NewOrder = () => {
  return (
    <div className="py-2 px-4">
      <NewOrderForm />
      <ProductGrid />
      <Basket />
      <button className="w-full uppercase tracking-widest">
        Submit
      </button>
    </div>
  );
};

export default NewOrder;
