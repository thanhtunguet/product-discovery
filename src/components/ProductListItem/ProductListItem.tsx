import {calcDiscountRate, formatNumber} from 'helpers/number';
import {getProductPath} from 'helpers/product';
import {Product} from 'models';
import React from 'react';
import './ProductListItem.scss';

interface ProductListItemProps {
  product: Product;
}

function ProductListItem(props: ProductListItemProps) {
  const {product} = props;
  const discountRate: number = (product?.price?.supplierSalePrice && product?.price?.sellPrice) ?
    calcDiscountRate(product?.price.supplierSalePrice, product?.price?.sellPrice) :
    0;
  return (
    <a role="menuitem" href={getProductPath(product)} className="product-list-item">
      <li>
        <div className="product-picture">
          <img src={(product?.images && product?.images.length > 0) ? product?.images[0].url : ''} alt=""/>
        </div>
        <div className="product-info">
            <span className="product-name">
              {product?.name}
            </span>
          {product?.price?.supplierSalePrice && (
            <span className="product-price">
                    {formatNumber(product?.price?.supplierSalePrice)}
              <sup>đ</sup>
                  </span>
          )}
          {discountRate > 0 && (
            <span className="product-discount">
                <span className="product-discount-price">
                  {formatNumber(product?.price?.supplierSalePrice)}
                  <sup>đ</sup>
                </span>
                  <span className="product-discount-rate">
                      {`-${discountRate}%`}
                    </span>
            </span>
          )}
        </div>
      </li>
    </a>
  );
}

export default ProductListItem;
