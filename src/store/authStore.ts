import { create } from "zustand";
import { User } from "../model/models";

interface AuthStore {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (user: User) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user: User | null) => set({ user }),
}));
