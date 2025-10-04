import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@features/auth/AuthProvider';
import { Text, View, ActivityIndicator } from 'react-native';
import { WelcomeScreen } from '@features/onboarding/screens/WelcomeScreen';
import { RoleSelectionScreen } from '@features/onboarding/screens/RoleSelectionScreen';
import { LearningSkillsSelectionScreen } from '@features/onboarding/screens/LearningSkillsSelectionScreen';
import { TeachingSkillsSelectionScreen } from '@features/onboarding/screens/TeachingSkillsSelectionScreen';
import { CitySelectionScreen } from '@features/onboarding/screens/CitySelectionScreen';
import { AvailabilitySelectionScreen } from '@features/onboarding/screens/AvailabilitySelectionScreen';
import { LanguageSelectionScreen } from '@features/onboarding/screens/LanguageSelectionScreen';
import { ProfileBasicsScreen } from '@features/onboarding/screens/ProfileBasicsScreen';
import { CreateAccountScreen } from '@features/onboarding/screens/CreateAccountScreen';
import { SafetyAgreementScreen } from '@features/onboarding/screens/SafetyAgreementScreen';
import { PushNotificationsScreen } from '@features/onboarding/screens/PushNotificationsScreen';

// Auth Stack Navigator
const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="RoleSelection" component={RoleSelectionScreen} />
    <AuthStack.Screen name="LearningSkillsSelection" component={LearningSkillsSelectionScreen} />
    <AuthStack.Screen name="TeachingSkillsSelection" component={TeachingSkillsSelectionScreen} />
    <AuthStack.Screen name="CitySelection" component={CitySelectionScreen} />
    <AuthStack.Screen name="AvailabilitySelection" component={AvailabilitySelectionScreen} />
    <AuthStack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
    <AuthStack.Screen name="ProfileBasics" component={ProfileBasicsScreen} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccountScreen} />
    <AuthStack.Screen name="SafetyAgreement" component={SafetyAgreementScreen} />
    <AuthStack.Screen name="PushNotifications" component={PushNotificationsScreen} />
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