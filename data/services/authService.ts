import axios from 'axios';
import { User } from '../models/User';


/**
 * Login service
 * 
 * @param email 
 * @param password 
 * @returns User data if login is successful else throws an error
 */
export const loginService = async (email: string, password: string): Promise<User> => {
  const response = await axios.post('http://demo7650999.mockable.io/login', {
    email,
    password,
  });
  return response.data;
};
