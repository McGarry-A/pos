import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderInterface } from "../Components/OrderInterface";

interface OrderSliceInterface {
  cleaning: OrderInterface;
  deliver: OrderInterface;
  done: OrderInterface;
}

interface ProcessInterface {
  orderId: string;
  current: "cleaning" | "delivery";
}

const initialState: OrderSliceInterface = {
  cleaning: {},
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
        console.log(currentOrder.orderId)
        delete state.cleaning[orderId];
      }
      if (current === "delivery") {
        const currentOrder = state.deliver[orderId];
        state.done = {
          ...state.done,
          [currentOrder.orderId]: { ...currentOrder },
        };
        console.log(currentOrder.orderId)
        delete state.deliver[orderId];
      }
    },
  },
});

export default orderSlice;
