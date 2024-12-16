import React from 'react'
import Hero from './Hero'
import Rating from './Rating'
import Mamber from './Member'
import Services from './Services'

const About = () => {
  return (
    <div className='flex flex-col gap-[50px] md:gap-[130px]'>
        <Hero/>
        <Rating/>
        <Mamber/>
        <Services/>
    </div>
  )
}

export default About