import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateuserprofileApi } from '../services/allApi';
import { Collapse } from 'react-bootstrap';


function Profile() {
    const [open, setOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
        profile: "",
        github: "",
        linkedin: ""
    })
    const [updatestatus, setupdatestatus] = useState('')
    const [preview, setPreview] = useState("")
    const [existingImg, setExistingImg] = useState('')

    const handlefile = (e) => {
        setUserDetails({ ...userDetails, profile: e.target.files[0] })

    }
    const handleupdate = async () => {
        const { username, email, password, profile, github, linkedin } = userDetails
        if (!github || !linkedin) {
            toast.info("please add github and linkedin")
        } else {
            const reqBody = new FormData()

            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("password", password)
            reqBody.append("github", github)
            reqBody.append("linkedin", linkedin)
            preview ? reqBody.append("profile", profile) : reqBody.append("profile", existingImg)
            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqHeaders = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateuserprofileApi(reqBody, reqHeaders)
                console.log(result)
                if (result.status == 200) {
                    toast.success("profile updated sucessfully")
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                    setupdatestatus(result)



                }

            } else {
                const reqHeaders = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateuserprofileApi(reqBody, reqHeaders)
                console.log(result)
                if (result.status == 200) {
                    toast.success("profile updated sucessfully")
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                    setupdatestatus(result)



                }

            }



        }
    }



    // console.log(userDetails)

    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            console.log(user)
            setUserDetails({ ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin })
            setExistingImg(user.profile)
        }

    }, [updatestatus])

    useEffect(() => {
        if (userDetails.profile) {
            setPreview(URL.createObjectURL(userDetails.profile))
        }

    }, [userDetails.profile])


    return (
        <>
            <div className='shadow p-2'>
                <div className='d-flex justify-content-between'>
                    <h4 className='text-success'>Profile</h4>
                    <button className='px-2  btn btn-light' onMouseEnter={() => setOpen(!open)} onMouseLeave={()=>setOpen(!open)} >
                        { open==false?
                        <FontAwesomeIcon icon={faChevronDown}  />
                        : 
                        <FontAwesomeIcon icon={faChevronUp} />}
                        </button>

                </div>
                <Collapse in={open} >
                <div>
                <div className='d-flex justify-content-center '>
                    <label htmlFor="profileimage" >
                        <input type="file" id='profileimage' style={{ display: 'none' }} onChange={(e) => handlefile(e)} />
                        {existingImg == '' ?
                            <img src={preview ? preview : "/profile.png"} alt="" className='rounded-circle' width={100} height={100} />
                            :
                            <img src={preview ? preview : `${serverUrl}/upload/${existingImg}`} className='rounded-circle' alt="" width={100} height={100} />}
                    </label>
                </div>
                <input type="text" className='form-control mt-4' placeholder='GitHub' value={userDetails.github} onChange={(e) => { setUserDetails({ ...userDetails, github: e.target.value }) }} />
                <input type="text" className='form-control mt-2' placeholder='LikedIn' value={userDetails.linkedin} onChange={(e) => { setUserDetails({ ...userDetails, linkedin: e.target.value }) }} />
                <button className='btn btn-success w-100 mt-2  ' onClick={handleupdate} >Update</button>
                </div>
                </Collapse>
            </div>
            <ToastContainer theme="colored" position="top-center" autoClose={2000} />

        </>
    )
}

export default Profile
