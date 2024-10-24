import React from 'react'
import JobCard from './JobCard'
import JobSearchBar from './JobSearchBar'
function Home() {
  return (
    <>
   
    <div className='flex justify-center mt-10'>
        <JobCard/>
        <JobCard/>
        <JobCard/>
    </div>
  </>
  )
}

export default Home