import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../featurs/authSlice'
import apiSlice from "../featurs/apiSlice";
import messageSlice from '../featurs/messageSlice'
const store=configureStore({
    reducer:{
        auth:authSlice,
        message:messageSlice,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(apiSlice.middleware)
})
export default store;
const initialzeApp=async ()=>{
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initialzeApp()