import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Myprojects from '../components/Myprojects'
import Profile from '../components/Profile'

function Dashboard() {
  //creating a state to store username , which is currently in session storage
  const [username,setUsername] = useState("")

  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  },[])
  console.log(username);
  

  return (
    <>
    
      <Header dashboard />
      <h1 className='mt-5 ms-3'>Welcome <span style={{color:'orange'}}>{username}</span></h1>



      <Row className='container-fluid mt-5'>
        {/* My projects */}
        <Col sm={12} md={8}>
          <Myprojects/>
        </Col>

        {/* Projects */}
        <Col sm={12} md={4}>
          <Profile/>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard