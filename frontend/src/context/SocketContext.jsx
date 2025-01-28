import React, { createContext, useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { io} from 'socket.io-client'

export const SocketContext=createContext()

export const SocketContextProvider=({children})=>{
 const [socket , setSocket]=useState(null)
 const [onlineUsers,setOnlineUsers]=useState([])
 const {user}=useSelector((store)=>store.auth)

 useEffect(()=>{
  if(user){
   const socket=io("http://localhost:8590")
   setSocket(socket)

   return ()=>socket.close()
  }else{
    if(socket){
        socket.close()
        setSocket(null)
    }
  }


 },[user])

 return (
        <SocketContext.Provider value={{socket , onlineUsers}}>
               {children}
        </SocketContext.Provider>

 )

}
export default SocketContext