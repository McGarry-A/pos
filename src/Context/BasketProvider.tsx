import React, { createContext, useContext, useState, useEffect } from "react";
import {
  BasketContextInterface,
  BasketInterface,
  BasketItemInterface,
  AddItemParams,
  ClearItemParams,
  RemoveItemParams,
  ItemInterface,
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
    items: [
      {
        title: "T-shirt",
        price: 5,
        quantity: 2,
        id: "sku-00",
      },
    ],
    orderNotes: "",
  });

  useEffect(() => {
    const { items } = basket;

    if (items.length < 1) {
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

  const addItem = ({ item }: AddItemParams) => {
    const { items } = basket;
    const newBasket = { ...basket };

    const isInItems = Object.keys(newBasket.items).includes(item.id);

    if (!isInItems) {
      const newItem: BasketItemInterface = { ...item, quantity: 1 };
      const newItems: BasketItemInterface[] = {
        ...items,
        [newItem.id]: { ...newItem },
      };
      newBasket.items = newItems;
      setBasket(newBasket);
      return;
    }

    const newItems = { ...items };
    const indexOfItem = Object.keys(items).indexOf(item.id);

    // Some monkey business going on here
    // newItems[indexOfItem].quantity = newItemQuantity;
    // newBasket.items = newItems;

    setBasket(newBasket);
  };

  const removeItem = (removeItem: RemoveItemParams) => {
    const newBasketContext: BasketInterface = { ...basket };
    newBasketContext.items = basket.items.filter(
      (el) => el.id !== removeItem.id
    );
    setBasket(newBasketContext);
    return;
  };

  const clearItem = (clearItem: ClearItemParams) => {
    const newBasketContext: BasketInterface = { ...basket };
    newBasketContext.items = basket.items.filter(
      (el) => el.id !== clearItem.id
    );
    setBasket(newBasketContext);
    return;
  };

  const clearBasket = () => {
    setBasket({
      items: [{} as BasketItemInterface],
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
