import { CustomerInterface } from "../Components/CustomerInterface"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCustomerState: CustomerInterface[] = [
    {
        address:"357 Leyland Road",
        name:"Ahmed McGarry",
        phone:"07907733824",
        email:"123",
        orders: []
    },
    {
        address:"357 Leyland Road",
        name:"Adam McGarry",
        phone:"0500564304",
        email:"123",
        orders: []
    },
    {
        address:"357 Leyland Road",
        name:"Alicia McGarry",
        phone:"123456789",
        email:"123",
        orders: []
    },

]

interface editInterface {
    newCustomer: CustomerInterface;
    customer: CustomerInterface;
}

interface addToHistoryInterface {
    orderId: string;
    customerPhone: string;
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
        },
        addToOrderHistory: (state: CustomerInterface[], action: PayloadAction<addToHistoryInterface>) => {
            state.map(el => {
                if (el.phone === action.payload.customerPhone) {
                    return el.orders.push(action.payload.orderId)
                }
                return el
            })
        }
    },
})

export const { addCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice