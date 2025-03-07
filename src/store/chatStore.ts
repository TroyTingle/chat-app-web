import { create } from "zustand";
import { getChats } from "../api/chats";
import { Chat } from "../model/models";

interface ChatState {
  chats: Chat[];
  selectedChatId: Chat["id"] | null;
  fetchChats: () => Promise<void>;
  setSelectedChatId: (chatId: string) => void;
}

const useChatStore = create<ChatState>((set) => ({
  chats: [],
  selectedChatId: null,
  fetchChats: async () => {
    const chats = await getChats();
    set({ chats });
  },
  setSelectedChatId: (chatId: string) => {
    set({ selectedChatId: chatId });
  },
}));

export default useChatStore;
