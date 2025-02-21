import axios from "axios";
import { Chat, Message } from "../model/models";

export const getMessages = async (chatId: Chat["id"]): Promise<Message[]> => {
  const response = await axios.get<Message[]>(`/${chatId}/messages`);
  return response.data;
};
