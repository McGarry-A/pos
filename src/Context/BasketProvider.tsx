import React, { createContext, useContext, useState } from "react";
import { BasketInterface } from "../Components/Basket";

type AddItemParams = { id: string; quantity?: number; };
type RemoveItemParams = { id: string; quantity?: number };
type ClearItemParams = { id: string };

type BasketContextType = {
  basketContext: BasketInterface;
  addItem: (params: AddItemParams) => void;
  removeItem: (params: RemoveItemParams) => void;
  clearItem: (params: ClearItemParams) => void;
  clearBasket: () => void;
};

const BasketContext = createContext<BasketContextType>(
  {} as BasketContextType
);

export const useBasket = () => useContext(BasketContext);

interface Props {
  children: React.ReactNode;
  className: string;
}

export const BasketProvider = (props: Props) => {
  const [basketContext, setBasketContext] = useState<BasketInterface>({
    items: [
      {
        id: "01",
        title: "Pants",
        quantity: 2,
        price: 4.99,
      },
    ],
    orderNotes: "Here are a few notes for this order",
    totalPrice: 9.98,
    totalQuantity: 2,
  });
  
  const addItem = (addItemParams: AddItemParams) => {};
  const removeItem = (removeItem: RemoveItemParams) => {};
  const clearItem = (clearItem: ClearItemParams) => {};
  const clearBasket = () => {};

  return (
    <BasketContext.Provider
      value={{ basketContext, addItem, removeItem, clearBasket, clearItem }}
    >
      {props.children}
    </BasketContext.Provider>
  );
};

export default useBasket;
