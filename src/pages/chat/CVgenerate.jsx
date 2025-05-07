import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Layout from '../../components/layout/Layout';
import { Loader, Download, RefreshCw, Send, FileText, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Languages, Clock, Calendar, Sparkles, Check, AlertCircle, Edit, CheckCircle } from 'lucide-react';

const CVgenerate = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    jobTitle: '',
    skills: '',
    experience: '',
    education: '',
    languages: '',
    certifications: '',
    style: 'modern',
    color: 'purple'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cvContent, setCvContent] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('form');
  const [autoCorrectField, setAutoCorrectField] = useState(null);
  const [isCorrectingField, setIsCorrectingField] = useState(false);
  const [correctionSuggestions, setCorrectionSuggestions] = useState({});
  const [fieldsTouched, setFieldsTouched] = useState({});
  
  const cvRef = useRef();
  const timeoutRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => cvRef.current,
    documentTitle: `${formData.fullName || 'Generated'}_CV`,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    setFieldsTouched(prev => ({ ...prev, [name]: true }));
    
    // Clear any previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set a new timeout to check for spelling/grammar after user stops typing
    timeoutRef.current = setTimeout(() => {
      // Only check fields that are text areas or longer inputs and have been touched
      if (
        fieldsTouched[name] && 
        ['summary', 'skills', 'experience', 'education', 'languages', 'certifications'].includes(name) &&
        value.length > 10
      ) {
        checkSpellingAndGrammar(name, value);
      }
    }, 1500); // Wait 1.5 seconds after typing stops
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const checkSpellingAndGrammar = async (fieldName, text) => {
    if (text.length < 10) return; // Don't check very short texts
    
    setAutoCorrectField(fieldName);
    setIsCorrectingField(true);
    
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
              content: 'You are a helpful assistant that checks for spelling and grammar errors in CV/resume text. Provide corrected text only, maintaining the original meaning and professional tone. If the text is already correct, simply return it unchanged.'
            },
            {
              role: 'user',
              content: `Check and correct the following text for a CV/resume, fixing any spelling or grammar errors. This is for the "${fieldName}" section:\n\n${text}`
            }
          ],
          temperature: 0.3,
          max_tokens: 500
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to check text');
      }
      
      const data = await response.json();
      const correctedText = data.choices[0].message.content.trim();
      
      // Only suggest if there's a difference
      if (correctedText !== text) {
        setCorrectionSuggestions(prev => ({
          ...prev,
          [fieldName]: correctedText
        }));
      }
    } catch (error) {
      console.error('Error checking text:', error);
    } finally {
      setIsCorrectingField(false);
    }
  };

  const applySuggestion = (fieldName) => {
    if (correctionSuggestions[fieldName]) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: correctionSuggestions[fieldName]
      }));
      
      // Clear the suggestion after applying
      setCorrectionSuggestions(prev => {
        const newSuggestions = { ...prev };
        delete newSuggestions[fieldName];
        return newSuggestions;
      });
    }
  };

  const dismissSuggestion = (fieldName) => {
    setCorrectionSuggestions(prev => {
      const newSuggestions = { ...prev };
      delete newSuggestions[fieldName];
      return newSuggestions;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    
    try {
      // First, generate the CV content using OpenAI
      await generateCVContent();
      
      // Then switch to the preview tab
      setActiveTab('preview');
    } catch (err) {
      setError('Failed to generate CV. Please try again.');
      console.error('Error generating CV:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCVContent = async () => {
    setIsLoading(true);
    
    try {
      const prompt = `
        Create a professional CV/resume with the following information:
        
        Name: ${formData.fullName}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Location: ${formData.location}
        Job Title: ${formData.jobTitle}
        Professional Summary: ${formData.summary}
        
        Skills: ${formData.skills}
        
        Work Experience: ${formData.experience}
        
        Education: ${formData.education}
        
        Languages: ${formData.languages}
        
        Certifications: ${formData.certifications}
        
        Style: ${formData.style} (modern, traditional, creative)
        Color Scheme: ${formData.color}
        
        Format the CV in a clean, professional way. Include appropriate sections with headers. Make it concise but comprehensive.
        Return the content in HTML format with appropriate styling that I can directly render in a React component.
        Use semantic HTML and inline CSS for styling. Make it look polished and professional.
      `;
      
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
              content: 'You are a professional CV/resume designer. Create beautiful, well-formatted CVs in HTML format with inline CSS.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate CV content');
      }
      
      const data = await response.json();
      const generatedContent = data.choices[0].message.content;
      
      // Extract HTML content if it's wrapped in markdown code blocks
      let htmlContent = generatedContent;
      if (generatedContent.includes('```html')) {
        htmlContent = generatedContent.split('```html')[1].split('```')[0].trim();
      } else if (generatedContent.includes('```')) {
        htmlContent = generatedContent.split('```')[1].split('```')[0].trim();
      }
      
      setCvContent(htmlContent);
    } catch (error) {
      console.error('Error generating CV content:', error);
      setError('Failed to generate CV content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const colorOptions = [
    { name: 'Purple', value: 'purple' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Red', value: 'red' },
    { name: 'Gray', value: 'gray' }
  ];

  const styleOptions = [
    { name: 'Modern', value: 'modern' },
    { name: 'Traditional', value: 'traditional' },
    { name: 'Creative', value: 'creative' }
  ];

  // Render a text field with correction suggestion if available
  const renderTextField = (name, label, placeholder, rows = 3, icon = null) => {
    const hasSuggestion = correctionSuggestions[name];
    
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        {icon && (
          <div className="flex items-center">
            {icon}
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleChange}
              rows={rows}
              className={`w-full p-2 border ${hasSuggestion ? 'border-yellow-400' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder={placeholder}
              required={name !== 'languages' && name !== 'certifications'}
            />
          </div>
        )}
        {!icon && (
          <textarea
            name={name}
            value={formData[name]}
            onChange={handleChange}
            rows={rows}
            className={`w-full p-2 border ${hasSuggestion ? 'border-yellow-400' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            placeholder={placeholder}
            required={name !== 'languages' && name !== 'certifications'}
          />
        )}
        
        {/* Auto-correction indicator */}
        {isCorrectingField && autoCorrectField === name && (
          <div className="absolute right-2 top-8">
            <Loader size={16} className="text-purple-500 animate-spin" />
          </div>
        )}
        
        {/* Suggestion panel */}
        {hasSuggestion && (
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <Edit size={16} className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Suggested improvement:</p>
                  <p className="text-sm text-gray-700 mt-1">{correctionSuggestions[name]}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => dismissSuggestion(name)}
                  className="text-gray-500 hover:text-gray-700"
                  title="Dismiss"
                >
                  <AlertCircle size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => applySuggestion(name)}
                  className="text-green-600 hover:text-green-700"
                  title="Apply suggestion"
                >
                  <CheckCircle size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-xl overflow-hidden mb-8">
            <div className="px-8 py-10 text-white">
              <div className="flex items-center">
                <FileText className="h-12 w-12 mr-5" />
                <div>
                  <h1 className="text-4xl font-bold mb-2">AI CV Generator</h1>
                  <p className="text-white/90 text-lg">
                    Create a professional CV in minutes with the power of AI
                  </p>
                </div>
              </div>
              <div className="mt-6 max-w-3xl">
                <div className="flex items-start">
                  <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-white/90">Auto-correction for spelling and grammar</p>
                </div>
                <div className="flex items-start mt-2">
                  <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-white/90">Professional formatting with multiple style options</p>
                </div>
                <div className="flex items-start mt-2">
                  <div className="bg-white/20 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-white/90">Download as PDF with one click</p>
                </div>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
          </div>

          {/* Tabs */}
          <div className="flex mb-6">
            <button
              className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === 'form'
                  ? 'bg-white text-purple-700 border-t border-l border-r border-gray-200 shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('form')}
            >
              Input Information
            </button>
            <button
              className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'bg-white text-purple-700 border-t border-l border-r border-gray-200 shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('preview')}
              disabled={!cvContent}
            >
              Preview CV
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {activeTab === 'form' ? (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Your Information</h2>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
                
                <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg flex items-start">
                  <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-purple-700 text-sm">
                    <strong>Auto-correction enabled:</strong> As you type, we'll check for spelling and grammar errors in your text and suggest improvements.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-purple-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job Title
                        </label>
                        <input
                          type="text"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-purple-400 mr-2" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-purple-400 mr-2" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-purple-400 mr-2" />
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="City, Country"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-purple-600" />
                      Professional Summary
                    </h3>
                    {renderTextField(
                      'summary',
                      'Professional Summary',
                      'Write a brief professional summary...'
                    )}
                  </div>

                  {/* Skills */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-purple-600" />
                      Skills
                    </h3>
                    {renderTextField(
                      'skills',
                      'Skills',
                      'List your skills, separated by commas...'
                    )}
                  </div>

                  {/* Work Experience */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-purple-600" />
                      Work Experience
                    </h3>
                    {renderTextField(
                      'experience',
                      'Work Experience',
                      'Describe your work experience. Format: Company Name | Position | Start Date - End Date | Description',
                      4
                    )}
                  </div>

                  {/* Education */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />
                      Education
                    </h3>
                    {renderTextField(
                      'education',
                      'Education',
                      'List your education. Format: Institution | Degree | Year | GPA/Achievements',
                      3
                    )}
                  </div>

                  {/* Languages & Certifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Languages className="h-5 w-5 mr-2 text-purple-600" />
                        Languages
                      </h3>
                      {renderTextField(
                        'languages',
                        'Languages',
                        'Languages and proficiency levels...',
                        2
                      )}
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-purple-600" />
                        Certifications
                      </h3>
                      {renderTextField(
                        'certifications',
                        'Certifications',
                        'List relevant certifications...',
                        2
                      )}
                    </div>
                  </div>

                  {/* Style Options */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                      Design Options
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          CV Style
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {styleOptions.map(style => (
                            <button
                              key={style.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, style: style.value }))}
                              className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                                formData.style === style.value
                                  ? 'bg-purple-100 border-purple-500 text-purple-700 shadow-sm'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {style.name}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Color Scheme
                        </label>
                        <div className="grid grid-cols-5 gap-3">
                          {colorOptions.map(color => (
                            <button
                              key={color.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                              className={`w-full h-10 rounded-lg border transition-all ${
                                formData.color === color.value ? 'ring-2 ring-offset-2 ring-purple-500 scale-110' : ''
                              }`}
                              style={{
                                backgroundColor: 
                                  color.value === 'purple' ? '#8b5cf6' :
                                  color.value === 'blue' ? '#3b82f6' :
                                  color.value === 'green' ? '#10b981' :
                                  color.value === 'red' ? '#ef4444' :
                                  '#6b7280'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader className="animate-spin h-5 w-5 mr-3" />
                          Generating CV...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-3" />
                          Generate CV
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">CV Preview</h2>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setActiveTab('form')}
                      className="px-5 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Edit Information
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 flex items-center shadow-md hover:shadow-lg transition-all"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </button>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader className="animate-spin h-12 w-12 text-purple-600 mb-4" />
                    <p className="text-gray-600 text-lg">Generating your professional CV...</p>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-xl shadow-lg">
                    <div ref={cvRef} className="p-8 max-w-full">
                      {cvContent ? (
                        <div dangerouslySetInnerHTML={{ __html: cvContent }} />
                      ) : (
                        <div className="text-center py-16">
                          <p className="text-gray-500">No CV content generated yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CVgenerate;