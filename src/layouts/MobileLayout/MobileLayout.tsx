import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch} from 'react-router-dom';
import './MobileLayout.scss';

function MobileLayout(props: RouteConfigComponentProps) {
  const {route} = props;
  return (
    <Switch>
      {route?.children && renderRoutes(route.children)}
    </Switch>
  );
}

export default MobileLayout;
