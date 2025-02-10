export interface User {
  userId: number;
  username: string;
  password: string;
  email: string;
  role: UserRole;
  sentRequests: FriendRequest[];
  receivedRequests: FriendRequest[];
  friends: User[];
}

export interface FriendRequest {
  id: number;
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
  id: number;
  name: string;
  creator: User;
  messages: Message[];
  participants: User[];
}

export interface Message {
  id: number;
  content: string;
  timestamp: Date;
  sender: User;
  chat: Chat;
}
