import React, { useContext, useEffect, useState } from 'react'
import AddProjects from './AddProjects'
import { allUserProjectAPI, deleteUserProjectAPI } from '../services/allAPI';
import { AddProjectResponseContext, EditProjectResponseContext } from '../Contexts/ContextShare';
import { Link } from 'react-router-dom'

import EditProject from './EditProject';

function Myprojects() {

    const {addProjectResponse, setAddProjectResponse} = useContext(AddProjectResponseContext)
    const {editProjectResponse, setEditProjectResponse} = useContext(EditProjectResponseContext)

    const [userProject,setUserProject] = useState([])

    const getUSerProjects = async()=>{

        const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
        const result = await allUserProjectAPI(reqHeader)
        console.log(result.data);
        setUserProject(result.data)
    }
    useEffect(()=>{
        getUSerProjects()
    },[addProjectResponse,editProjectResponse])



    const handleDelete = async(id)=>{
        const token = sessionStorage.getItem("token")

        const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }

          const result = await deleteUserProjectAPI(id,reqHeader)
          console.log(result);
          if(result.status === 200){
            getUSerProjects()
          }
          else{
            alert(result.response.data)
          }

    }
  return (
    <>
        <div className='card shadow p-5 ms-3 me-3 mb-5'>
            <div className='d-flex'>
                <h3 className='text-success ms-3'>My Projects</h3>
                <div className='ms-auto'>
                    <AddProjects/>
                </div>
            </div>
    
            <div className="mt-5">
                {userProject?.length > 0 ? (
                    userProject?.map((item) => (
                        <div className="border d-flex align-items-center rounde p-2 mb-3">
                            <h5>{item.title}</h5>
                            <div className="ms-auto d-flex">
                          <Link to={'/todo'} >
                          <button className="btn btn-success" >
                                   Add Todo
                                </button>
                          
                          </Link>
                                <EditProject project={item}/>
                               
                                <button className="btn" onClick={()=>handleDelete(item._id)}>
                                    <i class="fa-solid fa-trash text-danger"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-danger fw-bolder fs-4">No project uploaded yet!!</p>
                )}
            </div>
        </div>
    </>
  )
}

export default Myprojects