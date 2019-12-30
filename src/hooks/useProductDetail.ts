import {PRODUCT_LISTING_ROUTE} from 'config/route-consts';
import {calcDiscountRate} from 'helpers/number';
import {Product, ProductSearch} from 'models';
import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {productRepository} from 'repositories';
import {RootObject} from 'teko-product-discovery';

type ProductDetailResult = [
  Product,
  Product[],
  number,
  () => void,
];

export function useProductDetail(): ProductDetailResult {
  const [product, setProduct] = React.useState<Product>(new Product());
  const [similarProducts, setSimilarProducts] = React.useState<Product[]>([]);

  const {id} = useParams();

  React.useEffect(
    () => {
      if (id) {
        productRepository.get(id, new ProductSearch())
          .then((product: Product) => {
            setProduct(product);
          });
      }
    },
    [id],
  );

  React.useEffect(
    () => {
      productRepository.search(new ProductSearch())
        .then((rootObject: RootObject) => {
          if (rootObject.result?.products) {
            setSimilarProducts(rootObject.result.products);
          }
        });
    },
    [],
  );

  const discountRate: number = React.useMemo(
    () => {
      if (product?.price?.supplierSalePrice && product?.price.sellPrice) {
        return calcDiscountRate(product?.price?.supplierSalePrice, product?.price.sellPrice);
      }
      return 0;
    },
    [product],
  );

  const history = useHistory();

  const handleGoBack = React.useCallback(
    () => {
      history.push(PRODUCT_LISTING_ROUTE);
    },
    [history],
  );

  return [product, similarProducts, discountRate, handleGoBack];
}
