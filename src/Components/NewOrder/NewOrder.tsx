import { ReactNode, useState } from "react";
import { BasketProvider } from "../../Context/BasketProvider";

import Basket from "../Basket/Basket";
import NewOrderForm from "../NewOrderForm/NewOrderForm";
import PaymentOptions from "../PaymentOptions/PaymentOptions";
import ProductGrid from "../ProductsGrid/ProductsGrid";
import useIsMobile from "../../Hooks/useIsMobile";
import ExpandablePanel from "../ExpandablePanel/ExpandablePanel";

interface ContainerProps {
  children: ReactNode;
}

const NewOrderBody: React.FC<ContainerProps> = ({ children }) => (
  <div className="sm:flex sm:flex-row">{children}</div>
);

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
      <NewOrderBody>
        <ProductGrid />
        <ExpandablePanel
          panelIsOpen={basketIsOpen}
          setPanelIsOpen={setBasketIsOpen}
        >
          <NewOrderForm />
          <Basket />
          <PaymentOptions />
        </ExpandablePanel>
      </NewOrderBody>
    </BasketProvider>
  );
};

export default NewOrder;
