import { useDispatch } from "react-redux";
import { useSocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import { addMessage } from "../featurs/messageSlice";

const useGetRealTimeMess = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      dispatch(addMessage(newMessage)); // Append message instead of replacing all messages
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch],addMessage);
};

export default useGetRealTimeMess;
