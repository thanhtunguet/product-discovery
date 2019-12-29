import {GlobalState, initGlobalState} from 'config/global';
import {routes} from 'config/routes';
import {render} from 'react-dom';
import {renderRoutes} from 'react-router-config';
import {BrowserRouter} from 'react-router-dom';
import React from 'reactn';
import 'scss/main.scss';
import {unregister} from 'serviceWorker';

(async () => {
  await React.setGlobal<GlobalState>(initGlobalState);
  render(
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>,
    document.getElementById('root'),
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
  if (process.env.NODE_ENV !== 'production') {
    unregister();
  }
})();
