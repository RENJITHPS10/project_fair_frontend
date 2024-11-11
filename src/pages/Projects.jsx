import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Projectcard from '../components/Projectcard';
import { getallprojectsApi } from '../services/allApi';

function Projects() {
  const [allprojects, setAllProjects] = useState([]);
  const [token, setToken] = useState('');
  const [searchkey, setSearchkey] = useState('')

  const getAllProjects = async () => {
 

      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token")
        const reqHeaders = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        const result = await getallprojectsApi(searchkey,reqHeaders);
        setAllProjects(result.data);

      }
    
  };
  // console.log(allprojects)

  useEffect(() => {
    getAllProjects();
  }, [searchkey])

  useEffect(() => {


    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);
console.log(searchkey)
  return (
    <>
      <Header />
      <div className="my-5">
        <h3 className="text-center">All Projects</h3>

        {/* Conditional rendering based on token */}
        {!token ?
          // Not logged in view
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <div className="d-flex justify-content-center my-4">
                  <img src="/lock.webp" alt="lock" className="w-50" />
                </div>
                <h5 className="text-center">
                  Please
                  <Link to="/login" className="text-danger"> Login</Link> to Explore
                </h5>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
          :
          // Logged-in view
          <div>
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-4 d-flex">
                  <input type="text" className="form-control shadow-lg" placeholder="Technologies" onChange={(e)=>setSearchkey(e.target.value)} />
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginTop: '10px', color: '', marginLeft: '-30px' }} />
                </div>
              </div>
            </div>
            {/* Project cards */}
            <div className="container-fluid mt-5">
              <div className="row">
                {allprojects.map((item) => (
                  <div className="col-md-3" >
                    <Projectcard project={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Projects;
