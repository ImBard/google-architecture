export interface User {
  id: string;
  username: string;
  fullname: string;
  profilePicture: string;
  coverImages: string[]; // Max 5
  languages: { language: string; level: string }[];
  jwt: string;
  location: {
    coordinates: { lat: number; lng: number };
    city: string;
  };
  countryOfOrigin: string;
  age: number;
  currentTime: string; 
}