"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import * as LabelPrimitive from "@radix-ui/react-label"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { Circle, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { cn } from "../../lib/utils"
import { fetchAssessment } from "../../services/assessmentService"

// Add evaluateAnswer function
const evaluateAnswer = async (question, answer) => {
  try {
    console.log('Evaluating answer:', { question, answer }); // Debug log
    
    const response = await fetch('/api/jobseeker/evaluate-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        question: {
          question: question.question,
          type: question.type,
          sample_answer: question.sampleAnswer,
          key_points: question.keyPoints
        },
        answer: answer
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', errorData); // Debug log
      throw new Error(errorData.message || 'Failed to evaluate answer');
    }
    
    const data = await response.json();
    console.log('Evaluation response:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error evaluating answer:', error);
    throw error;
  }
};

// UI Components
const AssessmentButton = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "default"
          ? "bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
          : "border border-gray-200 bg-white hover:bg-gray-50 h-10 px-4 py-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
AssessmentButton.displayName = "AssessmentButton"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-white shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-200", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-blue-600 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-gray-300 text-blue-600 ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

// Question Components
function McqQuestion({ question, selectedAnswer, onAnswerChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 whitespace-pre-line">{question.question}</h3>

      <RadioGroup 
        value={selectedAnswer} 
        onValueChange={onAnswerChange} 
        className="space-y-4"
      >
        {question.options?.map((option) => (
          <div 
            key={option} 
            className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              selectedAnswer === option 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
            onClick={() => onAnswerChange(option)}
          >
            <RadioGroupItem value={option} id={`option-${option}`} className="mt-1" />
            <Label 
              htmlFor={`option-${option}`} 
              className="flex-1 cursor-pointer text-gray-700 font-medium"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

function ShortAnswerQuestion({ question, answer, onAnswerChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h3>

      <div className="space-y-4">
        <Textarea
          placeholder="Type your answer here..."
          value={answer || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="min-h-[150px] text-gray-700 w-full"
        />
        
        {question.keyPoints && question.keyPoints.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Key points to include:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {question.keyPoints.map((point, index) => (
                <li key={index} className="text-sm text-blue-700">{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function ResultsPage({ examData, userAnswers, evaluationResults }) {
  // Calculate score for MCQ questions
  const mcqQuestions = examData.questions.filter((q) => q.type === "mcq")
  const correctMcqAnswers = mcqQuestions.filter((q) => userAnswers[q.id] === q.correctAnswer).length

  const mcqScore = mcqQuestions.length > 0 ? Math.round((correctMcqAnswers / mcqQuestions.length) * 100) : 0

  // For short answers, we can't automatically grade them
  const shortAnswerQuestions = examData.questions.filter((q) => q.type === "short_answer")
  const shortAnswerCount = shortAnswerQuestions.length

  // Calculate overall completion
  const answeredQuestions = Object.keys(userAnswers).length
  const completionPercentage = Math.round((answeredQuestions / examData.questions.length) * 100)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Exam Results</h2>

      <div className="grid gap-6 mb-8">
        <Card className="p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Multiple Choice Questions</h3>
            <div className="flex items-center">
              <span className="font-semibold mr-2">
                {correctMcqAnswers}/{mcqQuestions.length}
              </span>
              <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800">{mcqScore}%</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Short Answer Questions</h3>
            <div className="flex items-center">
              <span className="font-semibold">{shortAnswerCount} questions</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Completion</h3>
            <div className="flex items-center">
              <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800">
                {completionPercentage}%
              </span>
            </div>
          </div>
        </Card>
      </div>

      <h3 className="text-xl font-semibold mb-4">Question Review</h3>

      <div className="space-y-6 mb-8">
        {examData.questions.map((question) => (
          <Card key={question.id} className="p-6">
            <div className="flex items-start gap-3">
              {question.type === "mcq" ? (
                question.correctAnswer === userAnswers[question.id] ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                )
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
              )}

              <div className="flex-1">
                <h4 className="font-medium mb-2">
                  Question {question.id}: {question.question}
                </h4>

                {question.type === "mcq" && (
                  <div className="mb-3">
                    <div className="text-sm mb-1">
                      <span className="font-medium">Your answer: </span>
                      <span
                        className={
                          question.correctAnswer === userAnswers[question.id] ? "text-green-600" : "text-red-600"
                        }
                      >
                        {userAnswers[question.id] || "Not answered"}
                      </span>
                    </div>

                    <div className="text-sm">
                      <span className="font-medium">Correct answer: </span>
                      <span className="text-green-600">{question.correctAnswer}</span>
                    </div>

                    {question.explanation && (
                      <div className="mt-2 p-3 bg-blue-50 text-blue-800 text-sm rounded-md">
                        <span className="font-medium">Explanation: </span>
                        {question.explanation}
                      </div>
                    )}
                  </div>
                )}

                {question.type === "short_answer" && (
                  <div className="mb-3">
                    <div className="text-sm mb-2">
                      <span className="font-medium">Your answer: </span>
                      <div className="mt-1 p-2 bg-gray-100 rounded-md">
                        {userAnswers[question.id] || "Not answered"}
                      </div>
                    </div>

                    {evaluationResults && evaluationResults[question.id] && (
                      <div className="mt-2 p-3 bg-blue-50 text-blue-800 text-sm rounded-md">
                        <span className="font-medium">Evaluation: </span>
                        {evaluationResults[question.id].feedback}
                      </div>
                    )}

                    <div className="text-sm mt-2">
                      <span className="font-medium">Sample answer: </span>
                      <div className="mt-1 p-2 bg-green-50 rounded-md text-green-800">{question.sampleAnswer}</div>
                    </div>

                    {question.keyPoints && question.keyPoints.length > 0 && (
                      <div className="mt-2">
                        <span className="text-sm font-medium">Key points to include:</span>
                        <ul className="list-disc pl-5 mt-1 text-sm text-gray-700">
                          {question.keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <AssessmentButton onClick={() => window.location.href = '/exam2'}>Second Exam</AssessmentButton>
      </div>
    </div>
  )
}

// Main Exam Container Component
function ExamContainer({ examData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [evaluationResults, setEvaluationResults] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const totalQuestions = examData.questions.length
  const currentQuestion = examData.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const handleAnswer = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const results = {};
      
      console.log('Starting submission with answers:', answers);
      
      const shortAnswerQuestions = examData.questions.filter(q => q.type === 'short_answer');
      
      for (const question of shortAnswerQuestions) {
        if (answers[question.id]) {
          try {
            console.log(`Evaluating question ${question.id}:`, { question, answer: answers[question.id] });
            const evaluation = await evaluateAnswer(question, answers[question.id]);
            results[question.id] = evaluation;
          } catch (error) {
            console.error(`Error evaluating question ${question.id}:`, error);
            results[question.id] = {
              error: true,
              feedback: error.message || "Failed to evaluate answer. Please try again."
            };
          }
        }
      }
      
      console.log('Evaluation results:', results);
      
      try {
        localStorage.setItem('assessment_answers', JSON.stringify(answers));
        localStorage.setItem('assessment_evaluation', JSON.stringify(results));
      } catch (error) {
        console.error('Error saving answers to localStorage:', error);
      }
      
      setEvaluationResults(results);
      setExamSubmitted(true);

      // Add a delay before redirecting to show results briefly
      setTimeout(() => {
        window.location.href = '/';
      }, 3000); // 3 seconds delay

    } catch (error) {
      console.error('Error submitting exam:', error);
      setSubmitError(error.message || 'Failed to submit exam. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1
  const isFirstQuestion = currentQuestionIndex === 0
  const currentAnswer = answers[currentQuestion.id] || ""
  
  // Fix: Check if all questions have been answered
  const allQuestionsAnswered = examData.questions.every((q) => answers[q.id] !== undefined && answers[q.id] !== "");

  // Load saved answers on component mount
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem('assessment_answers');
      const savedEvaluation = localStorage.getItem('assessment_evaluation');
      
      if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers);
        setAnswers(parsedAnswers);
      }
      
      if (savedEvaluation) {
        const parsedEvaluation = JSON.parse(savedEvaluation);
        setEvaluationResults(parsedEvaluation);
      }
    } catch (error) {
      console.error('Error loading saved answers:', error);
    }
  }, []);

  if (examSubmitted) {
    return (
      <div className="p-6">
        <ResultsPage examData={examData} userAnswers={answers} evaluationResults={evaluationResults} />
        <div className="text-center mt-4 text-sm text-gray-600">
          Redirecting to home page in 3 seconds...
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-8 mb-8 bg-white shadow-lg">
        {currentQuestion.type === "mcq" ? (
          <McqQuestion
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.id]}
            onAnswerChange={handleAnswer}
          />
        ) : (
          <ShortAnswerQuestion
            question={currentQuestion}
            answer={answers[currentQuestion.id]}
            onAnswerChange={handleAnswer}
          />
        )}
      </Card>

      <div className="flex justify-between">
        <AssessmentButton 
          variant="outline" 
          onClick={handlePrevious} 
          disabled={isFirstQuestion || isSubmitting}
          className="min-w-[120px]"
        >
          Previous
        </AssessmentButton>

        {isLastQuestion ? (
          <AssessmentButton 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Exam'}
          </AssessmentButton>
        ) : (
          <AssessmentButton 
            onClick={handleNext}
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            Next
          </AssessmentButton>
        )}
      </div>

      {submitError && (
        <p className="text-sm text-red-600 mt-4 text-center">
          {submitError}
        </p>
      )}

      {!allQuestionsAnswered && isLastQuestion && (
        <p className="text-sm text-amber-600 mt-4 text-center">
          Please answer all questions before submitting
        </p>
      )}
    </div>
  )
}

// Main Page Component
export default function AssessmentPage() {
  const [examData, setExamData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        setLoading(true)
        // Get skills from URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const skills = urlParams.getAll('skills')
        
        if (!skills || skills.length === 0) {
          throw new Error('No skills provided')
        }

        // Fetch the assessment data
        const assessmentData = await fetchAssessment(skills)
        setExamData(assessmentData)
      } catch (err) {
        console.error('Error loading assessment:', err);
        setError(err.message || 'Failed to load assessment')
      } finally {
        setLoading(false)
      }
    }

    loadAssessment()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">Loading assessment...</h2>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-red-600">Error loading assessment</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return Home
          </button>
        </div>
      </main>
    )
  }

  if (!examData) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Skills Assessment</h1>
          <p className="mt-2 text-lg text-gray-600">
            Test your knowledge of {examData?.skillsAssessed?.join(', ') || 'selected skills'}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ExamContainer examData={examData} />
        </div>
      </div>
    </main>
  )
}
