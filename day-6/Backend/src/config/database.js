const mongoose = require ("mongoose")


function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connecte to db");
        
    })
}
module.exports = connectToDB