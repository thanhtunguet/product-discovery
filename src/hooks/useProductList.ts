import {debounce} from 'helpers/debounce';
import {Product, ProductSearch} from 'models';
import React, {Reducer} from 'react';
import {productRepository} from 'repositories';
import {RootObject} from 'teko-product-discovery';

export type ProductListResult = [
  Product[],
  number,
  ProductSearch,
  (q: string) => void,
  boolean,
  boolean,
  () => Promise<void>,
];

const CONCAT_LIST: string = 'CONCAT';
const TURN_ON_SPINNING: string = 'TURN_ON_SPINNING';
const TURN_OFF_SPINNING: string = 'TURN_OFF_SPINNING';
const UPDATE_SEARCH_QUERY: string = 'UPDATE_SEARCH_QUERY';
const LOAD_MORE_PAGE: string = 'LOAD_MORE_PAGE';

interface Action {
  type: string;

  data?: any;
}

interface ProductListState {
  list: Product[];

  loadedPages: { [key: number]: boolean };

  search: ProductSearch;

  total: number;

  loading: boolean;

  action: 'CONCAT' | 'REPLACE';
}

function reducer(state: ProductListState, action: Action) {
  switch (action.type) {
    case TURN_ON_SPINNING:
      state.loading = true;
      break;

    case TURN_OFF_SPINNING:
      state.loading = false;
      break;

    case UPDATE_SEARCH_QUERY:
      state.action = 'REPLACE';
      state.search = {
        ...state.search,
        q: action.data.q,
        _page: 1,
      };
      break;

    case LOAD_MORE_PAGE:
      state.search = {
        ...state.search,
        _page: state.search._page + 1,
      };
      state.action = 'CONCAT';
      break;

    case CONCAT_LIST:
      if (state.action === 'CONCAT') {
        state.list = [
          ...state.list,
          ...action.data.products,
        ];
      } else {
        state.list = [...action.data.products];
      }
      state.total = action.data.total;
      state.loadedPages[action.data.page] = true;
      break;
  }
  return {...state};
}

function getInitialState(): ProductListState {
  return {
    list: [],
    loadedPages: {},
    search: new ProductSearch(),
    total: 0,
    loading: false,
    action: 'CONCAT',
  };
}

export function useProductList(): ProductListResult {
  const [
    {
      list,
      loadedPages,
      search,
      total,
      loading,
      action,
    },
    dispatch,
  ] = React.useReducer<Reducer<ProductListState, Action>>(reducer, getInitialState());

  const hasMore: boolean = total > search._page * search._limit;

  const handleUpdateSearch = React.useCallback(
    debounce((q: string) => {
      dispatch({
        type: UPDATE_SEARCH_QUERY,
        data: {
          q,
        },
      });
    }),
    [],
  );

  const handleLoadList = React.useCallback(
    async (action: 'CONCAT' | 'REPLACE') => {
      dispatch({type: TURN_ON_SPINNING});
      const rootObject: RootObject = await productRepository.search(search);
      dispatch({type: TURN_OFF_SPINNING});
      dispatch({
        type: CONCAT_LIST,
        data: {
          products: rootObject.result?.products || [],
          total: rootObject.extra?.totalItems || 0,
          page: search._page,
          action,
        },
      });
    },
    [search],
  );

  const handleLoadMore = React.useCallback(
    async () => {
      if (loading) {
        return;
      }
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        const page: number = search._page + 1;
        if (!loadedPages[page]) {
          dispatch({
            type: LOAD_MORE_PAGE,
          });
        }
      }
    },
    [loadedPages, loading, search._page],
  );

  React.useEffect(
    () => {
      handleLoadList(action);
    },
    [action, handleLoadList],
  );

  return [list, total, search, handleUpdateSearch, loading, hasMore, handleLoadMore];
}
