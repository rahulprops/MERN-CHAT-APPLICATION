import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_API="http://localhost:8590/api"
 const apiSlice=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_API,
        credentials:'include'
    }),
    endpoints: () => ({}),
})
export default apiSlice;