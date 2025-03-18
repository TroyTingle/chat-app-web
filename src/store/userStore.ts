import { create } from "zustand";
import { User } from "@/model/models";
import {getLoggedInUserInfo} from "@/api/auth";

interface UserState {
    user: User | null;
    fetchUser: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    fetchUser: async () => {
        const user = await getLoggedInUserInfo();
        set({ user });
    },
}));

export default useUserStore;