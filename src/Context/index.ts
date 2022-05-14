export type productID = string
export type AddItemParams = { item: ItemInterface };
export type RemoveItemParams = { id: productID };
export type ClearItemParams = { id: productID };

export interface BasketContextInterface {
  basket: BasketInterface;
  actions: {
      addItem: (params: AddItemParams) => void;
      removeItem: (params: RemoveItemParams) => void;
      clearItem: (params: ClearItemParams) => void;
      clearBasket: () => void;
    },
    totalPrice: number;
    totalQuantity: number;
}

export interface ItemInterface {
    [key: string]: {
        id: productID;
        title: string;
        price: number;
    }
}

export interface BasketItemInterface extends ItemInterface {
    [key:string]: {
        id: productID;
        title: string;
        price: number;
        quantity: number;
    }
}
  
export interface BasketInterface {
    items: BasketItemInterface;
    orderNotes: string;
}
