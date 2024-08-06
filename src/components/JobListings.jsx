import React from 'react'
import { useState, useEffect } from 'react';
import JobListing from './JobListing'
import Spinner from './Spinner';

function JobListings({isHome=true}) {
  // declare useStates
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  // declare useEffects
  useEffect( () =>{
    const fetchJobs = async () => {
      const appUrl = isHome? "https://restful-api-vercel-e4inf4ue2-adrians-projects-d19b5adb.vercel.app/jobs" : "https://restful-api-vercel-e4inf4ue2-adrians-projects-d19b5adb.vercel.app/jobs"
      try {
          const res = await fetch(appUrl);
          const data = await res.json();
          setJobs(data);
      } catch (error) {
          console.log('Error fetching data', error);
      }finally{
        setLoading(false)
      }
    }
    fetchJobs();
  }, []);
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome? 'Recent Jobs': 'All Jobs'}
        </h2>
          {/* <!-- Job Listing 1 --> */}

        {loading? (<Spinner loading={loading}></Spinner>) : 
        (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {jobs.map((job)=>{
              return(
              <JobListing key={job.id} job={job}></JobListing>
              )})
            }
            </div>
          </>
        )
        }
      </div>
    </section>
  )
}

export default JobListings