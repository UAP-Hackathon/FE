import React, { useState } from "react";
import { message } from "antd";
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle skills (comma separated into array)
  const handleSkillsChange = (e) => {
    const value = e.target.value;
    const skillsArray = value.split(",").map((skill) => skill.trim());
    setFormData((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API}/api/admin/postJob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          salary: parseInt(formData.salary),
          experience: parseInt(formData.experience),
        }),
      });

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
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Create Job Post</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="skills"
            value={formData.skills.join(", ")}
            onChange={handleSkillsChange}
            placeholder="Skills (comma separated)"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience (years)"
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-lg px-5 py-2 text-center inline-flex items-center  me-2 mb-2 justify-center cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Post Job ...
              </>
            ) : (
              "Post Job"
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Postjob;
