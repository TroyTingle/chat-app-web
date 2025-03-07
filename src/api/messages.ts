import { api } from "../config/axiosConfig";
import { Chat, Message } from "../model/models";

export const getMessagesForChatId = async (chatId: Chat["id"]): Promise<Message[]> => {
  const response = await api.get<Message[]>(`/api/messages/${chatId}`);
  return response.data;
};
