import { create } from 'zustand';
import { Chat, Message } from '../model/models';

interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>;
  selectedChatId: string | null;

  setChats: (chats: Chat[]) => void;
  setMessages: (chatId: string, messages: Message[]) => void;
  addMessage: (chatId: string, message: Message) => void;
  selectChat: (chatId: string) => void;
}

const useChatStore = create<ChatState>((set) => ({
  chats: [],
  messages: {},
  selectedChatId: null,

  setChats: (chats) => set({ chats }),
  setMessages: (chatId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [chatId]: messages },
    })),
  addMessage: (chatId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    })),
  selectChat: (chatId) => set({ selectedChatId: chatId }),
}));

export default useChatStore;
