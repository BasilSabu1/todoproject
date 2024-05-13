//paths to resolve client requests

//1) import express
const express = require('express')


//import controller
const userController = require('../controllers/userController')
//import project controller
const projectController = require('../controllers/projectController')
//import jwt middleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')
//import multer
const multerConfig = require('../Middleware/multerMiddleware')


//2) Create an object for the class Router in express
const router = new express.Router()

//3) path for resolving the request 
    //Syntax => router.httprequest('path to resolve request',()=>{How to resolve the request} ie., controller)

    //a) Register
    router.post('/user/register',userController.register)

    //b) Login
    router.post('/user/login',userController.login)

    //c) Add project
    router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

    //get home project
    router.get('/projects/home-project',projectController.getHomeProject)

    //get all project
    router.get('/projects/all-project',jwtMiddleware,projectController.getAllProject)

    //get user project
    router.get('/user/all-project',jwtMiddleware,projectController.getUserProject)


    // edit the project
    router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)


    //delete the project
    router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteProject)


//4) export router
module.exports = router
