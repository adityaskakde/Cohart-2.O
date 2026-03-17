const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/auth.routes')
const app = express()
const postRouter =require("./routes/post.routes")

app.use(express.json())
app.use(cookieParser())


app.use("/api/posts",postRouter)
app.use("/api/auth", authRouter)



module.exports = app