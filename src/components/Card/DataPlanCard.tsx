import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from '../Button/Button';
import { useTranslation } from 'react-i18next';

interface DataPlanCardProps {
  plan: string;
  planeName: string;
  features: string[];
  price: string | number;
  validity: string;
  offerPrice?: string | number;
  voucher?: string[];
  onClick?: () => void;
}

export const DataPlanCard: React.FC<DataPlanCardProps> = ({
  plan,
  planeName,
  features,
  price,
  offerPrice,
  validity,
  voucher,
  onClick,
}) => {
  const { t } = useTranslation();
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.planText}>{plan}</Text>
        <Text style={styles.planeNameText}>{planeName}</Text>
      </View>
      <View style={styles.cardContentContainer}>
        <View style={styles.cardContent}>
          <View style={styles.featureContainer}>
            {features?.map((feature, index) => (
              <View key={index} style={styles.feature}>
                <Image
                  source={require('./../../assets/images/star.png')}
                  style={styles.star}
                />
                <Text style={styles.featureText}> {feature}</Text>
              </View>
            ))}
          </View>
          {voucher.length > 0 && (
            <View style={styles.voucherContainer}>
              <Image
                source={require('./../../assets/images/redeem.png')}
                style={styles.redeem}
              />
              <Text style={styles.voucherText}>
                {voucher[0]}{' '}
                {voucher.length > 1 ? `+${voucher.length - 1}` : ''}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.cardBottomContainer}>
          <View style={styles.priceContainer}>
            {offerPrice !== 0 && (
              <Text style={styles.offerPriceText}>{offerPrice.toString()}</Text>
            )}
            <Text style={styles.priceText}>
              {t('currency') + price}
              <Text style={styles.validityText}>{'/' + validity}</Text>
            </Text>
          </View>
          <View style={styles.callToAction}>
            <Button
              onPress={onClick}
              variant="secondary"
              size="medium"
              isIconOnly={true}
              iconType="rightArrow"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
    cardContainer: {
      flex: 1,
      maxWidth: '50%',
      margin: 8,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      borderRadius: 8,
      flexDirection: 'column',
    },
    cardHeader: {
      backgroundColor: cssTheme.colors.primary[400],
      paddingTop: 24,
      paddingBottom: 16,
      paddingHorizontal: 16,
    },
    cardContentContainer: {
      paddingLeft: 12,
      paddingRight: 16,
      paddingVertical: 16,
      flexDirection: 'column',
      flex: 1,
      width: '100%',
    },
    planText: {
      fontSize: 28,
      lineHeight: 32,
      fontWeight: '800',
      color: cssTheme.colors.primary[900],
    },
    planeNameText: {
      fontSize: 14,
      fontWeight: '700',
      color: cssTheme.colors.primary[600],
      marginTop: 8,
    },
    cardContent: {
      flex: 1,
      flexDirection: 'column',
    },
    featureContainer: {
      flexDirection: 'column',
      gap: 12,
    },
    feature: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    star: {
      width: 12,
      height: 12,
    },
    redeem: {
      width: 12,
      height: 12,
      resizeMode: 'contain',
    },
    cardBottomContainer: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    featureText: {
      fontSize: 12,
      color: '#444',
      paddingLeft: 5,
    },
    voucherContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      gap: 8,
    },
    voucherText: {
      fontSize: 12,
      color: cssTheme.colors.fuchsia[900],
      fontWeight: 'bold',
    },
    priceContainer: {},
    offerPriceText: {
      fontSize: 12,
      lineHeight: 16,
      color: cssTheme.colors.gray[700],
      textDecorationLine: 'line-through',
    },
    priceText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: cssTheme.colors.gray[900],
      marginTop: 2,
    },
    validityText: {
      fontSize: 12,
      fontWeight: 'normal',
      color: cssTheme.colors.gray[700],
    },
    callToAction: {
      alignItems: 'flex-end',
    },
  });
}
