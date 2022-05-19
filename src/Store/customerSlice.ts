import { CustomerInterface } from "../Components/CustomerInterface"
import { AnyAction, createSlice } from "@reduxjs/toolkit";

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
        addCustomer: (state: CustomerInterface[], action: AnyAction) => {
            switch (action.type) {
                case "ADD_CUSTOMER":
                    state.push(action.payload)
                    break;
                default:
                    console.log("default")
                    break;
            }

            return state
        },
        deleteCustomer: (state: CustomerInterface[], action: AnyAction) => {
            console.log("delete customer");
        }
    },
})

export const { addCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice