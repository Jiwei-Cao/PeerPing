import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

export const WelcomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('RoleSelection' as never);
  };

  const handleSignIn = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: theme.spacing.lg }}>
        {/* Logo/Illustration placeholder */}
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: theme.spacing.xl,
        }}>
          <View style={{
            width: 120,
            height: 120,
            borderRadius: theme.borderRadius.round,
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing.xl,
          }}>
            <Text style={{
              ...theme.typography.largeTitle,
              color: theme.colors.background,
              fontWeight: 'bold',
            }}>
              PP
            </Text>
          </View>
          
          <Text style={{
            ...theme.typography.largeTitle,
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: theme.spacing.md,
          }}>
            Find your learning community
          </Text>
          
          <Text style={{
            ...theme.typography.body,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            paddingHorizontal: theme.spacing.xl,
          }}>
            Connect with people who want to learn what you can teach, and teach what you want to learn
          </Text>
        </View>

        {/* Action buttons */}
        <View style={{ paddingBottom: theme.spacing.md }}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            style={{ marginBottom: theme.spacing.md }}
          />
          
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              ...theme.typography.body,
              color: theme.colors.textSecondary,
            }}>
              Already have an account?{' '}
              <Text
                onPress={handleSignIn}
                style={{ color: theme.colors.primary }}
              >
                Sign in
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};