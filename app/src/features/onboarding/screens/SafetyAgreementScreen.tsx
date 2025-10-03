import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore } from '@stores/onboardingStore';

const safetyGuidelines = [
  {
    icon: '🛡️',
    title: 'Age Verification',
    description: 'You must be 16 or older to use PeerPing',
  },
  {
    icon: '🤝',
    title: 'Respectful Communication',
    description: 'Treat all members with respect and kindness. Harassment, bullying, or discrimination will not be tolerated.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'Never share personal information like phone numbers, addresses, or financial details in public profiles.',
  },
  {
    icon: '⚠️',
    title: 'Report Concerns',
    description: 'If you encounter inappropriate behavior, use the report feature. We take all reports seriously.',
  },
  {
    icon: '🚫',
    title: 'No Spam or Solicitation',
    description: 'PeerPing is for learning and teaching. Commercial solicitation is prohibited.',
  },
];

export const SafetyAgreementScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { hasAcceptedSafety, acceptSafety } = useOnboardingStore();
  const [isChecked, setIsChecked] = useState(hasAcceptedSafety);

  const handleContinue = () => {
    if (isChecked) {
      acceptSafety();
      navigation.navigate('PushNotifications' as never);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: theme.spacing.lg }}>
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text style={{
            ...theme.typography.largeTitle,
            color: theme.colors.text,
            marginBottom: theme.spacing.sm,
          }}>
            Community Guidelines
          </Text>
          <Text style={{
            ...theme.typography.body,
            color: theme.colors.textSecondary,
          }}>
            Help us keep PeerPing safe for everyone
          </Text>
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {safetyGuidelines.map((guideline, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                marginBottom: theme.spacing.lg,
              }}
            >
              <Text style={{
                fontSize: 28,
                marginRight: theme.spacing.md,
              }}>
                {guideline.icon}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{
                  ...theme.typography.headline,
                  color: theme.colors.text,
                  marginBottom: theme.spacing.xs,
                }}>
                  {guideline.title}
                </Text>
                <Text style={{
                  ...theme.typography.body,
                  color: theme.colors.textSecondary,
                  lineHeight: 22,
                }}>
                  {guideline.description}
                </Text>
              </View>
            </View>
          ))}

          <View style={{
            backgroundColor: theme.colors.surface,
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.xl,
          }}>
            <Text style={{
              ...theme.typography.footnote,
              color: theme.colors.textSecondary,
              lineHeight: 20,
            }}>
              By using PeerPing, you agree to follow these guidelines. Violations may result in account suspension or termination. For full terms, visit our website.
            </Text>
          </View>
        </ScrollView>

        <View style={{ paddingTop: theme.spacing.md }}>
          {/* Checkbox */}
          <TouchableOpacity
            onPress={() => setIsChecked(!isChecked)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing.lg,
            }}
          >
            <View style={{
              width: 24,
              height: 24,
              borderRadius: theme.borderRadius.sm,
              borderWidth: 2,
              borderColor: isChecked ? theme.colors.primary : theme.colors.border,
              backgroundColor: isChecked ? theme.colors.primary : 'transparent',
              marginRight: theme.spacing.sm,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {isChecked && (
                <Text style={{ color: 'white', fontWeight: 'bold' }}>✓</Text>
              )}
            </View>
            <Text style={{
              ...theme.typography.body,
              color: theme.colors.text,
              flex: 1,
            }}>
              I understand and agree to follow the community guidelines
            </Text>
          </TouchableOpacity>

          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!isChecked}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};