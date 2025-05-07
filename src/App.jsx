import AdminProfile from "./pages/admin/AdminProfile"
import MatchJob from "./pages/admin/MatchJob"
import Postjob from "./pages/admin/Postjob"
import CodingBased from "./pages/AIPages/CodingBased"
import ImageGenerate from "./pages/AIPages/ImageGenerate"
import ResumeGenerator from "./pages/AIPages/ResumeGenerator"
import VideoGenerate from "./pages/AIPages/VideoGenerate"
import Login from "./pages/authPages/Login"
import Home from "./pages/home/Home"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminProfile" element={<AdminProfile />} />
      <Route path="/imageGenerate" element={<ImageGenerate />} />
      <Route path="/codingBased" element={<CodingBased />} />
      <Route path="/videoGenerate" element={<VideoGenerate />} />
      <Route path="/resumeGenerator" element={<ResumeGenerator />} />

      <Route path="/postjob" element={<Postjob />} />
      <Route path="/matchJob" element={<MatchJob />} />
    </Routes>
    </>
  )
}

export default App
