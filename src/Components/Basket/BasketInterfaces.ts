
export interface ItemInterface {
    id: string;
    title: string;
    quantity: number;
    price: number;
  }
  
export interface BasketInterface {
    items: ItemInterface[];
    orderNotes: string;
  }