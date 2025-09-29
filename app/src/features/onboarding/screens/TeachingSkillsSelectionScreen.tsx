import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore } from '@stores/onboardingStore';
import { SkillTag } from '../components/SkillTag';
import { POPULAR_SKILLS } from '../data/skills';

export const TeachingSkillsSelectionScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { teachingTags, setTeachingTags } = useOnboardingStore();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(teachingTags);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 3) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleContinue = () => {
    setTeachingTags(selectedSkills);
    // Go to city selection next
    navigation.navigate('CitySelection' as never);
  };

  const filteredSkills = POPULAR_SKILLS.filter(skill =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, padding: theme.spacing.lg }}>
          <View style={{ marginTop: theme.spacing.xl, marginBottom: theme.spacing.xl }}>
            <Text style={{
              ...theme.typography.largeTitle,
              color: theme.colors.text,
              marginBottom: theme.spacing.sm,
            }}>
              What can you teach?
            </Text>
            <Text style={{
              ...theme.typography.body,
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.lg,
            }}>
              Select up to 3 skills ({selectedSkills.length}/3)
            </Text>

            {/* Search Input */}
            <View style={{
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.md,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              marginBottom: theme.spacing.lg,
            }}>
              <TextInput
                placeholder="Search skills..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{
                  ...theme.typography.body,
                  color: theme.colors.text,
                }}
                placeholderTextColor={theme.colors.textTertiary}
              />
            </View>
          </View>

          {/* Skills Grid */}
          <View style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap',
            marginBottom: theme.spacing.xl,
          }}>
            {filteredSkills.map((skill) => (
              <SkillTag
                key={skill}
                skill={skill}
                selected={selectedSkills.includes(skill)}
                onPress={() => handleSkillToggle(skill)}
              />
            ))}
          </View>

          <View style={{ paddingBottom: theme.spacing.md }}>
            <Button
              title="Continue"
              onPress={handleContinue}
              disabled={selectedSkills.length === 0}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};