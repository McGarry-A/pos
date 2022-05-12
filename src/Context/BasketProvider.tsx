import React, { createContext, useContext, useState, useEffect } from "react";
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
    items: [
      {
        title: "T-shirt",
        price: 5,
        quantity: 2,
        id: "test"
      }
    ],
    orderNotes: "",
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    const {items} = basket;

    if (items.length) {
      const returnTotalQuantity = () => {
        const totalQuantityArray: Array<number> = items.map(
          ({ quantity }) => quantity
        );
        const total = totalQuantityArray.reduce((prev, cur) => prev + cur);
        setTotalQuantity(total);
      };

      const returnTotalPrice = () => {
        const totalPriceArray: Array<number> = items.map(
          ({ price, quantity }) => price * quantity
        );
        const total = totalPriceArray.reduce((prev, cur) => prev + cur);
        setTotalPrice(total);
      };

      returnTotalPrice();
      returnTotalQuantity();
    }
  }, [basket]);

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

  const actions = {
    addItem,
    removeItem,
    clearBasket,
    clearItem,
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        actions,
        totalPrice,
        totalQuantity,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default useBasket;
