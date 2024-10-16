import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '../../assets/Icon'; // Adjust import as necessary
import { useSelector } from 'react-redux';

interface NumberRadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  icon?: string;
  label: string;
  subText?: string;
  disabled?: boolean;
  height?: number;
}

export const NumberRadioButton: React.FC<NumberRadioButtonProps> = ({
  id,
  name,
  value,
  checked = false,
  onChange,
  label,
  icon,
  subText,
  disabled = false,
}) => {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  const handlePress = () => {
    if (!disabled) {
      onChange(value);
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.container,
        checked ? styles.selected : styles.unselected,
        disabled && styles.disabled,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      {icon && (
        <View style={styles.radioContainer}>
          <Icon
            kind={icon}
            width={32}
            height={32}
            currentColor={theme.colors.numberSelectionRadio.icon}
          />
        </View>
      )}
      <Text style={styles.label}>{label}</Text>
      {subText && <Text style={styles.subText}>{subText}</Text>}
    </TouchableOpacity>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 6,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  selected: {
    borderWidth: cssTheme.borderWidth.numberSelectionRadioSelected,
    borderColor: cssTheme.colors.primary[900],
  },
  unselected: {
    borderWidth: cssTheme.borderWidth.numberSelectionRadio,
    borderColor: cssTheme.colors.gray[100],
  },
  disabled: {
    opacity: 0.5,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: cssTheme.colors.gray[900],
  },
  subText: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});
}

export default NumberRadioButton;
