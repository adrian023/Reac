import React from 'react'
import Homepage from './pages/Homepage'
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, {jobLoader} from './pages/JobPage';
import AddPage from './pages/AddPage';
import EditJobPage from './pages/EditJobPage';

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout';

const App = () => {
  //ADD NEW JOB
  const addJob = async(newJob) =>{
    try{
      const res = await fetch('/api/jobs', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(newJob),
      });

      if(!res.ok){
        const errorData = await res.json();
        console.error(`Error: ${errorData.message}`);
        return false;
      }

      return true;
    }catch(error){
      // Handle any network or other errors
      console.error(`Network error: ${error.message}`);
      return false;      
    }
  }


  const editJob = async(job) =>{
    try{
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(job),
      });

      if(!res.ok){
        const errorData = await res.json();
        console.error(`Error: ${errorData.message}`);
        return false;
      }

      return true;
    }catch(error){
      // Handle any network or other errors
      console.error(`Network error: ${error.message}`);
      return false;      
    }    
  }


  //DELETE JOB
  // const deleteJob = async(id) => {
  //   const res = await fetch(`/api/jobs/${id}`, {
  //     method: "DELETE",
  //   });
  //   return;
  // }

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        // Handle unsuccessful response
        const errorData = await res.json();
        console.error(`Error: ${errorData.message}`);
        return false;
      }
  
      return true;
  
    } catch (error) {
      // Handle any network or other errors
      console.error(`Network error: ${error.message}`);
      return false;
    }
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout></MainLayout>}>
      <Route index element={<Homepage/>}/>
      <Route path='/jobs' element={<JobsPage/>}/>
      <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />}  loader={jobLoader}/>
      <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={editJob}/>}  loader={jobLoader}/>
      <Route path='/add-job' element={<AddPage addJobSubmit={addJob}/>}></Route>
      <Route path='*' element={<NotFoundPage/>}/>
    </Route>
    
  )
  );

  return (
    <RouterProvider router={router}></RouterProvider>
  )
} 

export default App