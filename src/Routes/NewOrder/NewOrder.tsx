import Basket from "../../Components/Basket/Basket";
import NewOrderForm from "../../Components/NewOrderForm/NewOrderForm";
import PaymentOptions from "../../Components/PaymentOptions/PaymentOptions";
import ProductGrid from "../../Components/ProductsGrid/ProductsGrid";
import { BasketProvider } from "../../Context/BasketProvider";
import useIsMobile from "../../Hooks/useIsMobile";

const NewOrder = () => {
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
      <div className="sm:flex sm:flex-row sm:gap-8">
        <div>
          <ProductGrid />
        </div>
        <div className="flex flex-col min-h-full">
          <NewOrderForm />
          <Basket />
          <PaymentOptions />
        </div>
      </div>
    </BasketProvider>
  );
};

export default NewOrder;
