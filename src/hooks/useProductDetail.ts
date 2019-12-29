import {Product, ProductSearch} from 'models';
import React from 'react';
import {useParams} from 'react-router-dom';
import {productRepository} from 'repositories';

type ProductDetailResult = [
  Product,
];

export function useProductDetail(): ProductDetailResult {
  const [product, setProduct] = React.useState<Product>(new Product());

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

  return [product];
}
