import React from 'react'
import bannerimg from "../assets/images/Screenshot 2025-09-20 093510.png"
const Whatwearegiving = () => {
  return (
    <div>
       <div className='flex items-center justify-center '>
            <div className='text-2xl font-semibold pt-10'>What we provide </div>
            <div className='flex items-center justify-center pt-5'>
            <img src={bannerimg} alt="banner image about " />
          </div>
          </div>
    </div>
  )
}

export default Whatwearegiving
