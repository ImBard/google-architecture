import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { loginService } from "./authService";

const mockUser = {
  id: "123456",
  username: "cool_user123",
  fullname: "John Doe",
  profilePicture: "https://i.pravatar.cc/150?img=3", // Foto de avatar aleatória
  coverImages: [
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800", // Foto de uma paisagem
    "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=800", // Foto de um café
    "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=800", // Foto de uma cidade
    "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800", // Foto de uma floresta
    "https://images.unsplash.com/photo-1558981403-c5f9891a1a5e?w=800", // Foto de uma praia
  ],
  languages: [
    { language: "English", level: "Advanced" },
    { language: "Spanish", level: "Intermediate" },
  ],
  jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  location: {
    coordinates: { lat: 40.7128, lng: -74.0060 }, // Coordenadas de Nova York
    city: "New York",
  },
  countryOfOrigin: "USA",
  age: 29,
  currentTime: new Date().toISOString(),
};

describe('loginService', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it('deve fazer uma requisição POST correta', async () => {
    const mockResponse = mockUser;
    mock.onPost('http://demo7650999.mockable.io/login').reply(200, mockResponse);

    const result = await loginService('nicota1234@gmail.com', 'talison1');
    expect(result).toEqual(mockResponse);
  });

  it('deve lançar erro em caso de falha na API', async () => {
    mock.onPost('http://demo7650999.mockable.io/login').reply(500);

    await expect(loginService('nicota1234@gmail.com', 'talison1')).rejects.toThrow();
  })
})