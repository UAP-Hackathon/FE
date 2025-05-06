"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, GraduationCap, MapPin, Mail, Phone, Linkedin, Github } from "lucide-react"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export default function ProfilePage() {
  const jobRecommendations = [
    {
      job_id: 2,
      title: "string",
      company_name: "string",
      location: "string",
      salary: "0.0",
      match_score: 0.6,
      matched_skills: ["python", "c++", "java"],
      missing_skills: ["html", "react"],
      description: null
    },
    {
      job_id: 1,
      title: "string", 
      company_name: "string",
      location: "string",
      salary: "0.0",
      match_score: 0,
      matched_skills: [],
      missing_skills: ["string", "hello"],
      description: null
    }
  ];

  // This would normally come from an API or context
  // For demo purposes, using the provided JSON data
  const userData = {
    id: 5,
    name: "Antu Datta",
    email: "antud681@gmail.com",
    role: {
      id: 2,
      name: "JOB_SEEKER",
      permissions: [],
    },
    username: "antu",
    contact: "+8801858310105",
    company_name: "",
    job_title: "Junior Software Engineer",
    linkedin: "linkedin.com/in/antudatta/",
    github: "github.com/antu",
    has_cv: true,
    skills: [
      "C",
      "C++",
      "Java",
      "Python",
      "Kotlin",
      "JavaScript",
      "TypeScript",
      "Swift",
      "Bash",
      "MySQL",
      "Oracle",
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "Firebase",
      "Git",
      "Docker",
      "Atlassian (Jira, Confluence)",
      "IntelliJ IDEA",
    ],
    education: [
      {
        institution: "University of Dhaka",
        location: "Dhaka, Bangladesh",
        degree: "Bachelors in Computer Science and Engineering",
        period: "Jan 2021 – Present",
      },
    ],
    experience: [
      {
        position: "Junior Software Engineer",
        company: "Amicsoft",
        location: "Dhaka, Bangladesh",
        period: "Mar 2023 – May 2024",
        technologies: "C++, Java, Javascript, Python",
        responsibilities: [
          "Complete back-end development of a learning management system website named Syntellix with NodeJS, ExpressJS, and MongoDB.",
          "Designing project architecture along with database design.",
          "System security with JWT authentication of both access token and refresh token along with third party authentication like Google, GitHub, and LinkedIn.",
          "Project deployment in Google Cloud Run along with CI/CD pipeline setup with GitHub.",
          "Complete API and database documentation in Atlassian.",
          "Back-end development with FastAPI",
          "AI development experience with deep fake generation",
          "Front-end development with ReactJS and NextJS",
          "Google Cloud Big Query operations with python.",
        ],
      },
    ],
    projects: [
      {
        name: "E-Coaching",
        technologies: "ReactJS, FastApi, PostgreSQL, Software Testing",
        description:
          "A client-side website built using ReactJS in front-end, FastApi in back-end and PostgreSQL as database",
      },
      {
        name: "TripMate",
        technologies: "React, FastApi",
        description:
          "A web-based platform that empowers budget-conscious travelers to plan personalized and affordable trips.",
      },
      {
        name: "FoodiePal",
        technologies: "Java, OOP, JavaFX",
        description: "A complete restaurant management system.",
      },
      {
        name: "FastShare",
        technologies: "Android, Networking",
        description: "An android app in java. It is for any type of file sharing using socket connection.",
      },
      {
        name: "Tuition Tracker",
        technologies: "MySQL, Python",
        description: "A tuition management system.",
      },
      {
        name: "EcoWaste Solutions",
        technologies: "ReactJS, FastAPI, PostgreSQL",
        description: "A complete waste solution.",
      },
      {
        name: "DX-BALL",
        technologies: "C, C++, SDL",
        description: "A DX-BALL game for modern day with boss levels and much more.",
      },
    ],
    miscellaneous: [
      "Programming Contest",
      "Hackathon: Achieved 2nd position Leading University CSE carnival-2023 Hackathon and finalist of SUST CSE Carnival-2024 hackathon.",
      "Love to play different games",
      "Watching sports",
      "LeetCode: Solved more than 170 problem in Python.",
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <Navbar />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary Card */}
            <Card className="lg:col-span-1 bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300">
              <CardHeader className="flex flex-col items-center space-y-4 p-6">
                <Avatar className="h-32 w-32 ring-4 ring-purple-500 ring-offset-4 ring-offset-white/95">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt={userData.name} />
                  <AvatarFallback className="text-3xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center space-y-2">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {userData.name}
                  </CardTitle>
                  <CardDescription className="text-lg font-medium">{userData.job_title}</CardDescription>
                  <div className="flex items-center justify-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                <div className="space-y-4 divide-y divide-gray-100">
                  {[
                    { icon: Mail, href: `mailto:${userData.email}`, text: userData.email },
                    { icon: Phone, href: `tel:${userData.contact}`, text: userData.contact },
                    { icon: Linkedin, href: `https://${userData.linkedin}`, text: userData.linkedin },
                    { icon: Github, href: `https://${userData.github}`, text: userData.github }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center pt-4 first:pt-0">
                      <item.icon className="h-5 w-5 mr-3 text-purple-500" />
                      <a 
                        href={item.href}
                        target={item.href.startsWith('http') ? "_blank" : undefined}
                        rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="text-gray-700 hover:text-purple-500 transition-colors"
                      >
                        {item.text}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        className="bg-white text-black hover:from-purple-800 hover:to-pink-800 transition-all duration-300 border-collapse border-2 border-black/10 p-2 rounded-lg shadow-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="experience" className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-white/95 backdrop-blur-sm rounded-lg p-1">
                  {["experience", "education", "projects", "misc", "recommendations"].map((tab) => (
                    <TabsTrigger 
                      key={tab}
                      value={tab}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 border-0 rounded-lg text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white p-2"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Tab Contents */}
                <TabsContent value="experience" className="mt-4">
                  <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Briefcase className="mr-2 h-5 w-5" />
                        Work Experience
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {userData.experience.map((exp, index) => (
                          <div key={index} className="border-l-2 border-gray-200 pl-4 ml-2 relative">
                            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1"></div>
                            <h3 className="text-xl font-semibold">{exp.position}</h3>
                            <div className="flex items-center text-muted-foreground mb-1">
                              <span className="font-medium">{exp.company}</span>
                              <span className="mx-2">•</span>
                              <span>{exp.location}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-3">{exp.period}</div>
                            <div className="mb-3">
                              <span className="text-sm font-medium">Technologies: </span>
                              <span className="text-sm">{exp.technologies}</span>
                            </div>
                            <ul className="list-disc pl-5 space-y-1">
                              {exp.responsibilities.map((resp, idx) => (
                                <li key={idx} className="text-sm">
                                  {resp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education" className="mt-4">
                  <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {userData.education.map((edu, index) => (
                          <div key={index} className="border-l-2 border-gray-200 pl-4 ml-2 relative">
                            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1"></div>
                            <h3 className="text-xl font-semibold">{edu.institution}</h3>
                            <div className="text-muted-foreground mb-1">{edu.location}</div>
                            <div className="font-medium">{edu.degree}</div>
                            <div className="text-sm text-muted-foreground">{edu.period}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects" className="mt-4">
                  <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                    <CardHeader>
                      <CardTitle>Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userData.projects.map((project, index) => (
                          <Card key={index} className="overflow-hidden bg-white/80 hover:bg-white/90 transition-colors">
                            <CardHeader className="p-4 pb-2">
                              <CardTitle className="text-lg">{project.name}</CardTitle>
                              <CardDescription className="text-xs font-medium">{project.technologies}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <p className="text-sm">{project.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="misc" className="mt-4">
                  <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                    <CardHeader>
                      <CardTitle>Miscellaneous Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        {userData.miscellaneous.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations" className="mt-4">
                  <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Briefcase className="mr-2 h-5 w-5 text-purple-500" />
                        Recommended Jobs
                      </CardTitle>
                      <CardDescription>
                        Jobs matching your skills and experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {jobRecommendations.map((job) => (
                          <Card 
                            key={job.job_id} 
                            className="overflow-hidden bg-white/80 hover:bg-white/95 transition-all duration-300 hover:shadow-lg border border-gray-100"
                          >
                            <CardHeader className="p-6">
                              <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    {job.title}
                                  </CardTitle>
                                  <CardDescription className="text-sm flex items-center space-x-2">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{job.company_name}</span>
                                    <span>•</span>
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.location}</span>
                                  </CardDescription>
                                </div>
                                <Badge 
                                  className={`
                                    ${job.match_score >= 0.6 
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                      : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                    } 
                                    text-white font-medium px-3 py-1 rounded-full shadow-sm
                                  `}
                                >
                                  {Math.round(job.match_score * 100)}% Match
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                              {job.matched_skills.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium mb-2 text-gray-700">Matched Skills:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {job.matched_skills.map((skill, idx) => (
                                      <Badge 
                                        key={idx}
                                        className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 transition-colors border border-purple-200"
                                      >
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {job.missing_skills.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium mb-2 text-gray-700">Skills to Develop:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {job.missing_skills.map((skill, idx) => (
                                      <Badge 
                                        key={idx}
                                        className="bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200"
                                      >
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="text-sm font-medium text-gray-700">
                                  {job.salary && (
                                    <div className="flex items-center">
                                      <span className="font-normal text-gray-500">Salary:</span>
                                      <span className="ml-2 text-purple-600">${job.salary}</span>
                                    </div>
                                  )}
                                </div>
                                <button 
                                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md"
                                  onClick={() => window.open(`/jobs/${job.job_id}`, '_blank')}
                                >
                                  Apply Now
                                </button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}