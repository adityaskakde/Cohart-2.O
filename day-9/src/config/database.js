const mongoose = require("mongoose");
const authRoutes = require("../routes/auth.routes");
 
function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to DB");
        
    })
}




    module.exports = connectToDb