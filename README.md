Teko Product Discovery
======================

1. Library usages
    - `antd`: Ant design components for React
    - `axios`: Promise-based HTTP Client for browser and Node.js
    - `lodash/debounce`: for debouncing events: search typing, window scrolling, ...
    - `react-router-dom`, `react-router-config`: Routing utilities for any React application.
    - `reactn`: In e-commerce website, state of the cart must be global. I use `reactn` for **Global State Management**
    - `reactstrap`: Bootstrap components for React
    - `slugify`: for generating product SEO URL

2. Project architecture

    3-layers pattern:
    - Repositories: Data access layer
    - Hooks (aka Services): Business logic layer
    - Views: Presentation layer

3. Mobile-friendly approach
    - To keep it simple, create individual layout for mobile devices
    - Mobile layout has its own set of views
    - Infinite scrolling

4. Performance optimization
    - Component lazy loading
    - Create-React-App provided default service worker.
    - On-demand library importing

5. Code quality
    - Component reusing: `ProductPrice`, `ProductDiscount`
    - Write unit tests for helpers

6. Deployment
    - Using github pages and Travis CI


### Demo
[https://product-discovery.thanhtunguet.info](https://product-discovery.thanhtunguet.info)
