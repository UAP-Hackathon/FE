"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AssessmentPage from './assesment'

const AVAILABLE_SKILLS = ['Java', 'C++', 'Python', 'JavaScript']

export default function AssessmentIndex() {
  const router = useRouter()
  const [selectedSkills, setSelectedSkills] = useState([])

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill)
      }
      return [...prev, skill]
    })
  }

  const handleStartAssessment = () => {
    if (selectedSkills.length === 0) {
      alert('Please select at least one skill')
      return
    }
    router.push(`/assesment?skills=${selectedSkills.join('&skills=')}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Select Skills for Assessment</h1>
          <p className="mt-2 text-lg text-gray-600">Choose the skills you want to be assessed on</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {AVAILABLE_SKILLS.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`p-4 rounded-lg border-2 text-center transition-colors ${
                  selectedSkills.includes(skill)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleStartAssessment}
              disabled={selectedSkills.length === 0}
              className={`px-6 py-3 rounded-md text-white font-medium ${
                selectedSkills.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 