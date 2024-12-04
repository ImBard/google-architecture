import { useLoginCardViewModel } from "./useLoginCardViewModel";
import { act, renderHook } from "@testing-library/react-native";

jest.mock('../../../domain/usecases/loginUser', () => ({
  loginUser: jest.fn(() => Promise.resolve({success: true})),
}));

jest.mock('expo-router', () => {
  const mockReplace = jest.fn(); // Cria o mock rastreável para replace
  return {
    useRouter: jest.fn(() => ({
      replace: mockReplace, // Retorna a função mockada
    })),
    __mockReplace: mockReplace, // Exporta para validação
  };
});

describe('useLoginCardViewModel', () => {
  it('deve atualizar o email e password corretamente', () => {
    const { result } = renderHook(() => useLoginCardViewModel());

    act(() => {
      result.current.setEmail('nicota1234@gmail.com');
      result.current.setPassword('talison1');
    });

    expect(result.current.email).toBe('nicota1234@gmail.com');
    expect(result.current.password).toBe('talison1');
  });

  it('deve chamar loginUser e navegar corretamente', async () => {
    const { result } = renderHook(() => useLoginCardViewModel());
    const {loginUser} = require('../../../domain/usecases/loginUser');
    const { useRouter } = require('expo-router');
    const mockRouter = useRouter();


    act(() => {
      result.current.setEmail('nicota1234@gmail.com');
      result.current.setPassword('talison1');
    });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(result.current.loading).toBe(false);

    expect(mockRouter.replace).toHaveBeenCalledWith('/(stack)/(tabs)/explore');
    expect(loginUser).toHaveBeenCalledWith('nicota1234@gmail.com', 'talison1');
  })
})