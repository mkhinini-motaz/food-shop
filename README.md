# food-shop: the GhostChef shop back office

food-shop is the web app a restaurant uses to run its orders and menu in [GhostChef](https://github.com/mkhinini-motaz/ghostchef), a food-ordering platform I started in 2019. I wrote it by hand, before I used coding agents, between 2021 and 2023 (163 commits). A restaurant I co-founded used it from December 2021 to October 2023.

The other parts of the system:

- [Food](https://github.com/mkhinini-motaz/Food): the Laravel API this app calls
- [food-client](https://github.com/mkhinini-motaz/food-client): customer web app
- [food-ws](https://github.com/mkhinini-motaz/food-ws): realtime server
- [deliveryapp](https://github.com/mkhinini-motaz/deliveryapp): delivery (rider) app
- [ghostclient](https://github.com/mkhinini-motaz/ghostclient): customer phone app

## What it does

Routes are in `src/Router.js`.

- **Orders**
  - The home page lists the current orders and refreshes when the realtime server sends an `order_update` event.
  - Staff can create an order themselves, edit it, change its status and mark it as paid.
  - Staff can attach a transporter (rider) to an order.
  - Browser push notifications through Firebase Cloud Messaging.
  - Order history by date.
  - An order map (Google Maps) with one marker per order.
  - An overview page with statistics for a chosen date.
- **Statistics** (`src/components/statistics`): orders per hour and over time, order counts, and counts by transporter, source, type, status, category, product, option and ingredient.
- **Menu**
  - List categories and open one to see its products.
  - Edit a category or a product, and show or hide them.
  - Update product prices.
- **Settings**: change the menu language and draw the shop's service area as a polygon on a map.
- **Account**: shop user login and profile.
- **Languages**: French, English, Arabic and two Tunisian variants (`src/i18n`).

## Stack

- React 17 (Create React App, `react-scripts` 3.4.1), JavaScript
- Redux 4 with `react-redux` 7, `redux-thunk` and `redux-persist` 6
- Material UI 4, Bootstrap 4
- `react-router` 5, `axios` 0.19, `socket.io-client` 4
- `chart.js` 3 with `react-chartjs-2` 4, `react-charts` 3 (beta)
- `@react-google-maps/api` 2, `firebase` 8, `react-ga`

## Layout

```
src/pages/        home, orders (history, map, overview, edit), categories, products, settings, login
src/components/   order, statistics, product, category, cart, transporter, common
src/store/        Redux actions and reducers
src/layout/       app bar, side drawer and page layouts
src/i18n/         translations
src/constants/    order statuses and shop settings
public/           HTML, manifest, Firebase messaging service worker, sitemap
```

## Running it

```
npm install
npm start          # development server
npm run build      # production build
npm run sitemap    # rebuild the sitemap
npm test
```

The app expects the API from [Food](https://github.com/mkhinini-motaz/Food) and the realtime server from [food-ws](https://github.com/mkhinini-motaz/food-ws). The code is archived and not maintained, and it may need an older Node to build.

## Status

Archived. The restaurant closed in October 2023. Since September 2026 I am rebuilding GhostChef as a delivery platform with Claude Code; that code is private. The [case study](https://github.com/mkhinini-motaz/ghostchef) tells the full story.
