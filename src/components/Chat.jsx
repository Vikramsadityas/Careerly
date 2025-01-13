// Chat.jsx
import React, { useState, useEffect } from 'react';
import { Send, X, User, Phone, Video, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chat = ({ contact, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [currentUser] = useState({ id: 1 });

  // Dummy messages data
  const dummyMessages = [
    {
      messageId: 1,
      sender: 1,
      receiver: 2,
      messageContent: "Hey, how's your job search going?",
      timestamp: "2024-01-12T10:30:00"
    },
    {
      messageId: 2,
      sender: 2,
      receiver: 1,
      messageContent: "It's going well! I have an interview next week.",
      timestamp: "2024-01-12T10:31:00"
    },
    {
      messageId: 3,
      sender: 1,
      receiver: 2,
      messageContent: "That's great news! Which company?",
      timestamp: "2024-01-12T10:32:00"
    }
  ];

  useEffect(() => {
    setMessages(dummyMessages);
  }, []);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      messageId: Date.now(),
      sender: currentUser.id,
      receiver: contact?.id,
      messageContent: messageInput,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <motion.div 
      className="flex-1 flex flex-col h-[600px] bg-gray-900/40 backdrop-blur-xl rounded-lg border border-gray-700/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Chat Header */}
      <motion.div 
        className="p-4 bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/30 rounded-t-lg"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                {contact ? getInitials(contact.name) : <User className="w-6 h-6" />}
              </div>
              {contact?.online && (
                <motion.div 
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-800"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              )}
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-100">{contact?.name || 'Select Contact'}</h3>
              <span className="text-sm text-gray-400">{contact?.online ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {contact && (
              <>
                <motion.button 
                  className="p-2 hover:bg-gray-700/30 rounded-full text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  className="p-2 hover:bg-gray-700/30 rounded-full text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Video className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  className="p-2 hover:bg-gray-700/30 rounded-full text-gray-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MoreVertical className="w-5 h-5" />
                </motion.button>
              </>
            )}
            <motion.button 
              className="p-2 hover:bg-gray-700/30 rounded-full text-gray-300"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.messageId}
              className={`flex ${msg.sender === currentUser.id ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <motion.div
                className={`max-w-[70%] p-3 rounded-2xl ${
                  msg.sender === currentUser.id
                    ? 'bg-blue-500/80 backdrop-blur-sm text-white'
                    : 'bg-gray-700/50 backdrop-blur-sm text-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <p>{msg.messageContent}</p>
                <span className="text-xs mt-1 opacity-70 block">
                  {formatTime(msg.timestamp)}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Message Input */}
      {contact && (
        <motion.div 
          className="p-4 bg-gray-800/30 backdrop-blur-sm border-t border-gray-700/30"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-3 bg-gray-900/50 text-gray-100 rounded-xl border border-gray-700/30 focus:outline-none focus:border-blue-500/50 placeholder-gray-500"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <motion.button 
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
              onClick={handleSendMessage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Chat;