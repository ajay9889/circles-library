import Config from 'react-native-config';
import type { ProductCategory } from './planSelection/planSelectionTypes';

function makeFullUrl(urlPath: string) {
  return `${Config.API_PROTOCOL}://${Config.API_URL}/${urlPath}`;
}

export type LanguageCode = 'en_us' | 'en-SG' | 'es-SG';

export function urlFetchTranslations(languageCode: LanguageCode) {
  return makeFullUrl(
    `/v1/cl/en_us/webfront/localisation/language/keys?langCode=${languageCode}&component=WEB`
  );
}

export type NumberConfigOptions = {
  preselectNumber: boolean;
  numberTypes: {
    count: number;
    numberCategory: string;
  }[];
};

export function urlFetchNumbers() {
  return makeFullUrl(`/v4/numbers`);
}

export function urlFetchAuthToken() {
  return makeFullUrl(`/v5/ufone/en_us/web/guest-signup`);
}

export function urlLockNumber(selectedNumber: Number) {
  return makeFullUrl(`/v2/cl/en_us-CL/webfront/numbers/${selectedNumber}/lock`);
}

export function urlFetchProducts(productCategory: ProductCategory) {
  return makeFullUrl(
    `/v3/cl/internal/product-variants/eligible?channel=web&customerJourney=onboarding&customerType=new&evaluationType=PRODUCT&includeBenefits=true&productCategory=${productCategory}&productCode=customised_plan`
  );
}

export function urlFetchBannerAds(limit = 10, offset = 0) {
  return makeFullUrl(
    `/v2/ufone/en/cmsui/internal/banners?limit=${limit}&offset=${offset}`
  );
}
