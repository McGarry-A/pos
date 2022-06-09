import Basket from "../Basket/Basket";
import NewOrderForm from "../NewOrderForm/NewOrderForm";
import PaymentOptions from "../PaymentOptions/PaymentOptions";
import ProductGrid from "../ProductsGrid/ProductsGrid";
import { BasketProvider } from "../../Context/BasketProvider";
import useIsMobile from "../../Hooks/useIsMobile";

const NewOrder: React.FC = () => {
  const isMobile = useIsMobile();

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
      <div className="sm:flex sm:flex-row sm:gap-16">
        <div>
          <ProductGrid />
        </div>
        <div className="flex flex-col min-h-full space-y-2">
          <NewOrderForm />
          <Basket />
          <PaymentOptions />
        </div>
      </div>
    </BasketProvider>
  );
};

export default NewOrder;
