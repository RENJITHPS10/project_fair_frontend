import React, { useContext, useEffect, useState } from 'react'
import { faGlobe, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Addproject from './Addproject'
import Edit from './Edit'
import { deleteuserprojectApi, getuserprojectsApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../context/Contextshare'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Myprojects() {
  const {editResponse}=useContext(editResponseContext)
  const [userprojects, setUserProjects] = useState([])
  const [deletestatus,setdeletestatus]=useState({})
  const { addResponse } = useContext(addResponseContext)

  const getuserprojects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`

      }
      const result = await getuserprojectsApi(reqHeaders)
      setUserProjects(result.data)
    }

  }

  const handledelete = async (id) => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await deleteuserprojectApi(id, reqHeaders)
      if (result.status == 200) {
        toast.success("project removed successfully")
        setdeletestatus(result)
      
      }else{
        toast.error("something went wrong")
      }
    }


  }

  useEffect(() => {
    getuserprojects()
  }, [addResponse,deletestatus,editResponse])

  return (
    <>
      <div className=' d-flex justify-content-between p-md-3 p-2 align-items-center'>
        <h4 className='text-success'>My Projects</h4>
        <Addproject />

      </div>
      {/* card */}
      {userprojects?.length > 0 ?
        userprojects?.map(item => (
          <div className='px-md-5 p-5 p-md-3  bg-light rounded-3 d-flex justify-content-between my-2   '>
            <h5>{item?.title}</h5>
            <div className=' fa-xl'>
              <Edit projects={item} />
              <Link to={item?.website} target='_blank' className='text-decoration-none text-black'>   <FontAwesomeIcon icon={faGlobe} className='me-md-3 me-2  ' /></Link>
              <Link to={item?.github} target='_blank' className='text-decoration-none' >  <FontAwesomeIcon icon={faGithub} className='me-md-3 me-2 ' /></Link>
              <FontAwesomeIcon icon={faTrashCan} className='me-md-3 me-2   text-danger' onClick={() => handledelete(item._id)} />
            </div>

          </div>))
        :
        <h6 className='text-center text-warning mt-5'>No project added yet</h6>
      }
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  )
}

export default Myprojects
