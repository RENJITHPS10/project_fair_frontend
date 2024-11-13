import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Myprojects from '../components/Myprojects'
import Profile from '../components/Profile'




function Dashboard() {
  const [username,setUsername]=useState('')

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }

  },[])
  console.log(username)


 
  return (
   
    <>
    <Header/>
    <div className='container  mt-5'>
      <h5>Welcome<span className='text-warning'> {username}</span></h5>
      <div className="row w-100 m-md-3 p-1">
        <div className="col-md-8  shadow ">
          <Myprojects/>
        
        </div>
        <div className="col-md-4">
          <Profile/>
        </div>
      </div>

    </div>
      
    </>
  )
}

export default Dashboard
