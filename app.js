const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Backend chal raha hai 🚀")
})

app.get("/about", (req, res) => {
  res.send("This is about page")
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
