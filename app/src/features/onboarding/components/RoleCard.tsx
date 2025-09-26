import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';

interface RoleCardProps {
  title: string;
  description: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  icon,
  selected,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        borderWidth: 2,
        borderColor: selected ? theme.colors.primary : theme.colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 32,
            marginRight: theme.spacing.md,
          }}
        >
          {icon}
        </Text>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...theme.typography.headline,
              color: selected ? theme.colors.background : theme.colors.text,
              marginBottom: theme.spacing.xs,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              ...theme.typography.subheadline,
              color: selected ? theme.colors.background : theme.colors.textSecondary,
            }}
          >
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};