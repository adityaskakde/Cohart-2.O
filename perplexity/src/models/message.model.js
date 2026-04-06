import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',  // reference to Chat
      required: true
    },
    content: {
      type: String,
      required: true,
      
    },
    role: {
      type: String,
      enum: ['user', 'ai'],  // only these values allowed
      required: true
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
)

const Message = mongoose.model('Message', messageSchema)

export default Message
