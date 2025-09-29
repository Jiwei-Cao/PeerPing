import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { useOnboardingStore } from '@stores/onboardingStore';
import { Picker } from '@react-native-picker/picker';

const POPULAR_CITIES = [
  '',
  'London',
  'Manchester',
  'Birmingham',
  'Leeds',
  'Glasgow',
  'Edinburgh',
  'Bristol',
  'Liverpool',
  'Newcastle',
  'Sheffield',
  'Nottingham',
  'Cardiff',
  'Belfast',
  'Oxford',
  'Cambridge',
  'Brighton',
  'Southampton',
  'Reading',
  'Leicester',
  'Coventry',
];

export const CitySelectionScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { city, setCity } = useOnboardingStore();
  const [selectedCity, setSelectedCity] = useState(city || '');

  const handleContinue = () => {
    if (selectedCity) {
      setCity(selectedCity);
      navigation.navigate('AvailabilitySelection' as never);
    }
  };

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
              Where are you based?
            </Text>
            <Text style={{
              ...theme.typography.body,
              color: theme.colors.textSecondary,
            }}>
              Select your city to find peers nearby
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            {/* City Dropdown */}
            <View style={{
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.md,
              borderWidth: 1,
              borderColor: theme.colors.border,
              marginBottom: theme.spacing.lg,
            }}>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue: string) => setSelectedCity(itemValue)}
                style={{
                  color: theme.colors.text,
                }}
              >
                <Picker.Item label="Select a city..." value="" />
                {POPULAR_CITIES.slice(1).map((cityName) => (
                  <Picker.Item key={cityName} label={cityName} value={cityName} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={{ paddingBottom: theme.spacing.md, paddingTop: theme.spacing.xl }}>
            <Button
              title="Continue"
              onPress={handleContinue}
              disabled={!selectedCity}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};