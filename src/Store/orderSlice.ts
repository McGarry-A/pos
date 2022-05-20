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

      console.log(orderId, current)
      const currentOrder = state.cleaning[orderId];

      if (current === "cleaning") {
        state.deliver = { ...state.deliver, currentOrder };
        delete state.cleaning[orderId];
      }
      if (current === "delivery") {
        state.done = { ...state.done, currentOrder };
        delete state.deliver[orderId];
      }
    },
  },
});

export default orderSlice;
