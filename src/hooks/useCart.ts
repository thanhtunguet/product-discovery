import {GlobalState} from 'config/global';
import {CartContent, Product} from 'models';
import React from 'reactn';
import {StateTuple} from 'reactn/types/use-global';

type CartResult = [
  StateTuple<GlobalState, 'cartContents'>[0],
  StateTuple<GlobalState, 'cartContents'>[1],
  (product: Product, quantity: number) => void,
];

export function useCart(): CartResult {
  const [cartContents, setCartContents] = React.useGlobal<GlobalState, 'cartContents'>('cartContents');

  const handleAddToCart = React.useCallback(
    async (product: Product, quantity: number) => {
      const currentIndex: number = cartContents.findIndex((cartContent: CartContent) => {
        return cartContent.product?.sku === product.sku;
      });
      let cartContent: CartContent;
      if (currentIndex >= 0) {
        cartContent = cartContents[currentIndex];
        cartContent.quantity += quantity;
      } else {
        cartContent = new CartContent();
        cartContent.product = product;
        cartContent.quantity = quantity;
        cartContents.push(cartContent);
      }
      await setCartContents([...cartContents]);
    },
    [cartContents, setCartContents],
  );

  return [cartContents, setCartContents, handleAddToCart];
}
