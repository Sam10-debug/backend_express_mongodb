const express= require('express');
const app=express()
const Joi = require('joi');
const port= process.env.PORT ||8000
const courses=require("./routes/courses")
const mongoose = require('mongoose');

app.use(express.json());
app.use("/api/courses",courses)


const dbConnectionString = 'mongodb://127.0.0.1:27017/practice';

mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to the database');
})
.catch((error) => {
    console.error('Error connecting to the database:', error);
});


app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})

