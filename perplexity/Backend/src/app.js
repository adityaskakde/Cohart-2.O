import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./router/auth.route.js"
import chatRoutes from "./router/chat.routes.js";
import morgan from "morgan"
import cors from "cors"

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
  methods:["GET","POST","PUT","DELETE"],
}))

// Routes
app.use('/auth', authRouter)
app.use('/api/chats', chatRoutes) 

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' })
})

export default app