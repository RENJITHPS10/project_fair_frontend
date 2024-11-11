import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function Profile() {
    return (
        <>
            <div className='shadow p-2'>
                <div className='d-flex justify-content-between'>
                    <h4 className='text-success'>Profile</h4>
                    <button className='px-2  btn btn-light'><FontAwesomeIcon icon={faChevronDown} /></button>
                </div>
                <div className='d-flex justify-content-center '>
                    <label htmlFor="profileimage" >
                        <input type="file" id='profileimage' style={{display:'none'}} />
                    <img src="/profile.png" alt="" width={100} height={100}   />
                    </label>
                </div>
                <input type="text" className='form-control mt-4' placeholder='GitHub' />
                <input type="text" className='form-control mt-2' placeholder='LikedIn'  />
                <button className='btn btn-success w-100 mt-2'>Update</button>

            </div>

        </>
    )
}

export default Profile
