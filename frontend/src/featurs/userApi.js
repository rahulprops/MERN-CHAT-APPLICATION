import apiSlice from "./apiSlice";
import { userLoggedIn, userLoggout } from "./authSlice";

 export const userApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        userLogin:builder.mutation({
            query:(inputData)=>({
                url:"/user/login",
                method:"POST",
                body:inputData
            }),
            transformResponse:(data)=>{
                return data.data
            },
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result= await queryFulfilled
                    dispatch(userLoggedIn(result))
                }catch(e){
                    console.log(e)
                }
            }
        }),
        loadUser:builder.query({
            query:()=>({
                url:"/user/get-user",
                method:"GET"
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try{
                    const result= await queryFulfilled
                    dispatch(userLoggedIn(result))
                }catch(e){
                    console.log(e)
                }
            }
        }),
        logout:builder.mutation({
            query:()=>({
                url:"/user/logout",
                method:"POST"
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try{
                    dispatch(userLoggout())
                }catch(err){
                    console.log(err)
                }
            }
        }),
        userSignup:builder.mutation({
            query:(inputData)=>({
                url:"",
                method:"POST",
                body:inputData
            })
        })
    })
})
export const { useUserLoginMutation,useLoadUserQuery,useLogoutMutation}=userApi