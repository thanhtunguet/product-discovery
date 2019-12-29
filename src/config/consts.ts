export const INPUT_DEBOUNCE_TIME: number = 400;

export const BASE_URL: string = process.env.REACT_APP_BASE_URL
  || (typeof window !== 'undefined' ? window.location.origin : '');

export const STORAGE_CART: string = 'products';
