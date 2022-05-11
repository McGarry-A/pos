import React, { createContext, useContext, useState } from "react";
import { ProductInterface } from ".";
import { BasketInterface } from "../Components/Basket";

type AddItemParams = { id: string; quantity?: number };
type RemoveItemParams = { id: string; quantity?: number };
type ClearItemParams = { id: string };

type BasketContextType = {
  basketContext: BasketInterface;
  addItem: (params: AddItemParams) => void;
  removeItem: (params: RemoveItemParams) => void;
  clearItem: (params: ClearItemParams) => void;
  clearBasket: () => void;
};

const BasketContext = createContext<BasketContextType | void>(
  {} as BasketContextType
);

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const [basketContext, setBasketContext] = useState({} as BasketInterface);
  const addItem = (item) => {
    const { items } = basketContext;
    const newItems = [...items, item];
    const newBasket = { ...basketContext };
    newBasket.items = newItems;
    setBasketContext(newBasket);
  };
  const removeItem = () => {};
  const clearItem = () => {};
  const clearBasket = () => {};

  return (
    <BasketContext.Provider
      value={{ basketContext, addItem, removeItem, clearBasket, clearItem }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketTotals = (basket: BasketInterface) => {};
export const useBasketItems = (products: [ProductInterface]) => {};

export default useBasket;
