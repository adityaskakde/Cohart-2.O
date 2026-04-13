import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion, AnimatePresence } from 'framer-motion'

export default function Dashboard() {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const bottomRef = useRef(null)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, currentChatId])

  const handleSubmitMessage = (e) => {
    e.preventDefault()
    const msg = chatInput.trim()
    if (!msg) return
    chat.handleSendMessage({ message: msg, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (id) => chat.handleOpenChat(id, chats)

  return (
    <main className="h-screen bg-gradient-to-br from-[#0b0f19] to-[#05070d] text-white flex">

      {/* Sidebar */}
      <aside className="w-72 bg-[#0f1424] border-r border-white/10 p-4 hidden md:flex flex-col">
        <h1 className="text-xl font-bold mb-4">⚡ AI Chat</h1>

        <button
          onClick={() => chat.handleCreateChat()}
          className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 px-4 py-2 rounded-xl"
        >
          + New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-2">
          {Object.values(chats).map((c) => (
            <div
              key={c.id}
              onClick={() => openChat(c.id)}
              className={`p-3 rounded-xl cursor-pointer transition truncate ${
                currentChatId === c.id
                  ? 'bg-indigo-600'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {c.title?.replace(/[*_`#>-]/g, '')}
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <section className="flex flex-col flex-1 relative">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <AnimatePresence>
            {chats[currentChatId]?.messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                  msg.role === 'user'
                    ? 'ml-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-br-none text-white'
                    : 'mr-auto bg-white/5 border border-white/10 rounded-bl-none text-white/90'
                }`}
              >
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-2">{children}</p>,
                      strong: ({ children }) => <span className="font-semibold text-white">{children}</span>,
                      ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      code: ({ children }) => (
                        <code className="bg-black/40 px-1 py-0.5 rounded text-sm">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4 bg-[#0b0f19]/80 backdrop-blur sticky bottom-0">
          <form onSubmit={handleSubmitMessage} className="flex gap-3">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-400 outline-none"
            />

            <button
              disabled={!chatInput.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 disabled:opacity-50"
            >
              Send 🚀
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
