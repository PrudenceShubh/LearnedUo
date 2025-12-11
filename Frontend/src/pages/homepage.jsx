import React from 'react'
import Navebar from '../components/navebar'
import Banner from '../components/banner'

import WalkThroughit from '../components/walkThroughIt'
import ContactUs from '../components/contactus'
// import Whatwearegiving from '../components/whatwearegiving'


const Homepage = () => {
  return (
    <div>
      <Banner/>
      {/* <Whatwearegiving/> */}
     <WalkThroughit/>
     <ContactUs/>
    </div>
  )
}

export default Homepage
