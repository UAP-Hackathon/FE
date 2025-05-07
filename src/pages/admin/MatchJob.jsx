import React, { useState, useEffect } from "react";
import { message } from "antd";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Auth";
import { Briefcase, MapPin, DollarSign, Check, X, Star, Award, ChevronRight, Search, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MatchJob() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user?.id) {
      return;
    }

    const fetchMatchedJobs = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API}/api/jobseeker/matchJob/${auth?.user?.id}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
          message.success('Matched jobs fetched successfully!');
        } else {
          message.error('Failed to fetch matched jobs');
        }
      } catch (error) {
        console.error('Error fetching matched jobs:', error);
        message.error('Error fetching matched jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchedJobs();
  }, [auth?.user?.id]);

  // Function to get color based on match score
  const getMatchScoreColor = (score) => {
    if (score >= 0.7) return "text-green-600";
    if (score >= 0.4) return "text-amber-600";
    return "text-red-600";
  };

  // Function to get background color based on match score
  const getMatchScoreBg = (score) => {
    if (score >= 0.7) return "bg-green-100";
    if (score >= 0.4) return "bg-amber-100";
    return "bg-red-100";
  };

  // Function to get border color based on match score
  const getMatchScoreBorder = (score) => {
    if (score >= 0.7) return "border-green-200";
    if (score >= 0.4) return "border-amber-200";
    return "border-red-200";
  };

  // Function to format salary
  const formatSalary = (salary) => {
    if (!salary || salary === "0.0") return "Not specified";
    return `$${parseFloat(salary).toLocaleString()}`;
  };

  // Function to handle apply button click
  const handleApplyClick = (jobId) => {
    // Navigate to GenAssesment page with job ID as state
    navigate('/genAssesment', { state: { jobId } });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-xl overflow-hidden p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Job Matches</h1>
                <p className="text-white/90">
                  We've found {jobs.length} job matches based on your skills and preferences
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center bg-white/20 rounded-xl p-3 border border-white/20">
                  <Search className="h-5 w-5 text-white mr-2" />
                  <span className="text-white">Matching jobs for your profile</span>
                </div>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mt-8"></div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <Loader className="h-10 w-10 text-purple-600 animate-spin mb-4" />
                <p className="text-gray-600">Finding your perfect job matches...</p>
              </div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.job_id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden border ${getMatchScoreBorder(job.match_score)} transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl group`}
                >
                  {/* Match Score Banner */}
                  <div className={`h-2 ${job.match_score >= 0.7 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                                        job.match_score >= 0.4 ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 
                                        'bg-gradient-to-r from-red-400 to-red-600'}`}></div>
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-gray-800 truncate max-w-[70%]">
                        {job.title || "Untitled Position"}
                      </h2>
                      <div className={`px-3 py-1 rounded-full ${getMatchScoreBg(job.match_score)} ${getMatchScoreColor(job.match_score)} text-sm font-medium`}>
                        {Math.round(job.match_score * 100)}% Match
                      </div>
                    </div>
                    
                    {/* Company Info */}
                    <div className="flex items-center text-gray-600 mb-4">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span className="truncate">{job.company_name || "Company not specified"}</span>
                    </div>
                    
                    {/* Location & Salary */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                        <span className="truncate">{job.location || "Remote"}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                        <span className="truncate">{formatSalary(job.salary)}</span>
                      </div>
                    </div>
                    
                    {/* Skills Section */}
                    <div className="space-y-4">
                      {/* Matched Skills */}
                      {job.matched_skills && job.matched_skills.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-2 flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Matched Skills
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {job.matched_skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs border border-green-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Missing Skills */}
                      {job.missing_skills && job.missing_skills.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-2 flex items-center">
                            <X className="h-4 w-4 mr-2 text-red-500" />
                            Skills to Develop
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {job.missing_skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs border border-red-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Description */}
                    {job.description && (
                      <div className="mt-4 text-gray-600 text-sm">
                        <p>{job.description}</p>
                      </div>
                    )}
                    
                    {/* Apply Button */}
                    <div className="mt-6">
                      <button 
                        onClick={() => {
                          const allSkills = [
                            ...(job.matched_skills || []),
                            ...(job.missing_skills || [])
                          ];
                          window.location.href = `/assesment?skills=${encodeURIComponent(allSkills.join(','))}`;
                        }}
                        className="w-full py-2 px-4 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors duration-300 flex items-center justify-center group-hover:bg-indigo-500"
                      >
                        Apply Now
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Job Matches Found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any jobs matching your profile. Please update your skills and preferences to get better matches.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                Update Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MatchJob;
