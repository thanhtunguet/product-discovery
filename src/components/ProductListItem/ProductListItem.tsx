import ProductDiscount from 'components/ProductDiscount/ProductDiscount';
import ProductPrice from 'components/ProductPrice/ProductPrice';
import {calcDiscountRate} from 'helpers/number';
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
          <ProductPrice product={product}/>
          <ProductDiscount product={product} discountRate={discountRate}/>
        </div>
      </li>
    </a>
  );
}

export default ProductListItem;
