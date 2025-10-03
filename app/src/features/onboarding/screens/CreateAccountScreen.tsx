import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore } from '@stores/onboardingStore';

export const CreateAccountScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { email, username, password, setAccountInfo } = useOnboardingStore();
  const [localEmail, setLocalEmail] = useState(email);
  const [localUsername, setLocalUsername] = useState(username);
  const [localPassword, setLocalPassword] = useState(password);
  const [showPassword, setShowPassword] = useState(false);

  const handleContinue = () => {
    setAccountInfo(localEmail.trim(), localUsername.trim(), localPassword);
    navigation.navigate('SafetyAgreement' as never);
  };

  const handleSignIn = () => {
    navigation.navigate('Login' as never);
  };

  const isValid = 
    localEmail.trim().length > 0 && 
    localUsername.trim().length > 0 && 
    localPassword.length >= 8;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: theme.spacing.lg }}>
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text style={{
            ...theme.typography.largeTitle,
            color: theme.colors.text,
            marginBottom: theme.spacing.sm,
          }}>
            Secure your profile
          </Text>
          <Text style={{
            ...theme.typography.body,
            color: theme.colors.textSecondary,
          }}>
            Create an account to save your progress
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          {/* Email input */}
          <View style={{ marginBottom: theme.spacing.lg }}>
            <Text style={{
              ...theme.typography.headline,
              color: theme.colors.text,
              marginBottom: theme.spacing.sm,
            }}>
              Email
            </Text>
            <TextInput
              value={localEmail}
              onChangeText={setLocalEmail}
              placeholder="your.email@example.com"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.md,
                ...theme.typography.body,
                color: theme.colors.text,
              }}
            />
          </View>

          {/* Username input */}
          <View style={{ marginBottom: theme.spacing.lg }}>
            <Text style={{
              ...theme.typography.headline,
              color: theme.colors.text,
              marginBottom: theme.spacing.sm,
            }}>
              Username
            </Text>
            <TextInput
              value={localUsername}
              onChangeText={setLocalUsername}
              placeholder="Choose a unique username"
              placeholderTextColor={theme.colors.textSecondary}
              autoCapitalize="none"
              autoComplete="username"
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.md,
                ...theme.typography.body,
                color: theme.colors.text,
              }}
            />
          </View>

          {/* Password input */}
          <View style={{ marginBottom: theme.spacing.lg }}>
            <Text style={{
              ...theme.typography.headline,
              color: theme.colors.text,
              marginBottom: theme.spacing.sm,
            }}>
              Password
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                value={localPassword}
                onChangeText={setLocalPassword}
                placeholder="Minimum 8 characters"
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing.md,
                  paddingRight: theme.spacing.xl + 20,
                  ...theme.typography.body,
                  color: theme.colors.text,
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: theme.spacing.md,
                  top: theme.spacing.md,
                }}
              >
                <Text style={{
                  ...theme.typography.body,
                  color: theme.colors.primary,
                }}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
            {localPassword.length > 0 && localPassword.length < 8 && (
              <Text style={{
                ...theme.typography.caption1,
                color: theme.colors.danger,
                marginTop: theme.spacing.xs,
              }}>
                Password must be at least 8 characters
              </Text>
            )}
          </View>

          {/* Sign in link */}
          <View style={{ alignItems: 'center', marginTop: theme.spacing.lg }}>
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

        <View style={{ paddingTop: theme.spacing.md }}>
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!isValid}
          />
          
          {/* Or continue with Apple */}
          <View style={{ marginTop: theme.spacing.md }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
            }}>
              <View style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.colors.border,
              }} />
              <Text style={{
                ...theme.typography.caption1,
                color: theme.colors.textSecondary,
                marginHorizontal: theme.spacing.sm,
              }}>
                or
              </Text>
              <View style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.colors.border,
              }} />
            </View>
            
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.text,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{
                ...theme.typography.headline,
                color: theme.colors.background,
              }}>
                 Continue with Apple
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};