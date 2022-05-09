import Basket from "../../Components/Basket/Basket";
import NewOrderForm from "../../Components/NewOrderForm/NewOrderForm";
import ProductGrid from "../../Components/ProductsGrid/ProductsGrid";

const NewOrder = () => {
  return (
    <div className="py-2 px-4">
      <NewOrderForm />
      <ProductGrid />
      <Basket />
      <button className="block w-full bg-green-600 text-white uppercase tracking-widest py-2 rounded hover:bg-green-500">
        Submit
      </button>
    </div>
  );
};

export default NewOrder;
