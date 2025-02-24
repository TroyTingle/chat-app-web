import { api } from "../config/axiosConfig";
import { Chat, Message } from "../model/models";

export const getMessages = async (chatId: Chat["id"]): Promise<Message[]> => {
  const response = await api.get<Message[]>(`/${chatId}/messages`);
  return response.data;
};
