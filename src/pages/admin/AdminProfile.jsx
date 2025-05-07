import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import {
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Book,
  Users,
  Award,
  User,
  Clock,
  FileText,
  Code,
  GraduationCap,
  Bookmark,
  Star,
  ExternalLink,
  Building,
  MessageSquare,
  AtSign,
  Hash,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAuth } from "../../context/Auth";

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
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
        </div>
      </Layout>
    );
  }

  const user = auth.user;

  return (
    <Layout>
      <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
            {/* Profile Info */}
            <div className="relative px-6 pb-8 pt-10 flex flex-col items-center">
              {/* Avatar */}
              <div className="h-32 w-32 rounded-full border-4 border-black bg-gray-100 flex items-center justify-center shadow-md mt-10 mb-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXQlMjBtYW58ZW58MHx8MHx8fDA%3D"
                  alt="Profile"
                  className="object-cover h-full w-full"
                />
              </div>

              {/* Name and Role */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-black">
                  {user?.name || "User Name"}
                </h1>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-black border border-gray-300">
                  {user?.role?.name || "JOB_SEEKER"}
                </div>
                <p className="text-gray-500 mt-1 text-base">
                  {user?.username ? `@${user?.username}` : "@user"}
                </p>
              </div>

              {/* Contact Info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-200 w-full">
                  <Mail className="h-6 w-6 text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="font-medium text-black">
                      {user?.email || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-200 w-full">
                  <Phone className="h-6 w-6 text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Contact
                    </p>
                    <p className="font-medium text-black">
                      {user?.contact || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-200 w-full">
                  <Calendar className="h-6 w-6 text-gray-400 mr-3" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Joined
                    </p>
                    <p className="font-medium text-black">
                      {formatDate(user?.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company & Job Info */}
            <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-black mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
                Professional Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-center text-black">
                  <Building className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm">
                    {user?.company_name || "Not specified"}
                  </span>
                </div>
                <div className="flex items-center text-black">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm">
                    {user?.job_title || "Not specified"}
                  </span>
                </div>
                <div className="flex items-center text-black">
                  <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm">
                    {user?.message || "No message"}
                  </span>
                </div>
                <div className="flex items-center text-black">
                  <AtSign className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm">{user?.username || "Not set"}</span>
                </div>
              </div>
            </div>
            {/* CV Status Card */}
            <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-black mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-gray-500" />
                CV Status
              </h2>
              <div className="flex items-center mb-4">
                <div
                  className={`p-2 rounded-full border ${
                    user?.has_cv
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  } mr-3`}
                >
                  {user?.has_cv ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold text-black">
                    {user?.has_cv ? "CV Uploaded" : "No CV Uploaded"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {user?.has_cv
                      ? "Your CV is available for employers to view"
                      : "Upload your CV to increase your chances of getting hired"}
                  </p>
                </div>
              </div>
              {user?.has_cv && (
                <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200">
                  <p className="text-gray-500 text-xs mb-1">
                    Your CV was uploaded on:
                  </p>
                  <p className="text-black font-medium text-sm">
                    {formatDate(user?.created_at)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CV Information */}
          {user?.has_cv && user?.cv_key_info && (
            <div className="mt-8 space-y-6">
              {/* CV Basic Info */}
              <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-black mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-gray-500" />
                  CV Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <User className="h-6 w-6 text-gray-400 mr-3" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Full Name
                      </p>
                      <p className="font-medium text-black">
                        {user?.cv_key_info?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <Mail className="h-6 w-6 text-gray-400 mr-3" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Email
                      </p>
                      <p className="font-medium text-black">
                        {user?.cv_key_info?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <Phone className="h-6 w-6 text-gray-400 mr-3" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Contact
                      </p>
                      <p className="font-medium text-black">
                        {user?.cv_key_info?.phone?.split("|")[0] || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Skills Section */}
              <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-black mb-4 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-gray-500" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user?.cv_key_info?.skills?.map((skill, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-black rounded-full text-sm border border-gray-200 flex items-center"
                    >
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              {/* Education Section */}
              <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-black mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-gray-500" />
                  Education
                </h2>
                <div className="space-y-4">
                  {user?.cv_key_info?.education?.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded border border-gray-200"
                    >
                      <div className="flex items-center mb-1">
                        <GraduationCap className="h-5 w-5 text-gray-400 mr-2" />
                        <h3 className="text-base font-semibold text-black">
                          {edu.split("Bachelors")[0] || edu}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm">{edu}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Experience Section */}
              <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-black mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
                  Experience
                </h2>
                <div className="space-y-4">
                  {user?.cv_key_info?.experience?.map((exp, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded border border-gray-200"
                    >
                      <div className="flex items-center mb-1">
                        <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                        <h3 className="text-base font-semibold text-black">
                          {exp.includes("|")
                            ? exp.split("|")[0]
                            : exp.split(".")[0]}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm whitespace-pre-line">
                        {exp}
                      </p>
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
