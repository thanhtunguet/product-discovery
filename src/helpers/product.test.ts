import {getProductPath} from 'helpers/product';
import {Product} from 'models';

describe('product helper', () => {
  it('generate slug path success', () => {
    const product: Product = new Product();
    product.name = 'Sản phẩm';
    product.sku = '1';
    expect(getProductPath(product)).toEqual('san-pham-pro.1');
  });
});
