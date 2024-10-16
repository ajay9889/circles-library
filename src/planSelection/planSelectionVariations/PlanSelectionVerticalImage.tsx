import { useDispatch, useSelector } from 'react-redux';
import type { ProductCategory, ProductResponse } from '../planSelectionTypes';
import {
  fetchPostpaidProducts,
  fetchPrepaidProducts,
  selectLoading,
  selectPostpaidProducts,
  selectPrepaidProducts,
} from '../planSelectionSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlanSelectionBannerAds } from '../components/PlanSelectionBannerAds';
import { FAQs } from '../components/FAQs';
import { DataPlanHeader } from '../../components/DataPlanHeader/DataPlanHeader';
import { Button } from '../../components/Button/Button';
import {
  StackCards,
  type StackCardItem,
} from '../../components/Card/StackCard';
import { getProductImage } from '../planSelectionHelper';

type Props = {
  supportedPlanTypes: any;
  onProductClick: (product: ProductResponse) => void;
  showPlanAdvertisements: boolean;
  showFAQ: boolean;
};

export function PlanSelectionVerticalImage({
  supportedPlanTypes,
  onProductClick,
  showPlanAdvertisements,
  showFAQ,
}: Props) {
  const productCategory: ProductCategory =
    supportedPlanTypes?.[0]?.toLowerCase();

  const dispatch = useDispatch();
  const prepaidProducts = useSelector(selectPrepaidProducts);
  const postpaidProducts = useSelector(selectPostpaidProducts);
  const { t } = useTranslation();
  const [prepaidPagination, setPrepaidPagination] = useState(4);
  const [postpaidPagination, setPostpaidPagination] = useState(4);
  const loading = useSelector(selectLoading);
  const plans =
    productCategory === 'prepaid' ? prepaidProducts : postpaidProducts;
  const itemsPerLoad = 4;
  const [data, setData] = useState(plans.slice(0, itemsPerLoad));
  // const [loadMore, setLoadMore] = useState(plans.length > itemsPerLoad);

  useEffect(() => {
    if (productCategory === 'prepaid') {
      dispatch(fetchPrepaidProducts() as any);
    } else {
      dispatch(fetchPostpaidProducts() as any);
    }
  }, [dispatch, productCategory]);

  function loadMore() {
    if (productCategory === 'prepaid') {
      setPrepaidPagination((prev) => prev + 4);
    } else {
      setPostpaidPagination((prev) => prev + 4);
    }
  }

  function handlePlanClick(item: StackCardItem) {
    const product = (
      productCategory === 'prepaid'
        ? prepaidProducts.slice(0, prepaidPagination)
        : postpaidProducts.slice(0, postpaidPagination)
    ).find((p) => p.sku === item.id);
    if (product) {
      onProductClick(product);
    } else {
      console.warn('Unable to find chosen product');
    }
  }

  const plansList = (
    <View style={styles.planContainer}>
      {loading &&
        (productCategory === 'prepaid' ? prepaidProducts : postpaidProducts)
          .length === 0 && <Text>{t('progress_loading')}...</Text>}
      <StackCards
        // items={data.map((product) => ({
        //   // id: product.sku,
        //   id: product.plan,
        //   // title: product.title,
        //   title: product.planeName,
        //   image: require('../../assets/images/planImage.png'),
        // }))}
        items={(productCategory === 'prepaid'
          ? prepaidProducts.slice(0, prepaidPagination)
          : postpaidProducts.slice(0, postpaidPagination)
        ).map((product) => ({
          id: product.sku,
          title: product.title,
          image: getProductImage(product),
        }))}
        onClick={handlePlanClick}
      />
      <Text style={styles.roamingText}>
        Roaming coverage differs across plan. Click on plan to find out more{' '}
      </Text>
      {/* {loadMore && (
        <Button
          title="Load More"
          onPress={loadMoreItems}
          style={styles.loadMoreButton}
        />
      )} */}

      {((productCategory === 'postpaid' &&
        postpaidProducts.length > postpaidPagination) ||
        (productCategory === 'prepaid' &&
          prepaidProducts.length > prepaidPagination)) && (
        <Button onPress={loadMore}>{t('load_more')}</Button>
      )}
    </View>
  );

  return (
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {!!showPlanAdvertisements && <PlanSelectionBannerAds />}

        <DataPlanHeader
          headingTxt={t('select_the_plan_heading')}
          subHeaderTxt={t('select_the_plan_subheading')}
        />

        {plansList}

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
  planContainer: {
    marginTop: 32,
  },
  roamingText: {
    textAlign: 'center',
    margin: 10,
  },
  loadMoreButton: {
    alignSelf: 'center',
  },
});
