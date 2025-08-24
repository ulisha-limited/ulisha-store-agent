/**
 * Copyright 2025 Ulisha Limited
 * Licensed under the Apache License, Version 2.0
 * See LICENSE file in the project root for full license information.
 */

import { useChatStore } from "@/store/chats";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { chats, activeChatId, setActiveChat } = useChatStore();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/70 bg-opacity-50 z-40 lg:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      <aside
        className={`fixed left-0 top-0 z-50 w-64 h-screen bg-black text-white flex flex-col transform transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Chats
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {chats.map((chat, index) => (
              <li key={chat.id}>
                <button
                  onClick={() => setActiveChat(chat.id, chat.title)}
                  className={`w-full text-left px-2 py-2 rounded ${
                    chat.id === activeChatId
                      ? "bg-gray-700"
                      : "hover:bg-gray-900"
                  }`}
                >
                  {chat.title || `Chat ${index + 1}`}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
