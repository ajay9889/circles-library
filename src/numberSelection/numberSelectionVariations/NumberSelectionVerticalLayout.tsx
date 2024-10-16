import { useTranslation } from 'react-i18next';
// import { NumberSelectionBanner } from '../../components/Banner/NumberSelectionBanner';
// import { NumberSelectionBannerV2 } from '../../components/Banner/NumberSelectionBannerV2';
// import { NumberSelectionCard } from '../../components/Card/NumberSelectionCard';
// import { NumberSelectionChoiceCard } from '../../components/Card/NumberSelectionChoiceCard';
// import { getProductImage } from '../../planSelection/planSelectionHelper';
import type { ProductResponse } from '../../planSelection/planSelectionTypes';
import { AvailableNumbers } from '../components/AvailableNumbers';
import { FAQs } from '../components/FAQs';
import { Footer } from '../components/Footer';
import { numberCategoryObjects } from '../numberSelectionHelper';
import type {
  NumberCategory2,
  NumberType,
  NumberTypeObject,
  SimType,
  SimTypeObject,
} from '../numberSelectionTypes';
import { SearchNumber } from '../components/SearchNumber';
import { SelectedNumber } from '../components/SelectedNumber';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import NumberSelectionCard from '../../components/Card/NumberSelectionCard';
import { NumberSelectionBanner } from '../../components/Banner/NumberSelectionBanner';
import { NumberSelectionChoiceCard } from '../../components/Card/NumberSelectionChoiceCard';
import { getProductImage } from '../../planSelection/planSelectionHelper';
import { NumberSelectionBannerV2 } from '../../components/Banner/NumberSelectionBannerV2';
import { useSelector } from 'react-redux';

type Props = {
  data: {
    chosenProduct: ProductResponse | null;
    selectedNumberCategory: NumberCategory2 | null;
    selectedNumberType: NumberType | null;
    selectedSimType: SimType | null;
    selectedNumber: any;
    selectedNumberId: any;
    numbers: any;
    initialDisplayCount: any;
    searchQuery: any;
    disableBack?: boolean;
    disableNext?: boolean;
  };
  handlers: {
    handleNumberCategoryChange: any;
    handleSimTypeChange: any;
    handleNumberTypeChange: any;
    handleNumberClick: any;
    handleSearchQueryChange: any;
    onClickBack: () => void;
    onClickNext: () => void;
  };
  variationConfig: any;
};

export function NumberSelectionVerticalLayout({
  data: {
    chosenProduct,
    selectedNumberCategory,
    selectedNumberType,
    selectedSimType,
    selectedNumber,
    selectedNumberId,
    numbers,
    initialDisplayCount,
    searchQuery,
    disableBack,
    disableNext,
  },
  handlers: {
    handleSimTypeChange,
    handleNumberTypeChange,
    handleNumberCategoryChange,
    handleNumberClick,
    handleSearchQueryChange,
    onClickBack,
    onClickNext,
  },
  variationConfig: numberSelectionVariationConfig,
}: Props) {
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  const { t } = useTranslation();
  const {
    showFAQ,
    showTransferNumberAsLink,
    showNumberSearchBox,
    showDifferentNumberSelectionHeading,
    showNumberCategorySelection,
    supportedNumberCategories,
    showNumberTypeSelection,
    supportedNumberTypes,
    showSimTypeSelection,
    supportedSimTypes,
    showEsimSupportedBanner,
  } = numberSelectionVariationConfig;

  const simTypeObjects: Record<SimType, SimTypeObject> = {
    PHYSICAL: {
      id: '1',
      label: t('label_PHYSICAL_SIM'),
      value: 'PHYSICAL',
      icon: 'physicalSim',
    },
    ESIM: {
      id: '2',
      label: t('sim_type_e_sim'),
      value: 'ESIM',
      icon: 'eSim',
    },
  };

  const numberTypeObjects: Record<NumberType, NumberTypeObject> = {
    NEW_NUMBER: {
      id: '1',
      label: t('sim_type_new'),
      value: 'NEW_NUMBER',
      icon: 'phone',
    },
    TRANSFER_NUMBER: {
      id: '2',
      label: t('label_number_transfer'),
      value: 'TRANSFER_NUMBER',
      icon: 'phoneWithArrow',
    },
  };

  const { separateNumberAfterChars } = numberSelectionVariationConfig;
  const showNumberPrice =
    selectedNumberCategory !== numberCategoryObjects?.FREE_NUMBER?.value;

  return (
    <ScrollView>
      <View style={styles.numberSelectionWrapper}>
        {numberSelectionVariationConfig?.showChosenProductHeader &&
          chosenProduct && (
            <NumberSelectionBannerV2
              monthlyBill={t('currency') + chosenProduct?.price}
              oneTimeCharge="0"
            />
          )}
        {showEsimSupportedBanner && (
          <View style={styles.esimSupportContainer}>
            <NumberSelectionBanner
              title={<>🎉 Your device supports eSIM! 🎉</>}
              subTitle=" Get connected within minutes"
            />
          </View>
        )}
        {numberSelectionVariationConfig.showSelectedPlanDetails &&
          chosenProduct && (
            <View style={styles.selectedPlanDetails}>
              <NumberSelectionChoiceCard
                title="Awesome choice!"
                planImage={getProductImage(chosenProduct)}
                features={chosenProduct?.features}
              />
            </View>
          )}
        {showSimTypeSelection && (
          <View style={styles.esimTypeContainer}>
            <NumberSelectionCard
              items={supportedSimTypes.map(
                (simType) => simTypeObjects[simType]
              )}
              title={t('select_sim_type')}
              onChange={handleSimTypeChange}
              selectedValue={selectedSimType}
              radioName="simType"
              description={t('physical_quick_introduction_message')}
            />
          </View>
        )}
        {showNumberTypeSelection && (
          <View style={styles.numberTypeContainer}>
            <NumberSelectionCard
              items={supportedNumberTypes.map(
                (numberType) => numberTypeObjects[numberType]
              )}
              title={t('select_your_number')}
              onChange={handleNumberTypeChange}
              selectedValue={selectedNumberType}
              radioName="numberType"
            />
          </View>
        )}
        {showNumberCategorySelection && (
          <View style={styles.numberCategoryContainer}>
            <NumberSelectionCard
              items={supportedNumberCategories.map(
                (numberCategory) => numberCategoryObjects[numberCategory]
              )}
              title="Choose your new number"
              onChange={handleNumberCategoryChange}
              selectedValue={selectedNumberCategory}
              radioName="numberCategory"
            />
          </View>
        )}
        <SelectedNumber
          subHeading={t('results__your_new_number_is')}
          selectedNumber={selectedNumber}
        />
        {showDifferentNumberSelectionHeading && (
          <View style={styles.differentNumberContainer}>
            <Text style={styles.differentNumberText}>
              Want a different number? Select one.
            </Text>
          </View>
        )}
        {showNumberSearchBox && (
          <SearchNumber
            value={searchQuery}
            onChange={handleSearchQueryChange}
            labelText="Search something"
            placeholder="Enter 4-7 digits"
          />
        )}
        <AvailableNumbers
          numbers={numbers}
          selectedNumberId={selectedNumberId}
          handleNumberClick={handleNumberClick}
          initialDisplayCount={initialDisplayCount}
          separateNumberAfterChars={separateNumberAfterChars}
          showNumberPrice={showNumberPrice}
        />
        <View style={styles.numberTransferContainer}>
          {showTransferNumberAsLink && (
            <Text style={styles.text}>I want to transfer my number</Text>
          )}
        </View>
        {showFAQ && <FAQs />}
        <Footer
          onClickBack={onClickBack}
          disableBack={disableBack}
          onClickNext={onClickNext}
          disableNext={disableNext}
          chosenProduct={chosenProduct}
          showProductDetails={
            numberSelectionVariationConfig.showSelectedPlanDetailsAtFooter
          }
        />
      </View>
    </ScrollView>
  );
}

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  numberSelectionWrapper: {
    backgroundColor: '#ffffff',
  },
  esimSupportContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  selectedPlanDetails: {
    marginTop: 26,
    paddingHorizontal: 16,
  },
  esimTypeContainer: {
    marginTop: 24,
  },
  numberTypeContainer: {
    marginTop: 60,
  },
  numberCategoryContainer: {
    marginVertical: 60,
  },
  differentNumberContainer: {
    marginTop: 14,
    paddingHorizontal: 16,
  },
  differentNumberText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000000',
  },
  numberTransferContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: cssTheme.colors.primary[900],
    textAlign: 'center',
  },
});
}
