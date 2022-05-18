import { useState } from "react";
import Basket from "../../Components/Basket/Basket";
import NewOrderForm from "../../Components/NewOrderForm/NewOrderForm";
import PaymentOptions from "../../Components/PaymentOptions/PaymentOptions";
import ProductGrid from "../../Components/ProductsGrid/ProductsGrid";
import { BasketProvider } from "../../Context/BasketProvider";
import { CustomerInterface } from "../../Components/CustomerInterface";

const NewOrder = () => {
  const [currentCustomer, setCurrentCustomer] = useState<CustomerInterface>({
    firstName: "",
    lastName: "",
    country: "",
    postcode: "",
  });

  return (
    <BasketProvider className="">
      <NewOrderForm
        currentCustomer={currentCustomer}
        setCurrentCustomer={setCurrentCustomer}
      />
      <ProductGrid />
      <Basket />
      <PaymentOptions />
    </BasketProvider>
  );
};

export default NewOrder;
