import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    cart : []    
}

const cartSlice = createSlice({
    name : 'cartItem',
    initialState : initialValue,
    reducers : {
        handleAddItem : (state,action)=>{
            state.cart = [...action.payload]
        },
        
        
    }
})

export const  { handleAddItem } = cartSlice.actions

export default cartSlice.reducer