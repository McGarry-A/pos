import Basket from "../Basket/Basket";
import NewOrderForm from "../NewOrderForm/NewOrderForm";
import PaymentOptions from "../PaymentOptions/PaymentOptions";
import ProductGrid from "../ProductsGrid/ProductsGrid";
import { BasketProvider } from "../../Context/BasketProvider";
import useIsMobile from "../../Hooks/useIsMobile";
import { BsChevronRight } from "react-icons/bs";
import { useState } from "react";

const NewOrder: React.FC = () => {
  const isMobile = useIsMobile();
  const [basketIsOpen, setBasketIsOpen] = useState<boolean>(true);

  if (isMobile) {
    return (
      <BasketProvider>
        <NewOrderForm />
        <ProductGrid />
        <Basket />
        <PaymentOptions />
      </BasketProvider>
    );
  }

  return (
    <BasketProvider>
      <div className="sm:flex sm:flex-row">
        <div>
          <ProductGrid />
        </div>
        <div
          className={`flex flex-col min-h-full space-y-2 bg-white flex-1 absolute right-0 top-0 h-screen px-10 py-12 shadow-lg transition duration-150 ${
            basketIsOpen ? "" : "translate-x-96"
          }`}
        >
          <div className="p-3 rounded-full shadow-md bg-white w-min -translate-x-16 cursor-pointer">
            <BsChevronRight onClick={() => setBasketIsOpen(!basketIsOpen)} />
          </div>
          <h2 className="text-xl mt-8 tracking-wide">Your Basket</h2>
          <NewOrderForm />
          <Basket />
          <PaymentOptions />
        </div>
      </div>
    </BasketProvider>
  );
};

export default NewOrder;
