import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {}
})

// Whats this for?
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch


// USE SELECTOR AND USE DISPATCH

// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// import type { RootState, AppDispatch } from './store'
// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;