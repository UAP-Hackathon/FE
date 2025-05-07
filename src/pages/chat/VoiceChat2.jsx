import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Square, Settings, User, Bot, Loader, Volume2, VolumeX } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const VoiceChat2 = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your interview preparation assistant. I can help you practice for job interviews. Just speak to me and I'll respond as an interviewer would. What type of interview would you like to practice today?"
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interviewType, setInterviewType] = useState('general');
  const [audioEnabled, setAudioEnabled] = useState(true);
  
  const messagesEndRef = useRef(null);
  const recognition = useRef(null);
  const speechSynthesis = useRef(window.speechSynthesis);
  const utterance = useRef(null);

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
        
        setTranscript(transcript);
      };
      
      recognition.current.onend = () => {
        if (isListening) {
          recognition.current.start();
        }
      };
      
      recognition.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    } else {
      console.error('Speech recognition not supported');
    }

    // Clean up
    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
      if (speechSynthesis.current) {
        speechSynthesis.current.cancel();
      }
    };
  }, []);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle speech synthesis
  useEffect(() => {
    speechSynthesis.current = window.speechSynthesis;
    
    return () => {
      if (speechSynthesis.current) {
        speechSynthesis.current.cancel();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setTranscript('');
    setIsListening(true);
    recognition.current.start();
  };

  const stopListening = async () => {
    recognition.current.stop();
    setIsListening(false);
    
    if (transcript.trim()) {
      await sendMessage(transcript);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (isSpeaking && !audioEnabled) {
      speechSynthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  const speakText = (text) => {
    if (!audioEnabled) return;
    
    if (speechSynthesis.current) {
      // Cancel any ongoing speech
      speechSynthesis.current.cancel();
      
      // Create a new utterance
      utterance.current = new SpeechSynthesisUtterance(text);
      utterance.current.rate = 1.0;
      utterance.current.pitch = 1.0;
      
      // Get available voices and set a good one if available
      const voices = speechSynthesis.current.getVoices();
      if (voices.length) {
        // Try to find a good English voice
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Google') && voice.name.includes('English')
        ) || voices.find(voice => 
          voice.lang.includes('en-')
        ) || voices[0];
        
        utterance.current.voice = preferredVoice;
      }
      
      utterance.current.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.current.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.current.onerror = (event) => {
        console.error('Speech synthesis error', event);
        setIsSpeaking(false);
      };
      
      speechSynthesis.current.speak(utterance.current);
    }
  };

  const sendMessage = async (content) => {
    // Add user message to chat
    const userMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Create system message based on interview type
      let systemPrompt = 'You are an AI interviewer helping a candidate prepare for a job interview. ';
      
      switch (interviewType) {
        case 'technical':
          systemPrompt += 'Focus on technical questions related to programming, algorithms, and system design. Ask challenging technical questions and provide constructive feedback.';
          break;
        case 'behavioral':
          systemPrompt += 'Focus on behavioral questions that assess soft skills, teamwork, conflict resolution, and past experiences. Ask questions like "Tell me about a time when..." and provide constructive feedback.';
          break;
        case 'leadership':
          systemPrompt += 'Focus on leadership questions that assess management style, decision-making, team building, and vision. Ask questions that evaluate leadership potential and provide constructive feedback.';
          break;
        default:
          systemPrompt += 'Ask a mix of common interview questions covering both technical and behavioral aspects. Provide constructive feedback and follow-up questions.';
      }
      
      systemPrompt += ' Keep responses conversational and concise. Act as a real interviewer would, with follow-up questions based on the candidate\'s responses.';
      
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
              content: systemPrompt
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 300
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
      
      // Speak the response
      speakText(assistantMessage.content);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error processing your request. Please try again.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
              <h1 className="text-3xl font-bold mb-2">Interview Practice Assistant</h1>
              <p className="text-white/80">
                Practice your interview skills with voice interaction. Speak naturally and receive feedback as if you're in a real interview.
              </p>
            </div>
            
            {/* Interview Type Selector */}
            <div className="bg-black/20 p-4 flex flex-wrap gap-2 justify-center">
              <button 
                onClick={() => setInterviewType('general')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  interviewType === 'general' 
                    ? 'bg-white text-purple-900' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                General
              </button>
              <button 
                onClick={() => setInterviewType('technical')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  interviewType === 'technical' 
                    ? 'bg-white text-purple-900' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Technical
              </button>
              <button 
                onClick={() => setInterviewType('behavioral')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  interviewType === 'behavioral' 
                    ? 'bg-white text-purple-900' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Behavioral
              </button>
              <button 
                onClick={() => setInterviewType('leadership')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  interviewType === 'leadership' 
                    ? 'bg-white text-purple-900' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Leadership
              </button>
            </div>
          </div>
          
          {/* Chat Container */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Messages Area */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white/10 text-white rounded-tl-none backdrop-blur-sm border border-white/10'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                          message.role === 'user' ? 'bg-indigo-700' : 'bg-purple-700'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User size={12} className="text-white" />
                        ) : (
                          <Bot size={12} className="text-white" />
                        )}
                      </div>
                      <span className="text-xs font-medium">
                        {message.role === 'user' ? 'You' : 'Interviewer'}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white rounded-2xl rounded-tl-none p-4 border border-white/10 backdrop-blur-sm max-w-[80%]">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center mr-2">
                        <Bot size={12} className="text-white" />
                      </div>
                      <span className="text-xs font-medium">Interviewer</span>
                    </div>
                    <div className="flex items-center">
                      <Loader className="animate-spin h-4 w-4 mr-2 text-white" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {isListening && (
                <div className="flex justify-end">
                  <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-700 flex items-center justify-center mr-2">
                        <User size={12} className="text-white" />
                      </div>
                      <span className="text-xs font-medium">You</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <p className="text-sm whitespace-pre-wrap">{transcript || 'Listening...'}</p>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Controls */}
            <div className="p-4 bg-black/30 border-t border-white/10">
              <div className="flex justify-between items-center">
                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-full ${
                    audioEnabled ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
                  } text-white transition-colors`}
                  title={audioEnabled ? 'Mute audio' : 'Unmute audio'}
                >
                  {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
                
                <div className="flex items-center">
                  {isSpeaking ? (
                    <div className="mr-4 flex items-center">
                      <div className="w-2 h-6 bg-purple-500 rounded-full mx-0.5 animate-sound-wave-1"></div>
                      <div className="w-2 h-8 bg-purple-500 rounded-full mx-0.5 animate-sound-wave-2"></div>
                      <div className="w-2 h-10 bg-purple-500 rounded-full mx-0.5 animate-sound-wave-3"></div>
                      <div className="w-2 h-8 bg-purple-500 rounded-full mx-0.5 animate-sound-wave-2"></div>
                      <div className="w-2 h-6 bg-purple-500 rounded-full mx-0.5 animate-sound-wave-1"></div>
                    </div>
                  ) : null}
                  
                  <button
                    onClick={toggleListening}
                    className={`p-6 rounded-full ${
                      isListening 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white transition-colors shadow-lg`}
                  >
                    {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                  </button>
                </div>
                
                <button
                  className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                  title="Settings"
                >
                  <Settings size={20} />
                </button>
              </div>
              
              <div className="mt-4 text-center text-white/60 text-sm">
                {isListening 
                  ? 'Click the microphone button when you finish speaking' 
                  : 'Click the microphone button and start speaking'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VoiceChat2;