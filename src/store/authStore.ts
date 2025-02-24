import { create } from "zustand";
import { api } from "../config/axiosConfig";
import { User } from "../model/models";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { username: string; password: string }, navigate: (path: string) => void) => Promise<void>;
  logout: (navigate: (path: string) => void) => Promise<void>;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (credentials, navigate) => {
    const resp = await api.post("/api/auth/login", credentials);

    if (resp.status !== 200) {
      throw new Error("Error: failed to login with status: " + resp.status);
    }

    set((state) => {
      if (!state.isAuthenticated || state.user !== resp.data) {
        return { isAuthenticated: true, user: resp.data };
      }
      return state;
    });

    navigate("/");
  },
  logout: async (navigate) => {
    await api.post("/api/auth/logout");
    set((state) => {
      if (state.isAuthenticated || state.user !== null) {
        return { isAuthenticated: false, user: null };
      }
      return state;
    });
    navigate("/login");
  },
  checkAuth: async () => {
    const resp = await api.get("/api/auth/me");
    set((state) => {
      if (resp.status === 200 && (!state.isAuthenticated || state.user !== resp.data)) {
        return { isAuthenticated: true, user: resp.data };
      } else if (resp.status !== 200 && (state.isAuthenticated || state.user !== null)) {
        return { isAuthenticated: false, user: null };
      }
      return state;
    });
  },
}));

export default useAuthStore;
