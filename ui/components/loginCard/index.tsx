import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator, TextInput, TouchableOpacity, View } from "react-native";
import { useLoginCardViewModel } from "./useLoginCardViewModel";
import { styles } from "./styles";

export function LoginCard() {
  const { email, setEmail, password, setPassword, handleLogin, loading } = useLoginCardViewModel();
  return (
    <View testID="LoginCard">
    {loading && (
      <ActivityIndicator animating={loading} size="large" color="#fff" />
    )}
    <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">E-mail</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType='email-address'
          onChangeText={setEmail}
          value={email}
          />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Password</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          keyboardType='email-address'
          onChangeText={setPassword}
          value={password}
          />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}>
          <ThemedText>Login</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
}


