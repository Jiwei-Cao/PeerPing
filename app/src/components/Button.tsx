import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '@theme/ThemeProvider';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = true,
  disabled,
  style,
  ...props
}) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (variant === 'primary') return theme.colors.primary;
    if (variant === 'secondary') return theme.colors.surface;
    return 'transparent';
  };

  const getTextColor = () => {
    if (variant === 'primary') return theme.colors.background;
    if (variant === 'secondary') return theme.colors.text;
    return theme.colors.primary;
  };

  const getPadding = () => {
    if (size === 'small') return theme.spacing.sm;
    if (size === 'large') return theme.spacing.lg;
    return theme.spacing.md;
  };

  const getTypography = () => {
    if (size === 'small') return theme.typography.subheadline;
    if (size === 'large') return theme.typography.headline;
    return theme.typography.body;
  };

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: theme.borderRadius.md,
          padding: getPadding(),
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled || loading ? 0.6 : 1,
          width: fullWidth ? '100%' : 'auto',
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: theme.colors.border,
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={{
            ...getTypography(),
            color: getTextColor(),
            fontWeight: '600',
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};