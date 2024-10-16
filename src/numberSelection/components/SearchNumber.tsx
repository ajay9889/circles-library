import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Icon } from '../../assets/Icon';
import { useSelector } from 'react-redux';

export function SearchNumber({ value, onChange, placeholder, labelText }) {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {labelText && (
          <Text style={styles.label} accessibilityLabel="search">
            {labelText}
          </Text>
        )}
        <View style={styles.searchBar}>
          <TextInput
            value={value}
            onChangeText={onChange}
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.numberSearchInput.placeholder}
          />
          <Icon
            kind="search"
            width={24}
            height={24}
            currentColor={theme.colors.numberSearchInput.search}
          />
        </View>
      </View>
    </View>
  );
}

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: cssTheme.colors.numberSearchInput.bg,
    paddingHorizontal: cssTheme.padding.numberSearchInput.horizontal,
    paddingVertical: cssTheme.padding.numberSearchInput.vertical,
    borderRadius: cssTheme.borderRadius.numberSearchInput,
    borderWidth: cssTheme.borderWidth.numberSearchInput,
    borderColor: cssTheme.colors.gray[500],
    paddingLeft: 12,
  },
  label: {
    fontSize: cssTheme.fontSize.numberSearchInputLabel,
    fontWeight:
      (cssTheme.fontWeight.numberSearchInputLabel as '500') || '400' || '700',
    color: cssTheme.colors.primary[900],
    marginBottom: 1,
  },
  searchBar: {
    borderBottomWidth: cssTheme.borderWidth.numberSearchPlaceholder,
    borderBottomColor: cssTheme.colors.gray[300],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: cssTheme.padding.numberSearchPlaceholder.horizontal,
    paddingTop: cssTheme.padding.numberSearchPlaceholder.top,
    paddingBottom: cssTheme.padding.numberSearchPlaceholder.bottom,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 14,
    lineHeight: 20,
    color: cssTheme.colors.numberSearchInput.search,
    padding: 0,
  },
});
}
