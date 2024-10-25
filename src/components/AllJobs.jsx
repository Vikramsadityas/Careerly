import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import PostJobs from './PostJobs';

function AllJobs() {
    const [jobs, setjobs] = useState([])
    useEffect(() => {}, [])
    posts=[{title: 'Software Engineer', description: 'We are looking for a software engineer with 5 years experience', location: 'Lagos',}]
    // appwriteService.getPosts([]).then((posts) => {
    //     if (posts) {
    //         setPosts(posts.documents)
    //     }
    // })  use custom backend with axios

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {jobs.map((job) => (
                    <div key={jobs.$id} className='p-2 w-1/4'>
                        <PostJobs {...job} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllJobs