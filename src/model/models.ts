export interface User {
  username: string;
}

export interface FriendRequest {
  id: string;
  sender: User;
  receiver: User;
  status: RequestStatus;
}

export enum UserRole {
  ROLE_USER,
  ROLE_ADMIN,
}

export enum RequestStatus {
  PENDDING,
  ACCEPTED,
  REJECTED,
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  participants: User[];
}
export interface Message {
  content: string;
  timestamp: string;
  senderUsername: User["username"];
  chatId: Chat["id"];
}
