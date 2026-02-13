/**
 * 
 * server ko create karna
 * 
 * */

const express = require("express")
const noteModel = require("./models/notes.models")

const app = express()
app.use(express.json())

app.post("/notes",async (req,res)=>{
    const {title, description,age} = req.body
    
    const note = await noteModel.create({
        title,description,age
    })
    
    res.status(201).json({
        message:"Note created sucessfully",
        note
    })

})


module.exports = app