import {Product} from 'models';
import React, {Dispatch, SetStateAction} from 'react';

export type AddingPriceResult = [
  number,
  Dispatch<SetStateAction<number>>,
  number,
];

export function useAddingPrice(product: Product): AddingPriceResult {
  const [quantity, setQuantity] = React.useState<number>(0);

  const addingPrice: number = React.useMemo(
    () => {
      return quantity * (product.price?.sellPrice || product.price?.supplierSalePrice || 0);
    },
    [product.price, quantity],
  );

  return [
    quantity,
    setQuantity,
    addingPrice,
  ];
}
