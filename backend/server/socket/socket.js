import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
import { Socket } from 'dgram'

const app=express()

const server =http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:["http://localhost:5173"],
        methods:["GET","POST"]
    }
})

io.on("connection",(Socket)=>{
    console.log("a user connected",Socket.id)

    Socket.on("disconnect",()=>{
        console.log("user disconnected",Socket.id)
    })
})
export {app,server,io}