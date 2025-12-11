import React from 'react'
import { Link } from 'react-router-dom'
import image from "../assets/images/image.png"

const Banner = () => {
  return (
    <div className="w-full  flex items-center justify-center">
      <div className="w-[90%] flex items-center justify-center gap-8 p-8 ">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Smarter Learning from Every Video</h1>
          <p className="mb-6 text-xl">Turn any video into notes, quizzes, and instant summery — all in one place.</p>
          <Link to="/learning"><button className="px-6 py-2 bg-blue-600 text-white text-xl font-semibold rounded hover:bg-blue-700 transition">Start Learning Smarter</button> </Link>
        </div>
        <div>
          <img src={image} className="h-150 object-contain" alt="Banner" />
        </div>
      </div>
    </div>
  )
}

export default Banner
