import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore } from '@stores/onboardingStore';
import * as ImagePicker from 'expo-image-picker';

export const ProfileBasicsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { displayName, bio, avatarUri, setProfile, setAvatar } = useOnboardingStore();
  const [name, setName] = useState(displayName);
  const [userBio, setUserBio] = useState(bio);
  const [avatar, setAvatarLocal] = useState(avatarUri);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatarLocal(result.assets[0].uri);
      setAvatar(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    setProfile(name.trim(), userBio.trim());
    navigation.navigate('CreateAccount' as never);
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
            Tell us about yourself
          </Text>
          <Text style={{
            ...theme.typography.body,
            color: theme.colors.textSecondary,
          }}>
            Add a photo and a short bio to help others get to know you
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          {/* Avatar section */}
          <View style={{ alignItems: 'center', marginBottom: theme.spacing.xl }}>
            <TouchableOpacity onPress={handleImagePicker}>
              <View style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: theme.colors.surface,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
                {avatar ? (
                  <Image 
                    source={{ uri: avatar }} 
                    style={{ width: 120, height: 120 }}
                  />
                ) : (
                  <View>
                    <Text style={{ fontSize: 40 }}>📸</Text>
                  </View>
                )}
              </View>
              <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: theme.colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 3,
                borderColor: theme.colors.background,
              }}>
                <Text style={{ color: 'white', fontSize: 16 }}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Name input */}
          <View style={{ marginBottom: theme.spacing.lg }}>
            <Text style={{
              ...theme.typography.headline,
              color: theme.colors.text,
              marginBottom: theme.spacing.sm,
            }}>
              Display name
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.textSecondary}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.md,
                ...theme.typography.body,
                color: theme.colors.text,
              }}
            />
          </View>

          {/* Bio input */}
          <View>
            <Text style={{
              ...theme.typography.headline,
              color: theme.colors.text,
              marginBottom: theme.spacing.sm,
            }}>
              Bio
            </Text>
            <TextInput
              value={userBio}
              onChangeText={(text) => {
                if (text.length <= 120) {
                  setUserBio(text);
                }
              }}
              placeholder="Tell us a bit about yourself..."
              placeholderTextColor={theme.colors.textSecondary}
              multiline
              numberOfLines={3}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing.md,
                ...theme.typography.body,
                color: theme.colors.text,
                minHeight: 80,
                textAlignVertical: 'top',
              }}
            />
            <Text style={{
              ...theme.typography.caption1,
              color: theme.colors.textSecondary,
              marginTop: theme.spacing.xs,
              textAlign: 'right',
            }}>
              {userBio.length}/120
            </Text>
          </View>
        </View>

        <View style={{ paddingTop: theme.spacing.md }}>
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={name.trim().length === 0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};