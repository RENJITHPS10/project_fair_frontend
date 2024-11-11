import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';

function Edit({ projects }) {
    const [key, setKey] = useState(1)
    const [projectDetails, setProjectDetails] = useState({
        title: projects.title,
        language: projects.language,
        github: projects.github,
        website: projects.github,
        projectimage: "",
        overview: projects.overview

    })
    const [preview, setPreview] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () =>{
        setShow(false)
        handleCancel()
    } 
    const handleShow = () => setShow(true);

    const handlefile = (e) => {
        setProjectDetails({ ...projectDetails, projectimage: e.target.files[0] })
    }
    const handleCancel = () => {
        setProjectDetails({
            title: projects.title,
            language: projects.language,
            github: projects.github,
            website: projects.github,
            projectimage: "",
            overview: projects.overview


        })
        setPreview("")
        if (key == 1) {
            setKey(0)
        } else {
            setKey(1)
        }
    }

    useEffect(() => {
        if (projectDetails.projectimage) {
            setPreview(URL.createObjectURL(projectDetails.projectimage))
        }


    }, [projectDetails.projectimage])
    console.log(preview)
    return (
        <>

            <FontAwesomeIcon icon={faPenNib} className='me-md-3 me-2 text-info' onClick={handleShow} />
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title className='text-success '>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="projectimage">
                                    <input id='projectimage' type="file" style={{ display: 'none' }} key={key} onChange={(e) => handlefile(e)} />
                                    <img src={preview ? preview : `${serverUrl}/upload/${projects.projectimage}`} alt="" height={300} className='w-100' />
                                </label>
                            </div>
                            <div className="col-md-6">
                                <input type="text" className='w-100 form-control bg-light ' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                                <input type="text" className='w-100 form-control bg-light mt-2 ' value={projectDetails.language}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                                <input type="text" className='w-100 form-control bg-light mt-2 ' value={projectDetails.github}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                                <input type="text" className='w-100 form-control bg-light mt-2 ' value={projectDetails.website}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                                <textarea rows={5} className='w-100 form-control bg-light mt-2' value={projectDetails.overview}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}></textarea>
                            </div>
                        </div>
                    </div>



                </Modal.Body>
                <Modal.Footer className='bg-light'>
                    <Button variant="warning" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleClose}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>




        </>
    )
}

export default Edit
