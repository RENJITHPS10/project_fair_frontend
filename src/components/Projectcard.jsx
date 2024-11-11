import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { serverUrl } from '../services/serverUrl';


function Projectcard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
            <Card className='w-100 shadow-lg mt-5 mt-md-4 shadow '   >
                <Card.Img variant="top" src={`${serverUrl}/upload/${project.projectimage}`} onClick={handleShow} height={200} />
                <Card.Body>
                    <Card.Title className='text-center'>{project.title}</Card.Title>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size='lg' >
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={`${serverUrl}/upload/${project.projectimage}`} alt="" className='w-100' />
                        </div>
                        <div className="col-md-6">
                            <h4>Description</h4>
                            <p>{project.overview}</p>
                            <h4>Technolgies</h4>
                            <h5>{project.language}</h5>
                        </div>
                    </div>
                </div>
                <Modal.Footer className='fa-2x d-flex justify-content-start'>
                   <Link to={project.github} target='_blank'> <FontAwesomeIcon icon={faLink} className='text-primary' /></Link>
                   <Link to={project.website} target='_blank'> <FontAwesomeIcon icon={faGithub} className='text-primary'  /></Link>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Projectcard
