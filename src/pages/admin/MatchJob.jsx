import React, { useState } from "react";
import { message } from "antd";
import Layout from "../../components/layout/Layout";

function MatchJob() {
  const [userId, setUserId] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      message.error("Please enter a User ID");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/api/jobseeker/matchJob`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: parseInt(userId),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
        message.success("Matched jobs fetched successfully!");
      } else {
        message.error("Failed to fetch matched jobs");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error fetching matched jobs");
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Match Jobs</h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="number"
            value={userId}
            onChange={handleChange}
            placeholder="Enter User ID"
            className="border border-gray-300 rounded p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div
                key={job.job_id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                <p className="text-gray-600 mb-2">
                  {job.company_name} — {job.location}
                </p>

                <p className="text-gray-800 font-medium mb-2">
                  Salary: <span className="text-blue-600">${job.salary}</span>
                </p>

                <div className="mb-2">
                  <strong>Missing Skills:</strong>
                  {job.missing_skills.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-red-600">
                      {job.missing_skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-green-600 text-sm">No missing skills 🎉</p>
                  )}
                </div>

                {job.description && (
                  <p className="text-gray-700 text-sm mt-2">{job.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No matched jobs found. Submit a User ID to get results.</p>
        )}
      </div>
    </Layout>
  );
}

export default MatchJob;
