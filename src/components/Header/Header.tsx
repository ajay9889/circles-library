import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LanguageSelection } from '../../languageSelection/LanguageSelection';
import type { MarketConfig } from '../../market-configs/market-config.type';
import { useSelector } from 'react-redux';

type Props = {
  marketConfig: MarketConfig;
  marketLogo: any; // Assuming marketLogo is a local image file or a URL
  marketUserIcon: any;
};

export function Header({ marketConfig, marketLogo, marketUserIcon }: Props) {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={marketLogo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.languageContainer}>
          <LanguageSelection marketConfig={marketConfig} />
        </View>
        <View style={styles.userIconContainer}>
          <Image
            source={marketUserIcon}
            style={styles.userIcon}
            onError={(error) => console.log('Image load error:', error)}
          />
        </View>
      </View>
    </View>
  );
}

function getStyles(cssTheme: any) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 10,
    },
    logoContainer: {
      justifyContent: 'center',
    },
    logo: {
      height: cssTheme.logo.height,
      width: cssTheme.logo.width,
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    languageContainer: {
      justifyContent: 'center',
    },
    userIconContainer: {
      justifyContent: 'center',
    },
    userIcon: {
      height: 32,
      width: 32,
    },
    ...cssTheme.appHeader,
  });
}
