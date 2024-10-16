import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { urlFetchBannerAds, urlFetchProducts } from '../apiUrls';
import type { BannerAdsResponse, ProductResponse } from './planSelectionTypes';

type State = {
  loading: boolean;
  bannerAds: BannerAdsResponse[];
  prepaidProducts: ProductResponse[];
  postpaidProducts: ProductResponse[];
  chosenProduct: ProductResponse | null;
};

const initialState: State = {
  loading: false,
  bannerAds: [],
  prepaidProducts: [],
  postpaidProducts: [],
  chosenProduct: null,
};

export const fetchPrepaidProducts = createAsyncThunk(
  'planSelection/fetchPrepaidProducts',
  async () => {
    const response = await fetch(urlFetchProducts('prepaid'));
    return await response.json();
  }
);

export const fetchPostpaidProducts = createAsyncThunk(
  'planSelection/fetchPostpaidProducts',
  async () => {
    const response = await fetch(urlFetchProducts('postpaid'));
    return await response.json();
  }
);

export const fetchBannerAds = createAsyncThunk(
  'planSelection/fetchBannerAds',
  async () => {
    const response = await fetch(urlFetchBannerAds());
    return await response.json();
  }
);

function hasGoodData(product: ProductResponse) {
  if (product.features.length > 2) {
    return true;
  }
  return false;
}

function sortProductsByGoodData(products: ProductResponse[]) {
  const sortedProducts = new Array<ProductResponse>(products.length);
  let i = -1;
  let j = products.length;
  products.forEach((product) => {
    if (hasGoodData(product)) {
      i++;
      sortedProducts[i] = product;
    } else {
      j--;
      sortedProducts[j] = product;
    }
  });
  return sortedProducts;
}

export const planSelectionSlice = createSlice({
  name: 'planSelection',
  initialState,
  reducers: {
    chooseProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPrepaidProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPrepaidProducts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchPrepaidProducts.fulfilled, (state, action) => {
      state.prepaidProducts = sortProductsByGoodData(
        action.payload.result.productVariants
      );
      state.loading = false;
    });
    builder.addCase(fetchPostpaidProducts.fulfilled, (state, action) => {
      state.postpaidProducts = sortProductsByGoodData(
        action.payload.result.productVariants
      );
      state.loading = false;
    });
    builder.addCase(fetchPostpaidProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPostpaidProducts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchBannerAds.fulfilled, (state, action) => {
      state.bannerAds = action.payload.result.data;
    });
  },
});

export const selectPrepaidProducts = (state: any) =>
  state.planSelection.prepaidProducts;
export const selectPostpaidProducts = (state: any) =>
  state.planSelection.postpaidProducts;
export const selectBannerAds = (state: any) => state.planSelection.bannerAds;
export const selectLoading = (state: any) => state.planSelection.loading;
export const selectChosenProduct = (state: any) =>
  state.planSelection.chosenProduct;

export const { chooseProduct } = planSelectionSlice.actions;
export default planSelectionSlice.reducer;
