import { HOME_ROUTE } from 'config/route-consts';
import { RouteConfig } from 'react-router-config';
import AutoCompleteSearch from 'views/AutoCompleteSearch/AutoCompleteSearch';

export const routes: RouteConfig[] = [
  {
    path: HOME_ROUTE,
    component: AutoCompleteSearch,
  },
  // {
  //   path: HOME_ROUTE,
  //   component: MobileLayout,
  //   children: [
  //     {
  //       path: PRODUCT_LISTING_ROUTE,
  //       component: ProductListing,
  //     },
  //     {
  //       path: PRODUCT_DETAIL_ROUTE,
  //       component: ProductDetails,
  //     },
  //   ],
  // },
];
