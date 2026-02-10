/* server ko create kiya hai*/


const express = require ('express')


const app = express()   /*  server create ho jata hai. */
 
app.use(express.json())

const notes =[]



app.get('/',(req,res)=>{
    console.log('hello world')
})

app.post('/notes' ,(req,res) =>{
    console.log(req.body)
    notes.push(req.body)
    console.log(notes);
    
    res.send('notes created sucessfully')
})

 app.get('/notes',(req,res)=>{
    res.send(notes)
 })


 app.delete('/notes/:index',(req,res)=>{
  delete notes [req.params.index]

  res.send('notes delete sucessfully')
    
    
 })

 app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
        res.send("Notes is updates")

 })


module.exports = app