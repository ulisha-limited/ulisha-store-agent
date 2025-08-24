/**
 * Copyright 2025 Ulisha Limited
 * Licensed under the Apache License, Version 2.0
 * See LICENSE file in the project root for full license information.
 */

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const MessageSchema = z.object({
  role: z.enum(["user", "bot"]),
  content: z.string(),
});

const ChatSchema = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(MessageSchema),
});

export type Message = z.infer<typeof MessageSchema>;
export type Chat = z.infer<typeof ChatSchema>;

interface ChatStore {
  chats: Chat[];
  activeChatId: string | null;
  activeChatTitle: string | null;
  setActiveChat: (id: string, title: string) => void;
  addChat: () => string;
  addMessage: (chatId: string, message: Message) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChatId: null,
      activeChatTitle: null,

      setActiveChat: (id, title) =>
        set({ activeChatId: id, activeChatTitle: title }),

      addChat: () => {
        const newChat: Chat = {
          id: uuidv4(),
          title: "New Chat",
          messages: [],
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChatId: newChat.id,
          activeChatTitle: newChat.title,
        }));
        return newChat.id;
      },

      addMessage: (chatId, message) => {
        set((state) => {
          const chats = state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  title:
                    chat.title === "New Chat" && message.role === "user"
                      ? message.content.slice(0, 20)
                      : chat.title,
                  messages: [...chat.messages, message],
                }
              : chat,
          );
          return { chats };
        });
      },
    }),
    {
      name: "chats-storage", // key in localStorage
      partialize: (state) => ({
        chats: state.chats,
        activeChatId: state.activeChatId,
      }),
      // Validate with Zod when rehydrating
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            const parsed = JSON.parse(str);
            const chats = z.array(ChatSchema).safeParse(parsed.state.chats);
            return {
              state: {
                chats: chats.success ? chats.data : [],
                activeChatId: parsed.state.activeChatId ?? null,
              },
            };
          } catch {
            return null;
          }
        },
        setItem: (name, value) =>
          localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
