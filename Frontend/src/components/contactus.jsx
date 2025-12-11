import React from 'react'
import Bottom from "../assets/images/bottomsectionimg.png"
const ContactUs = () => {
  return (
    <div className='h-70 mt-10 bg-gray-200'>
        {/* <img className='h-100 w-full blur-xs' src={Bottom} alt="" srcset="" /> */}
      <div className='h-[100%] flex items-center justify-evenly '>
        <div>
            <p className='text-4xl'>Contact us For Collaberation </p>
        </div>
        <div className='flex gap-3 items-center justify-center    flex-col'>
            <input type="text" placeholder='Enter Your query' className='bg-white text-xl w-120 p-2 rounded-l border-2' />
            <input type="email" placeholder='Enter Your Email' className='text-xl bg-white border-2 w-120 p-2 rounded-l' />
            <button className="px-6 py-2 w-50 bg-blue-600 text-white text-xl font-semibold rounded hover:bg-blue-700 transition">Submit</button>
        </div>

      </div>
    </div>
  )
}

export default ContactUs
