import React, { useEffect } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_url } from '../services/baseurl';
import { editUSerProjectAPI } from '../services/allAPI';
import { useContext } from 'react';
import { EditProjectResponseContext } from '../Contexts/ContextShare';


function EditProject({project}) {
    
  const [preview, setPreview] = useState("");
  const {editProjectResponse, setEditProjectResponse} = useContext(EditProjectResponseContext)

  const [show, setShow] = useState(false);



  const handleClose = () => {setShow(false);handleClose1()}
  const handleShow = () => setShow(true);
  const [projectDetails,setProjectDetails] = useState({
    id:project._id,
    title:project.title,
    language:project.language,
    // github:project.github,
    // website:project.website,
    // overview:project.overview,
    projectImage:""
  })
  console.log(project);

  const handleClose1 = ()=>{
    setProjectDetails({
      title:project.title,
      language:project.language,
      github:project.github,
      website:project.website,
      overview:project.overview,
      projectImage:""
    })
    setPreview("")
  }

  const handleUpdate = async()=>{
    const {id,title,language,projectImage} = projectDetails;
    if(!title || !language ){
      alert("Please fill all the fields")
    }
    else{
      const reqBody = new FormData();
      reqBody.append("title",title);
      reqBody.append("language",language);
      // reqBody.append("github",github);
      // reqBody.append("website",website);
      // reqBody.append("overview",overview);
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage);

      const token = sessionStorage.getItem("token")
      if(preview){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await editUSerProjectAPI(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          alert('Project successfully updated')
          handleClose()
          setEditProjectResponse(result.data)
        }
        else{
          console.log(result.response.data);
        }
      }
      else{
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await editUSerProjectAPI(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          alert('Project successfully updated')
          handleClose()
          setEditProjectResponse(result.data)
        }
        else{
          console.log(result.response.data);
        }
        
      }

    }
  }

  useEffect(()=>{
    if(projectDetails.projectImage){
      const objectURL = URL.createObjectURL(projectDetails.projectImage);
      setPreview(objectURL);
    }

  },[projectDetails.projectImage])
  return (
    <>
        <button className="btn" onClick={handleShow}>
            <i class="fa-solid fa-pen-to-square text-info"></i>
        </button>

        <Modal show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Edit project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label>
                <input type="file" style={{ display: "none" }} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}   />
                <img className='img-fluid' src={preview?preview:`${base_url}/uploads/${project.projectImage}`} alt="no image" />
              </label>
            </div>
            <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column">
              <div className="mb-3 mt-3 w-100">
                <input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
              </div>
              <div className="mb-3 w-100">
                <input type="text" className='form-control' placeholder='Language Used' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}  />
              </div>
             
             

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1} >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject