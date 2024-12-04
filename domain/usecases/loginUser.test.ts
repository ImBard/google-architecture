import { loginService } from "@/data/services/authService";
import { loginUser } from "./loginUser";

jest.mock('../../data/services/authService', () => ({
  loginService: jest.fn(),
}));

describe('loginUser', () => {
  it('deve chamar loginSErvice com os parâmetros corretos', async () => {
    const mockResponse = { success: true, token: '123' };
    (loginService as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await loginUser('nicota1234@gmail.com', 'talison1');
    expect(result).toEqual(mockResponse);
    expect(loginService).toHaveBeenCalledWith('nicota1234@gmail.com', 'talison1');
  });

  it('deve lançar erro se loginService falhar', async () => {
    (loginService as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));

    await expect(loginUser('nicota1234@gmail.com', 'talison1')).rejects.toThrow('Login failed');
  })
})