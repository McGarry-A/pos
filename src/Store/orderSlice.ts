import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { orderIdType, OrderInterface } from "../Components/OrderInterface";

interface OrderSliceInterface {
  cleaning: OrderInterface;
  deliver: OrderInterface;
  done: OrderInterface;
}

interface ProcessInterface {
  orderId: string;
  current: "cleaning" | "delivery";
}
interface markAsPaidPayload {
  orderId:string;
  current:string;
}
const initialState: OrderSliceInterface = {
  cleaning: {
    "sku-01": {
      customer: {
        firstName: "Ahmed",
        lastName: "McGarry",
        email: "ahmedmcgarry@hotmail.com",
        phone: "07907733824",
        address: "357 Leyland Road",
      },
      orderId: "sku-01",
      orderNotes: "Please dont be late!",
      paymentInfo: {
        date: "Today",
        delivery: "premium",
        payment: "card",
        time: "11:59:59",
      },
      items: {
        "order-01": {
          id: "order-01",
          title: "Based",
          price: 9.99,
          quantity: 2,
        },
      },
    },
    "sku-02": {
      customer: {
        firstName: "Ahmed",
        lastName: "McGarry",
        email: "ahmedmcgarry@hotmail.com",
        phone: "07907733824",
        address: "357 Leyland Road",
      },
      orderId: "sku-02",
      orderNotes: "Please dont be late!",
      paymentInfo: {
        date: "Today",
        delivery: "premium",
        payment: "credit",
        time: "11:59:59",
      },
      items: {
        "order-01": {
          id: "order-01",
          title: "Based",
          price: 9.99,
          quantity: 2,
        },
      },
    },
    "sku-03": {
      customer: {
        firstName: "Ahmed",
        lastName: "McGarry",
        email: "ahmedmcgarry@hotmail.com",
        phone: "07907733824",
        address: "357 Leyland Road",
      },
      orderId: "sku-03",
      orderNotes: "Please dont be late!",
      paymentInfo: {
        date: "Today",
        delivery: "premium",
        payment: "card",
        time: "11:59:59",
      },
      items: {
        "order-01": {
          id: "order-01",
          title: "Based",
          price: 9.99,
          quantity: 2,
        },
      },
    },
  },
  deliver: {},
  done: {},
};

const orderSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    create: (
      state: OrderSliceInterface,
      action: PayloadAction<OrderInterface>
    ) => {
      return {
        ...state,
        cleaning: {
          ...state.cleaning,
          ...action.payload,
        },
      };
    },
    process: (
      state: OrderSliceInterface,
      action: PayloadAction<ProcessInterface>
    ) => {
      const {
        payload: { orderId, current },
      } = action;

      if (current === "cleaning") {
        const currentOrder = state.cleaning[orderId];
        state.deliver = {
          ...state.deliver,
          [currentOrder.orderId]: { ...currentOrder },
        };
        console.log(currentOrder.orderId);
        delete state.cleaning[orderId];
      }
      if (current === "delivery") {
        const currentOrder = state.deliver[orderId];
        state.done = {
          ...state.done,
          [currentOrder.orderId]: { ...currentOrder },
        };
        console.log(currentOrder.orderId);
        delete state.deliver[orderId];
      }
    },
    markAsPaid: (state: OrderSliceInterface, action:PayloadAction<markAsPaidPayload>) => {
      const {current, orderId} = action.payload

      if (current === "cleaning") {
        state.cleaning[orderId].paymentInfo.payment = "cash"
      }
      if (current === "delivery") {
        state.deliver[orderId].paymentInfo.payment = "cash"
      }
    }
  },
});

export default orderSlice;
