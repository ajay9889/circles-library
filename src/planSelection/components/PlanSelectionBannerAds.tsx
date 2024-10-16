import { useEffect } from 'react';
import { fetchBannerAds, selectBannerAds } from '../planSelectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BannerCarousel } from '../../components/BannerCarousel/BannerCarousel';
import { View } from 'react-native';

export function PlanSelectionBannerAds() {
  const dispatch = useDispatch();
  const bannerAds: any = useSelector(selectBannerAds);

  useEffect(() => {
    dispatch(fetchBannerAds() as any);
  }, [dispatch]);

  return bannerAds.length > 0 && <BannerCarousel bannerAds={bannerAds} />;
}
