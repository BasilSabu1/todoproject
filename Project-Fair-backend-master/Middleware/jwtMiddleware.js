//import jwt

const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');
    //logic
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    try{
        //first argument should be the token and second argument should be secret key
        const jwtResponse = jwt.verify(token,"supersecretkey1234")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    } catch(err){
        console.log('login failed');
        res.status(401).json("Authorization failed. Please Login")
    }
}

module.exports = jwtMiddleware