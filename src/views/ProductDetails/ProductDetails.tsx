import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Tabs from 'antd/lib/tabs';
import classNames from 'classnames';
import ProductDiscount from 'components/ProductDiscount/ProductDiscount';
import ProductPrice from 'components/ProductPrice/ProductPrice';
import QuantityInput from 'components/QuantityInput/QuantityInput';
import {calcDiscountRate, formatNumber} from 'helpers/number';
import {getProductPath} from 'helpers/product';
import {useAddingPrice} from 'hooks/useAddingPrice';
import {useCart} from 'hooks/useCart';
import {useProductDetail} from 'hooks/useProductDetail';
import {useSlide} from 'hooks/useSlide';
import {Product} from 'models';
import {Link} from 'react-router-dom';
import React from 'reactn';
import Carousel from 'reactstrap/lib/Carousel';
import CarouselControl from 'reactstrap/lib/CarouselControl';
import CarouselIndicators from 'reactstrap/lib/CarouselIndicators';
import CarouselItem from 'reactstrap/lib/CarouselItem';
import {AttributeGroup, Image} from 'teko-product-discovery';
import './ProductDetails.scss';

const {TabPane} = Tabs;

function ProductDetails() {
  const [product, similarProducts, discountRate, handleGoBack] = useProductDetail();

  const [quantity, setQuantity, addingPrice] = useAddingPrice(product);

  const [cartContents, , addToCart] = useCart();

  const images: Image[] = React.useMemo(
    () => {
      const {images = []} = product;
      return images;
    },
    [product],
  );

  const [
    activeIndex,
    ,
    handleNext,
    handlePrev,
    handleGoToIndex,
    handleExisting,
    handleExisted,
  ] = useSlide(images);

  const handleAddToCart = React.useCallback(
    async () => {
      if (quantity === 0) {
        message.error('Bạn chưa chọn số lượng muốn mua');
        return;
      }
      await addToCart(product, quantity);
      message.success('Thêm sản phẩm vào giỏ hàng thành công');
      setQuantity(0);
    },
    [addToCart, product, quantity, setQuantity],
  );

  const [collapsed, setCollapsed] = React.useState<boolean>(true);

  const handleToggleDetail = React.useCallback(
    () => {
      setCollapsed(!collapsed);
    },
    [collapsed],
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
          {cartContents && cartContents.length > 0 && (
            <span className="quantity">
                {cartContents.length}
              </span>
          )}
        </button>
      </div>
      <div className="product-content">
        <div className="product-images">
          <Carousel next={handleNext} previous={handlePrev} activeIndex={activeIndex}>
            <CarouselIndicators items={images}
                                activeIndex={activeIndex}
                                onClickHandler={handleGoToIndex}/>
            {slides}
            <CarouselControl direction="prev" directionText="" onClickHandler={handlePrev}/>
            <CarouselControl direction="next" directionText="" onClickHandler={handleNext}/>
          </Carousel>
        </div>

        <div className="product-selling-info">
          <div className="name">
            {product.name}
          </div>
          <div className="code">
            <span className="label">
              Mã SP:
            </span>
            <span className="value">
              {product.sku}
            </span>
          </div>
          <ProductPrice product={product}/>
          <ProductDiscount product={product} discountRate={discountRate}/>
        </div>

        <div className="product-info-tabs">
          <Tabs defaultActiveKey="2">
            <TabPane key="1" tab="Mô tả sản phẩm" disabled={true}>
            </TabPane>
            <TabPane key="2" tab="Thông số kỹ thuật">
              <ul className={classNames('odds', {
                collapsed,
              })}>
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
                <li className="overlay">
                  <Button type="link" htmlType="button" onClick={handleToggleDetail}>
                    {collapsed ? 'Hiển thị nhiều hơn' : 'Thu gọn'}
                  </Button>
                </li>
              </ul>
            </TabPane>
            <TabPane key="3" tab="So sánh giá" disabled={true}>
            </TabPane>
          </Tabs>
        </div>

        {similarProducts.length > 0 && (
          <div className="similar-products">
            {similarProducts.map((product: Product) => {
              const {images = []} = product;
              const discountRate: number =
                (product.price?.supplierSalePrice && product.price.sellPrice)
                  ? calcDiscountRate(product.price.supplierSalePrice, product.price.sellPrice)
                  : 0;
              return (
                <Link key={product.sku} to={getProductPath(product)} className="product">
                  <div className="product-picture">
                    {images.length > 0 && (
                      <img src={images[0].url} alt=""/>
                    )}
                  </div>
                  <div className="product-info">
                    <div className="name">
                      {product.name}
                    </div>
                    <ProductPrice product={product}/>
                    <ProductDiscount product={product} discountRate={discountRate}/>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {product.price?.supplierSalePrice ? (
          <div className="product-buying">
            <QuantityInput onChange={setQuantity} value={quantity}/>
            <Button htmlType="button" type="primary" className="add-to-cart" onClick={handleAddToCart}>
              <img src="/images/add-to-cart.png" alt=""/>
              <span className="adding-price">
              {formatNumber(addingPrice)}
                <sup>đ</sup>
            </span>
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductDetails;
