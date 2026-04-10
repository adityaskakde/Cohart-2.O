import { useSelector } from 'react-redux'
import { useChat } from '../../auth/hook/useChat'
import React, { useEffect, useState } from 'react'

const savedChats = [
  { title: 'Auth flow review', subtitle: 'JWT login and protected routes', lastMessage: 'Need to secure refresh tokens.', active: true },
  { title: 'Chat history fix', subtitle: 'Saving conversation state', lastMessage: 'Can we persist sessions locally?', active: false },
  { title: 'UI refresh', subtitle: 'Dashboard layout update', lastMessage: 'The new layout should feel more immersive.', active: false },
  { title: 'Socket connection', subtitle: 'Real-time chat status', lastMessage: 'Socket reconnect logic looks stable.', active: false },
]

const messageHistory = [
  { sender: 'assistant', text: 'Welcome back! Pick a chat from the sidebar to continue your conversation.' },
  { sender: 'user', text: 'Show me the latest updates for the dashboard.' },
  { sender: 'assistant', text: 'I updated the layout to match your dark theme and the new chat-style interface.' },
]

const Dashboard = () => {
  const chat = useChat()
  const user = useSelector((state) => state.auth.user)
  const [selectedChat, setSelectedChat] = useState(savedChats[0])
  const [message, setMessage] = useState('')

  const username = user?.username || user?.email?.split('@')[0] || 'User'

  useEffect(() => {
    chat.initializeSocketConnection()
  }, [chat])

  return (
    <main className='relative min-h-screen overflow-hidden bg-[#09040c] text-slate-100'>
      <div className='pointer-events-none absolute inset-0 bg-linear-to-br from-[#1c0521]/80 via-[#09030b]/80 to-[#04020a]'></div>

      <div className='relative mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8'>
        <div className='grid flex-1 gap-6 lg:grid-cols-[320px_1fr]'>
          <aside className='relative rounded-4xl border border-white/10 bg-slate-950/90 p-5 shadow-[0_28px_120px_rgba(109,40,217,0.18)] backdrop-blur-xl'>
            <div className='mb-6 flex items-start justify-between gap-3'>
              <div>
                <p className='text-xs uppercase tracking-[0.45em] text-fuchsia-300/70'>perplexity</p>
                <h2 className='mt-3 text-3xl font-semibold text-white'>My chats</h2>
              </div>
              <button className='rounded-full bg-linear-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-4 py-3 text-xs font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition hover:brightness-105'>
                New chat
              </button>
            </div>

            <div className='space-y-3'>
              {savedChats.map((chatItem) => (
                <button
                  key={chatItem.title}
                  type='button'
                  onClick={() => setSelectedChat(chatItem)}
                  className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                    selectedChat?.title === chatItem.title
                      ? 'border-fuchsia-400/60 bg-fuchsia-500/10 shadow-[0_0_0_1px_rgba(252,211,77,0.15)]'
                      : 'border-slate-800/90 bg-[#09040d]/90 hover:border-fuchsia-400/30 hover:bg-slate-900/95'
                  }`}
                >
                  <div className='flex items-center justify-between gap-3'>
                    <div>
                      <p className='font-semibold text-white'>{chatItem.title}</p>
                      <p className='mt-1 text-sm text-slate-500'>{chatItem.subtitle}</p>
                    </div>
                    <span className='rounded-full bg-slate-800/90 px-3 py-1 text-xs text-slate-400'>{chatItem.active ? 'Active' : 'Idle'}</span>
                  </div>
                  <p className='mt-3 text-sm text-slate-500'>{chatItem.lastMessage}</p>
                </button>
              ))}
            </div>
          </aside>

          <section className='rounded-4xl border border-white/10 bg-[#0b0710]/95 p-6 shadow-[0_32px_120px_rgba(189,39,239,0.16)] backdrop-blur-xl'>
            <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <p className='text-sm uppercase tracking-[0.35em] text-fuchsia-300/70'>chat workspace</p>
                <h1 className='mt-2 text-3xl font-semibold text-white'>{selectedChat?.title ?? 'Select a chat'}</h1>
                <p className='mt-2 max-w-2xl text-slate-400'>{selectedChat?.subtitle ?? 'Choose a conversation from the sidebar to continue.'}</p>
              </div>
              <div className='rounded-3xl border border-slate-800/90 bg-slate-900/95 px-4 py-3 text-sm text-slate-300'>
                Signed in as <span className='font-semibold text-white'>{username}</span>
              </div>
            </div>

            <div className='grid gap-6 xl:grid-cols-[1.45fr_0.85fr]'>
              <div className='rounded-[30px] border border-slate-800/90 bg-[#100316]/95 p-5 shadow-inner shadow-slate-900/20'>
                <div className='flex h-128 flex-col justify-between gap-4 overflow-hidden rounded-4xl border border-slate-800/80 bg-[#09040d]/95 p-5'>
                  <div className='space-y-4 overflow-y-auto pr-2'>
                    {messageHistory.map((entry, index) => (
                      <div
                        key={index}
                        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm ${
                          entry.sender === 'assistant'
                            ? 'bg-slate-900/90 text-slate-100 self-start'
                            : 'bg-fuchsia-500/15 text-slate-100 self-end'
                        } ${entry.sender === 'assistant' ? 'ml-0' : 'ml-auto'}`}
                      >
                        <p>{entry.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className='rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4'>
                    <p className='text-xs uppercase tracking-[0.35em] text-pink-300/70'>User message</p>
                    <p className='mt-2 text-sm text-slate-400'>Enter a prompt to ask Perplexity for help, then hit send.</p>
                  </div>
                </div>
              </div>

              <aside className='space-y-6'>
                <div className='rounded-[28px] border border-slate-800/90 bg-[#09040d]/95 p-5'>
                  <p className='text-sm uppercase tracking-[0.3em] text-pink-300/70'>Selected chat</p>
                  <h2 className='mt-3 text-xl font-semibold text-white'>{selectedChat?.title}</h2>
                  <p className='mt-2 text-sm text-slate-400'>{selectedChat?.subtitle}</p>
                </div>

                <div className='rounded-[28px] border border-slate-800/90 bg-[#09040d]/95 p-5'>
                  <p className='text-sm uppercase tracking-[0.3em] text-pink-300/70'>Actions</p>
                  <div className='mt-4 grid gap-3'>
                    <button className='w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-left text-sm text-slate-100 transition hover:border-fuchsia-500/40 hover:bg-slate-900/95'>
                      View chat details
                    </button>
                    <button className='w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-left text-sm text-slate-100 transition hover:border-fuchsia-500/40 hover:bg-slate-900/95'>
                      Archive conversation
                    </button>
                  </div>
                </div>
              </aside>
            </div>

            <div className='mt-6 rounded-[34px] border border-slate-800/80 bg-slate-950/95 p-4'>
              <div className='flex flex-col gap-4 sm:flex-row'>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='Type your message...'
                  className='min-h-14 flex-1 rounded-3xl border border-slate-800/90 bg-[#09040d] px-4 py-4 text-slate-100 outline-none transition focus:border-fuchsia-500/70 focus:ring-2 focus:ring-fuchsia-500/10'
                />
                <button className='inline-flex min-h-14 items-center justify-center rounded-3xl bg-linear-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-6 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition hover:brightness-105'>
                  Send message
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
