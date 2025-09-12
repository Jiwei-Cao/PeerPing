import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { theme } from '@theme/ThemeProvider';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={[styles.base, { borderLeftColor: theme.colors.success }]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={[styles.base, { borderLeftColor: theme.colors.danger }]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={[styles.base, { borderLeftColor: theme.colors.info }]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  base: {
    borderLeftWidth: 5,
    width: '90%',
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background,
    ...theme.shadows.lg,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  text1: {
    ...theme.typography.headline,
    color: theme.colors.text,
  },
  text2: {
    ...theme.typography.subheadline,
    color: theme.colors.textSecondary,
  },
});