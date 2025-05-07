import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Sparkles, Volume2, VolumeX, RefreshCw, MessageSquare, Loader, Moon, Sun, Zap, Brain, Lightbulb } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const VoiceChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('creative');
  
  const messagesEndRef = useRef(null);
  const recognition = useRef(null);
  
  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition();
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
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError('Speech recognition is not supported in your browser.');
    }
    
    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
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
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    try {
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
              content: `You are a helpful AI assistant with a ${theme === 'creative' ? 'creative and imaginative' : theme === 'analytical' ? 'logical and analytical' : 'friendly and conversational'} personality. Respond in a ${theme === 'creative' ? 'creative, metaphorical' : theme === 'analytical' ? 'precise, fact-based' : 'warm, supportive'} manner.`
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            userMessage
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from OpenAI');
      }
      
      const data = await response.json();
      const botMessage = { role: 'assistant', content: data.choices[0].message.content };
      setMessages(prev => [...prev, botMessage]);
      
      // Speak the response
      speakText(botMessage.content);
      
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a female English voice
      const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') && voice.lang.includes('en')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  
  const clearChat = () => {
    setMessages([]);
    setInput('');
    setError(null);
    
    // Stop any ongoing speech
    if (isSpeaking) {
      stopSpeaking();
    }
  };
  
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    
    // Add a system message about the theme change
    const themeMessage = { 
      role: 'assistant', 
      content: `I've switched to ${newTheme === 'creative' ? 'Creative Mode! I will be more imaginative and think outside the box.' : newTheme === 'analytical' ? 'Analytical Mode! I will focus on facts, logic, and precise information.' : 'Friendly Mode! I will be conversational and supportive in my responses.'}`
    };
    
    setMessages(prev => [...prev, themeMessage]);
    
    // Speak the theme change message
    speakText(themeMessage.content);
  };
  
  const getThemeIcon = (themeType) => {
    switch (themeType) {
      case 'creative':
        return <Lightbulb className="h-6 w-6" />;
      case 'analytical':
        return <Brain className="h-6 w-6" />;
      case 'friendly':
        return <Sun className="h-6 w-6" />;
      default:
        return <Sparkles className="h-6 w-6" />;
    }
  };
  
  const getThemeColor = () => {
    switch (theme) {
      case 'creative':
        return 'from-fuchsia-600 to-violet-600';
      case 'analytical':
        return 'from-blue-600 to-cyan-600';
      case 'friendly':
        return 'from-amber-500 to-orange-600';
      default:
        return 'from-purple-600 to-indigo-600';
    }
  };
  
  const getThemeAccentColor = () => {
    switch (theme) {
      case 'creative':
        return 'text-fuchsia-600 bg-fuchsia-100 hover:bg-fuchsia-200';
      case 'analytical':
        return 'text-blue-600 bg-blue-100 hover:bg-blue-200';
      case 'friendly':
        return 'text-amber-600 bg-amber-100 hover:bg-amber-200';
      default:
        return 'text-purple-600 bg-purple-100 hover:bg-purple-200';
    }
  };
  
  const getThemeButtonColor = () => {
    switch (theme) {
      case 'creative':
        return 'from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700';
      case 'analytical':
        return 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700';
      case 'friendly':
        return 'from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700';
      default:
        return 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700';
    }
  };
  
  const getThemeBubbleColor = () => {
    switch (theme) {
      case 'creative':
        return 'bg-fuchsia-600 text-white';
      case 'analytical':
        return 'bg-blue-600 text-white';
      case 'friendly':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-purple-600 text-white';
    }
  };
  
  const getThemeGradientBar = () => {
    switch (theme) {
      case 'creative':
        return 'from-fuchsia-400 via-purple-500 to-violet-500';
      case 'analytical':
        return 'from-blue-400 via-cyan-500 to-teal-500';
      case 'friendly':
        return 'from-amber-400 via-orange-500 to-red-500';
      default:
        return 'from-purple-400 via-pink-500 to-red-500';
    }
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-white pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className={`bg-gradient-to-r ${getThemeColor()} rounded-3xl shadow-xl overflow-hidden mb-8`}>
            <div className="px-8 py-10 text-white">
              <div className="flex items-center">
                {getThemeIcon(theme)}
                <div className="ml-5">
                  <h1 className="text-4xl font-bold mb-2">AI Conversation Assistant</h1>
                  <p className="text-white/90 text-lg">
                    Chat with an AI that adapts to different conversation styles
                  </p>
                </div>
              </div>
              <div className="mt-6 max-w-3xl">
                <div className="flex items-start">
                  <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-white/90">Switch between different AI personalities</p>
                </div>
                <div className="flex items-start mt-2">
                  <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-white/90">Use voice or text to communicate naturally</p>
                </div>
                <div className="flex items-start mt-2">
                  <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-white/90">Get responses tailored to your preferred style</p>
                </div>
              </div>
            </div>
            <div className={`h-2 bg-gradient-to-r ${getThemeGradientBar()}`}></div>
          </div>

          {/* AI Personality Selector */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose AI Personality</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => changeTheme('creative')}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  theme === 'creative' 
                    ? 'bg-fuchsia-100 text-fuchsia-700 border-2 border-fuchsia-300' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-fuchsia-50'
                }`}
              >
                <Lightbulb className={`h-4 w-4 mr-2 ${theme === 'creative' ? 'text-fuchsia-600' : 'text-gray-500'}`} />
                Creative
              </button>
              <button
                onClick={() => changeTheme('analytical')}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  theme === 'analytical' 
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-blue-50'
                }`}
              >
                <Brain className={`h-4 w-4 mr-2 ${theme === 'analytical' ? 'text-blue-600' : 'text-gray-500'}`} />
                Analytical
              </button>
              <button
                onClick={() => changeTheme('friendly')}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  theme === 'friendly' 
                    ? 'bg-amber-100 text-amber-700 border-2 border-amber-300' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-amber-50'
                }`}
              >
                <Sun className={`h-4 w-4 mr-2 ${theme === 'friendly' ? 'text-amber-600' : 'text-gray-500'}`} />
                Friendly
              </button>
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Chat Messages */}
            <div className="h-[450px] overflow-y-auto p-6 bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${getThemeAccentColor()}`}>
                    {getThemeIcon(theme)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Start a Conversation</h3>
                  <p className="text-gray-500 max-w-sm">
                    Choose an AI personality above and start chatting! You can use the microphone button or type your message below.
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.role === 'user'
                            ? `${getThemeBubbleColor()} rounded-br-none`
                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="mb-4 flex justify-start">
                      <div className="max-w-[80%] p-4 rounded-2xl bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm">
                        <div className="flex items-center">
                          <Loader className={`h-5 w-5 animate-spin mr-2 ${theme === 'creative' ? 'text-fuchsia-600' : theme === 'analytical' ? 'text-blue-600' : theme === 'friendly' ? 'text-amber-600' : 'text-purple-600'}`} />
                          <p>Thinking...</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border-t border-red-200">
                <p className="text-red-600 text-sm flex items-center">
                  <span className="mr-2">⚠️</span> {error}
                </p>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={handleSubmit} className="flex items-center">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-3 rounded-full mr-3 flex-shrink-0 transition-all ${
                    isListening
                      ? 'bg-red-100 text-red-600 animate-pulse'
                      : getThemeAccentColor()
                  }`}
                  title={isListening ? 'Stop listening' : 'Start listening'}
                >
                  {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className={`flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 ${
                    theme === 'creative' 
                      ? 'focus:ring-fuchsia-500' 
                      : theme === 'analytical' 
                        ? 'focus:ring-blue-500' 
                        : theme === 'friendly' 
                          ? 'focus:ring-amber-500' 
                          : 'focus:ring-purple-500'
                  } focus:border-transparent`}
                  placeholder="Type your message or use voice input..."
                />
                <div className="flex ml-3">
                  <button
                    type="button"
                    onClick={clearChat}
                    className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 mr-2"
                    title="Clear chat"
                  >
                    <RefreshCw className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={isSpeaking ? stopSpeaking : () => {}}
                    className={`p-3 rounded-full mr-2 ${
                      isSpeaking
                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                    disabled={!isSpeaking}
                    title={isSpeaking ? 'Stop speaking' : 'Not speaking'}
                  >
                    {isSpeaking ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </button>
                  <button
                    type="submit"
                    className={`p-3 bg-gradient-to-r ${getThemeButtonColor()} text-white rounded-full shadow-md hover:shadow-lg transition-all`}
                    disabled={isLoading || !input.trim()}
                    title="Send message"
                  >
                    <Send className="h-6 w-6" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VoiceChat;