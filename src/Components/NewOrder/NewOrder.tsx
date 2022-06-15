import Basket from "../Basket/Basket";
import NewOrderForm from "../NewOrderForm/NewOrderForm";
import PaymentOptions from "../PaymentOptions/PaymentOptions";
import ProductGrid from "../ProductsGrid/ProductsGrid";
import { BasketProvider } from "../../Context/BasketProvider";
import useIsMobile from "../../Hooks/useIsMobile";
import { useState } from "react";
import ExpandablePanel from "../ExpandablePanel/ExpandablePanel";

const NewOrder: React.FC = () => {
  const isMobile = useIsMobile();
  const [basketIsOpen, setBasketIsOpen] = useState<boolean>(false);

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
        <div className="max-w-[880px] w-full">
          <ProductGrid />
        </div>
        <ExpandablePanel
          panelIsOpen={basketIsOpen}
          setPanelIsOpen={setBasketIsOpen}
        >
          <h2 className="text-xl tracking-wide">Your Basket</h2>
          <NewOrderForm />
          <Basket />
          <PaymentOptions />
        </ExpandablePanel>
      </div>
    </BasketProvider>
  );
};

export default NewOrder;
