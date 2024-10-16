import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../components/Button/Button'; // Adjust import if necessary
import { useTranslation } from 'react-i18next';
import type { ProductResponse } from '../../planSelection/planSelectionTypes';
import { useSelector } from 'react-redux';

type Props = {
  onClickBack: () => void;
  disableBack?: boolean;
  onClickNext: () => void;
  disableNext?: boolean;
  chosenProduct?: ProductResponse | null;
  showProductDetails?: boolean;
};

export function Footer({
  onClickBack,
  disableBack,
  onClickNext,
  disableNext,
  chosenProduct = null,
  showProductDetails = false,
}: Props) {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Button
        isIconOnly={true}
        iconType="leftArrow"
        onPress={onClickBack}
        disabled={disableBack}
      />
      {showProductDetails && (
        <Text style={styles.productDetails}>
          {t('currency')} {chosenProduct?.price}
        </Text>
      )}
      <Button
        variant="text"
        size="small"
        onPress={onClickNext}
        disabled={disableNext}
      >
        <View style={styles.nextButton}>
          <Text style={styles.nextButtonText}>{t('next')}</Text>
        </View>
      </Button>
    </View>
  );
}

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 32,
    marginTop: 56,
    shadowColor: cssTheme.boxShadow.numberSelectionFooter.shadowColor,
    shadowOffset: cssTheme.boxShadow.numberSelectionFooter.shadowOffset,
    shadowOpacity: cssTheme.boxShadow.numberSelectionFooter.shadowOpacity,
    elevation: cssTheme.boxShadow.numberSelectionFooter.elevation,
  },
  productDetails: {
    marginLeft: 12,
    fontSize: 16,
    color: cssTheme.colors.gray[900],
  },
  nextButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 52,
    backgroundColor: cssTheme.colors.primary[900],
  },
  nextButtonText: {
    fontSize: cssTheme.fontSize.numberSearchFooterNext,
    fontWeight:
      (cssTheme.fontWeight.numberSearchFooterNext as '500') || '400' || '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
}
