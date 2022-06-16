import React, { createContext, useContext, useState, useEffect } from "react";
import {
  BasketContextInterface,
  BasketInterface,
  AddItemParams,
  ClearItemParams,
  RemoveItemParams,
  BasketItemInterface,
  ChangeDeliveryParams,
} from ".";
import { CustomerInterface } from "../Components/CustomerInterface";

interface Props {
  children: React.ReactNode;
}

const BasketContext = createContext<BasketContextInterface>(
  {} as BasketContextInterface
);
export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }: Props) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const localStorageBasket = localStorage.getItem("POS_BASKET_KEY");
  const initialBasketState = localStorageBasket
    ? JSON.parse(localStorageBasket)
    : {
        items: {},
        orderNotes: "",
        delivery: "standard",
      };

  const [basket, setBasket] = useState<BasketInterface>(initialBasketState);

  const localStorageCustomer = localStorage.getItem("POS_CUSTOMER_KEY");
  const initialCustomerState = localStorageCustomer
    ? JSON.parse(localStorageCustomer)
    : null;
  const [currentCustomer, setCurrentCustomer] =
    useState<CustomerInterface | null>(initialCustomerState);

  useEffect(() => {
    const { items } = basket;
    const objectKeyArray = Object.keys(items);
    const objectValuesArray = Object.values(items);

    if (objectKeyArray.length === 0) {
      setTotalPrice(0);
      setTotalQuantity(0);
      return;
    }

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
      const totalItemPrice = Number(
        totalPriceArray.reduce((prev, cur) => prev + cur).toFixed(2)
      );

      setTotalPrice(totalItemPrice);
    };

    const handleCustomerLocalStorage = (data: CustomerInterface) => {
      localStorage.setItem("POS_CUSTOMER_KEY", JSON.stringify(data));
    };
    const handleBasketLocalStorage = (data: BasketInterface) => {
      localStorage.setItem("POS_BASKET_KEY", JSON.stringify(data));
    };

    returnTotalPrice();
    returnTotalQuantity();

    if (basket) handleBasketLocalStorage(basket);
    if (currentCustomer) handleCustomerLocalStorage(currentCustomer);
  }, [basket, currentCustomer]);

  const addItem = ({ item }: AddItemParams) => {
    const { items } = basket;
    const newBasket = { ...basket };
    const addToBasketId = Object.keys(item)[0];
    const alreadyInBasket = Object.keys(items).map(
      (el) => el === addToBasketId
    );

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

  const changeDelivery = (delivery: ChangeDeliveryParams) => {
    const newBasket = { ...basket };
    newBasket.delivery = delivery;
    setBasket(newBasket);
  };

  const removeItem = (removeItem: RemoveItemParams) => {
    const { items } = basket;
    const newBasket = { ...basket };

    if (newBasket.items[removeItem.id].quantity === 1) {
      delete newBasket.items[removeItem.id];
      setBasket(newBasket);
      return;
    }

    const newItems = {
      ...items,
      [removeItem.id]: {
        ...items[removeItem.id],
        quantity: (items[removeItem.id].quantity -= 1),
      },
    };

    newBasket.items = newItems;
    setBasket(newBasket);
  };

  const clearItem = (clearItem: ClearItemParams) => {
    const { items } = basket;
    const newBasket = { ...basket };

    const newItems = { ...items };
    delete newItems[clearItem.id];

    newBasket.items = newItems;
    setBasket(newBasket);
  };

  const clearBasket = () => {
    const newBasket: BasketInterface = {
      items: {},
      orderNotes: "",
      delivery: "standard",
    };

    setBasket(newBasket);
  };

  const setOrderNote = (note: string) => {
    const newBasket = { ...basket };
    newBasket.orderNotes = note;

    setBasket(newBasket);
  };

  const actions = {
    addItem,
    removeItem,
    clearBasket,
    clearItem,
    setOrderNote,
    changeDelivery,
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        actions,
        totalPrice,
        totalQuantity,
        currentCustomer,
        setCurrentCustomer,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default useBasket;
