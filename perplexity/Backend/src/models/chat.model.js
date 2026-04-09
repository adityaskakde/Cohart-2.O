import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  //refrence to user model
      required: true
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
      default:"New Chat"  //default title
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
)

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
