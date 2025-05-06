"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, GraduationCap, MapPin, Mail, Phone, Linkedin, Github } from "lucide-react"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export default function ProfilePage() {
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
    <div>
        <Navbar />
        <main>
        <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.name} />
              <AvatarFallback className="text-2xl">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-center text-2xl">{userData.name}</CardTitle>
            <CardDescription className="text-center text-lg font-medium">{userData.job_title}</CardDescription>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gray-500" />
                <a href={`mailto:${userData.email}`} className="text-blue-600 hover:underline">
                  {userData.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gray-500" />
                <a href={`tel:${userData.contact}`} className="text-blue-600 hover:underline">
                  {userData.contact}
                </a>
              </div>
              <div className="flex items-center">
                <Linkedin className="h-5 w-5 mr-3 text-gray-500" />
                <a
                  href={`https://${userData.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {userData.linkedin}
                </a>
              </div>
              <div className="flex items-center">
                <Github className="h-5 w-5 mr-3 text-gray-500" />
                <a
                  href={`https://${userData.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {userData.github}
                </a>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold text-lg mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="misc">Miscellaneous</TabsTrigger>
            </TabsList>

            {/* Experience Tab */}
            <TabsContent value="experience" className="mt-4">
              <Card>
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

            {/* Education Tab */}
            <TabsContent value="education" className="mt-4">
              <Card>
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

            {/* Projects Tab */}
            <TabsContent value="projects" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.projects.map((project, index) => (
                      <Card key={index} className="overflow-hidden">
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

            {/* Miscellaneous Tab */}
            <TabsContent value="misc" className="mt-4">
              <Card>
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
          </Tabs>
        </div>
      </div>
    </div>
        </main>
        <Footer />
    </div>
  )
}