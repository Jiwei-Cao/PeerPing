import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore, UserRole } from '@stores/onboardingStore';
import { RoleCard } from '../components/RoleCard';

export const RoleSelectionScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { role, setRole } = useOnboardingStore();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(role);

  const handleContinue = () => {
    if (selectedRole) {
      setRole(selectedRole);
      
      // Navigate to appropriate screen based on role
      if (selectedRole === 'LEARNER') {
        navigation.navigate('LearningSkillsSelection' as never);
      } else if (selectedRole === 'TEACHER') {
        navigation.navigate('TeachingSkillsSelection' as never);
      } else {
        // For BOTH, go to learning skills first
        navigation.navigate('LearningSkillsSelection' as never);
      }
    }
  };

  const roles = [
    {
      id: 'LEARNER' as UserRole,
      title: 'Learner',
      description: 'I want to learn new skills',
      icon: '📚',
    },
    {
      id: 'TEACHER' as UserRole,
      title: 'Teacher',
      description: 'I want to share my knowledge',
      icon: '👨‍🏫',
    },
    {
      id: 'BOTH' as UserRole,
      title: 'Both',
      description: 'I want to learn and teach',
      icon: '🤝',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, padding: theme.spacing.lg }}>
          <View style={{ marginTop: theme.spacing.xl, marginBottom: theme.spacing.xxl }}>
            <Text style={{
              ...theme.typography.largeTitle,
              color: theme.colors.text,
              marginBottom: theme.spacing.sm,
            }}>
              I want to...
            </Text>
            <Text style={{
              ...theme.typography.body,
              color: theme.colors.textSecondary,
            }}>
              Choose how you'd like to use PeerPing
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            {roles.map((roleOption) => (
              <RoleCard
                key={roleOption.id}
                title={roleOption.title}
                description={roleOption.description}
                icon={roleOption.icon}
                selected={selectedRole === roleOption.id}
                onPress={() => setSelectedRole(roleOption.id)}
              />
            ))}
          </View>

          <View style={{ paddingBottom: theme.spacing.md, paddingTop: theme.spacing.xl }}>
            <Button
              title="Continue"
              onPress={handleContinue}
              disabled={!selectedRole}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};