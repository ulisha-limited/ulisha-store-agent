"use client";

import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { useChatStore } from "@/store/chats";

export default function Melvin() {
  const { chats, activeChatId, setActiveChat, addChat, addMessage } =
    useChatStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeChatId) return;

    addMessage(activeChatId, { role: "user", content: input });
    setInput("");

    setTimeout(() => {
      addMessage(activeChatId, { role: "bot", content: "🤖 Dummy response" });
    }, 800);
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex flex-col flex-1">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeChat?.messages.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Start typing to begin the conversation...
              </div>
            ) : (
              activeChat?.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="bg-black flex p-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
