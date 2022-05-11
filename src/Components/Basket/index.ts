
export interface ItemInterface {
    id: string;
    title: string;
    quantity: number;
    price: number;
  }
  
export interface BasketInterface {
    items: [ItemInterface];
    totalPrice: number | null;
    totalQuantity: number | null;
    orderNotes: string | null;
  }