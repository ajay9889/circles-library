import { useTranslation } from 'react-i18next';
// import { DataPlanHeader } from "../../components/DataPlanHeader/DataPlanHeader";
// import { PlanSelectionBannerAds } from "../components/PlanSelectionBannerAds";
// import { PlanSelectionGrid } from "../components/PlanSelectionGrid";
// import { PlanSelectionGridInTabs } from "../components/PlanSelectionGridInTabs";
import type { ProductCategory, ProductResponse } from '../planSelectionTypes';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DataPlanHeader } from '../../components/DataPlanHeader/DataPlanHeader';
import { PlanSelectionGrid } from '../components/PlanSelectionGrid';
import { PlanSelectionGridInTabs } from '../components/PlanSelectionGridInTabs';
import { FAQs } from '../components/FAQs';
import { PlanSelectionBannerAds } from '../components/PlanSelectionBannerAds';
// import { FAQs } from "../components/FAQs";

type Props = {
  supportedPlanTypes: any;
  onTabChange: (productCategory: ProductCategory) => void;
  onProductClick: (product: ProductResponse) => void;
  planSelectionVariationConfig: any;
  showFAQ: boolean;
  showPlanAdvertisements: boolean;
  productCategory: any;
};

export function PlanSelectionVerticalStackedCard({
  supportedPlanTypes,
  onTabChange,
  onProductClick,
  showFAQ,
  showPlanAdvertisements,
  productCategory,
}: Props) {
  const { t } = useTranslation();

  function renderPlans() {
    // if (supportedPlanTypes?.length === 1) {
    //   return (
    //     <PlanSelectionGrid
    //       productCategory={supportedPlanTypes?.[0]?.toLowerCase()}
    //       onProductClick={onProductClick}
    //     />
    //   );
    // } else
    if (supportedPlanTypes?.length > 0) {
      return (
        <PlanSelectionGridInTabs
          supportedPlanTypes={supportedPlanTypes}
          onTabChange={onTabChange}
          onProductClick={onProductClick}
        />
      );
    } else {
      return null;
    }
  }

  return (
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {!!showPlanAdvertisements && <PlanSelectionBannerAds />}

        <DataPlanHeader
          headingTxt={t('select_the_plan_heading')}
          subHeaderTxt={t('select_the_plan_subheading')}
        />

        {renderPlans()}

        {!!showFAQ && <FAQs productCategory={productCategory} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 16,
    margin: 0,
    backgroundColor: '#ffffff',
  },
});
