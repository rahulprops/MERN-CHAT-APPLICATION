import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMessageQuery, useSendMessageMutation } from '../featurs/messageApi';
import { useSelector } from 'react-redux';

const ChatArea = () => {
  const [newMessage, setNewMessage] = useState('');
  const { id } = useParams(); // Receiver ID
const {user}=useSelector((store)=>store.auth)
  const currentUserId = user?._id; // Replace with the actual user ID (e.g., from auth context or state)

  // Fetch messages from the API
  const { data: messages, isSuccess, isError, error } = useGetMessageQuery(id);

  // Send message mutation
  const [sendMessage] = useSendMessageMutation();

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      await sendMessage({ receverId: id, text: newMessage }).unwrap();
      setNewMessage(''); // Clear the input field
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white flex items-center p-4 shadow-md">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="text-lg font-bold">Chat with {id}</h2>
          <p className="text-sm text-gray-300">Online</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        {isSuccess &&
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.senderId === currentUserId ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.senderId === currentUserId
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-800'
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}

        {isError && <p className="text-red-500">Failed to load messages: {error.message}</p>}
      </div>

      {/* Message Input */}
      <div className="bg-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
