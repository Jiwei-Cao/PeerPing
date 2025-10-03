import React from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

export const PushNotificationsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleEnableNotifications = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Notifications Disabled',
        'You can always enable notifications later in your device settings.',
        [{ text: 'OK', onPress: completeOnboarding }]
      );
      return;
    }

    completeOnboarding();
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    // TODO: Call registration API and navigate to main app
    navigation.navigate('Main' as never);
  };

  const notificationFeatures = [
    {
      icon: '💬',
      title: 'New Messages',
      description: 'Get notified when someone sends you a message',
    },
    {
      icon: '🤝',
      title: 'Friend Requests',
      description: 'Know when someone wants to connect with you',
    },
    {
      icon: '🎯',
      title: 'Skill Matches',
      description: 'Discover new people who match your learning goals',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: theme.spacing.lg }}>
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text style={{
            ...theme.typography.largeTitle,
            color: theme.colors.text,
            marginBottom: theme.spacing.sm,
          }}>
            Stay Connected
          </Text>
          <Text style={{
            ...theme.typography.body,
            color: theme.colors.textSecondary,
          }}>
            Enable notifications to never miss an opportunity to learn
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{
            alignItems: 'center',
            marginBottom: theme.spacing.xxl,
          }}>
            <View style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: theme.colors.primary + '20',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.xl,
            }}>
              <Text style={{ fontSize: 48 }}>🔔</Text>
            </View>
          </View>

          {notificationFeatures.map((feature, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                marginBottom: theme.spacing.lg,
                alignItems: 'center',
              }}
            >
              <Text style={{
                fontSize: 24,
                marginRight: theme.spacing.md,
              }}>
                {feature.icon}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{
                  ...theme.typography.headline,
                  color: theme.colors.text,
                  marginBottom: 2,
                }}>
                  {feature.title}
                </Text>
                <Text style={{
                  ...theme.typography.caption1,
                  color: theme.colors.textSecondary,
                }}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ paddingTop: theme.spacing.md }}>
          <Button
            title="Enable Notifications"
            onPress={handleEnableNotifications}
            style={{ marginBottom: theme.spacing.md }}
          />
          
          <Text
            onPress={handleSkip}
            style={{
              ...theme.typography.body,
              color: theme.colors.primary,
              textAlign: 'center',
              padding: theme.spacing.md,
            }}
          >
            Maybe later
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};