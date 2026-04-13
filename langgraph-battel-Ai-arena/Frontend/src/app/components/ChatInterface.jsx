import React, { useState, useRef, useEffect } from 'react';
import UserMessage from './UserMessage';
import ArenaResponse from './ArenaResponse';
import axios from "axios";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false); // ✅ FIX
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() || loading) return; // ✅ prevent spam

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/invoke", {
        input: inputValue
      });

      const data = response.data;

      const newMessage = {
        id: Date.now(),
        problem: inputValue,
        ...data.result
      };

      setMessages((prev) => [...prev, newMessage]); // ✅ correct state update
      setInputValue('');

    } catch (err) {
      console.error(err);
      alert("Error: API limit hit or server issue 😅");
    }

    setLoading(false);
  };
return (
  <div className="flex flex-col h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">

    {/* HEADER */}
    <header className="py-4 px-8 border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-10 flex justify-center">
      <h1 className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        ⚔️ AI Chat Arena
      </h1>
    </header>

    {/* MAIN */}
    <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 w-full max-w-6xl mx-auto flex flex-col">

      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-semibold text-white/80">
              Welcome to the Arena 
            </h2>
            <p className="text-zinc-400">
              Ask any coding question and watch AI battle it out.
            </p>
          </div>
        </div>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="mb-12 animate-fadeIn">
            <UserMessage message={msg.problem} />
            <ArenaResponse
              solution1={msg.solution_1}
              solution2={msg.solution_2}
              judge={msg.judge}
            />
          </div>
        ))
      )}

      <div ref={endOfMessagesRef} />
    </main>

    {/* INPUT BOX */}
    <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-md">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSend} className="relative flex items-center">

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="💡 Ask a coding question..."
            className="w-full bg-white/10 backdrop-blur-lg text-white placeholder-zinc-400 rounded-full py-4 pl-6 pr-16 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-lg"
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="absolute right-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform text-white p-3 rounded-full disabled:opacity-50"
          >
            {loading ? "..." : "➤"}
          </button>

        </form>
      </div>
    </div>

  </div>
);}