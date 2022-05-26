import { CustomerInterface } from "../Components/CustomerInterface"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCustomerState: CustomerInterface[] = [
    {
        address:"357 Leyland Road",
        firstName:"Ahmed",
        lastName:"McGarry",
        phone:"07907733824",
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
        }, // REMOVE A CUSTOMER USING ID IDEALLY BUT NOW I GUESS JUST FILTER THE RESULTS BASED ON THE WHOLE ELEMENT
        deleteCustomer: (state: CustomerInterface[], action: PayloadAction<number>) => {
            console.log("delete customer");
        }
    },
})

export const { addCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice