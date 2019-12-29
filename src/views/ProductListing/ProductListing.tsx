import ProductListItem from 'components/ProductListItem/ProductListItem';
import {useProductList} from 'hooks/useProductList';
import {Product} from 'models';
import React, {ChangeEvent} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './ProductListing.scss';

function ProductListing() {
  const [list, search, setSearch, hasMore, handleLoadMore] = useProductList();

  const handleSearch = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      search.q = event.target.value;
      search._page = 1;
      setSearch({...search});
    },
    [setSearch, search],
  );

  return (
    <div className="view mobile-view products">
      <div className="header">
        <button type="button" className="btn btn-link btn-go-back">
          <img className="history-back-button" src="/images/arrow-back.png" alt=""/>
        </button>
        <div className="input-group">
          <div className="input-group-prepend">
            <img src="/images/search.png" alt=""/>
          </div>
          <input type="text"
                 className="form-control search"
                 defaultValue={search.q}
                 onChange={handleSearch}
                 placeholder="Nhập tên, mã sản phẩm"
          />
        </div>
      </div>
      <ul className="product-list">
        <InfiniteScroll loadMore={handleLoadMore}
                        pageStart={1}
                        hasMore={hasMore}
                        loader={<div className="loader" key={0}>Loading ...</div>}
        >
          {list.map((product: Product) => {
            return (
              <ProductListItem key={product?.sku} product={product}/>
            );
          })}
        </InfiniteScroll>
      </ul>
    </div>
  );
}

export default ProductListing;
