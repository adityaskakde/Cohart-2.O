import { Router } from "express";
import { sendMessage,getChats,getMessages,deleteChat} from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.js";

const ChatRouter = Router()

ChatRouter.post("/message",authUser,sendMessage)

ChatRouter.get("/",authUser,getChats)

ChatRouter.get("/delete/:chatId/",authUser,deleteChat)

ChatRouter.get("/:chatId/messages",authUser, getMessages)

export default ChatRouter