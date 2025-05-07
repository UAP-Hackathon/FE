import React, { useState } from "react";
import { message, Select } from "antd";
import Layout from "../../components/layout/Layout";
import { Loader } from "lucide-react";

function Postjob() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company_name: "",
    location: "",
    salary: "",
    skills: [""],
    experience: "",
  });

  const skillsOptions = [
    "React",
    "Node.js",
    "CSS",
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "HTML",
    "TypeScript",
    "SQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "Angular",
    "Vue.js",
    "Express.js",
    "MongoDB",
    "GraphQL",
    "SASS",
    "Redux",
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle skills (dropdown multi-select)
  const handleSkillsChange = (selectedSkills) => {
    setFormData((prev) => ({
      ...prev,
      skills: selectedSkills,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/api/admin/postJob`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            salary: parseInt(formData.salary),
            experience: parseInt(formData.experience),
          }),
        }
      );

      if (response.ok) {
        message.success("Job created successfully!");
        // Clear form
        setFormData({
          title: "",
          description: "",
          company_name: "",
          location: "",
          salary: "",
          skills: [""],
          experience: "",
        });
      } else {
        message.error("Failed to create job");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error creating job");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-gray-200 mt-24 mb-16">
          <h1 className="text-3xl font-extrabold mb-2 text-gray-800 text-center">
            Create Job Post
          </h1>
          <p className="text-gray-500 mb-8 text-center text-lg">
            Fill in the details below to post a new job opening
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Job Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Job Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the job role, responsibilities, and requirements"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition min-h-[100px]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="company_name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                id="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="e.g. Acme Corp"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                required
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote, New York, etc."
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  id="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 80000"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Experience (years)
                </label>
                <input
                  type="number"
                  name="experience"
                  id="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Skills
              </label>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select required skills"
                value={formData.skills}
                onChange={handleSkillsChange}
                options={skillsOptions.map((skill) => ({
                  value: skill,
                  label: skill,
                }))}
                className="w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-purple-300 to-purple-400 hover:from-purple-400 hover:to-purple-500 font-bold rounded-xl text-lg px-5 py-3 text-center inline-flex items-center justify-center shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Posting Job ...
                </>
              ) : (
                "Post Job"
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Postjob;
