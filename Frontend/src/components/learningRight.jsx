import React, { useState } from 'react';
import { IoIosSend } from "react-icons/io";
import AIService from '../services/aiService'; // Make sure this file exists and works

const LearningRight = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const aiService = new AIService();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    // Add user message immediately
    setMessages(prev => [...prev, { sender: "user", text: trimmed }]);
    setInputText(""); 
    setIsLoading(true);

    try {
      // Prepare conversation history for AI
      const conversationHistory = messages.map(msg => ({
        user: msg.sender === 'user' ? msg.text : '',
        ai: msg.sender === 'bot' ? msg.text : ''
      })).filter(msg => msg.user || msg.ai);

      // Call AI service
      const response = await aiService.chat(trimmed, conversationHistory);
      
      if (response.success) {
        setMessages(prev => [...prev, { sender: "bot", text: response.response }]);
      } else {
        setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I'm having trouble responding right now. Please try again!" }]);
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I'm having trouble responding right now. Please try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      handleSend();
    }
  };

  return (
    <div className='p-5'>
      <div className='bg-gray-100 h-[600px] w-full border rounded-xl flex flex-col justify-between'>

        {/* Chat History */}
        <div className='bg-gray-200 h-full w-full p-5 overflow-y-auto rounded-t-xl'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-3 max-w-[70%] rounded-lg whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "ml-auto bg-gray-600 text-white"
                  : "mr-auto bg-white text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Loading bubble */}
          {isLoading && (
            <div className="mr-auto bg-white text-black my-2 p-3 max-w-[70%] rounded-lg">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className='bg-gray-300 w-full p-4 flex items-center gap-3 rounded-b-xl'>
          <textarea
            placeholder='Ask anything...'
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isLoading}
            className={`flex-1 resize-none p-2 overflow-hidden rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className={`text-3xl ${
              isLoading || !inputText.trim() 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningRight;
