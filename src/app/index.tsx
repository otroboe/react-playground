import React from 'react';
import { History } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { inject } from 'mobx-react';

import { Root } from 'app/containers/Root';
import { Cinema, Home, MapPage } from 'app/components';
import { STORE_GEOLOC } from 'app/constants';
import { GeolocStore } from 'app/stores';

export interface AppProps {
  history: History;
}

@inject(STORE_GEOLOC)
export class App extends React.Component<AppProps, {}> {
  componentDidMount() {
    const geolocStore = this.props[STORE_GEOLOC] as GeolocStore;
    
    geolocStore.startWatch();
  }
  
  componentWillUnmount() {
    const geolocStore = this.props[STORE_GEOLOC] as GeolocStore;
    
    geolocStore.clearWatch();
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Root>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/cinema" component={Cinema}/>
            <Route path="/map" component={MapPage}/>
          </Switch>
        </Root>
      </Router>
    );
  }
}

export default App;
