import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Projectcard from '../components/Projectcard'
import { gethomeprojectsApi } from '../services/allApi'

function Home() {
    const [isLogin, setIsLogin] = useState(false)
    const [homeProject, setHomeProject] = useState([])
    const getHomeProject = async () => {
        const result = await gethomeprojectsApi()
        setHomeProject(result.data)
    }
    console.log(homeProject)



    useEffect(() => {
        getHomeProject()
        if (sessionStorage.getItem("token")) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }

    }, [])
    return (
        <>
            <div className='py-5' style={{ backgroundColor: 'rgb(49, 169, 49)' }}>
                <div className='container' >
                    <div className='row w-100 ' style={{ height: '100vh' }}>
                        <div className='col-md-1'></div>
                        <div className="col-md-5 d-flex justify-content-center  flex-column ps-5" >
                            <h1 className='text-white'>Project Fair</h1>
                            <h5>One stop destination for all software projects</h5>
                            <div className='d-flex'>

                                {!isLogin ? <Link to={'/login'}> <button className='btn btn-warning '>Get Started <FontAwesomeIcon icon={faArrowRight} /></button></Link> :
                                    <Link to={'/dashboard'}><button className='btn btn-dark'>Manage Projects <FontAwesomeIcon icon={faArrowRight} /></button></Link>}
                            </div>
                        </div>
                        <div className="col-md-5 d-flex justify-content-center align-items-center " >
                            <img src="/designer1.png" alt="" className='w-100 ' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-4'>
                <h4 className='text-center'>Explore Our Projects</h4>
                <div className='container'>
                    <div className='row'>
                        {homeProject?.map(item => (
                            <div className="col-md-4">

                                <Projectcard project={item} />

                            </div>))}

                    </div>
                    <Link to={'/projects'} className='text-danger'><p className='text-center  mt-4 '> See More Projects</p></Link>

                </div>

            </div>
        </>
    )
}

export default Home
