const express= require('express')
const mongoose=require('mongoose')
const Joi = require('joi');
const route=express.Router()



route.use(express.json());


// Define the schema
const userSchema = new mongoose.Schema({
    course: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      min: 0
    }
  });

  const User = mongoose.model('User', userSchema);

// CRUD
route.get("/",async (req,res)=>{
    const courses= await User.find({})
    if(!courses) return res.status(400).send("Bad request")
    res.send(courses)
    console.log(courses)
})
// with route parameter

route.get("/:id",async (req,res)=>{
    const userId= req.params.id
    const course=await User.findById(userId)
    //check if the course exists
    if(!course) return res.status(404).send("course with given Id does not exist")
    res.send(course)
})

//Create
//since something is coming from the front end , i have to do some validation
route.post("/",async (req, res)=>{
      const error  = validate(req.body);
    
      if (error) return res.status(400).json({ error: error.details[0].message });
      //successfully validated what is coming from the front end
        const course= new User({
            course:req.body.course,
            author:req.body.author,
            price:req.body.price
        })
      const newCourse= await course.save()
      res.send(newCourse);
      console.log(newCourse)
})
//UPDATE
route.put("/:id",async (req,res)=>{
    const userId= req.params.id
    const error=validate(req.body)
    const updateData = {course:req.body.course,author:req.body.author,price:req.body.price}
    if (error) return res.status(400).json({ error: error.details[0].message });
    const course= await User.findOneAndUpdate({ _id: userId },updateData, { new: true })
    //check if the course exists
    if(!course) return res.status(400).send("course with given Id does not exist")

      res.send(course)
})
route.delete("/:id",async (req,res)=>{
    const userId= req.params.id
    //check if the course exists
    const deleteCourse= await User.findOneAndDelete ({ _id: userId })
    if(!deleteCourse) return res.status(404).send("course with given Id does not exist")
    res.send(deleteCourse)
})

function validate(x){
    const schema = Joi.object({
        course: Joi.string().min(3),
        author: Joi.string(),
        price: Joi.number()
      });
    
      const { error } = schema.validate(x);
    return error
}
module.exports=route

