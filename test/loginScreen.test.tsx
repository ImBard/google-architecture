import HomeScreenComponent from "@/ui/screens/homeScreen";
import { HelloWave } from "@/components/HelloWave";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import React from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";

jest.mock('react-native/Libraries/Components/Keyboard/KeyboardAvoidingView', () => {
  const KeyboardAvoidingView = ({ children }: any) => children;
  return KeyboardAvoidingView;
});


// Mock do componente TabBarBackground
jest.mock('@react-navigation/bottom-tabs', () => ({
  ...jest.requireActual('@react-navigation/bottom-tabs'),
  useBottomTabBarHeight: jest.fn(() => 0),
}));

// Mock do SafeAreaContext
jest.mock('react-native-safe-area-context', () => {
  const { useSafeAreaInsets } = jest.requireActual('react-native-safe-area-context');
  return {
    ...jest.requireActual('react-native-safe-area-context'),
    useSafeAreaInsets: jest.fn(() => ({ top: 0, right: 0, bottom: 0, left: 0 })),
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // Overriding the `useSharedValue` to avoid runtime issues in tests
  Reanimated.useSharedValue = jest.fn((initialValue) => ({ value: initialValue }));

  // Returning mocked animations
  Reanimated.useAnimatedStyle = jest.fn(() => ({}));

  return Reanimated;
});

jest.mock('../components/ParallaxScrollView', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
  }
});

jest.mock('@/components/ThemedText', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    __esModule: true,
    ThemedText: ({ children }: { children: React.ReactNode }) => <Text>{children}</Text>,
  }
});

jest.mock('@/components/ThemedView', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    ThemedView: ({ children }: { children: React.ReactNode }) => <View>{children}</View>,
  };
});

jest.mock('@/ui/components/loginCard', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    LoginCard: () => <View testID="LoginCard" />,
  };
});

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  return Object.setPrototypeOf(
    {
      KeyboardAvoidingView: jest.fn((props) => {
        return props.children;
      }),
    },
    RN
  );
});

describe("HomeScreen", () => {
  it("deve renderizar o título corretamente", () => {
    const { getByText } = render(<HomeScreenComponent />);
    expect(getByText("Google Architecture")).toBeTruthy();
  });

  it("deve renderizar o LoginCard", () => {
    const { getByTestId } = render(<HomeScreenComponent />);
    expect(getByTestId("LoginCard")).toBeTruthy();
  });

  it("deve renderizar o passo 3", () => {
    const { getByText } = render(<HomeScreenComponent />);
    expect(getByText("Step 3: Get a fresh start")).toBeTruthy();
  });
});
