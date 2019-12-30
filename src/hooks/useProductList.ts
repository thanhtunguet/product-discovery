import {debounce} from 'helpers/debounce';
import {Product, ProductSearch} from 'models';
import React, {Reducer} from 'react';
import {productRepository} from 'repositories';
import {RootObject} from 'teko-product-discovery';

export type ProductListResult = [
  Product[],
  number,
  ProductSearch,
  (search: ProductSearch) => void,
  boolean,
  boolean,
  () => Promise<void>,
];

interface ProductListState {
  list: Product[];

  loadedPages: { [key: number]: boolean };
}

interface Action {
  type: string;

  data: any;
}

const REPLACE: string = 'REPLACE';
const CONCAT: string = 'CONCAT';
const LOAD_PAGE: string = 'LOAD_PAGE';

function reducer(state: ProductListState, action: Action) {
  switch (action.type) {
    case REPLACE:
      state.list = action.data;
      break;

    case CONCAT:
      state.list = [
        ...state.list,
        ...action.data,
      ];
      break;

    case LOAD_PAGE:
      state.loadedPages[action.data] = true;
      break;
  }
  return {...state};
}

export function useProductList(): ProductListResult {
  const [search, setSearch] = React.useState<ProductSearch>(new ProductSearch());
  const [loading, setLoading] = React.useState<boolean>(false);
  const [{list, loadedPages}, dispatch] = React.useReducer<Reducer<ProductListState, Action>>(reducer, {
    list: [],
    loadedPages: {},
  });

  const [total, setTotal] = React.useState<number>(0);

  const hasMore: boolean = total > search._page * search._limit;

  const handleLoadList = React.useCallback(
    async (productSearch?: ProductSearch, action: string = CONCAT) => {
      setLoading(true);
      dispatch({
        type: LOAD_PAGE,
        data: productSearch?._page || 1,
      });
      await productRepository
        .search(productSearch || new ProductSearch())
        .then((rootObject: RootObject) => {
          if (rootObject.extra?.totalItems && rootObject.result?.products) {
            if (productSearch) {
              setSearch(productSearch);
            }
            const products: Product[] = rootObject.result?.products;
            setTotal(rootObject.extra?.totalItems);
            dispatch({
              type: action,
              data: products,
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [],
  );

  const handleUpdateSearch = React.useCallback(
    (search: ProductSearch) => {
      handleLoadList(search, REPLACE);
    },
    [handleLoadList],
  );

  const handleLoadMore = React.useCallback(
    debounce(async () => {
      if (loading) {
        return;
      }
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        const page: number = search._page + 1;
        if (!loadedPages[page] && !loading) {
          const newSearch: ProductSearch = {
            ...search,
            _page: page,
          };
          await handleLoadList(newSearch);
        }
      }
    }),
    [loading, loadedPages],
  );

  React.useEffect(
    () => {
      handleLoadList();
    },
    [handleLoadList],
  );

  return [list, total, search, handleUpdateSearch, loading, hasMore, handleLoadMore];
}
