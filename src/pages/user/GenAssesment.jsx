import React, { useState } from 'react';
import { message } from 'antd';
import { Loader } from 'lucide-react';
import Layout from '../../components/layout/Layout';

// Card component (Reusable for each question)
const QuestionCard = ({ question, index }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
      <h3 className="font-semibold text-lg mb-2">Q{index + 1}: {question.question}</h3>
      <p className="text-sm text-gray-500 mb-2">Type: <span className="font-medium text-black">{question.type}</span></p>

      {question.type === 'mcq' && (
        <>
          <ul className="list-disc pl-5 mb-2">
            {question.options.map((opt, i) => (
              <li key={i} className={opt === question.correct_answer ? 'font-semibold text-green-700' : ''}>
                {opt}
              </li>
            ))}
          </ul>
          <p className="text-sm"><strong>Correct Answer:</strong> {question.correct_answer}</p>
          <p className="text-sm"><strong>Explanation:</strong> {question.explanation}</p>
        </>
      )}

      {question.type === 'short_answer' && (
        <>
          <p className="text-sm mb-1"><strong>Sample Answer:</strong> {question.sample_answer}</p>
          <ul className="list-disc pl-5 text-sm">
            {question.key_points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

function GenAssessment() {
  const allSkills = [
    'C++', 'C', 'Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'React',
    'Node', 'MongoDB', 'Django', 'Flask', 'Express', 'Laravel', 'Docker',
    'Kubernetes', 'AWS', 'GCP', 'Azure', 'Jenkins', 'Git', 'GitHub',
    'Bitbucket', 'Trello', 'Jira', 'Slack', 'Zoom', 'Teams'
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionsData, setQuestionsData] = useState(null);

  const getRandomSkills = (skillsArray, count) => {
    const shuffled = [...skillsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleGenerateQuestions = async () => {
    const randomSkills = getRandomSkills(allSkills, Math.floor(Math.random() * 2) + 2); // 2 or 3 skills
    setSelectedSkills(randomSkills);
    setQuestionsData(null);
    setIsLoading(true);

    try {
      const queryParams = new URLSearchParams({
        skills: randomSkills.join(',') // comma-separated skills only
      });

      const response = await fetch(
        `${import.meta.env.VITE_APP_API}/api/jobseeker/generate-assessment?${queryParams.toString()}`
      );

      if (response.ok) {
        const data = await response.json();
        setQuestionsData(data);
        message.success('Questions generated successfully!');
      } else {
        message.error('Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      message.error('Error fetching questions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4 my-4">
        <h1 className="text-2xl font-bold mb-4">Generate Assessment Questions</h1>

        <div className="bg-gray-100 p-3 rounded mb-4 text-sm">
          <p><strong>Available Skills:</strong> {allSkills.join(', ')}</p>
          <p><strong>Randomly Selected Skills:</strong> {selectedSkills.length > 0 ? selectedSkills.join(', ') : 'Click "Generate" to select'}</p>
        </div>

        <button
          onClick={handleGenerateQuestions}
          className="w-full text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-lg px-5 py-2 text-center inline-flex items-center justify-center cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Generating...
            </>
          ) : (
            'Generate Questions'
          )}
        </button>

        {questionsData && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Skills Assessed: {questionsData.skills_assessed.join(', ')}</h2>
            {questionsData.questions.map((q, index) => (
              <QuestionCard key={index} question={q} index={index} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default GenAssessment;
