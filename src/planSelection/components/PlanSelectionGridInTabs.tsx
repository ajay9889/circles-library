import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from '../../components/Button/Button'; // Assuming this is a React Native button component
import { TabButton } from '../../components/TabButton/TabButton'; // Use the converted Tabs component
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPostpaidProducts,
  fetchPrepaidProducts,
  selectLoading,
  selectPostpaidProducts,
  selectPrepaidProducts,
} from '../planSelectionSlice';
import type { ProductCategory, ProductResponse } from '../planSelectionTypes';
import { getData, getValidity } from '../planSelectionHelper';
import { DataPlanCard } from '../../components/Card/DataPlanCard';

type Props = {
  supportedPlanTypes: any[];
  onTabChange: (productCategory: ProductCategory) => void;
  onProductClick: (product: ProductResponse) => void;
};

export function PlanSelectionGridInTabs({
  supportedPlanTypes,
  onTabChange,
  onProductClick,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const prepaidProducts = useSelector(selectPrepaidProducts);
  const postpaidProducts = useSelector(selectPostpaidProducts);
  const loading = useSelector(selectLoading);
  const [prepaidPagination, setPrepaidPagination] = useState(4);
  const [postpaidPagination, setPostpaidPagination] = useState(4);
  const [activeTab, setActiveTab] = useState<ProductCategory>(
    supportedPlanTypes[0]
  );
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    onTabChange(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchPrepaidProducts() as any);
    dispatch(fetchPostpaidProducts() as any);
  }, [dispatch]);

  const tabs = supportedPlanTypes;

  const handleTabPress = (tab: ProductCategory, index: number) => {
    setActiveTabIndex(index);
    setActiveTab(tab);
    onTabChange(tab);
  };

  function loadMore() {
    if (activeTab.toLowerCase() === 'prepaid') {
      setPrepaidPagination((prev) => prev + 4);
    } else {
      setPostpaidPagination((prev) => prev + 4);
    }
  }

  const renderItem = ({ item }: { item: any }) => (
    <DataPlanCard
      plan={getData(item)}
      planeName={item.description}
      features={item.features}
      price={item.price}
      offerPrice={item.discountedPrice}
      validity={getValidity(item)}
      voucher={item.benefits.map((b) => b.name)}
      onClick={() => onProductClick(item)}
    />
  );

  return (
    <>
      {tabs.length > 1 && (
        <TabButton
          tabs={tabs}
          activeTabIndex={activeTabIndex}
          onTabPress={handleTabPress}
        />
      )}
      {loading &&
        (prepaidProducts.length === 0 || postpaidProducts.length === 0) && (
          <Text>{t('progress_loading')}...</Text>
        )}

      <FlatList
        numColumns={2}
        data={
          activeTab.toLowerCase() === 'prepaid'
            ? prepaidProducts.slice(0, prepaidPagination)
            : postpaidProducts.slice(0, postpaidPagination)
        }
        style={styles.scrollContainer}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.loadMoreContainer}>
        {activeTab.toLowerCase() === 'prepaid' &&
          prepaidProducts.length > prepaidPagination && (
            <Button onPress={loadMore}>{t('load_more')}</Button>
          )}
        {activeTab.toLowerCase() !== 'prepaid' &&
          postpaidProducts.length > postpaidPagination && (
            <Button onPress={loadMore}>{t('load_more')}</Button>
          )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 24,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loadMoreContainer: {
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
});
