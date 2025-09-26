import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@features/auth/AuthProvider';
import { Text, View, ActivityIndicator } from 'react-native';
import { WelcomeScreen } from '@features/onboarding/screens/WelcomeScreen';
import { RoleSelectionScreen } from '@features/onboarding/screens/RoleSelectionScreen';

// Auth Stack Navigator
const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="RoleSelection" component={RoleSelectionScreen} />
  </AuthStack.Navigator>
);

// Main App Navigator (placeholder for now)
const MainNavigator = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Main App Navigator</Text>
  </View>
);

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};