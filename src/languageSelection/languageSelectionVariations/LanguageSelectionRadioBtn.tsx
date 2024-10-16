import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface LanguageSelectionRadioBtnProps {
  languages: string[]; // languages is an array of strings
  selectedLanguage: string; // selectedLanguage is a string
  handleLanguageChange: (value: string) => void; // handleLanguageChange is a function that takes a string and returns void
}

export function LanguageSelectionRadioBtn({
  languages,
  selectedLanguage,
  handleLanguageChange,
}: LanguageSelectionRadioBtnProps) {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      {languages.map((language) => (
        <TouchableOpacity
          style={styles.label}
          key={language}
          onPress={() => handleLanguageChange(language)}
        >
          <View style={styles.radioContainer}>
            <View style={styles.box}>
              <View
                style={[
                  styles.circle,
                  selectedLanguage === language && styles.selectedCircle,
                ]}
              />
            </View>
          </View>
          <Text style={styles.languageText}>{language}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContainer: {
    marginRight: 8,
  },
  box: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: cssTheme.colors.primary[900], // primary-900
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  selectedCircle: {
    backgroundColor: cssTheme.colors.primary[900], // primary-900
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: cssTheme.colors.gray[900], // gray-900
  },
});
}
