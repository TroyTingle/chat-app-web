import axios from "axios";
import { Chat, User } from "../model/models";

const CHAT_API_URL = "/api/chats";

export const getChats = async (): Promise<Chat[]> => {
  const response = await axios.get<Chat[]>(CHAT_API_URL);
  return response.data;
};

export const create1To1Chat = async (username: User["username"]): Promise<void> => {
  await axios.post(`${CHAT_API_URL}/1-2-1`, { username: username });
};

export const createGroupChat = async (usernames: User["username"][]): Promise<void> => {
  await axios.post(`${CHAT_API_URL}/group`, { participants: usernames });
};
