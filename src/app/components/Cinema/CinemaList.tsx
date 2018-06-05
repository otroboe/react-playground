import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Classes } from '@blueprintjs/core';

import './style.less';
import { STORE_CINEMA } from 'app/constants';
import { CinemaModel } from 'app/models';
import { CinemaStore } from 'app/stores';
import { Loading } from 'app/components';
import { CinemaListItem } from './CinemaListItem';
import { CinemaListActions } from './CinemaListActions';

export interface CinemaListProps extends RouteComponentProps<any> {};
export interface CinemaListState {};

@inject(STORE_CINEMA)
@observer
export class CinemaList extends React.Component<CinemaListProps, CinemaListState> {

  componentDidMount() {
    const cinemaStore = this.props[STORE_CINEMA] as CinemaStore;
    
    cinemaStore.fetchList();
  }

  renderRowItem(cinema: CinemaModel): JSX.Element {
    return (
      <CinemaListItem key={cinema.id} cinema={cinema}/>
    );
  }

  renderTable(cinemaList: Array<CinemaModel>): JSX.Element {
    return (
      <table className={`cinema-list pt-html-table pt-interactive ${Classes.SMALL}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {cinemaList.map((cinema: CinemaModel) => this.renderRowItem(cinema))}
        </tbody>
      </table>
    );
  }

  render(): JSX.Element {
    const cinemaStore = this.props[STORE_CINEMA] as CinemaStore;
    const { sortedList } = cinemaStore;

    if (sortedList === undefined) {
      return (
        <Loading />
      );
    }

    return (
      <div className="cinema-list-container">
        <CinemaListActions />
        {this.renderTable(sortedList)}
      </div>
    );
  }
}

export default CinemaList;
