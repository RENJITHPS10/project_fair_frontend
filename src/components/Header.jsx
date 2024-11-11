import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
  return (
    <>
       <Navbar className='bg-success'>
        <Container>
          <Navbar.Brand >
          <h3 className='text-white'>   <FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project Fair</h3>
          </Navbar.Brand>
          <button className='btn btn-warning'><FontAwesomeIcon icon={faPowerOff} className='me-2 ' />Logout</button>
        </Container>

      </Navbar>
    </>
  )
}

export default Header
