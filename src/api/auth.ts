import axios from 'axios';
import { User } from '../model/models';
import { API_URL } from '../utils/constants';

interface AuthResponse {
  status: number;
  data?: string;
  message?: string;
}

export const login = async (
  email: User['email'],
  password: User['password']
): Promise<AuthResponse> => {
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

export const signup = async (
  username: User['username'],
  email: User['email'],
  password: User['password']
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, {
      username: username,
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
