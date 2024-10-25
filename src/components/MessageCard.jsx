import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Phone, Video, Paperclip, Smile } from "lucide-react";

const MessageCard = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const wsRef = useRef(null);

  const messages = [
    {
      id: 1,
      name: "John Doe",
      message: "Hey, how's it going? Did you check the project files I sent yesterday?",
      time: "10:30 AM",
      unread: 2,
      lastSeen: "online",
    },
    {
      id: 2,
      name: "Product Team",
      message: "Alice: The new designs are ready for review 👍",
      time: "9:45 AM",
      unread: 5,
      lastSeen: "2 min ago",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      message: "Thanks for your help! The issue has been resolved.",
      time: "Yesterday",
      unread: 0,
      lastSeen: "5 min ago",
    }
  ];

  // Get background color based on name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-indigo-500',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Get first letter of name
  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    connectWebSocket();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://your-websocket-server.com');
    wsRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus('connected');
      console.log('WebSocket Connected');
    };

    ws.onclose = () => {
      setConnectionStatus('disconnected');
      console.log('WebSocket Disconnected');
      setTimeout(connectWebSocket, 3000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setConnectionStatus('error');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleIncomingMessage(data);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };
  };

  const handleIncomingMessage = (data) => {
    const { chatId, message, sender, timestamp } = data;
    
    const newMessage = {
      id: Date.now(),
      text: message,
      time: new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      sent: false,
      sender
    };

    setChatMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat || connectionStatus !== 'connected') return;

    const messageData = {
      type: 'message',
      chatId: selectedChat.id,
      message: messageInput,
      timestamp: new Date().toISOString()
    };

    try {
      wsRef.current.send(JSON.stringify(messageData));
      
      const newMessage = {
        id: Date.now(),
        text: messageInput,
        time: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        sent: true
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
      }));
      
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const ConnectionStatus = () => (
    <div className={`px-2 py-1 rounded-full text-xs ${
      connectionStatus === 'connected' 
        ? 'bg-green-100 text-green-800'
        : connectionStatus === 'error'
          ? 'bg-red-100 text-red-800'
          : 'bg-yellow-100 text-yellow-800'
    }`}>
      {connectionStatus === 'connected' ? 'Connected' : 
       connectionStatus === 'error' ? 'Connection Error' : 
       'Connecting...'}
    </div>
  );

  return (
    <div className="max-w-4xl bg-gray-50 p-4 relative">
      <div className="mb-4 flex justify-end">
        <ConnectionStatus />
      </div>
      
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className="mb-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => setSelectedChat(msg)}
        >
          <div className="p-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg ${getAvatarColor(msg.name)}`}>
                  {getInitial(msg.name)}
                </div>
                {msg.lastSeen === "online" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {msg.name}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {msg.time}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 truncate max-w-[500px]">
                    {msg.message}
                  </p>
                  {msg.unread > 0 && (
                    <span className="ml-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {msg.unread}
                    </span>
                  )}
                </div>
                
                <div className="text-left">
                  {msg.lastSeen !== "online" && (
                    <span className="text-xs text-gray-400">
                      {msg.lastSeen}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {selectedChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[80vw] h-[80vh] rounded-lg flex flex-col">
            <div className="p-4 bg-gray-100 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(selectedChat.name)}`}>
                  {getInitial(selectedChat.name)}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedChat.name}</h3>
                  <span className="text-sm text-gray-500">{selectedChat.lastSeen}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <Phone className="w-5 h-5" />
                </button>
                <button 
                  className="p-2 hover:bg-gray-200 rounded-full"
                  onClick={() => setSelectedChat(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {(chatMessages[selectedChat.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sent ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.sent
                        ? 'bg-green-500 text-white rounded-tr-none'
                        : 'bg-white rounded-tl-none'
                    }`}
                  >
                    <p className="text-left">{msg.text}</p>
                    <span className="text-xs mt-1 opacity-70 block text-left">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-100">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  placeholder={connectionStatus === 'connected' 
                    ? "Type a message" 
                    : "Connecting to chat..."}
                  className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  disabled={connectionStatus !== 'connected'}
                />
                <button 
                  className={`p-2 rounded-full ${
                    connectionStatus === 'connected'
                      ? 'hover:bg-gray-200'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={handleSendMessage}
                  disabled={connectionStatus !== 'connected'}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCard;