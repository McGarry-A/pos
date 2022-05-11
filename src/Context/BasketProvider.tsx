import { title } from "process";
import React, { createContext, useContext } from "react";
import { ProductInterface } from ".";
import { BasketInterface } from "../Components/Basket";

type AddItemParams = { id: string; quantity?: number };
type RemoveItemParams = { id: string; quantity?: number };
type ClearItemParams = { id: string };

type BasketContextType = {
  basket: BasketInterface;
  addItem: (params: AddItemParams) => void;
  removeItem: (params: RemoveItemParams) => void;
  clearItem: (params: ClearItemParams) => void;
  clearBasket: () => void;
};

const BasketContext = createContext<BasketContextType>({
  basket: null,
  addItem: () => null,
  removeItem: () => null,
  clearItem: () => null,
  clearBasket: () => null,
});

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
  const addItem = () => {};
  const removeItem = () => {};
  const clearItem = () => {};
  const clearBasket = () => {};

  return (
    <BasketContext.Provider
      value={{ basket, addItem, removeItem, clearBasket, clearItem }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketTotals = (basket: BasketInterface) => {};
export const useBasketItems = (products: [ProductInterface]) => {};

export default useBasket;
