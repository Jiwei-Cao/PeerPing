import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';

interface SkillTagProps {
  skill: string;
  selected: boolean;
  onPress: () => void;
}

export const SkillTag: React.FC<SkillTagProps> = ({ skill, selected, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
        borderWidth: 1,
        borderColor: selected ? theme.colors.primary : theme.colors.border,
        borderRadius: theme.borderRadius.round,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        marginRight: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
      }}
    >
      <Text
        style={{
          ...theme.typography.subheadline,
          color: selected ? theme.colors.background : theme.colors.text,
          fontWeight: selected ? '600' : '400',
        }}
      >
        {skill}
      </Text>
    </TouchableOpacity>
  );
};