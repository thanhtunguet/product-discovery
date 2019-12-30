import {HOME_ROUTE, PRODUCT_DETAIL_ROUTE, PRODUCT_LISTING_ROUTE} from 'config/route-consts';
import MobileLayout from 'layouts/MobileLayout/MobileLayout';
import React from 'react';
import {RouteConfig} from 'react-router-config';

const ProductDetails = React.lazy(() => import('views/ProductDetails/ProductDetails'));
const ProductListing = React.lazy(() => import('views/ProductListing/ProductListing'));

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
