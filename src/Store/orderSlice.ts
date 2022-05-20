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
      const newState = { ...state };
      const currentOrder = newState.cleaning[orderId];
      if (current === "cleaning") {
        newState.deliver = { ...newState.deliver, currentOrder };
        delete newState.cleaning[orderId];
        console.log("cleaning")
      }
      if (current === "delivery") {
        newState.done = { ...newState.done, currentOrder };
        delete newState.deliver[orderId];
      }
    },
  },
});

export default orderSlice;
