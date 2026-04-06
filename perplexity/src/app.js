import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./router/auth.route.js"

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' })
})

export default app