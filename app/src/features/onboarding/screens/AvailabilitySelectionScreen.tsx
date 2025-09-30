import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore, AvailabilitySlot } from '@stores/onboardingStore';

interface AvailabilityOption {
  slot: AvailabilitySlot;
  label: string;
  description: string;
  icon: string;
}

const availabilityOptions: AvailabilityOption[] = [
  {
    slot: 'MORNINGS',
    label: 'Mornings',
    description: '6 AM - 12 PM',
    icon: '🌅',
  },
  {
    slot: 'EVENINGS',
    label: 'Evenings',
    description: '5 PM - 9 PM',
    icon: '🌆',
  },
  {
    slot: 'WEEKNIGHTS',
    label: 'Weeknights',
    description: 'Mon-Fri evenings',
    icon: '🌙',
  },
  {
    slot: 'WEEKENDS',
    label: 'Weekends',
    description: 'Sat-Sun anytime',
    icon: '☀️',
  },
];

export const AvailabilitySelectionScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { availability, setAvailability, role } = useOnboardingStore();
  const [selectedSlots, setSelectedSlots] = useState<AvailabilitySlot[]>(availability);

  const handleSlotToggle = (slot: AvailabilitySlot) => {
    setSelectedSlots(prev =>
      prev.includes(slot)
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const handleContinue = () => {
    setAvailability(selectedSlots);
    navigation.navigate('LanguageSelection' as never);
  };

  const questionText = role === 'TEACHER' 
    ? 'When are you available to teach?' 
    : role === 'LEARNER'
    ? 'When do you like to learn?'
    : 'When are you available?';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: theme.spacing.lg }}>
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text style={{
            ...theme.typography.largeTitle,
            color: theme.colors.text,
            marginBottom: theme.spacing.sm,
          }}>
            {questionText}
          </Text>
          <Text style={{
            ...theme.typography.body,
            color: theme.colors.textSecondary,
          }}>
            Select all that apply
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          {availabilityOptions.map((option) => {
            const isSelected = selectedSlots.includes(option.slot);
            
            return (
              <TouchableOpacity
                key={option.slot}
                onPress={() => handleSlotToggle(option.slot)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: theme.spacing.md,
                  marginBottom: theme.spacing.md,
                  borderRadius: theme.borderRadius.md,
                  borderWidth: 2,
                  borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                  backgroundColor: isSelected 
                    ? theme.colors.primary + '10' 
                    : theme.colors.surface,
                }}
              >
                <Text style={{ fontSize: 32, marginRight: theme.spacing.md }}>
                  {option.icon}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    ...theme.typography.headline,
                    color: theme.colors.text,
                    marginBottom: 4,
                  }}>
                    {option.label}
                  </Text>
                  <Text style={{
                    ...theme.typography.caption1,
                    color: theme.colors.textSecondary,
                  }}>
                    {option.description}
                  </Text>
                </View>
                {isSelected && (
                  <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: theme.colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ paddingTop: theme.spacing.md }}>
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={selectedSlots.length === 0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};