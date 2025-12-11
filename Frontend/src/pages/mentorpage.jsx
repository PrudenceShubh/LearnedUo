import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import studentlogo from '../assets/images/Product image.png'
import Aimentor  from '../assets/images/AI Mentor logo.png'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import AIService from '../services/aiService'

const Mentorpage = () => {
    const [conversation, setConversation] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [lastTranscript, setLastTranscript] = useState('');
    const timeoutRef = useRef(null);
    const aiService = useMemo(() => new AIService(), []);
    
    const startlistning =()=>{ SpeechRecognition.startListening({ continuous: false , language: 'en-IN' })}
    
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
    
    // Define handleSendToAI first before using it in useEffect
    const handleSendToAI = useCallback(async (userInput) => {
        if (!userInput.trim() || isProcessing) return;
        
        setIsProcessing(true);
        
        try {
            // Add user message to conversation
            const newUserMessage = {
                type: 'user',
                message: userInput,
                timestamp: new Date().toLocaleTimeString()
            };
            
            setConversation(prev => [...prev, newUserMessage]);
            
            // Prepare conversation history for AI
            const conversationHistory = conversation.map(msg => ({
                user: msg.type === 'user' ? msg.message : '',
                ai: msg.type === 'mentor' ? msg.message : ''
            })).filter(msg => msg.user || msg.ai);
            
            // Send to AI
            const response = await aiService.chat(userInput, conversationHistory);
            
            if (response.success) {
                // Add AI response to conversation
                const aiMessage = {
                    type: 'mentor',
                    message: response.response,
                    timestamp: new Date().toLocaleTimeString()
                };
                
                setConversation(prev => [...prev, aiMessage]);
            } else {
                console.error('AI Error:', response.error);
                // Add error message
                const errorMessage = {
                    type: 'mentor',
                    message: 'Sorry, I encountered an error. Please try again.',
                    timestamp: new Date().toLocaleTimeString()
                };
                setConversation(prev => [...prev, errorMessage]);
            }
            
        } catch (error) {
            console.error('Error sending to AI:', error);
            // Add error message
            const errorMessage = {
                type: 'mentor',
                message: 'Sorry, I\'m having trouble connecting. Please try again.',
                timestamp: new Date().toLocaleTimeString()
            };
            setConversation(prev => [...prev, errorMessage]);
        } finally {
            setIsProcessing(false);
            resetTranscript(); // Clear the transcript after processing
        }
    }, [isProcessing, conversation, aiService, resetTranscript]);

    const stopListening = () => { 
        SpeechRecognition.stopListening();
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Immediately send current transcript to AI if there's content
        if (transcript && transcript.trim()) {
            handleSendToAI(transcript);
        }
    }
    
    // Effect to handle automatic AI processing when user stops speaking
    useEffect(() => {
        if (transcript && transcript !== lastTranscript) {
            // Clear existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            
            // Set new timeout for 2 seconds
            timeoutRef.current = setTimeout(() => {
                handleSendToAI(transcript);
            }, 2000);
            
            setLastTranscript(transcript);
        }
        
        // Cleanup timeout on unmount
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [transcript, lastTranscript, handleSendToAI]);
    
    const clearConversation = () => {
        setConversation([]);
        resetTranscript();
        setLastTranscript('');
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
    
    console.log(transcript)
    if(!browserSupportsSpeechRecognition){
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-red-500 text-xl">Browser doesn't support speech recognition.</div>
            </div>
        )
    }
    return (
    <div>

        <div className="flex items-center justify-center  pt-6">
            <div className="bg-gray-200 h-120 w-[60%]  border rounded relative">
                <div className="flex  items-center h-full  justify-center ">
                    <img src={Aimentor} className="h-40 flex  " alt="" />
                </div>
                {/* Student logo positioned in the corner */}
                <div className="absolute bottom-3 right-3">
                    <img src={studentlogo} className="h-24 w-24 object-contain rounded-full shadow-md border border-white" alt="" />
                </div>
            </div>
        </div>






        {/* <div className=" h-120 bg-gray-300 flex pt-10 items-center justify-evenly border ">
            <div className="bg-red-500 flex items-center  justify-center  h-70 w-150 border rounded-3xl  ">
                <img src={studentlogo} className="h-50" alt="" />
            </div>
            <div className="bg-blue-500 h-70 w-150 border rounded-3xl  flex items-center  justify-center ">
                <img className="h-50" src={Aimentor} alt="" />
            </div>
        </div> */}

    
        <div className="flex gap-4 justify-center mt-5">
            <button className="text-xl bg-blue-500 p-5 font-bold rounded-lg hover:bg-blue-600 transition-colors" onClick={startlistning}>Start Listening</button>
            <button className="text-xl bg-green-500 p-5 font-bold rounded-lg hover:bg-green-600 transition-colors" onClick={stopListening}>Stop & Send to AI</button>
            <button className="text-xl bg-red-500 p-5 font-bold rounded-lg hover:bg-red-600 transition-colors" onClick={clearConversation}>Clear Conversation</button>
        </div>
        
        {/* Transcript Display Section */}
        <div className="mt-8 mx-auto max-w-4xl px-4"> 
            <h2 className="text-2xl font-bold text-center mb-4">AI Mentor Conversation</h2>
            
            {/* Live Transcript */}
            {transcript && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Live Transcript:</h3>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                        <p className="text-gray-800">{transcript}</p>
                        {isProcessing ? (
                            <div className="mt-2 text-sm text-blue-600">
                                Processing... AI is generating response
                            </div>
                        ) : (
                            <div className="mt-2 text-sm text-green-600">
                                💡 AI will respond automatically after 2 seconds of silence, or click "Stop & Send to AI" to send immediately
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Conversation History */}
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 min-h-40 max-h-96 overflow-y-auto shadow-lg">
                {conversation.length === 0 ? (
                    <div className="text-gray-500 text-center italic space-y-2">
                        <div>Start speaking to begin your conversation with the AI Mentor...</div>
                        <div className="text-sm">
                            📢 Speak your question, then either:<br/>
                            • Wait 2 seconds for automatic AI response<br/>
                            • Click "Stop & Send to AI" for immediate response
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {conversation.map((msg, index) => (
                            <div key={index} className={`${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                                <div className={`inline-block max-w-3xl p-3 rounded-lg ${
                                    msg.type === 'user' 
                                        ? 'bg-blue-100 text-blue-900' 
                                        : 'bg-green-100 text-green-900'
                                }`}>
                                    <div className="font-bold text-sm mb-1">
                                        {msg.type === 'user' ? 'User' : 'Mentor'} 
                                        <span className="text-xs font-normal ml-2 opacity-70">
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isProcessing && (
                            <div className="text-left">
                                <div className="inline-block max-w-3xl p-3 rounded-lg bg-gray-100 text-gray-600">
                                    <div className="font-bold text-sm mb-1">Mentor</div>
                                    <div className="text-sm">
                                        <span className="animate-pulse">Thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

    </div>


  );
};

export default Mentorpage;
