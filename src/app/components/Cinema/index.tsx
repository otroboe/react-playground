import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CinemaList from './CinemaList';
import CinemaPage from './CinemaPage';

export class Cinema extends React.Component<{}, {}> {
  public render() {
    return (
      <Switch>
        <Route exact path="/cinema" component={CinemaList}/>
        <Route path="/cinema/:id" component={CinemaPage}/>
      </Switch>
    );
  }
}

export default Cinema;
