import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';


function Addproject() {
const {setAddResponse}=useContext(addResponseContext)
    const [preview, setPreview] = useState('')
    const [token, setToken] = useState('')
    const [key, setKey] = useState(1)
    const [show, setShow] = useState(false);
    // console.log(preview)
    // console.log(token)
    const [projectDetails, setProjectDetails] = useState({
        title: '',
        language: '',
        github: '',
        website: '',
        projectimage: '',
        overview: ''

    })
    // console.log(projectDetails)


    const handleUpload = async () => {
        const { title, language, github, website, projectimage, overview } = projectDetails
        if (!title || !language || !github || !website || !projectimage || !overview) {
            toast.info("please fill the form completely")
        } else {
            // append()-if the request body contain the upload content, the form data will be send with append method in the form data class(reqbody should be form data)
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("projectimage", projectimage)
            reqBody.append("overview", overview)

            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await uploadProjectApi(reqBody, reqHeader)
                console.log(result)
                if (result.status == 200) {
                    toast.success("project added Successfully")


                    setTimeout(() => {
                        handleClose()
                    }, 2000)
                    setAddResponse(result)


                } else if (result.status == 406) {
                    toast.warning(result.response.data)
                    handleCancel()


                } else {
                    toast.error("something went wrong")
                    handleClose()
                }


            } else {
                toast.warning("please login")
            }

        }

    }

    const handleCancel = () => {
        setProjectDetails({
            title: '',
            language: '',
            github: '',
            website: '',
            projectimage: '',
            overview: ''
        })
        setPreview('')
        if (key == 1) {
            setKey(0)
        } else {
            setKey(1)
        }
    }



    const handleClose = () => {
        setShow(false)
        handleCancel()
    }
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (projectDetails.projectimage) {
            setPreview(URL.createObjectURL(projectDetails.projectimage))
        }
    }, [projectDetails.projectimage])
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem('token'))
        }

    }, [])
    return (
        <>
            <div>
                <button className='btn btn-success' onClick={handleShow}>Add Project</button>
            </div>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title className='text-success '>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="projectimage">
                                    <input id='projectimage' type="file" style={{ display: 'none' }} key={key} onChange={(e) => setProjectDetails({ ...projectDetails, projectimage: e.target.files[0] })} />
                                    <img src={preview ? preview : "/addproject.png"} alt="" height={300} className='w-100' />
                                </label>
                            </div>
                            <div className="col-md-6">
                                <input type="text" className='w-100 form-control bg-light ' placeholder='Title' onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} value={projectDetails.title} />
                                <input type="text" className='w-100 form-control bg-light mt-2 ' placeholder='Language' onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} value={projectDetails.language} />
                                <input type="text" className='w-100 form-control bg-light mt-2 ' placeholder='Github' onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} value={projectDetails.github} />
                                <input type="text" className='w-100 form-control bg-light mt-2 ' placeholder='Website' onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} value={projectDetails.website} />
                                <textarea rows={5} className='w-100 form-control bg-light mt-2' placeholder='Overview' onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} value={projectDetails.overview} ></textarea>
                            </div>
                        </div>
                    </div>



                </Modal.Body>
                <Modal.Footer className='bg-light'>
                    <Button variant="warning" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleUpload}>
                        Upload
                    </Button>
                </Modal.Footer>
                <ToastContainer theme="colored" position="top-center" autoClose={2000} />
            </Modal>



        </>

    )
}

export default Addproject
