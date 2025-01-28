import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../featurs/authSlice'
import apiSlice from "../featurs/apiSlice";
const store=configureStore({
    reducer:{
        auth:authSlice,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(apiSlice.middleware)
})
export default store;
const initialzeApp=async ()=>{
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initialzeApp()