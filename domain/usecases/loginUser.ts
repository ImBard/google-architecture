import { loginService } from "@/data/services/authService";

/**
 * LoginUser usecase
 * 
 * @param email 
 * @param password 
 * @returns User data if login is successful else throws an error
 */

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await loginService(email, password);
    return response;
  } catch (error) {
    console.error('Login Failed',error);
    throw error;
  }
};
