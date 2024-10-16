type NumberCategory = 'FREE_NUMBER' | 'PREMIUM_NUMBER';
type NumberType = 'NEW_NUMBER' | 'TRANSFER_NUMBER';
type SimType = 'PHYSICAL' | 'ESIM';

type LanguageSelectionConfig = {
  variation:
  | 'LanguageSelectionDropDown'
  | 'LanguageSelectionSlider'
  | 'LanguageSelectionRadioBtn'; // TODO: do we need 2 variations?

  variationConfig: {
    defaultLanguage: 'en-SG' | 'es-SG';
    supportedLanguages: ('en-SG' | 'es-SG')[];
  };
};

type PlanSelectionConfig = {
  variation:
  | 'PlanSelectionVerticalStackedCard'
  | 'PlanSelectionVerticalImage'
  | 'PlanSelectionHorizontalImage';
  variationConfig: {
    supportedPlanTypes: ('POSTPAID' | 'PREPAID')[];
    showPlanAdvertisements?: boolean;
    showFAQ?: boolean;
  };
};

export type NumberSelectionVerticalLayoutVariationConfig = {
  showChosenProductHeader: boolean;
  showSelectedPlanDetails: boolean;
  showSelectedPlanDetailsAtFooter: boolean;
  showStepper: boolean;
  showEsimSupportedBanner: boolean;
  showSimTypeSelection: boolean;
  supportedSimTypes: SimType[];
  showNumberTypeSelection: boolean;
  supportedNumberTypes: NumberType[];
  showNumberCategorySelection: boolean;
  supportedNumberCategories: NumberCategory[];
  showDifferentNumberSelectionHeading: boolean;
  showNumberSearchBox: boolean;
  separateNumberAfterChars: number[];
  numberDisplayCount: number;
  showTransferNumberAsLink: boolean;
  showFAQ: boolean;
};

export type NumberSelectionConfig = {
  variation: 'NumberSelectionVerticalLayout';
  variationConfig: NumberSelectionVerticalLayoutVariationConfig;
};

export type MarketConfig = {
  displayName: string;
  routesOrder: string[];
  components: {
    languageSelection: LanguageSelectionConfig;
    planSelection: PlanSelectionConfig;
    numberSelection: NumberSelectionConfig;
  };
};
