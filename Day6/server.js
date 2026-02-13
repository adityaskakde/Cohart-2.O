const app = require('../src/app')
const mongoose = require('mongoose')

function connectDB(){
  mongoose.connect(
        "mongodb://admin:BrBYuGb2Php8dvdp@ac-cjzirew-shard-00-00.clhjhg5.mongodb.net:27017,ac-cjzirew-shard-00-01.clhjhg5.mongodb.net:27017,ac-cjzirew-shard-00-02.clhjhg5.mongodb.net:27017/?replicaSet=atlas-c4o6hc-shard-0&ssl=true&authSource=admin"
  )  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("DB Error:", err));
}

connectDB()

app.listen(3000, () => {
  console.log("server is running on port 3000");
})
