import { BasketInterface } from "../Context";
import { CustomerInterface } from "./CustomerInterface";

export type dateType = string;
export type timeType = string;
export type orderIdType = string;

export type PaymentType = "cash" | "card" | "credit";
export type DeliveryType = "standard" | "premium";

interface OrderBody extends BasketInterface {
  orderId: orderIdType,
  customer: CustomerInterface;
  paymentInfo: {
    payment: PaymentType;
    delivery: DeliveryType;
    date: dateType;
    time: timeType;
  };
};

export interface OrderInterface {
  [key: string]: OrderBody
};