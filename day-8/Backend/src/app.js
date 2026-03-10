/*
* server ko create krne ke liye
*/
const express = require ("express")
const noteModel = require("./models/note.model")
const cors = require('cors')
const path = require ('path')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

/**
 *  - POST /api/notes
 * -create new note and save data in mongodb
 * - req.body = {title,description}
 */

app.post('/api/notes', async (req,res) =>{
    const { title,description } = req.body

  const note = await noteModel.create({
    title, description
   })

   res.status(201).json({
    message:"note created successfully",
    note

   })
})



/**
 * -GET/api/notes
 * 
 * - Fetch all the note data from mongodb and send them into response*/

app.get("/api/notes", async (req, res) =>{
  const notes = await noteModel.find()

  res.status(200).json({
    message:"notes fetched sucessfully. ",notes
  })
})




/**
 * -DELETE /api/notes/:id
 * -delte note  with the it from  req.params
 */


app.delete("/api/notes/:id",async (req,res)=>{
  const id = req.params.id

  await noteModel.findByIdAndDelete(id)

  res.status(200).json({
    message:"notes deleted successfully."
  })
  
})


/**
 * PATCH /api/notes/:id
 * update the description of the note by id
 * req.body ={description}
 */

app.patch("/api/notes/:id", async (req,res)=>{
  const id = req.params.id
  const{description} = req.body

  await noteModel.findByIdAndUpdate(id,{description})

  res.status(200).json({
    message:"notes updated successfully. "
  })
})


module.exports = app