import { loginUser } from "@/domain/usecases/loginUser";
import { useRouter } from "expo-router";
import { useState } from "react";

export const useLoginCardViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      console.log('Login successful',result);
      router.replace('/(stack)/(tabs)/explore');
    } catch (error) {
      console.error('Login Failed',error);
    } finally {
      setLoading(false);
    }
  }

  return { email, setEmail, password, setPassword, handleLogin, loading };
}