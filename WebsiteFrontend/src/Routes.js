import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  NotFound as NotFoundView,
  Auth as AuthView,
  Book as BookView,
  Cart as CartView,
  Order as OrderView,
  Orders as OrdersView,
  ReturnedOrders as ReturnedOrdersView,
  CheckedoutOrders as CheckedoutOrdersView,
  QrCode as QrCodeView,
  Recommended as RecommendedView,
  SearchBar as SearchBarView
} from './views';

const Routes = () => {
  return (
    <Switch>

      <Redirect
        exact
        from="/"
        to="/dashboard"
      />

      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />

      <RouteWithLayout
        component={AuthView}
        exact
        layout={MainLayout}
        path="/Auth"
      />

      <RouteWithLayout
        component={BookView}
        exact
        layout={MainLayout}
        path="/Book/:bookid"
      />

      <RouteWithLayout
        component={CartView}
        exact
        layout={MainLayout}
        path="/Cart"
      />

      <RouteWithLayout
        component={OrdersView}
        exact
        layout={MainLayout}
        path="/Orders"
      />
      <RouteWithLayout
        component={ReturnedOrdersView}
        exact
        layout={MainLayout}
        path="/ReturnedOrders"
      />
      <RouteWithLayout
        component={CheckedoutOrdersView}
        exact
        layout={MainLayout}
        path="/CheckedoutOrders"
      />
      <RouteWithLayout
        component={QrCodeView}
        exact
        layout={MainLayout}
        path="/QrCode/:orderId"
      />
      <RouteWithLayout
        component={RecommendedView}
        exact
        layout={MainLayout}
        path="/Recommended"
      />
      <RouteWithLayout
        component={SearchBarView}
        exact
        layout={MainLayout}
        path="/SearchBar/:keyword"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />

      <Redirect to="/not-found" />

    </Switch>
  );
};

export default Routes;
