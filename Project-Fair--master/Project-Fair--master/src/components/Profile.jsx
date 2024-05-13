import React from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {

    const [open, setOpen] = useState(false);

  return (
    <div className='card shadow p-5 mb-5'>
        <div className='d-flex justify-content-between'>
            <h1>Profile</h1>
            <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-angle-down"></i></button>
        </div>
        <Collapse in={open}>
            <div className="row justify-content-center mt-5 flex-column">
                <label htmlFor="profile" className='text-center'>
                    <input id='profile' type="file" style={{display:'none'}} />
                    <img width={'200px'} height={'200px'} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className='rounded-circle mb-5' />
                </label>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Github' />
                </div>
                <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='LinkedIn' />
                </div>
                <div className='mb-3 w-100'>
                    <button className='btn btn-success rounded w-100'>Update</button>
                </div>
            </div>

        </Collapse>
    </div>
  )
}


export default Profile