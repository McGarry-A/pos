import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import customerSlice from "./customerSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
    reducer: {
        customers: customerSlice.reducer,
        orders: orderSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;