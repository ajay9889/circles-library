import type { ProductResponse } from './planSelectionTypes';

export function getProductImage(product: ProductResponse) {
  const imagesLinkAttribute = product?.attributes?.find(
    (a) => a?.name === 'imagesLink'
  );
  if (
    imagesLinkAttribute &&
    imagesLinkAttribute.value &&
    imagesLinkAttribute.value.length > 0
  ) {
    return imagesLinkAttribute.value;
  }
  return '';
}

export function getValidity(product: ProductResponse) {
  const validityAttribute = product.attributes.find(
    (a) => a.name === 'validity'
  );
  if (validityAttribute) {
    return `${validityAttribute.value} ${validityAttribute.unit}`;
  }
  return '';
}

export function getData(product: ProductResponse) {
  const dataAttribute = product.attributes.find((a) => a.name === 'data');
  if (dataAttribute) {
    if (dataAttribute.value === 'unlimited') {
      return 'Unlimited Data';
    }
    return `${dataAttribute.value ? dataAttribute.value : 0} GB`;
  }
  return '';
}
