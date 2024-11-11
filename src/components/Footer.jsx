import { faFacebook, faGithub, faInstagram, faLinkedin, faStackOverflow, faTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <>
            <div className='container-fluid bg-success ' >
                <div className=' row w-100 p-md-5 p-4'>
                    <div className="col-md-4 text-white">
                        <div className='d-flex fs-5 '>
                            <FontAwesomeIcon icon={faStackOverflow} className='me-2' />
                            <h5 >Project Fair</h5>
                        </div>
                        <p style={{ textAlign: 'justify' }} >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae sapiente aliquam temporibus doloremque eos illo dolorum rem. Libero dignissimos accusantium minus magnam error, obcaecati nulla sint modi quae totam placeat!</p>
                    </div>
                    <div className="col-md-2 ">
                        <div className='ms-md-5'>
                            <h5 className='text-white'>Links</h5>
                            <Link to={'/'} className='text-decoration-none text-white' >    <p>Home</p></Link>
                            <Link to={'/projects'} className='text-decoration-none text-white' >  <p>Projects</p></Link>
                            <Link to={'/dashboard'} className='text-decoration-none text-white' >  <p>DashBoard</p></Link>
                        </div>
                    </div>
                    <div className="col-md-2  text-white">
                        <h5 >Guides</h5>
                        <p>React</p>
                        < p>React Bootstrap</p>
                        < p>Bootswatch</p>


                    </div>
                    <div className="col-md-4 text-white">
                        <h5>Contact Us</h5>
                        <div className='d-flex '>
                            <input type="text" className='form-control me-2' placeholder='Email-id' />
                            <button className='btn btn-warning'>Subscribe </button>
                            </div>
                                <div className='d-flex justify-content-between mt-3 fa-2x'>
                                <FontAwesomeIcon icon={faXTwitter} />
                                    <FontAwesomeIcon icon={faLinkedin} />
                                    <FontAwesomeIcon icon={faFacebook} />
                                    <FontAwesomeIcon icon={faGithub} />
                                    <FontAwesomeIcon icon={faInstagram} />
                                </div>

                          

                       

                    </div>

                </div>


            </div>

        </>
    )
}

export default Footer
