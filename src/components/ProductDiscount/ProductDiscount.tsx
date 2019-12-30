import {formatNumber} from 'helpers/number';
import {Product} from 'models';
import React from 'react';
import './ProductDiscount.scss';

interface ProductDiscountProps {
  product: Product;

  discountRate: number;
}

function ProductDiscount(props: ProductDiscountProps) {
  const {product, discountRate} = props;

  return discountRate > 0 ? (
    <div className="product-discount">
      <div className="product-discount-price">
        {formatNumber(product.price?.sellPrice)}
        <sup>đ</sup>
      </div>
      <div className="product-discount-rate">
        {`-${discountRate}%`}
      </div>
    </div>
  ) : null;
}

export default ProductDiscount;
