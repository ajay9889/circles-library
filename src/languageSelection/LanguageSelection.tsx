import i18next from 'i18next';
import { useEffect, useState } from 'react';
import type { LanguageCode } from '../apiUrls';
import { LanguageSelectionDropDown } from './languageSelectionVariations/LanguageSelectionDropDown';
import type { MarketConfig } from '../market-configs/market-config.type';
import { LanguageSelectionRadioBtn } from './languageSelectionVariations/LanguageSelectionRadioBtn';
import { LanguageSelectionSlider } from './languageSelectionVariations/LanguageSelectionSlider';

type Props = {
  marketConfig: MarketConfig;
};

const LanguageSelectionVariations = {
  LanguageSelectionDropDown,
  LanguageSelectionRadioBtn,
  LanguageSelectionSlider,
};

export function LanguageSelection({ marketConfig }: Props) {
  // const languageSelectionConfiguration =
  //   marketConfig?.components?.languageSelection ?? {};

  const variation = marketConfig?.components?.languageSelection.variation;

  const LanguageSelectionVariation = LanguageSelectionVariations[variation];

  const supportedLanguages =
    (marketConfig?.components?.languageSelection.variationConfig
      ?.supportedLanguages as LanguageCode[]) ?? [];

  const defaultLanguage: LanguageCode =
    marketConfig?.components?.languageSelection.variationConfig
      ?.defaultLanguage;

  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageCode>(defaultLanguage);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language as LanguageCode); // Cast string to LanguageCode
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguage(language as LanguageCode); // Cast string to LanguageCode
  };

  useEffect(() => {
    i18next.changeLanguage(selectedLanguage).catch((error) => {
      console.error(error);
    });
  }, [selectedLanguage]);

  useEffect(() => {
    if (defaultLanguage) {
      setSelectedLanguage(defaultLanguage);
    }
  }, [defaultLanguage]);

  if (LanguageSelectionVariation) {
    return (
      <LanguageSelectionVariation
        languages={supportedLanguages}
        selectedLanguage={selectedLanguage}
        handleLanguageChange={
          variation === 'LanguageSelectionSlider'
            ? toggleLanguage
            : handleLanguageChange
        }
      />
    );
  } else {
    return null;
  }
}
