import { BasketInterface } from "../Context";
import { CustomerInterface } from "./CustomerInterfaces";

interface OrderBody extends BasketInterface {
  orderId: string,
  customer: CustomerInterface;
  paymentInfo: {
    payment: string;
    delivery: string;
    date: string;
    time: string;
  };
}

export interface OrderInterface {
  [key: string]: OrderBody
}