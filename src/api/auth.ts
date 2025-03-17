import { api } from "@/config/axiosConfig";
import { User } from "@/model/models";

const AUTH_API_URL = "/api/auth";

export const getLoggedInUserInfo = async (): Promise<User> => {
    const response = await api.get<User>(`${AUTH_API_URL}/me`);
    return response.data;
};