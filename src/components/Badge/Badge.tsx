import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getBorderRadiusStyle = (rounded: 'full' | 'half' | 'none') => {
  switch (rounded) {
    case 'full':
      return { borderRadius: 56 };
    case 'half':
      return { borderTopRightRadius: 56, borderBottomRightRadius: 56 };
    case 'none':
      return { borderRadius: 0 };
    default:
      return { borderRadius: 0 };
  }
};

interface BadgeProps {
  children: string | React.ReactNode;
  rounded?: 'full' | 'half' | 'none';
  bgColor?: string;
  textColor?: string;
  style?: object;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  rounded = 'full',
  bgColor = '#EEF1F4',
  textColor = '#333333',
  style,
}) => {
  const borderRadiusStyle = getBorderRadiusStyle(rounded);

  return (
    <View style={styles.badgeWrapper}>
      <View
        style={[
          styles.container,
          borderRadiusStyle,
          { backgroundColor: bgColor },
          style,
        ]}
      >
        <Text style={[styles.text, { color: textColor }]}>{children}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
});

export default Badge;
