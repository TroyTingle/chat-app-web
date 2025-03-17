import { create } from "zustand";
import { getMessagesForChatId } from "@/api/messages";
import { Message } from "@/model/models";

interface MessageState {
  messagesByChatId: { [chatId: string]: Message[] };
  fetchMessages: (chatId: string) => Promise<void>;
  addMessage: (chatId: string, message: Message) => void;
}

const useMessageStore = create<MessageState>((set, get) => ({
  messagesByChatId: {},
  fetchMessages: async (chatId: string) => {
    const { messagesByChatId } = get();
    if (!messagesByChatId[chatId]) {
      const messages = await getMessagesForChatId(chatId);
      set({ messagesByChatId: { ...messagesByChatId, [chatId]: messages } });
    }
  },
  addMessage: (chatId: string, message: Message) => {
    const { messagesByChatId } = get();
    const chatMessages = messagesByChatId[chatId] || [];
    set({ messagesByChatId: { ...messagesByChatId, [chatId]: [...chatMessages, message] } });
  },
}));

export default useMessageStore;
