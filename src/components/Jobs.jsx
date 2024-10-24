import React from 'react'
import JobCard from './JobCard'
function Jobs() {
  return (
    <div className='flex justify-center mt-10'>
        <JobCard/>
        <JobCard/>
        <JobCard/>
    </div>
  )
}

export default Jobs