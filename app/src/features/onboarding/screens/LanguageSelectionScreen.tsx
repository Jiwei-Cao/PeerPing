import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore } from '@stores/onboardingStore';

const popularLanguages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Dutch',
  'Polish',
  'Russian',
  'Turkish',
  'Arabic',
  'Hindi',
  'Bengali',
  'Punjabi',
  'Urdu',
  'Mandarin',
  'Cantonese',
  'Japanese',
  'Korean',
  'Vietnamese',
];

export const LanguageSelectionScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { languages, setLanguages } = useOnboardingStore();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(languages);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = popularLanguages.filter(lang =>
    lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleContinue = () => {
    setLanguages(selectedLanguages);
    navigation.navigate('ProfileBasics' as never);
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
            What languages do you speak?
          </Text>
          <Text style={{
            ...theme.typography.body,
            color: theme.colors.textSecondary,
          }}>
            Select all that apply
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.md,
          paddingHorizontal: theme.spacing.md,
          marginBottom: theme.spacing.md,
        }}>
          <Text style={{ marginRight: theme.spacing.sm }}>🔍</Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search languages..."
            placeholderTextColor={theme.colors.textSecondary}
            style={{
              flex: 1,
              paddingVertical: theme.spacing.md,
              ...theme.typography.body,
              color: theme.colors.text,
            }}
          />
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -theme.spacing.xs,
          }}>
            {filteredLanguages.map((language) => {
              const isSelected = selectedLanguages.includes(language);
              
              return (
                <TouchableOpacity
                  key={language}
                  onPress={() => handleLanguageToggle(language)}
                  style={{
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: theme.spacing.sm,
                    margin: theme.spacing.xs,
                    borderRadius: theme.borderRadius.round,
                    borderWidth: 2,
                    borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    backgroundColor: isSelected 
                      ? theme.colors.primary 
                      : theme.colors.surface,
                  }}
                >
                  <Text style={{
                    ...theme.typography.body,
                    color: isSelected ? '#FFFFFF' : theme.colors.text,
                  }}>
                    {language}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={{ paddingTop: theme.spacing.md }}>
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={selectedLanguages.length === 0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};