import React, { useContext, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginAPI, registerAPI } from '../services/allAPI'
import { isAuthTokenContext } from '../Contexts/ContextShare'

function Auth({register}) {

    const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)
    const registerForm = register?true:false 

    //to hold the value from input box (data that user enters for registration)
    const [userData,setuserData] = useState({
        username:"",
        email:"",
        password:""
    })
    console.log(userData);


    //navigate
    const navigate = useNavigate()

    //register function
    const handleRegister = async(e)=>{
        e.preventDefault()

        const {username,email,password} = userData

        if(!username || !email || !password){
            alert('Please fill form completely')
        }
        else{
            const result = await registerAPI(userData)
            /* console.log(result.data); */

            if(result.status === 200){
                alert(`${result.data.username} is successfully registered `)
                setuserData({
                    username:"",
                    email:"",
                    password:""
                })
                
                /* setuserData((prevUserData) => ({
                    ...prevUserData,
                    username: '',
                    email: '',
                    password: '',
                  })) */
                  
                //move to login page
                navigate('/login')
            }
            else{
                alert(result.response.data)
            }
        }
    }

    //login function
    const handlelogin = async(e)=>{
        e.preventDefault()

        //destructure
        const {email,password} = userData
        console.log('Before registerAPI call:', userData);
        if(!email || !password){
            alert('please fill the form completely')
        }
        else{
            const result = await loginAPI(userData)
            console.log(result);

            if(result.status === 200){
                console.log('after registerAPI call:', userData);
                alert('login successful')

                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)      //token is already string, so no need to convert

                setuserData({
                    username:"",
                    email:"",
                    password:""
                })
                setIsAuthToken(true)

                /* setuserData((prevUserData) => ({
                    ...prevUserData,
                    username: '',
                    email: '',
                    password: '',
                  })) */
                //after logging in, navigate to home
                navigate('/')
                
            }
            else{
                alert(result.response.data)
            }
        }
    }

  return (
    <div style={{width:'100%', height:'100vh'}} className='d-flex justify-content-center align-items-center'>
        <div className=" w-75 container">
            <Link style={{textDecoration:'none', color:'blue'}} to={'/'}><i class="fa-solid fa-arrow-right fa-rotate-180 me-2"></i>Back to home</Link>
            <div className="card bg-success p-5 rounded">
                <div className='row align-items-center'>
                    <div className="col-lg-6">
                        <img src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo=" width={'100%'} alt="" />
                    </div>
                    <div className="col-lg-6">
                        <div className='d-flex align-items-center flex-column'>
                            <h1 className='text-center text-light'>  <i class="fa-brands fa-stack-overflow fa-2x"></i>Project Fair</h1>
                            <h5 className='text-light mt-3'>
                                {
                                    registerForm?"Sign Up to your account" : "Sign In to your account"
                                }
                            </h5>
                            <Form className='mt-5 w-100'>

                                {
                                    registerForm &&
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Username" value={userData.username} onChange={(e)=>setuserData({...userData,username:e.target.value})} />
                                    </Form.Group>
                                }

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Email Id" value={userData.email} onChange={(e)=>setuserData({...userData,email:e.target.value})} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Password" value={userData.password} onChange={(e)=>setuserData({...userData,password:e.target.value})} />
                                    </Form.Group>

                                {
                                    registerForm?
                                    <div>
                                        <button onClick={handleRegister} className='btn btn-warning rounded mt-3'>Register</button>
                                        <p>Already a user? Click here to <Link to={'/login'} style={{color:'blue'}}>Login</Link> </p>
                                    </div>:
                                    <div>
                                        <button onClick={handlelogin} className='btn btn-warning rounded mt-3'>Login</button>
                                        <p>New user? Click here to <Link to={'/register'} style={{color:'blue'}}>Register</Link> </p>
                                    </div>
                                }

                            </Form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        
    </div>
  )
}

export default Auth