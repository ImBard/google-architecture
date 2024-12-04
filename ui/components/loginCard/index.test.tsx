import React from "react";
import { useLoginCardViewModel } from "./useLoginCardViewModel";
import { fireEvent, render } from "@testing-library/react-native";
import { LoginCard } from ".";

jest.mock('./useLoginCardViewModel', () => {
  const mockHandleLogin = jest.fn(); // Função rastreável
  return {
    useLoginCardViewModel: jest.fn(() => ({
      email: 'nicota1234@gmail.com',
      setEmail: jest.fn(),
      password: 'talison1',
      setPassword: jest.fn(),
      handleLogin: mockHandleLogin,
      loading: false
    })),
    __mockHandleLogin: mockHandleLogin 
  };
});

describe('LoginCard', () => {
  it('deve renderizar inputs de email e senha', () => {
    const { getByPlaceholderText, getByText } = render(<LoginCard />);
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('deve chamar  handleLogin ao pressionar o botão', () => {
    const { getByText } = render(<LoginCard />);
    const loginButton = getByText('Login');

    fireEvent.press(loginButton);

    const { useLoginCardViewModel } = require('./useLoginCardViewModel');
    expect(useLoginCardViewModel().handleLogin).toHaveBeenCalled();
  })
})