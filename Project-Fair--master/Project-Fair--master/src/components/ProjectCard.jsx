import React from 'react'
import Card from 'react-bootstrap/Card';
import projectImg from '../Assets/projectimg.jpg'

import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { base_url } from '../services/baseurl';

function ProjectCard({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Card className=' card shadow text-center btn' onClick={handleShow}>
      <Card.Img variant="top" height={'250px'} src={project?`${base_url}/uploads/${project.projectImage}`:projectImg} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
                <img src={project?`${base_url}/uploads/${project.projectImage}`:projectImg} alt="no image" width={'100%'} height={'270px'}/>
            </Col>
            <Col md={6}>
                <h4>Description</h4>
                <p>{project.id}</p>
                <p><span className='fw-bolder'>Date</span> : {project.date}</p>
            </Col>
          </Row>
          {/* <div className='d-flex mt-5 mb-5'>
            <a href={project.github} target='_blank' style={{color:'black'}}><i class="fa-brands fa-github fa-2x"></i></a>
            <a href={project.website} target='_blank' style={{color:'black'}}><i class="fa-solid fa-link fa-2x ms-5"></i></a>
          </div> */}
        </Modal.Body>
        
      </Modal>

    </>
  )
}

export default ProjectCard