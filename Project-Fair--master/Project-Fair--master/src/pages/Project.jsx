import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [allProject,setAllProject] = useState([])
  const [searchKey,setSearchKey] = useState("")

  const [isToken,setIsToken] = useState(false)

  console.log(searchKey);

  const getAllProject = async()=>{

    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey,reqHeader)
      console.log(result.data);
      setAllProject(result.data)
    }

    
  }

  useEffect(()=>{
    getAllProject()
  },[searchKey])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsToken(true)
    }
  },[])
  console.log(isToken);

  return (
    <>
    <Header/>

    <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
        <h1>All Projects</h1>
        <div className='d-flex mt-5 w-25'>
            <input type="text" className='form-control' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} placeholder='Search the product using technologies'/>
            <i class="fa-solid fa-magnifying-glass mt-2" style={{marginLeft:'-50px'}}></i>
        </div>
    </div>

    <Row className='mt-5 mb-5 container-fluid'>
        { allProject?.length>0?
        allProject.map((item)=>(
        <Col className='mb-5' sm={12} md={6} lg={4}>
          <ProjectCard project={item} />
        </Col>))
          :
        <div>
          { isToken?
          <p className='text-danger fs-3 d-flex justify-content-center align-items-center'>Nothing to Display</p> :
          <div className='d-flex justify-content-center align-items-center flex-column'>
            <img src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/D74t1SWF5f.gif" alt="no image" height={'250px'} width={'250px'} />
            <p className='text-danger fs-3 mt-4'>Please <Link to={'/login'} style={{textDecoration:'none',color:'blue'}}>login</Link> to view more projects</p>
          </div>
          }
        </div>
        }
    </Row>

    </>
  )
}

export default Project