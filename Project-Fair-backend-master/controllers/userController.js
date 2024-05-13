//import model
const users = require('../Models/userSchema')

//import jwt
const jwt = require('jsonwebtoken')

//logic for register
exports.register = async (req, res) => {
    //logic
    console.log('inside userController register logic');

    //destructuring data from the client request body (since the json format is converted into javascript object by the .json method used in index.js fil)
    const { username, email, password } = req.body

    try {//since email is the unique value, we are checking if the email is alreadh present in the database
        //for that we are using findOne method which returns entire document when the condition is true or else returns null
        const existingUser = await users.findOne({ email })


        if (existingUser) {
            //if findOne returns document, it means that the user already exists. So we are sending a response in the 400 series(client request error)
            res.status(406).json('Account already exist ...please login')
        }
        else {
            //if findOne returns null , it means the email or the user does'nt exist in the database
            //so we register the user

            //1)create object for the model
            const newUser = new users({
                username,
                email,
                password,
               
                profile: ""
            })
            //2) add the above object using save() method of mongoose
            await newUser.save()


            //response
            res.status(200).json(newUser)
        }

    }
    //javascript resolve run time errors using try-catch block. 
    catch (err) {
        res.status(401).json('Register Request Failed due to', err)
    }


}

//logic for login
exports.login = async(req,res)=>{
    console.log('Inside login function2');
    

    const {email,password} = req.body
    /* console.log(req.body); */
    

    try{const existingUser = await users.findOne({email,password})

    if(existingUser){

        //sign is the method used to create token
        //first argument is payload(inforation that is secretely transmitted)
        //second argument is secret key(based on which the token is generated)
        const token = jwt.sign({userId:existingUser._id},"supersecretkey1234")

        res.status(200).json({
            existingUser,
            token
        })
    }
    else{
        res.status(404).json('Invalid email or password')
    }
    }
    catch(err){
        res.status(401).json('Login request failed due to:',err)
    }
}

/* exports.login = async (req, res) => {
    console.log('inside login function');

    const { email, password } = req.body

    console.log(req.body);

    try {
        const existingUser = await users.findOne({ email, password })

        if (existingUser) {
            res.status(200).json('login successful')
        }

        else { res.status(404).json('invalid email id or password') }

    } catch (err) {
        res.status(401).json('login failed due to :', err)
    }

} */