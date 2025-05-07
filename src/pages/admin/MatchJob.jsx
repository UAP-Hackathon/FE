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
    if (score >= 0.7) return "text-green-500";
    if (score >= 0.4) return "text-amber-500";
    return "text-red-500";
  };

  // Function to get background color based on match score
  const getMatchScoreBg = (score) => {
    if (score >= 0.7) return "bg-green-500/10";
    if (score >= 0.4) return "bg-amber-500/10";
    return "bg-red-500/10";
  };

  // Function to get border color based on match score
  const getMatchScoreBorder = (score) => {
    if (score >= 0.7) return "border-green-500/30";
    if (score >= 0.4) return "border-amber-500/30";
    return "border-red-500/30";
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
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Job Matches</h1>
                <p className="text-indigo-200">
                  We've found {jobs.length} job matches based on your skills and preferences
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center bg-white/5 rounded-xl p-3 border border-white/10">
                  <Search className="h-5 w-5 text-indigo-300 mr-2" />
                  <span className="text-indigo-200">Matching jobs for your profile</span>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <Loader className="h-10 w-10 text-white animate-spin mb-4" />
                <p className="text-indigo-200">Finding your perfect job matches...</p>
              </div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.job_id}
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border ${getMatchScoreBorder(job.match_score)} transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl group`}
                >
                  {/* Match Score Banner */}
                  <div className={`h-2 ${job.match_score >= 0.7 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                                        job.match_score >= 0.4 ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 
                                        'bg-gradient-to-r from-red-400 to-red-600'}`}></div>
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-white truncate max-w-[70%]">
                        {job.title || "Untitled Position"}
                      </h2>
                      <div className={`px-3 py-1 rounded-full ${getMatchScoreBg(job.match_score)} ${getMatchScoreColor(job.match_score)} text-sm font-medium`}>
                        {Math.round(job.match_score * 100)}% Match
                      </div>
                    </div>
                    
                    {/* Company Info */}
                    <div className="flex items-center text-indigo-200 mb-4">
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span className="truncate">{job.company_name || "Company not specified"}</span>
                    </div>
                    
                    {/* Location & Salary */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-indigo-200">
                        <MapPin className="h-4 w-4 mr-2 text-indigo-300" />
                        <span className="truncate">{job.location || "Remote"}</span>
                      </div>
                      <div className="flex items-center text-indigo-200">
                        <DollarSign className="h-4 w-4 mr-2 text-green-400" />
                        <span className="truncate">{formatSalary(job.salary)}</span>
                      </div>
                    </div>
                    
                    {/* Skills Section */}
                    <div className="space-y-4">
                      {/* Matched Skills */}
                      {job.matched_skills && job.matched_skills.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-indigo-200 uppercase tracking-wider mb-2 flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-400" />
                            Matched Skills
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {job.matched_skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20"
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
                          <h3 className="text-sm font-medium text-indigo-200 uppercase tracking-wider mb-2 flex items-center">
                            <X className="h-4 w-4 mr-2 text-red-400" />
                            Skills to Develop
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {job.missing_skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs border border-red-500/20"
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
                      <div className="mt-4 text-indigo-200 text-sm">
                        <p>{job.description}</p>
                      </div>
                    )}
                    
                    {/* Apply Button */}
                    <div className="mt-6">
                      <button 
                        onClick={() => handleApplyClick(job.job_id)}
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
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10 text-center">
              <div className="flex flex-col items-center">
                <Search className="h-16 w-16 text-indigo-300 mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">No matched jobs found</h2>
                <p className="text-indigo-200 max-w-md mx-auto">
                  We couldn't find any jobs matching your profile. Try updating your skills or check back later.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MatchJob;
