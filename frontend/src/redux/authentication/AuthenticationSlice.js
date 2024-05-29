import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated:false,
    user:null,
}

const AuthenticationSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        set_authentication:(state, action) =>{
            state.user = action.payload.username,
            state.isAuthenticated = action.payload.is_authenticated
        }
    }
})

export const {set_authentication} = AuthenticationSlice.actions
export default AuthenticationSlice.reducer