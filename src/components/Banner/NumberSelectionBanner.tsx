import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

interface NumberSelectionBannerProps {
  title: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
}

export const NumberSelectionBanner: FC<NumberSelectionBannerProps> = ({
  title,
  subTitle,
}) => {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  return (
    <LinearGradient
      colors={[
        theme.colors.numberSelectionBanner.start,
        theme.colors.numberSelectionBanner.end,
      ]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
      </View>
    </LinearGradient>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  linearGradient: {
    flex: 1,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#ffffff',
    textAlign: 'center',
  },
});
}
