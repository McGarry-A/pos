import { OrderInterface, PaymentType } from "../../Components/OrderInterface";

type SectionType = "cleaning" | "done" | "delivery" | null;

const OrderSorter = (
  name: string,
  paid: PaymentType | null | "none",
  section: SectionType,
  orders: OrderInterface
): OrderInterface => {
  let newOrders: OrderInterface = {};

  let matchingNames = {};
  let matchingPaymentTypes = {};
  let matchingSections = {};

  if (name) {
    matchingNames = Object.fromEntries(
      Object.entries(orders).filter((el) => el[1].customer.name === name)
    );

    newOrders = { ...newOrders, ...matchingNames };
  }

  if (paid) {
    matchingPaymentTypes = Object.fromEntries(
      Object.entries(orders).filter(
        (el) =>
          paid !== (null || undefined || "none") &&
          el[1].paymentInfo.payment === paid
      )
    );

    newOrders = { ...newOrders, ...matchingPaymentTypes };
  }

  if (section) {
    matchingSections = Object.fromEntries(
      Object.entries(orders).filter((el) => el[1].current === section)
    );
    newOrders = { ...newOrders, ...matchingSections };
  }

  

  return newOrders;
};
