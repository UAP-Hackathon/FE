import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Code, User, Bot, Loader, Copy, Check } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const VoiceChat = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your coding assistant. Ask me anything about programming, algorithms, debugging, or any technical questions you have!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognition = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      
      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
      };
      
      recognition.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
  }, []);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful coding assistant specializing in programming, algorithms, and technical topics. Provide concise, accurate answers with code examples when appropriate. Format code blocks properly for readability.'
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      const assistantMessage = { 
        role: 'assistant', 
        content: data.choices[0].message.content 
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error processing your request. Please try again later.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Function to format message content with code blocks
  const formatMessage = (content, index) => {
    // Split by code blocks (```code```)
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Extract language and code
        const codeContent = part.slice(3, -3);
        const firstLineBreak = codeContent.indexOf('\n');
        const language = firstLineBreak > 0 ? codeContent.slice(0, firstLineBreak).trim() : '';
        const code = firstLineBreak > 0 ? codeContent.slice(firstLineBreak + 1) : codeContent;
        
        return (
          <div key={i} className="relative my-2 bg-gray-800 rounded-md overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-700 text-xs text-gray-200">
              <span>{language || 'code'}</span>
              <button 
                onClick={() => copyToClipboard(code, `${index}-${i}`)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {copiedIndex === `${index}-${i}` ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-gray-100 text-sm">
              <code>{code}</code>
            </pre>
          </div>
        );
      } else {
        // Regular text - handle line breaks
        return (
          <p key={i} className="mb-2 whitespace-pre-wrap">
            {part}
          </p>
        );
      }
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 mb-8">
            <div className="bg-indigo-600 text-white p-4 flex items-center">
              <Code className="mr-2" size={24} />
              <h1 className="text-2xl font-bold">Code Assistant</h1>
            </div>
            
            <div className="p-6">
              <p className="text-white/80 mb-6">
                Ask me anything about programming, algorithms, debugging, or any technical questions you have. 
                I can help with code examples, explanations, and best practices.
              </p>
              
              {/* Chat container */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                {/* Messages area */}
                <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          message.role === 'user'
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                              message.role === 'user' ? 'bg-indigo-700' : 'bg-gray-200'
                            }`}
                          >
                            {message.role === 'user' ? (
                              <User size={12} className="text-white" />
                            ) : (
                              <Bot size={12} className="text-indigo-600" />
                            )}
                          </div>
                          <span className="text-xs font-medium">
                            {message.role === 'user' ? 'You' : 'Assistant'}
                          </span>
                        </div>
                        <div className={`text-sm ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                          {formatMessage(message.content, index)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none p-4 border border-gray-200 shadow-sm max-w-[80%]">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <Bot size={12} className="text-indigo-600" />
                          </div>
                          <span className="text-xs font-medium">Assistant</span>
                        </div>
                        <div className="mt-2 flex items-center">
                          <Loader className="animate-spin h-4 w-4 mr-2 text-indigo-600" />
                          <span className="text-sm text-gray-600">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask a coding question..."
                      className="w-full p-3 pr-24 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                    <div className="absolute right-1 top-1 flex">
                      <button
                        type="button"
                        onClick={toggleListening}
                        className={`p-2 rounded-full mr-1 ${
                          isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                        disabled={isLoading}
                      >
                        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                      </button>
                      <button
                        type="submit"
                        className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        disabled={!input.trim() || isLoading}
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VoiceChat;