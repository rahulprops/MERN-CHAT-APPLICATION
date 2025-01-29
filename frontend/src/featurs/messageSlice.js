import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: []
  };
  
  const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
      setMessage: (state, action) => {
        state.message = action.payload; // Store messages as an array
      },
      addMessage: (state, action) => {
        state.message.push(action.payload); // Append new messages
      },
    },
  });
export const {setMessage,addMessage}=messageSlice.actions
export default messageSlice.reducer;