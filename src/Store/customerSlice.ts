import { CustomerInterface } from "../Components/CustomerInterface"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCustomerState: CustomerInterface[] = [
    {
        address:"test",
        firstName:"test",
        lastName:"test",
        phone:"123",
        email:"123"
    }
]

const customerSlice = createSlice({
    name: 'customer',
    initialState: initialCustomerState,
    reducers: {
        addCustomer: (state: CustomerInterface[], action: PayloadAction<CustomerInterface>) => {
            return [
                ...state, 
                action.payload
            ]
        },
        deleteCustomer: (state: CustomerInterface[], action: PayloadAction<CustomerInterface>) => {
            console.log("delete customer");
        }
    },
})

export const { addCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice