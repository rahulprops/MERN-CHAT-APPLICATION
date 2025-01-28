import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isAuthenticated:false,
    selectUser:null,
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
        },
        selecetUsers:(state,action)=>{
            state.selectUser=action.payload
        }
    }
})
export const {userLoggedIn,userLoggout,selecetUsers}=authSlice.actions;
export default authSlice.reducer;