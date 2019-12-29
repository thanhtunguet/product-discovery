import {
  Attribute,
  AttributeGroup,
  AttributeSet,
  Brand,
  Category,
  Color,
  Image,
  Objective,
  ParentBundle,
  Price,
  Product as IProduct,
  ProductLine,
  ProductType,
  Promotion,
  PromotionPrice,
  Rating,
  SaleCategory,
  Seller,
  SeoInfo,
  Status,
  TotalAvailableByStock,
  Warranty,
} from 'teko-product-discovery';

export class Product implements IProduct {
  public sku?: string;

  public name?: string;

  public url?: string;

  public seller?: Seller;

  public brand?: Brand;

  public status?: Status;

  public objective?: Objective;

  public productType?: ProductType;

  public images?: Image[];

  public price?: Price;

  public productLine?: ProductLine;

  public stocks?: any[];

  public totalAvailable?: number;

  public isBundle?: boolean;

  public bundleProducts?: any;

  public parentBundles?: ParentBundle[];

  public totalAvailableByStocks?: TotalAvailableByStock[];

  public displayName?: string;

  public color?: Color;

  public tags?: any[];

  public promotionPrices?: PromotionPrice[];

  public promotions?: Promotion[];

  public flashSales?: any[];

  public attributeSet?: AttributeSet;

  public categories?: Category[];

  public magentoId?: number;

  public seoInfo?: SeoInfo;

  public rating?: Rating;

  public allActiveFlashSales?: any[];

  public productGroup?: any;

  public attributes?: Attribute[];

  public saleCategories?: SaleCategory[];

  public taxOut?: number;

  public taxOutCode?: string;

  public attributeGroups?: AttributeGroup[];

  public warranty?: Warranty;

  public createdAt?: Date;

  public salePoint?: number;

  public importPrice?: any;

  public recommendMethod?: any;
}
