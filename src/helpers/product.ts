import {Product} from 'models';
import slugify from 'slugify';

export function getProductPath(product: Product) {
  return `${slugify(product?.name?.toLowerCase() || '')}-pro.${product?.sku}`;
}
