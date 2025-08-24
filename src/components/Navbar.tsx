/**
 * Copyright 2025 Ulisha Limited
 * Licensed under the Apache License, Version 2.0
 * See LICENSE file in the project root for full license information.
 */

import { useChatStore } from "@/store/chats";
import { Menu, Plus } from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { activeChatId, activeChatTitle, addChat } = useChatStore();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-black border-b border-gray-900 px-4 py-4 shadow-sm">
      <button
        className="lg:hidden p-2 text-gray-700 rounded hover:bg-gray-200"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>

      <h1 className="text-lg font-semibold">
        {activeChatId ? activeChatTitle : "Ulisha Agent"}
      </h1>

      <div className="flex items-center space-x-4">
        <button onClick={() => addChat()}>
          <Plus />
        </button>
      </div>
    </header>
  );
}
