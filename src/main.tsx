import React from 'react';
import { render } from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { FocusStyleManager } from '@blueprintjs/core';

import 'styles/main.less';
import { createStores } from 'app/stores';
import { Caching, Config, DataProvider, ToastManager } from 'app/services';
import { App } from 'app';

// Blueprint config
FocusStyleManager.onlyShowFocusOnTabs();

// MobX config
configure({ enforceActions: true });

// Services
const caching = new Caching();
const config = new Config();
const dataProvider = new DataProvider(config);
const toastManager = new ToastManager();

// Prepare MobX stores
const history = createBrowserHistory();
const rootStore = createStores(history, dataProvider, toastManager, config, caching);

render((
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>
), document.getElementById('root'));
