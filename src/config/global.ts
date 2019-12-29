import {STORAGE_CART} from 'config/consts';
import {Product} from 'models';

export interface GlobalState {
  products: Product[];
}

export const initGlobalState: GlobalState = {
  products: JSON.parse(localStorage.getItem(STORAGE_CART) || '[]') || [],
};
