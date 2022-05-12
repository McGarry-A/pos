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
      returnTotalQuantity: () => number;
      returnTotalPrice: () => number;
    }
}

export interface ItemInterface {
    id: productID;
    title: string;
    quantity: number;
    price: number;
}
  
export interface BasketInterface {
    items: ItemInterface[];
    orderNotes: string;
}