import {STORAGE_CART} from 'config/consts';
import {CartContent} from 'models';

export interface GlobalState {
  cartContents: CartContent[];
}

export const initGlobalState: GlobalState = {
  cartContents: JSON.parse(localStorage.getItem(STORAGE_CART) || '[]') || [],
};
