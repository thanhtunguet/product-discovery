import {AxiosResponse} from 'axios';
import {Product, ProductSearch} from 'models';
import {Repository} from 'repositories/Repository';
import {RootObject} from 'teko-product-discovery';

export class ProductRepository extends Repository {
  constructor() {
    super();
    this.setBaseURL('https://listing.services.teko.vn');
  }

  public search = async (productSearch: ProductSearch): Promise<RootObject> => {
    return this.http
      .get('/api/search/', {
        params: productSearch,
      })
      .then((response: AxiosResponse<RootObject>) => {
        return response.data;
      });
  };

  public get = async (sku: string, productSearch: ProductSearch): Promise<Product> => {
    const {data: {result: {product}}} = await this.http
      .get(`/api/products/${sku}`, {
        params: productSearch,
      });
    return product;
  };
}

export default new ProductRepository();
