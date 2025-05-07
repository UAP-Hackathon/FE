import React from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/Layout';
import { FileText, GraduationCap, Briefcase, Award, Download, User, Mail, MapPin } from 'lucide-react';


function ResumeGenerator() {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        skills: '',
        experience: '',
        education: '',
    });

    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerate = async () => {
        if (!formData.name || !formData.role) return;
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_APP_API_V1}/api/v1/generate-resume`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setOutput(data.output);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full p-3 bg-white/90 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none placeholder:text-gray-400 text-gray-700";

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-purple-50">
                {/* Header Spacing */}
                <div className="h-20"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Form Section */}
                            <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-7rem)]">
                                {/* Title Section */}
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2 flex items-center justify-center gap-3">
                                        AI Resume Builder
                                        <FileText className="w-8 h-8 inline-block text-purple-500" />
                                    </h1>
                                    <p className="text-gray-600">Create a professional resume in minutes</p>
                                </div>

                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 overflow-y-auto h-[calc(100%-6rem)]">
                                    <div className="space-y-6">
                                        {/* Personal Information */}
                                        <div className="space-y-4">
                                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                <User className="w-5 h-5 text-blue-500" />
                                                Personal Information
                                            </h2>
                                            <div className="grid grid-cols-1 gap-4">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your Full Name"
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="role"
                                                    placeholder="Desired Role"
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Skills */}
                                        <div className="space-y-4">
                                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                <Award className="w-5 h-5 text-blue-500" />
                                                Skills
                                            </h2>
                                            <textarea
                                                name="skills"
                                                placeholder="Your skills (e.g., JavaScript, React, Node.js)"
                                                onChange={handleChange}
                                                rows="3"
                                                className={inputClasses}
                                            />
                                        </div>

                                        {/* Experience */}
                                        <div className="space-y-4">
                                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                <Briefcase className="w-5 h-5 text-blue-500" />
                                                Work Experience
                                            </h2>
                                            <textarea
                                                name="experience"
                                                placeholder="Your work experience..."
                                                onChange={handleChange}
                                                rows="4"
                                                className={inputClasses}
                                            />
                                        </div>

                                        {/* Education */}
                                        <div className="space-y-4">
                                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                <GraduationCap className="w-5 h-5 text-blue-500" />
                                                Education
                                            </h2>
                                            <textarea
                                                name="education"
                                                placeholder="Your educational background..."
                                                onChange={handleChange}
                                                rows="4"
                                                className={inputClasses}
                                            />
                                        </div>

                                        {/* Generate Button */}
                                        <button
                                            onClick={handleGenerate}
                                            disabled={loading || !formData.name || !formData.role}
                                            className={`w-full py-3 px-4 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2
                                                ${loading || !formData.name || !formData.role
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg'
                                            }`}
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Generating...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FileText className="w-5 h-5" />
                                                    <span>Generate Resume</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Resume Preview Section */}
                            <div className="lg:h-[calc(100vh-7rem)]">
                                {output ? (
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-full overflow-hidden">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                                <FileText className="w-6 h-6 text-blue-500" />
                                                Your Resume
                                            </h2>
                                            <button 
                                                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Download className="w-5 h-5" />
                                                <span>Download PDF</span>
                                            </button>
                                        </div>
                                        <div className="h-[calc(100%-4rem)] overflow-y-auto">
                                            <div className="prose prose-blue max-w-none">
                                                <div className="space-y-8 p-6 bg-gray-50 rounded-xl">
                                                    {/* Resume Header */}
                                                    <div className="pb-6 border-b border-gray-200">
                                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.name || 'Your Name'}</h1>
                                                        <h2 className="text-xl text-blue-600 mb-4">{formData.role || 'Your Role'}</h2>
                                                    </div>
                                                    
                                                    {/* Resume Content */}
                                                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                                        {output}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="text-center text-gray-500">
                                            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <p className="text-lg">Fill in your details and generate your resume</p>
                                            <p className="text-sm mt-2">Your resume will appear here</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ResumeGenerator