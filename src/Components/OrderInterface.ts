import { BasketInterface } from "../Context";
import { CustomerInterface } from "./CustomerInterface";

export type dateType = string;
export type timeType = string;
export type orderIdType = string;

export type PaymentType = "cash" | "card" | "credit";
export type DeliveryType = "standard" | "premium";

export interface OrderBody extends BasketInterface {
  orderId: orderIdType;
  customer: CustomerInterface;
  current: "cleaning" | "delivery" | "done";
  paymentInfo: {
    payment: PaymentType;
    delivery: DeliveryType;
    date: dateType;
    time: timeType;
  };
};

export interface OrderInterface {
  [key: string]: OrderBody;
};