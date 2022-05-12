import React, { createContext, useContext, useState } from "react";
import {
  BasketContextInterface,
  BasketInterface,
  ItemInterface,
  AddItemParams,
  ClearItemParams,
  RemoveItemParams,
} from ".";

interface Props {
  children: React.ReactNode;
  className: string;
}

const BasketContext = createContext<BasketContextInterface>(
  {} as BasketContextInterface
);
export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }: Props) => {
  const [basket, setBasket] = useState<BasketInterface>({
    items: [{} as ItemInterface],
    orderNotes: "",
  });

  const addItem = (addItemParams: AddItemParams) => {};

  const removeItem = (removeItem: RemoveItemParams) => {
    const newBasketItems: ItemInterface[] = basket.items.filter(
      (el) => el.id !== removeItem.id
    );
    const newBasketContext: BasketInterface = { ...basket };
    newBasketContext.items = newBasketItems;
    setBasket(newBasketContext);
    return;
  };

  const clearItem = (clearItem: ClearItemParams) => {
    const newBasketItems: ItemInterface[] = basket.items.filter(
      (el) => el.id !== clearItem.id
    );
    const newBasketContext: BasketInterface = { ...basket };
    newBasketContext.items = newBasketItems;
    setBasket(newBasketContext);
    return;
  };

  const clearBasket = () => {
    setBasket({
      items: [{} as ItemInterface],
      orderNotes: "",
    });

    return;
  };

  const returnTotalQuantity = () => {
    const totalQuantityArray: Array<number> = basket.items.map(
      ({ quantity }) => quantity
    );
    return totalQuantityArray.reduce((prev, cur) => prev + cur);
  };

  const returnTotalPrice = () => {
    const totalPriceArray: Array<number> = basket.items.map(
      ({ price, quantity }) => price * quantity
    );
    return totalPriceArray.reduce((prev, cur) => prev + cur);
  };

  const actions = {
    addItem,
    removeItem,
    clearBasket,
    clearItem,
    returnTotalPrice,
    returnTotalQuantity,
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        actions,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default useBasket;