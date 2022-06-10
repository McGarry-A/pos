import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderInterface } from "../Components/OrderInterface";

interface OrderSliceInterface {
  cleaning: OrderInterface;
  deliver: OrderInterface;
  done: OrderInterface;
}

interface ProcessInterface {
  orderId: string;
}
interface markAsPaidPayload {
  orderId:string;
  current:string;
  paymentType: "cash" | "card";
}

const initialState: OrderSliceInterface = {
  cleaning: {
    "sku-01": {
      customer: {
        name: "Ahmed McGarry",
        email: "ahmedmcgarry@hotmail.com",
        phone: "07907733824",
        address: "357 Leyland Road",
      },
      orderId: "sku-01",
      orderNotes: "Please dont be late!",
      totalPrice: 19.98,
      current: "cleaning",
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
    "sku-02": {
      customer: {
        name: "Ayman McGarry",
        email: "ahmedmcgarry@hotmail.com",
        phone: "07907733824",
        address: "357 Leyland Road",
      },
      orderId: "sku-02",
      orderNotes: "Please dont be late!",
      totalPrice: 19.98,
      current: "cleaning",
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
        name: "Alicia McGarry",
        email: "ahmedmcgarry@hotmail.com",
        phone: "07907733824",
        address: "357 Leyland Road",
      },
      orderId: "sku-03",
      orderNotes: "Please dont be late!",
      totalPrice: 19.98,
      current: "cleaning",
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
        payload: { orderId },
      } = action;

      const allOrders = {...state.cleaning, ...state.deliver, ...state.done}
      const current = allOrders[orderId].current

      if (current === "done") return;

      if (current === "cleaning") {
        const currentOrder = state.cleaning[orderId];
        currentOrder.current = "delivery"

        state.deliver = {
          ...state.deliver,
          [currentOrder.orderId]: { ...currentOrder },
        };
        
        delete state.cleaning[orderId];
      }
      
      if (current === "delivery") {
        const currentOrder = state.deliver[orderId];
        currentOrder.current = "done"
        state.done = {
          ...state.done,
          [currentOrder.orderId]: { ...currentOrder },
        };
        console.log(currentOrder.orderId);
        delete state.deliver[orderId];
      }
    },
    markAsPaid: (state: OrderSliceInterface, action:PayloadAction<markAsPaidPayload>) => {
      const {current, orderId, paymentType} = action.payload
      console.log(`${orderId} - In Redux`)

      if (current === "cleaning") {
        state.cleaning[orderId].paymentInfo.payment = paymentType
      }
      if (current === "delivery") {
        state.deliver[orderId].paymentInfo.payment = paymentType
      }
      if (current === "done") {
        state.done[orderId].paymentInfo.payment = paymentType
      }
    }
  },
});

export default orderSlice;
