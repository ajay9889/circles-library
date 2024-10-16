import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import type { HttpBackendOptions } from 'i18next-http-backend';
import type { LanguageCode } from './apiUrls';
import { urlFetchTranslations } from './apiUrls';
import type { MarketConfig } from './market-configs/market-config.type';

type TranslationKey = {
  key: string;
  value: string;
};

type TranslationResponse = {
  result: {
    keys: TranslationKey[];
  };
};

function getMarketDefaultAndSupportedLanguages(marketConfig: MarketConfig) {
  const languageSelectionConfiguration =
    marketConfig.components.languageSelection;
  const supportedLanguages = languageSelectionConfiguration.variationConfig.supportedLanguages;
  const defaultLanguage: any = languageSelectionConfiguration.variationConfig.defaultLanguage;
  return { defaultLanguage, supportedLanguages };
}

export function initI18next(marketConfig: MarketConfig) {
  const { defaultLanguage, supportedLanguages } =
    getMarketDefaultAndSupportedLanguages(marketConfig);

  i18next
    .use(Backend)
    .use(initReactI18next)
    .init<HttpBackendOptions>(
      {
        debug: false,
        backend: {
          loadPath: '{{lng}}|{{ns}}',
          request: function (_options, url, _payload, callback) {
            const languageCode = url.split('|')[0] as LanguageCode;
            fetch(urlFetchTranslations(languageCode))
              .then((response) => response.json())
              .then((response: TranslationResponse) => {
                const data: Record<string, string> = {};
                response.result.keys.forEach((item) => {
                  data[item.key] = item.value;
                });
                callback(null, { status: 200, data: JSON.stringify(data) });
              })
              .catch((error) => {
                callback(error, null);
              });
          },
        },
        defaultNS: 'translation',
        supportedLngs: supportedLanguages,
        lng: defaultLanguage,
        fallbackLng: defaultLanguage,
        interpolation: {
          escapeValue: false,
        },
      },
      (error, t) => {
        if (error) {
          console.error(error, t);
        }
      }
    );
}
