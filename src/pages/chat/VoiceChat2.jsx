import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Sparkles, Volume2, VolumeX, RefreshCw, MessageSquare, Loader, Users } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const VoiceChat2 = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [interviewType, setInterviewType] = useState('general');
  
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
      // Create a system message based on the interview type
      const systemMessage = getSystemMessageForInterviewType(interviewType);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemMessage },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            userMessage
          ],
          temperature: 0.7
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
  
  const getSystemMessageForInterviewType = (type) => {
    switch (type) {
      case 'technical':
        return 'You are an experienced technical interviewer for a software engineering position. Ask relevant technical questions about coding, algorithms, system design, and problem-solving. Evaluate the answers and provide constructive feedback. Keep your responses concise and focused on technical topics.';
      case 'behavioral':
        return 'You are an HR professional conducting a behavioral interview. Ask questions about past experiences, how you handle different situations, and your work style. Look for the STAR method in answers. Provide constructive feedback and ask follow-up questions. Keep your responses professional and focused on assessing soft skills.';
      case 'leadership':
        return 'You are an executive interviewer assessing leadership potential. Ask questions about team management, strategic thinking, decision-making, and vision. Evaluate answers for leadership qualities. Provide constructive feedback and ask challenging follow-up questions. Keep your responses focused on leadership assessment.';
      case 'general':
      default:
        return 'You are a professional interviewer conducting a job interview. Ask a mix of general questions about qualifications, experience, and fit for the role. Provide constructive feedback and ask follow-up questions. Keep your responses concise and professional.';
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
  
  const startNewInterview = (type) => {
    clearChat();
    setInterviewType(type);
    
    // Add a welcome message based on the interview type
    const welcomeMessage = getWelcomeMessageForInterviewType(type);
    setMessages([{ role: 'assistant', content: welcomeMessage }]);
    
    // Speak the welcome message
    speakText(welcomeMessage);
  };
  
  const getWelcomeMessageForInterviewType = (type) => {
    switch (type) {
      case 'technical':
        return "Welcome to your technical interview practice session. I'll be asking you questions about your technical skills, problem-solving abilities, and experience with different technologies. Let's begin with your background - could you tell me about your technical experience and the technologies you're most comfortable with?";
      case 'behavioral':
        return "Welcome to your behavioral interview practice session. I'll be asking questions about your past experiences, how you handle different situations, and your work style. Let's start - could you tell me about a challenging situation at work and how you handled it?";
      case 'leadership':
        return "Welcome to your leadership interview practice session. I'll be asking questions about your leadership style, experience managing teams, and strategic thinking. Let's begin - could you describe your leadership philosophy and how you've applied it in your career?";
      case 'general':
      default:
        return "Welcome to your interview practice session. I'll be asking general interview questions to help you prepare for your next job interview. Let's start with a classic - could you tell me a bit about yourself and your career journey?";
    }
  };
  
  const interviewTypes = [
    { id: 'general', name: 'General Interview', description: 'Practice common interview questions' },
    { id: 'technical', name: 'Technical Interview', description: 'Focus on technical skills and problem-solving' },
    { id: 'behavioral', name: 'Behavioral Interview', description: 'Questions about past experiences and soft skills' },
    { id: 'leadership', name: 'Leadership Interview', description: 'Assess leadership potential and management style' }
  ];
  
  return (
    <Layout>
      <div className="min-h-screen bg-white pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-xl overflow-hidden mb-8">
            <div className="px-8 py-10 text-white">
              <div className="flex items-center">
                <Users className="h-12 w-12 mr-5" />
                <div>
                  <h1 className="text-4xl font-bold mb-2">Interview Practice</h1>
                  <p className="text-white/90 text-lg">
                    Prepare for your next job interview with AI-powered practice
                  </p>
                </div>
              </div>
              <div className="mt-6 max-w-3xl">
                <div className="flex items-start">
                  <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-white/90">Practice with different interview types</p>
                </div>
                <div className="flex items-start mt-2">
                  <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-white/90">Get real-time feedback on your responses</p>
                </div>
                <div className="flex items-start mt-2">
                  <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-white/90">Use voice or text to interact naturally</p>
                </div>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
          </div>

          {/* Interview Type Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Interview Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {interviewTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => startNewInterview(type.id)}
                  className={`p-4 rounded-xl border transition-all ${
                    interviewType === type.id
                      ? 'bg-purple-50 border-purple-300 shadow-md'
                      : 'bg-white border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <h3 className={`font-medium mb-1 ${
                    interviewType === type.id ? 'text-purple-700' : 'text-gray-800'
                  }`}>
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Chat Messages */}
            <div className="h-[500px] overflow-y-auto p-6 bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Start Your Interview Practice</h3>
                  <p className="text-gray-500 max-w-sm">
                    Select an interview type above to begin practicing with our AI interviewer.
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
                            ? 'bg-purple-600 text-white rounded-tr-none'
                            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="mb-4 flex justify-start">
                      <div className="max-w-[80%] p-4 rounded-2xl bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm">
                        <div className="flex items-center">
                          <Loader className="h-5 w-5 text-purple-600 animate-spin mr-2" />
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
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
                  title={isListening ? 'Stop listening' : 'Start listening'}
                >
                  {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Type your response or use voice input..."
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
                    className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
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

export default VoiceChat2;