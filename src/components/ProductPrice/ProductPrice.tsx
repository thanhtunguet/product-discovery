import {formatNumber} from 'helpers/number';
import {Product} from 'models';
import React from 'react';
import './ProductPrice.scss';

interface ProductPriceProps {
  product: Product;
}

function ProductPrice(props: ProductPriceProps) {
  const {product} = props;
  return product?.price?.supplierSalePrice ? (
    <div className="product-price">
      {formatNumber(product.price?.supplierSalePrice)}
      <sup>đ</sup>
    </div>
  ) : null;
}

export default ProductPrice;
