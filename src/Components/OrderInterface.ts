import { BasketInterface } from "../Context";
import { CustomerInterface } from "./CustomerInterfaces";

export interface OrderInterface extends BasketInterface {
  customer: CustomerInterface;
  paymentInfo: {
    payment: string;
    delivery: string;
    date: string;
    time: string;
  };
}
