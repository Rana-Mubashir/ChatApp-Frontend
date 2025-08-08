import React, { useEffect, useState, useRef } from 'react';
import { FiSearch, FiMoreVertical, FiPaperclip, FiMic, FiSmile, FiUserPlus } from 'react-icons/fi';
import { BsThreeDotsVertical, BsArrowLeft } from 'react-icons/bs';
import { RiMessage2Line } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import axios from 'axios';
import io from 'socket.io-client';

const LandingPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null)

  const [allUsers, setAllUsers] = useState([])

  const socketRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    setUser(userData)
    getAllUsers(userData._id)
    socketRef.current = io('http://localhost:4049');
  }, [])

  async function getAllUsers(id) {
    try {
      const resp = await axios.get(`/api/user/all/${id}`)
      if (resp) {
        setAllUsers(resp?.data?.users)
      }
    } catch (error) {
      console.log("error in getting all users", error)
    }
  }

  const myUser = {
    id: 0,
    name: 'You',
    avatar: '',
    status: 'online'
  };

  const startNewChat = async (currentUer) => {
    try {
      const participants = [user._id, currentUer._id]
      const resp = await axios.post('/api/v1/chat/access', { participants })
      console.log(resp)
      if (resp) {
        const newChat = {
          id: currentUer._id,
          name: currentUer.firstName,
          chatId: resp?.data?.chatId,
          messages: resp?.data?.messages
        };
        setActiveChat(newChat);
        setShowAllUsers(false);
        socketRef.current.emit("joinRoom", resp.data.chatId);
      }
    } catch (error) {
      console.log("error in access chat", error)
    }
  };

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on('receiveMessage', (newMessage) => {
      console.log('Message received:', newMessage);
      setActiveChat(prevChat => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage]
      }));
    });

    return () => {
      socketRef.current.off('receiveMessage');
    };
  }, []);

  async function handleSendMessage(chatId) {
    try {
      const data = {
        senderId: user._id,
        message,
        chatId
      }
      const resp = await axios.post('/api/v1/chat/message', data)
      if (resp) {
        socketRef.current.emit("sendMessage", {
          chatId,
          message,
          senderId: user._id
        });
        console.log("response for sending message", resp)
      }
    } catch (error) {
      console.log("error in sending message", error)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar */}
      <div className={`${activeChat ? 'hidden md:block' : 'block'} w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200`}>
        {/* User profile header */}
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white">
              <AiOutlineUser className="text-xl" />
            </div>
            <span className="ml-2 font-medium text-gray-800">{myUser.name}</span>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <button
              onClick={() => setShowAllUsers(true)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FiUserPlus className="text-xl" />
            </button>
            <BsThreeDotsVertical className="text-xl cursor-pointer" />
          </div>
        </div>

        {/* Search bar */}
        <div className="p-3 bg-white">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white"
              placeholder="Search or start new chat"
            />
          </div>
        </div>

        {/* Discoverable users section */}
        <div className="px-3 pt-2 pb-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Discover People</h3>
            <button
              onClick={() => setShowAllUsers(true)}
              className="text-xs text-blue-500 hover:text-blue-700"
            >
              See all
            </button>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-3">
            {allUsers.slice(0, 5).map(user => (
              <div
                key={user.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => startNewChat(user)}
              >
                <div className="relative">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green-500' : user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                </div>
                <span className="text-xs mt-1 text-gray-700 truncate max-w-[60px]">{user?.firstName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right chat area */}
      {activeChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <div className="flex items-center">
              <button
                className="md:hidden mr-2 text-gray-600 hover:text-gray-800"
                onClick={() => setActiveChat(null)}
              >
                <BsArrowLeft className="text-xl" />
              </button>
              <div className="relative">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt={activeChat?.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500"></div>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">{activeChat?.name}</h3>
                <p className="text-xs text-gray-600">Online</p>
              </div>
            </div>
            <div className="flex space-x-4 text-gray-600">
              <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <FiSearch className="text-xl" />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <FiMoreVertical className="text-xl" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div
            className="flex-1 p-4 overflow-y-auto bg-[#e5ddd5] bg-opacity-30"
            style={{ backgroundImage: "url('https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e7195b6b733d9110b408f075d.png')" }}
          >
            <div className="space-y-3">
              {activeChat?.messages.length > 0 ? (
                activeChat.messages.map(msg => (
                  <div
                    key={msg?._id}
                    className={`flex ${msg?.senderId === user._id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 shadow-sm ${msg?.senderId === user._id ? 'bg-blue-100 rounded-tr-none' : 'bg-white rounded-tl-none'}`}
                    >
                      <p className="text-gray-800">{msg?.message}</p>
                      <div className="flex justify-end items-center mt-1 space-x-1">
                        <span className="text-xs text-gray-500">{msg?.time}</span>
                        {msg?.sender === 'me' && (
                          <BiCheckDouble className="text-xs text-blue-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <RiMessage2Line className="text-blue-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-1">No messages yet</h3>
                  <p className="text-gray-500">Send your first message to start the conversation</p>
                </div>
              )}
            </div>
          </div>

          {/* Message input */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex space-x-2 text-gray-500 mr-2">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <FiSmile className="text-xl" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <FiPaperclip className="text-xl" />
                </button>
              </div>
              <input
                type="text"
                className="flex-1 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              // onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className="ml-2 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                onClick={() => handleSendMessage(activeChat.chatId)}
              >
                {message.trim() ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <FiMic className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : showAllUsers ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="flex items-center p-3 border-b border-gray-200">
            <button
              className="p-1 mr-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowAllUsers(false)}
            >
              <BsArrowLeft className="text-xl" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Discover People</h2>
          </div>

          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white"
                placeholder="Search people"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Users list */}
          <div className="flex-1 overflow-y-auto">
            {allUsers.length > 0 ? (
              allUsers.map(user => (
                <div
                  key={user._id}
                  className="flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => startNewChat(user)}
                >
                  <div className="relative">
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt={user?.firstName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    {/* <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green-500' : user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div> */}
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="font-medium text-gray-800">{user?.firstName}</h3>
                    {/* <p className="text-sm text-gray-500">{user.mutualConnections} mutual connections</p> */}
                  </div>
                  <button className="p-2 text-blue-500 hover:text-blue-700">
                    <RiMessage2Line className="text-xl" />
                  </button>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <FiUserPlus className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-1">No users found</h3>
                <p className="text-gray-500">Try searching with different terms</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
            <RiMessage2Line className="text-blue-400 text-6xl" />
          </div>
          <h2 className="text-3xl font-light text-gray-800 mb-2">Welcome to ChatApp</h2>
          <p className="text-gray-600 mb-8 max-w-md text-center">
            Connect with friends and colleagues. Start a new conversation or continue an existing one.
          </p>
          <button
            onClick={() => setShowAllUsers(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition-all flex items-center"
          >
            <FiUserPlus className="mr-2" />
            Discover People
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;