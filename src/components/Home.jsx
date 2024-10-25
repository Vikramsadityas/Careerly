import React from 'react'
import JobCard from './JobCard'
import JobSearchBar from './JobSearchBar'
import ProfileCard from './ProfileCard'
function Home() {
  return (
    <>
    <ProfileCard/>
    <JobSearchBar/>
    <div className='m-4'>
    <h1 className='font-bold text-2xl'>Recommended Jobs</h1>
    <div className='flex justify-center mt-10'>
        <JobCard/>
    </div>
    </div>
  </>
  )
}

export default Home