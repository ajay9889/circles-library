import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Icon } from '../../assets/Icon'; // Adjust import if necessary
import { useSelector } from 'react-redux';

interface ButtonProps {
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  children?: string | React.ReactNode;
  type?: 'button' | 'submit';
  iconType?: 'leftArrow' | 'rightArrow';
  isIconOnly?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = 'secondary',
  size = 'large',
  children,
  iconType = 'rightArrow',
  isIconOnly = false,
  disabled = false,
}) => {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  const buttonStyles = [
    styles.button,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'text' && styles.textVariant,
    size === 'small' && styles.small,
    size === 'medium' && styles.medium,
    size === 'large' && styles.large,
    isIconOnly && styles.iconOnly,
    disabled && styles.disabled,
    iconType === 'leftArrow' && styles.leftIcon,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={!disabled ? onPress : undefined}
      disabled={disabled}
    >
      {isIconOnly ? (
        <Icon
          kind={iconType}
          width={24}
          height={24}
          currentColor={styles.currentColor.color}
        />
      ) : (
        <Text
          style={[variant === 'secondary' ? styles.secondaryText : styles.text]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  button: {
    borderRadius: 9999,
    borderWidth: cssTheme.borderWidth.buttonBorder,
    borderColor:  cssTheme.colors.primary[900],
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor:  cssTheme.colors.primary[900],
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor:  cssTheme.colors.primary[900],
  },
  textVariant: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  small: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  medium: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    fontSize: 14,
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  iconOnly: {
    padding: 8,
  },
  leftIcon: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  secondaryText: {
    color:  cssTheme.colors.primary[900],
    fontWeight: '600',
  },
  currentColor:{
    color: cssTheme.colors.primary[900]
  }
});
}
