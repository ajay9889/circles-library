import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface LanguageSelectionSliderProps {
  languages: string[]; // languages is an array of strings
  selectedLanguage: string; // selectedLanguage is a string
  handleLanguageChange: (value: string) => void; // handleLanguageChange is a function that takes a string and returns void
}

export function LanguageSelectionSlider({
  languages,
  selectedLanguage,
  handleLanguageChange,
}: LanguageSelectionSliderProps) {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  return (
    <View style={styles.sliderContainer}>
      {languages.map((language) => (
        <Pressable
          key={language}
          style={[
            styles.button,
            selectedLanguage === language
              ? styles.selectedButton
              : styles.unselectedButton,
          ]}
          onPress={() => handleLanguageChange(language)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedLanguage === language
                ? styles.selectedText
                : styles.unselectedText,
            ]}
          >
            {language}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  sliderContainer: {
    flexDirection: 'row',
    backgroundColor: cssTheme.colors.primary[400], // primary-400
    paddingHorizontal: 4,
    paddingVertical: 3, // 0.1875rem
    borderRadius: 999, // fully rounded
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal: 12, // px-3
    paddingVertical: 6, // py-[.3rem]
    borderRadius: 999, // rounded-full
  },
  selectedButton: {
    backgroundColor: cssTheme.colors.primary[900], // primary-900
  },
  unselectedButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 12, // text-xs
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  selectedText: {
    color: cssTheme.colors.gray[200], // white
  },
  unselectedText: {
    color: cssTheme.colors.primary[900], // primary-900
  },
});
}
