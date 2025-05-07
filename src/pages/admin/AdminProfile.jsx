import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Mail, Phone, Calendar, Briefcase, Book, Users, Award, User, Clock, FileText, Code, GraduationCap, Bookmark, Star, ExternalLink, Building, MessageSquare, AtSign, Hash, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/Auth';

function AdminProfile() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth && auth.user) {
      setLoading(false);
    }
  }, [auth]);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
      </Layout>
    );
  }

  const user = auth.user;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Cover Image with Logo */}
            <div className="h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-6 left-6 flex items-center">
                <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-indigo-600 font-bold text-xl">AI</span>
                </div>
                <span className="ml-3 text-white font-bold text-2xl">UAP Career Portal</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Profile Info */}
            <div className="relative px-6 pb-8">
              {/* Avatar */}
              <div className="absolute -top-24 flex justify-center w-full">
                <div className="h-48 w-48 rounded-full ring-4 ring-indigo-600 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl">
                  <span className="text-6xl font-bold text-white">
                    {getInitials(user?.name)}
                  </span>
                </div>
              </div>

              {/* Name and Role */}
              <div className="mt-28 text-center">
                <h1 className="text-5xl font-bold text-white">
                  {user?.name || 'User Name'}
                </h1>
                <div className="mt-3 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-600/30 text-white border border-indigo-500/50">
                  {user?.role?.name || 'JOB_SEEKER'}
                </div>
                <p className="text-indigo-200 mt-2 text-lg">{user?.username ? `@${user?.username}` : '@user'}</p>
              </div>

              {/* Contact Info */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div className="flex items-center text-white bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <div className="p-3 bg-blue-500/20 rounded-xl mr-4">
                    <Mail className="h-7 w-7 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-200 uppercase tracking-wider">Email</p>
                    <p className="font-medium">{user?.email || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-white bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <div className="p-3 bg-green-500/20 rounded-xl mr-4">
                    <Phone className="h-7 w-7 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-200 uppercase tracking-wider">Contact</p>
                    <p className="font-medium">{user?.contact || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-white bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                  <div className="p-3 bg-purple-500/20 rounded-xl mr-4">
                    <Calendar className="h-7 w-7 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-200 uppercase tracking-wider">Joined</p>
                    <p className="font-medium">{formatDate(user?.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company & Job Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Briefcase className="h-6 w-6 mr-3 text-blue-400" />
                Professional Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center text-white">
                  <div className="p-2 bg-indigo-500/20 rounded-lg mr-3">
                    <Building className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-200 uppercase tracking-wider">Company</p>
                    <p className="font-medium">{user?.company_name || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-white">
                  <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                    <Briefcase className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-200 uppercase tracking-wider">Job Title</p>
                    <p className="font-medium">{user?.job_title || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-white">
                  <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                    <MessageSquare className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-200 uppercase tracking-wider">Message</p>
                    <p className="font-medium">{user?.message || 'No message'}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-white">
                  <div className="p-2 bg-amber-500/20 rounded-lg mr-3">
                    <AtSign className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-200 uppercase tracking-wider">Username</p>
                    <p className="font-medium">{user?.username || 'Not set'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CV Status Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FileText className="h-6 w-6 mr-3 text-green-400" />
                CV Status
              </h2>
              
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-full ${user?.has_cv ? 'bg-green-500/20' : 'bg-red-500/20'} mr-4`}>
                  {user?.has_cv ? 
                    <CheckCircle className="h-8 w-8 text-green-400" /> : 
                    <XCircle className="h-8 w-8 text-red-400" />
                  }
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">
                    {user?.has_cv ? 'CV Uploaded' : 'No CV Uploaded'}
                  </p>
                  <p className="text-indigo-200 text-sm">
                    {user?.has_cv ? 
                      'Your CV is available for employers to view' : 
                      'Upload your CV to increase your chances of getting hired'
                    }
                  </p>
                </div>
              </div>
              
              {user?.has_cv && (
                <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-indigo-200 text-sm mb-2">
                    Your CV was uploaded on:
                  </p>
                  <p className="text-white font-medium">
                    {formatDate(user?.created_at)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CV Information */}
          {user?.has_cv && user?.cv_key_info && (
            <div className="mt-10 space-y-8">
              {/* CV Basic Info */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3 text-indigo-400" />
                  CV Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center text-white bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                    <div className="p-3 bg-indigo-500/20 rounded-xl mr-4">
                      <User className="h-7 w-7 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-200 uppercase tracking-wider">Full Name</p>
                      <p className="font-medium">{user?.cv_key_info?.name || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                    <div className="p-3 bg-blue-500/20 rounded-xl mr-4">
                      <Mail className="h-7 w-7 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-200 uppercase tracking-wider">Email</p>
                      <p className="font-medium">{user?.cv_key_info?.email || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors backdrop-blur-sm">
                    <div className="p-3 bg-green-500/20 rounded-xl mr-4">
                      <Phone className="h-7 w-7 text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-200 uppercase tracking-wider">Contact</p>
                      <p className="font-medium">{user?.cv_key_info?.phone?.split('|')[0] || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skills Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Code className="h-6 w-6 mr-3 text-purple-400" />
                  Skills
                </h2>
                
                <div className="flex flex-wrap gap-3">
                  {user?.cv_key_info?.skills?.map((skill, index) => (
                    <div 
                      key={index} 
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 text-indigo-100 rounded-full text-sm transition-colors border border-white/10 flex items-center"
                    >
                      <Star className="h-4 w-4 mr-2 text-amber-400" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Education Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <GraduationCap className="h-6 w-6 mr-3 text-amber-400" />
                  Education
                </h2>
                
                <div className="space-y-6">
                  {user?.cv_key_info?.education?.map((edu, index) => (
                    <div key={index} className="bg-white/5 p-5 rounded-xl border border-white/10">
                      <div className="flex items-center mb-2">
                        <GraduationCap className="h-5 w-5 text-amber-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">{edu.split('Bachelors')[0] || edu}</h3>
                      </div>
                      <p className="text-indigo-200 text-sm">{edu}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Experience Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Briefcase className="h-6 w-6 mr-3 text-green-400" />
                  Experience
                </h2>
                
                <div className="space-y-6">
                  {user?.cv_key_info?.experience?.map((exp, index) => (
                    <div key={index} className="bg-white/5 p-5 rounded-xl border border-white/10">
                      <div className="flex items-center mb-2">
                        <Briefcase className="h-5 w-5 text-green-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">
                          {exp.includes('|') ? exp.split('|')[0] : exp.split('.')[0]}
                        </h3>
                      </div>
                      <p className="text-indigo-200 text-sm whitespace-pre-line">{exp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AdminProfile;