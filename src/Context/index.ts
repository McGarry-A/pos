export type productID = string;
export type AddItemParams = { item: ItemInterface };
export type RemoveItemParams = { id: string };
export type ClearItemParams = { id: string };

export interface BasketContextInterface {
  basket: BasketInterface;
  actions: {
    addItem: (params: AddItemParams) => void;
    removeItem: (params: RemoveItemParams) => void;
    clearItem: (params: ClearItemParams) => void;
    clearBasket: () => void;
  };
  totalPrice: number;
  totalQuantity: number;
}

export interface ItemInterface {
  [key: string]: {
    id: string;
    title: string;
    price: number;
  };
}

export interface BasketItemInterface extends ItemInterface {
  [key: string]: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  };
}

export interface BasketInterface {
  items: BasketItemInterface;
  orderNotes: string;
}
