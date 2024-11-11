import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ register }) {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleregister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info("please fill the form completely")
    } else {
      const result = await registerApi(userDetails)
      console.log(result)
      if (result.status == 200) {
        toast.success('registeration successfull')
        setUserDetails({
          username: '',
          email: '',
          password: ''
        })
        navigate('/login')
      } else if (result.status == 406) {
        toast.warning(result.response.data)
      } else {
        toast.danger("something went wrong")
      }

    }

  }


  const handlelogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {

      toast.info("please fill the form completely")

    } else {
      const result = await loginApi(userDetails)
      console.log(result)

      if(result.status==200){

        toast.success("login successfull")

        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
       
        setUserDetails({
          username: '',
          email: '',
          password: ''
        })
        
        setTimeout(()=>{
          navigate('/')
        },2000)
      }else if(result.status==406){
        toast.warning(result.response.data)
      }else{
        toast.error("something went wrong")
      }

    }

  }


  console.log(userDetails)
  return (
    <>

      <div className='container my-5'>
        <Link to={'/'} className='text-decoration-none'>  <h5 className='text-warning'> <FontAwesomeIcon icon={faBackward} /> Back to Home</h5></Link>
        <div className='row bg-success  ' style={{ height: '100vh' }} >
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src="/login.png" alt="" />
          </div>
          <div className="col-md-6  d-flex flex-column align-items-center justify-content-center text-white">
            <div className='d-flex fs-5 '>
              <h1 > <FontAwesomeIcon icon={faStackOverflow} className='me-2' />
                Project Fair</h1>
            </div>

            {!register ? <h5 className='my-3'>Sign In to Your Account </h5>
              : <h5 className='my-3'>Sign Up to Your Account </h5>}
            {register && <input type="text" className='form-control w-75' placeholder='UserName' style={{ height: '3rem' }} required onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} value={userDetails.username} />}
            <input type="text" className='form-control w-75 mt-3' placeholder='E-mail ID' style={{ height: '3rem' }} required onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} value={userDetails.email} />
            <input type="password" className='form-control w-75 mt-3' placeholder='Password' style={{ height: '3rem' }} required onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} value={userDetails.password} />

            {!register ?
              <div>
                <button className='btn btn-warning w-100 mt-4' onClick={handlelogin} style={{ height: '3rem' }}>Login</button>
                <h5 className='mt-3'>New User? Click Here to <Link to={'/register'} className='text-danger' >Register</Link></h5>
              </div>
              :
              <div>
                <button className='btn btn-warning w-100 mt-4' style={{ height: '3rem' }} onClick={handleregister} >Register</button>
                <h5 className='mt-3'>Already a User?Click Here to  <Link to={'/login'} className='text-danger ' >Login</Link></h5>
              </div>
            }

          </div>

        </div>

      </div>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />

    </>
  )
}

export default Auth
