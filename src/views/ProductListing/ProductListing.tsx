import message from 'antd/lib/message';
import Spin from 'antd/lib/spin';
import ProductListItem from 'components/ProductListItem/ProductListItem';
import {useProductList} from 'hooks/useProductList';
import {Product} from 'models';
import React, {ChangeEvent} from 'react';
import './ProductListing.scss';

function ProductListing() {
  const [
    list,
    ,
    search,
    setSearch,
    ,
    hasMore,
    handleLoadMore,
  ] = useProductList();

  React.useEffect(
    () => {
      window.addEventListener('scroll', handleLoadMore);
      return () => {
        window.removeEventListener('scroll', handleLoadMore);
      };
    },
    [handleLoadMore],
  );

  const listItems = React.useMemo(
    () => list.map((product: Product) => (
      <ProductListItem product={product} key={product.sku}/>
    )),
    [list],
  );

  const handleSearch = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch({
        ...search,
        q: event.target.value,
        _page: 1,
      });
    },
    [setSearch, search],
  );

  const handleGoBack = React.useCallback(
    () => {
      message.info('Đây là bài test, chỉ có một module, vì thế nút back này không dẫn đi đâu cả :D');
    },
    [],
  );

  return (
    <div className="view mobile-view products">
      <div className="header">
        <button type="button" className="btn btn-link btn-go-back" onClick={handleGoBack}>
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
        {listItems}
        {hasMore && (
          <Spin/>
        )}
      </ul>
    </div>
  );
}

export default ProductListing;