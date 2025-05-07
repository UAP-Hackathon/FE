import React, { useState, useEffect } from "react";
import { message } from "antd";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Auth";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Check,
  X,
  Star,
  Award,
  ChevronRight,
  Search,
  Loader,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MatchJob() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
          `${import.meta.env.VITE_APP_API}/api/jobseeker/matchJob/${
            auth?.user?.id
          }`
        );

        if (response.ok) {
          const data = await response.json();
          setJobs(data);
          message.success("Matched jobs fetched successfully!");
        } else {
          message.error("Failed to fetch matched jobs");
        }
      } catch (error) {
        console.error("Error fetching matched jobs:", error);
        message.error("Error fetching matched jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchedJobs();
  }, [auth?.user?.id]);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      (job.title && job.title.toLowerCase().includes(term)) ||
      (job.company_name && job.company_name.toLowerCase().includes(term)) ||
      (job.location && job.location.toLowerCase().includes(term))
    );
  });

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
    navigate("/genAssesment", { state: { jobId } });
  };

  return (
    <Layout>
      <div className="mt-16" />
      <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">
                  Job Matches
                </h1>
                <p className="text-black">
                  We've found {filteredJobs.length} job matches based on your
                  skills and preferences
                </p>
              </div>
              <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col items-end">
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search by title, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-2 md:mt-0 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white w-full md:w-64"
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <Loader className="h-10 w-10 text-purple-500 animate-spin mb-4" />
                <p className="text-black">
                  Finding your perfect job matches...
                </p>
              </div>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.job_id}
                  className={`bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-lg border ${getMatchScoreBorder(
                    job.match_score
                  )} transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl group relative overflow-hidden`}
                  style={{ minHeight: "420px" }}
                >
                  {/* Decorative Gradient Circle */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-100 rounded-full opacity-30 z-0" />
                  {/* Match Score Banner */}
                  <div
                    className={`h-1 ${
                      job.match_score >= 0.7
                        ? "bg-gradient-to-r from-purple-400 via-blue-400 to-green-400"
                        : job.match_score >= 0.4
                        ? "bg-gradient-to-r from-amber-300 to-amber-100"
                        : "bg-gradient-to-r from-red-300 to-red-100"
                    } rounded-t-2xl`}
                  ></div>

                  <div className="p-6 relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-black truncate max-w-[70%]">
                        {job.title || "Untitled Position"}
                      </h2>
                      <div
                        className={`px-3 py-1 rounded-full shadow-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold border border-purple-200`}
                      >
                        {Math.round(job.match_score * 100)}% Match
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="flex items-center text-black mb-4">
                      <Briefcase className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="truncate font-medium">
                        {job.company_name || "Company not specified"}
                      </span>
                    </div>

                    {/* Location & Salary */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-black/80">
                        <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                        <span className="truncate">
                          {job.location || "Remote"}
                        </span>
                      </div>
                      <div className="flex items-center text-black/80">
                        <DollarSign className="h-4 w-4 mr-2 text-green-400" />
                        <span className="truncate">
                          {formatSalary(job.salary)}
                        </span>
                      </div>
                    </div>

                    {/* Soft Divider */}
                    <div className="border-t border-purple-100 my-4" />

                    {/* Skills Section */}
                    <div className="space-y-4">
                      {/* Matched Skills */}
                      {job.matched_skills && job.matched_skills.length > 0 && (
                        <div>
                          <h3 className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-2 flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-400" />
                            Matched Skills
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {job.matched_skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs border border-green-200 shadow-sm"
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
                          <h3 className="text-xs font-semibold text-rose-700 uppercase tracking-wider mb-2 flex items-center">
                            <X className="h-4 w-4 mr-2 text-rose-400" />
                            Skills to Develop
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {job.missing_skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs border border-rose-200 shadow-sm"
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
                      <div className="mt-4 text-black/80 text-sm bg-purple-50/40 rounded-lg p-3">
                        <p>{job.description}</p>
                      </div>
                    )}

                    {/* Apply Button */}
                    <div className="mt-6">
                      <button
                        onClick={() => handleApplyClick(job.job_id)}
                        className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-md"
                      >
                        Apply Now
                        <ChevronRight className="h-4 w-4 ml-2 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 border border-purple-100 text-center">
              <div className="flex flex-col items-center">
                <Search className="h-16 w-16 text-purple-400 mb-4" />
                <h2 className="text-xl font-semibold text-black mb-2">
                  No matched jobs found
                </h2>
                <p className="text-black max-w-md mx-auto">
                  We couldn't find any jobs matching your profile. Try updating
                  your skills or check back later.
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
