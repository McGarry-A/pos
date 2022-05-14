import React, { createContext, useContext, useState, useEffect } from "react";
import {
  BasketContextInterface,
  BasketInterface,
  AddItemParams,
  ClearItemParams,
  RemoveItemParams,
  BasketItemInterface,
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
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [basket, setBasket] = useState<BasketInterface>({
    items: {
      "sku-00": {
        title: "T-shirt",
        price: 5,
        quantity: 2,
        id: "sku-00",
      },
    },
    orderNotes: "",
  });

  useEffect(() => {
    const { items } = basket;
    const objectKeyArray = Object.keys(items)

    if (objectKeyArray.length === 0) return
    
    const objectValuesArray = Object.values(items)

    const returnTotalQuantity = () => {
      const totalQuantityArray: Array<number> = objectValuesArray.map(
        ({ quantity }) => quantity
      );
      const total = totalQuantityArray.reduce((prev, cur) => prev + cur);
      setTotalQuantity(total);
      };

    const returnTotalPrice = () => {
      const totalPriceArray: Array<number> = objectValuesArray.map(
        ({ price, quantity }) => price * quantity
      );
      const total = totalPriceArray.reduce((prev, cur) => prev + cur);
      setTotalPrice(total);
    };

      returnTotalPrice();
      returnTotalQuantity();
  }, [basket]);

  const addItem = ({ item }: AddItemParams) => {
    const { items } = basket;
    const newBasket = { ...basket };
    const addToBasketId = Object.keys(item)[0];
    const alreadyInBasket = Object.keys(items).map((el) => el === addToBasketId);

    if (alreadyInBasket.includes(true)) {
      const newItems = {
        ...items,
        [addToBasketId]: {
          ...items[addToBasketId],
          quantity: (items[addToBasketId].quantity += 1),
        },
      };
      newBasket.items = newItems;
      setBasket(newBasket);
      return;
    }
    const newItemBody = { ...Object.values(item)[0], quantity: 1 };
    const newItem: BasketItemInterface = {
      [newItemBody.id]: { ...newItemBody },
    };
    const newBasketItems = { ...items, ...newItem };
    newBasket.items = newBasketItems;
    setBasket(newBasket);
  };

  const removeItem = (removeItem: RemoveItemParams) => {};

  const clearItem = (clearItem: ClearItemParams) => {};

  const clearBasket = () => {};

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
