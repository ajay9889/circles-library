import { Text } from 'react-native';
import type { MarketConfig } from '../market-configs/market-config.type';
import { useEffect, useState } from 'react';
import type { ProductCategory, ProductResponse } from './planSelectionTypes';
import { PlanSelectionVerticalStackedCard } from './planSelectionVariations/PlanSelectionVerticalStackedCard';
import { PlanSelectionHorizontalImage } from './planSelectionVariations/PlanSelectionHorizontalImage';
import { PlanSelectionVerticalImage } from './planSelectionVariations/PlanSelectionVerticalImage';
import { chooseProduct } from './planSelectionSlice';
import { useDispatch } from 'react-redux';

const PlanSelectionVariations = {
  PlanSelectionVerticalStackedCard,
  PlanSelectionHorizontalImage,
  PlanSelectionVerticalImage,
};

type Props = {
  marketConfig: MarketConfig;
  nextRoute: string;
  previousRoute: string;
  navigation: any;
};

export function PlanSelection({
  marketConfig,
  navigation,
  nextRoute,
  previousRoute,
}: Props) {
  const dispatch = useDispatch();
  const [tabProductCategory, setTabProductCategory] = useState('');
  const [
    planSelectionComponentMarketConfig,
    setPlanSelectionComponentMarketConfig,
  ] = useState<any>(null);

  useEffect(() => {
    if (marketConfig?.components?.planSelection) {
      const planSelectionConfig = marketConfig?.components?.planSelection;
      setPlanSelectionComponentMarketConfig(planSelectionConfig);
      const supportedPlanTypes =
        planSelectionConfig?.variationConfig?.supportedPlanTypes;

      if (supportedPlanTypes) {
        setTabProductCategory(supportedPlanTypes?.[0].toLowerCase());
      }
    }
  }, [marketConfig?.components?.planSelection]);

  function handleTabChange(productCategory: ProductCategory) {
    setTabProductCategory(productCategory);
  }

  function handleProductClick(product: ProductResponse) {
    dispatch(chooseProduct(product));
    navigation.navigate(nextRoute);
  }

  if (!planSelectionComponentMarketConfig) return null;

  const variation = planSelectionComponentMarketConfig?.variation;

  const PlanSelectionVariation = PlanSelectionVariations[variation];

  const { showFAQ, showPlanAdvertisements, supportedPlanTypes } =
    planSelectionComponentMarketConfig?.variationConfig;

  if (PlanSelectionVariation) {
    return (
      <PlanSelectionVariation
        supportedPlanTypes={supportedPlanTypes}
        onTabChange={handleTabChange}
        onProductClick={handleProductClick}
        showFAQ={showFAQ}
        showPlanAdvertisements={showPlanAdvertisements}
        productCategory={tabProductCategory}
      />
    );
  } else {
    return <Text>Configured Plan Selection Variation not found!!!</Text>;
  }
}
