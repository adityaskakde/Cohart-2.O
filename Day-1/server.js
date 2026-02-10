const express = require('express')

const app = express()

app.get("/",(req ,res) =>{
    res.send('This is my first express app')
})

app.listen(3000)
console.log('Server running on http://localhost:${PORT}');
