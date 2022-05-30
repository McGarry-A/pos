import { CustomerInterface } from "../Components/CustomerInterface"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCustomerState: CustomerInterface[] = [
    {
        address:"357 Leyland Road",
        name:"Ahmed McGarry",
        phone:"07907733824",
        email:"123"
    }
]

interface editInterface {
    newCustomer: CustomerInterface;
    customer: CustomerInterface;
}

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
            return state.filter(el => el.phone !== action.payload.phone)
        },
        editCustomer: (state: CustomerInterface[], action: PayloadAction<editInterface>) => {
            console.log("edit customer")
            const { payload: {newCustomer, customer}} = action
            
            state.map(el => {
                if (el.phone === customer.phone) {
                    el.address = newCustomer.address
                    el.name = newCustomer.name
                    el.phone = newCustomer.phone
                    el.email = newCustomer.email

                    return el
                }

                return el
            })
        }
    },
})

export const { addCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice