import React from 'react'
import JobCard from './JobCard'
import JobSearchBar from './JobSearchBar'
import ProfileCard from './ProfileCard'
function Home() {
  return (
    <>
    <JobSearchBar/>
    <ProfileCard/>
    <div className='flex justify-center mt-10'>
        <JobCard/>
        <JobCard/>
        <JobCard/>
    </div>
  </>
  )
}

export default Home