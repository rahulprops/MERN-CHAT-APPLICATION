import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isAuthenticated:false
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        userLoggedIn:(state,action)=>{
            state.user=action.payload.data.data,
            state.isAuthenticated=true
        },
        userLoggout:(state,action)=>{
            state.user=null,
            state.isAuthenticated=false
        }
    }
})
export const {userLoggedIn,userLoggout}=authSlice.actions;
export default authSlice.reducer;