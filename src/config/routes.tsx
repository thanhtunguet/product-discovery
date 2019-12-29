import {HOME_ROUTE, PRODUCT_DETAIL_ROUTE, PRODUCT_LISTING_ROUTE} from 'config/route-consts';
import MobileLayout from 'layouts/MobileLayout/MobileLayout';
import {RouteConfig} from 'react-router-config';
import ProductDetails from 'views/ProductDetails/ProductDetails';
import ProductListing from 'views/ProductListing/ProductListing';

export const routes: RouteConfig[] = [
  {
    path: HOME_ROUTE,
    component: MobileLayout,
    children: [
      {
        path: PRODUCT_LISTING_ROUTE,
        component: ProductListing,
      },
      {
        path: PRODUCT_DETAIL_ROUTE,
        component: ProductDetails,
      },
    ],
  },
];
