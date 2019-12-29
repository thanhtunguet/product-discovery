import {calcDiscountRate, formatNumber} from 'helpers/number';
import {Product} from 'models';
import React from 'react';
import './ProductListItem.scss';
import slugify from 'slugify';

interface ProductListItemProps {
  product: Product;
}

function ProductListItem(props: ProductListItemProps) {
  const {product} = props;
  const discountRate: number = (product.price?.supplierSalePrice && product.price?.sellPrice) ?
    calcDiscountRate(product.price.supplierSalePrice, product.price?.sellPrice) :
    0;
  return (
    <a role="menuitem" href={`${slugify(product.name || '')}-pro.${product.sku}`} className="product-list-item">
      <li>
        <img src={(product?.images && product.images.length > 0) ? product.images[0].url : ''} alt="" className="product-picture"/>
        <div className="product-info">
            <span className="product-name">
              {product?.name}
            </span>
          {product.price?.supplierSalePrice && (
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
