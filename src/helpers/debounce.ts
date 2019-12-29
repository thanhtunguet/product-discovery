import lodashDebounce from 'lodash/debounce';

export function debounce(f: (...params: any[]) => any) {
  return lodashDebounce(f, 400);
}
