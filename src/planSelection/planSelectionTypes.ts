export type ProductCategory = 'prepaid' | 'postpaid';

type ProductBenefit = {
  description: string;
  name: string;
  title: string;
};

type ProductAttribute = {
  name: string;
  value: string;
  unit: string;
};

export type ProductResponse = {
  description: string;
  title: string;
  productCategory: ProductCategory;
  productCode: string;
  subtitle: string;
  status: string;
  sku: string;
  features: string[];
  price: number;
  discountedPrice: number;
  benefits: ProductBenefit[];
  attributes: ProductAttribute[];
};

export type BannerAdsResponse = {
  id: string;
  title: string;
  image: string;
  deepLink: string;
  webUrl: string;
  displayOrder: number;
};
