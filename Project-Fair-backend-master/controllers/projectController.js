
//import projectSchema
const projects = require('../Models/projectSchema')


//add project
exports.addProject = async(req,res)=>{
    console.log('Inside addproject request');
    const userId = req.payload
    console.log(userId);

    const projectImage = req.file.filename
    /* console.log(projectImage); */
    const {id, title, date} = req.body
    console.log(id, title, date, projectImage);

    try{
        const existingProject = await projects.findOne({title})
        if(existingProject){
            res.status(401).json('Project already exist. Upload new project')
        }
        else{
            const newProject = new projects({
                id,title,date,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch(err){
        res.status(401).json(`request failed due to ${err}`)
    }                                                                          
}

//getHomeProject
exports.getHomeProject = async(req,res)=>{
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject) 
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}

//getAllProject
exports.getAllProject = async(req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);

    const query = {
        language:{
            //regular expression, option--> to remove case sensitivity 
            $regex:searchKey, $options:'i'
        }
    }
    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)  
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}


//getUserProject
exports.getUserProject = async(req,res)=>{
    userId = req.payload
    try {
        const allUserProject = await projects.find({userId})
        res.status(200).json(allUserProject)  
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}

//editProject
exports.editProject = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title, language, github, website,overview,projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage

    try{
        const updateProject = await projects.findOneAndUpdate({_id:id,userId},{title,language,github,website,overview,projectImage:uploadProjectImage,userId},{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)

    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }

}



//delete project
exports.deleteProject = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    try{
        const removeProject = await projects.findOneAndDelete({_id:id})
        res.status(200).json(removeProject)
    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}