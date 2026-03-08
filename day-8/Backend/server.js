/**
 * server kp create krna
 * dtabase se connect krna
 * 
 */



const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "src", ".env") })

const app = require("./src/app")
const connectToDb = require("./src/config/database")

connectToDb()

app.listen(3000, () => {
  console.log("server is running on port 3000");
})