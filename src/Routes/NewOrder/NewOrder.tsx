import Basket from "../../Components/Basket/Basket";
import NewOrderForm from "../../Components/NewOrderForm/NewOrderForm";
import PaymentOptions from "../../Components/PaymentOptions/PaymentOptions";
import ProductGrid from "../../Components/ProductsGrid/ProductsGrid";
import { BasketProvider } from "../../Context/BasketProvider";

const NewOrder = () => {
  return (
    <BasketProvider>
      <NewOrderForm />
      <ProductGrid />
      <Basket />
      <PaymentOptions />
    </BasketProvider>
  );
};

export default NewOrder;

// parent
// basketProvider

// left
// categories
// productsgrid

// right
// newOrderFom
// basket
// paymentOptions
