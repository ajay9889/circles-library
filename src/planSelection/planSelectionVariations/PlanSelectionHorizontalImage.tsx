import { useDispatch, useSelector } from 'react-redux';
import type { ProductCategory, ProductResponse } from '../planSelectionTypes';
import {
  fetchPostpaidProducts,
  fetchPrepaidProducts,
  selectPostpaidProducts,
  selectPrepaidProducts,
} from '../planSelectionSlice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlanSelectionBannerAds } from '../components/PlanSelectionBannerAds';
import { DataPlanHeader } from '../../components/DataPlanHeader/DataPlanHeader';
import { FAQs } from '../components/FAQs';
import PlanCardCarousel from '../../components/PlanCardCarousel/PlanCardCarousel';

type Props = {
  supportedPlanTypes: any;
  onProductClick: (product: ProductResponse) => void;
  showFAQ: boolean;
  showPlanAdvertisements: boolean;
};

export function PlanSelectionHorizontalImage({
  supportedPlanTypes,
  onProductClick,
  showFAQ,
  showPlanAdvertisements,
}: Props) {
  const { t } = useTranslation();
  const productCategory: ProductCategory =
    supportedPlanTypes?.[0]?.toLowerCase();

  const dispatch = useDispatch();
  const prepaidProducts = useSelector(selectPrepaidProducts);
  const postpaidProducts = useSelector(selectPostpaidProducts);

  useEffect(() => {
    if (productCategory === 'prepaid') {
      dispatch(fetchPrepaidProducts() as any);
    } else {
      dispatch(fetchPostpaidProducts() as any);
    }
  }, [dispatch, productCategory]);

  const data = Array.from({ length: 10 }, (_, index) => ({
    id: index.toString(),
    title: `Item ${index + 1}`,
    image: require('../../assets/images/planImage.png'),
  }));

  const planCards = (
    <PlanCardCarousel
      data={productCategory === 'prepaid' ? prepaidProducts : postpaidProducts}
      onPress={onProductClick}
    />
  );

  return (
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {!!showPlanAdvertisements && <PlanSelectionBannerAds />}

        <DataPlanHeader
          headingTxt={t('select_the_plan_heading')}
          subHeaderTxt={t('select_the_plan_subheading')}
        />

        {planCards}

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
