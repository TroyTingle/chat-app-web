import axios from 'axios';
import { Chat, User } from '../model/models';
import { API_URL } from '../utils/constants';

const CHAT_API_URL = `${API_URL}/api/chats`;

export const getChats = async (): Promise<Chat[]> => {
  try {
    const response = await axios.get(CHAT_API_URL); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};

export const create1To1Chat = async (
  username: User['username']
): Promise<void> => {
  try {
    await axios.post(`${CHAT_API_URL}/1-2-1`, {
      username: username,
    });
  } catch (error) {
    console.error('Error creating 1-2-1 chat:', error);
    throw error;
  }
};

export const createGroupChat = async (
  usernames: User['username'][]
): Promise<void> => {
  try {
    await axios.post(`${CHAT_API_URL}/group`, {
      participants: usernames,
    });
  } catch (error) {
    console.error('Error creating group chat:', error);
    throw error;
  }
};
