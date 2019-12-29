import {debounce} from 'helpers/debounce';
import {Product, ProductSearch} from 'models';
import React, {Dispatch, SetStateAction} from 'react';
import {productRepository} from 'repositories';
import {RootObject} from 'teko-product-discovery';

export type ProductListResult = [
  Product[],
  ProductSearch,
  Dispatch<SetStateAction<ProductSearch>>,
  boolean,
  () => void,
  number,
];

export function useProductList(): ProductListResult {
  const [list, setList] = React.useState<Product[]>([]);
  const [search, setSearch] = React.useState<ProductSearch>(new ProductSearch());
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);

  const hasMore: boolean = React.useMemo(
    () => {
      if (!loading) {
        if (search._limit && search._page) {
          return search._page < Math.ceil(total / search._limit);
        }
      }
      return false;
    },
    [loading, search._limit, search._page, total],
  );

  const handleLoadList = React.useCallback(
    () => {
      productRepository.search(search)
        .then((rootObject: RootObject) => {
          if (rootObject.result?.products) {
            setList(rootObject.result?.products);
          }
          if (rootObject.extra?.totalItems) {
            setTotal(rootObject.extra.totalItems);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [search],
  );

  React.useEffect(
    () => {
      if (!loading) {
        handleLoadList();
      }
    },
    [handleLoadList, loading],
  );

  const handleUpdateSearch: Dispatch<SetStateAction<ProductSearch>> = React.useCallback(
    debounce((search: ProductSearch) => {
      setSearch(search);
    }),
    [],
  );

  const handleLoadMore = React.useCallback(
    debounce(() => {
      if (!loading) {
        setSearch({
          ...search,
          _page: (search._page || 1) + 1,
        });
      }
    }),
    [],
  );

  return [list, search, handleUpdateSearch, hasMore, handleLoadMore, total];
}
