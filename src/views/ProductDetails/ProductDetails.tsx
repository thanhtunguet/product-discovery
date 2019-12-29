import Tabs from 'antd/lib/tabs';
import classNames from 'classnames';
import {PRODUCT_LISTING_ROUTE} from 'config/route-consts';
import {calcDiscountRate, formatNumber} from 'helpers/number';
import {useProductDetail} from 'hooks/useProductDetail';
import React from 'react';
import {useHistory} from 'react-router-dom';
import Carousel from 'reactstrap/lib/Carousel';
import CarouselIndicators from 'reactstrap/lib/CarouselIndicators';
import CarouselItem from 'reactstrap/lib/CarouselItem';
import {AttributeGroup, Image} from 'teko-product-discovery';
import './ProductDetails.scss';

const {TabPane} = Tabs;

function ProductDetails() {
  const [product] = useProductDetail();

  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const [animating, setAnimating] = React.useState<boolean>(false);

  const history = useHistory();

  const images: Image[] = React.useMemo(
    () => {
      const {images = []} = product;
      return images;
    },
    [product],
  );

  const handleGoBack = React.useCallback(
    () => {
      history.push(PRODUCT_LISTING_ROUTE);
    },
    [history],
  );

  const handleNext = React.useCallback(
    () => {
      if (!animating) {
        setActiveIndex((activeIndex + 1) % images.length);
      }
    },
    [animating, activeIndex, images.length],
  );

  const handlePrev = React.useCallback(
    () => {
      if (!animating) {
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
      }
    },
    [animating, activeIndex, images.length],
  );

  const handleGoToIndex = React.useCallback(
    (activeIndex: number) => {
      if (!animating) {
        setActiveIndex(activeIndex);
      }
    },
    [animating],
  );

  const handleExisting = React.useCallback(
    () => {
      setAnimating(true);
    },
    [setAnimating],
  );

  const handleExisted = React.useCallback(
    () => {
      setAnimating(false);
    },
    [setAnimating],
  );

  const slides = React.useMemo(
    () => {
      return images.map((image: Image) => (
        <CarouselItem
          onExiting={handleExisting}
          onExited={handleExisted}
          key={image.url}
        >
          <img src={image.url} alt=""/>
        </CarouselItem>
      ));
    },
    [handleExisted, handleExisting, images],
  );

  const discountRate: number = React.useMemo(
    () => {
      if (product?.price?.supplierSalePrice && product?.price.sellPrice) {
        return calcDiscountRate(product?.price?.supplierSalePrice, product?.price.sellPrice);
      }
      return 0;
    },
    [product],
  );

  return (
    <div className="view mobile-view product-detail">
      <div className="header">
        <button className="btn btn-link btn-go-back" type="button" onClick={handleGoBack}>
          <img src="/images/arrow-back-black.png" alt=""/>
        </button>
        <div className="product-title">
          <div className="name">
            {product.name}
          </div>
          <div className="price">
            {formatNumber(product.price?.supplierSalePrice)}
            <sup>đ</sup>
          </div>
        </div>
        <button type="button" className="btn btn-link btn-cart">
          <img src="/images/cart.png" alt=""/>
        </button>
      </div>
      <div className="product-content">
        <div className="product-images">
          <Carousel next={handleNext} previous={handlePrev} activeIndex={activeIndex}>
            <CarouselIndicators items={images}
                                activeIndex={activeIndex}
                                onClickHandler={handleGoToIndex}/>
            {slides}
          </Carousel>
        </div>

        <div className="product-selling-info p-12">
          <div className="name">
            {product.name}
          </div>
          <div className="code">
            Mã SP: {product.sku}
          </div>
          <div className="product-price">
            {formatNumber(product.price?.supplierSalePrice)}
            <sup>đ</sup>
          </div>
          {discountRate > 0 && (
            <div className="product-discount">
              <div className="product-discount-price">
                {formatNumber(product.price?.sellPrice)}
                <sup>đ</sup>
              </div>
              {discountRate}
            </div>
          )}
        </div>

        <div className="product-info-tabs">
          <Tabs defaultActiveKey="2">
            <TabPane key="1" tab="Mô tả sản phẩm" disabled={true}>
            </TabPane>
            <TabPane key="2" tab="Thông số kỹ thuật">
              <ul className="odds">
                {product.attributeGroups?.map((attributeGroup: AttributeGroup, index: number) => (
                  <li className={classNames((index % 2 === 1) ? 'odd' : 'even')} key={`${attributeGroup.id}-${index}`}>
                    <span className="name">
                      {attributeGroup.name}
                    </span>
                    <span className="value">
                      {attributeGroup.value}
                    </span>
                  </li>
                ))}
              </ul>
            </TabPane>
            <TabPane key="3" tab="So sánh giá" disabled={true}>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
