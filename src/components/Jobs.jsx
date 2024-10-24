import React from 'react'
import JobCard from './JobCard'
import JobSearchBar from './JobSearchBar'
function Jobs() {
  return (
    <>
    <h1 className='font-bold text-2xl'>JOBS</h1>
    <div>
        <JobSearchBar/>
    </div>
    <div className='flex justify-center mt-10'>
        <JobCard/>
        <JobCard/>
        <JobCard/>
    </div>
    </>
  )
}

export default Jobs