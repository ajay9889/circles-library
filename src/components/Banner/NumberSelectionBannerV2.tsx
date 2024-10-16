import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '../../assets/Icon';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface NumberSelectionBannerV2Props {
  onClick?: () => void;
  monthlyBill: string;
  oneTimeCharge: string;
}

export const NumberSelectionBannerV2: React.FC<
  NumberSelectionBannerV2Props
> = ({ onClick, monthlyBill, oneTimeCharge }) => {
  const { t } = useTranslation();
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.billContainer}>
        <Text style={styles.label}>{t('key_monthly_bill')}</Text>
        <Text style={styles.amount}>{monthlyBill}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.chargeContainer}>
        <Text style={styles.label}>{t('key_one_time_charges')}</Text>
        <Text style={styles.amount}>{oneTimeCharge}</Text>
      </View>
      <TouchableOpacity onPress={onClick} style={styles.button}>
        <Icon kind="leftArrow" width={24} height={24} currentColor={'white'} />
      </TouchableOpacity>
    </View>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {
    backgroundColor: cssTheme.colors.primary[900],
    color: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
  },
  billContainer: {
    flex: 1,
  },
  chargeContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    color: '#ffffff',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
    color: '#ffffff',
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: '#d1d5db',
  },
  button: {
    transform: [{ rotateY: '180deg' }],
  },
});
}
