import { createContext, useContext, useState } from "react";

interface BasketItem {
  name: string;
  price: number;
  quantity: number;
}

const BasketContext = createContext([]);
export const useBasket = () => useContext(BasketContext);

export const BasketActions = () => {
  const [basket, setBasket] = useState([{}]);

  const addToBasket = () => {};
  const removeFromBasket = () => {};
  const clearBasket = () => {};
  const calculateBasketTotal = () => {};

  const value = {
    basket,
    addToBasket,
    removeFromBasket,
    clearBasket,
    calculateBasketTotal,
  };

  return value;
};

export default useBasket;
