import axios from 'axios';

const API_URL = 'https://your-api-server.com'; // Replace with your API server URL

interface LoginResponse {
  status: number;
  data?: string;
  message?: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: email,
      password: password,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          status: error.response.status,
          message: error.response.data.message || 'An error occurred',
        };
      }
      return {
        status: 500,
        message: 'Server error',
      };
    }
    return {
      status: 500,
      message: 'An unexpected error occurred',
    };
  }
};
