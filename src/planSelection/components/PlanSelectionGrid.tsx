import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPostpaidProducts,
  fetchPrepaidProducts,
  selectLoading,
  selectPostpaidProducts,
  selectPrepaidProducts,
} from '../planSelectionSlice';
import type { ProductCategory, ProductResponse } from '../planSelectionTypes';
import { View } from 'react-native';
import { getData, getValidity } from '../planSelectionHelper';
import { DataPlanCard } from '../../components/Card/DataPlanCard';

type Props = {
  productCategory: ProductCategory;
  onProductClick: (product: ProductResponse) => void;
};

export function PlanSelectionGrid({ productCategory, onProductClick }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const prepaidProducts = useSelector(selectPrepaidProducts);
  const postpaidProducts = useSelector(selectPostpaidProducts);
  const [prepaidPagination, setPrepaidPagination] = useState(4);
  const [postpaidPagination, setPostpaidPagination] = useState(4);
  const loading = useSelector(selectLoading);

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

  return (
    <View>
      <View>
        {loading &&
          (productCategory === 'prepaid' ? prepaidProducts : postpaidProducts)
            .length === 0 && <div>{t('progress_loading')}...</div>}
        {(productCategory === 'prepaid'
          ? prepaidProducts
          : postpaidProducts
        ).map((product) => (
          <View key={product.sku}>
            <DataPlanCard
              voucher={product.benefits.map((b) => b.name)}
              plan={getData(product)}
              planeName={product.description}
              features={product.features}
              price={product.price}
              validity={getValidity(product)}
              offerPrice={product.discountedPrice}
              onClick={() => onProductClick(product)}
            />
          </View>
        ))}
      </View>
      {((productCategory === 'postpaid' &&
        postpaidProducts.length > postpaidPagination) ||
        (productCategory === 'prepaid' &&
          prepaidProducts.length > prepaidPagination)) && (
        <Button onPress={loadMore} />
      )}
    </View>
  );
}
