import React from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import { STORE_CINEMA } from 'app/constants';
import { CinemaStore } from 'app/stores';
import { Loading, ScheduleList } from 'app/components';
import { CinemaPageDetails } from './CinemaPageDetails';

export interface CinemaPageProps extends RouteComponentProps<any> {}
export interface CinemaPageState {}

@inject(STORE_CINEMA)
@observer
export class CinemaPage extends React.Component<CinemaPageProps, CinemaPageState> {
  componentDidMount(): void {
    const cinemaStore = this.props[STORE_CINEMA] as CinemaStore;
    const id = this.props.match.params.id;

    cinemaStore.fetchOne(id);
  }

  componentWillUnmount(): void {
    const cinemaStore = this.props[STORE_CINEMA] as CinemaStore;

    cinemaStore.clearCinemaPageItem();
  }

  render(): JSX.Element {
    const cinemaStore = this.props[STORE_CINEMA] as CinemaStore;
    const { cinemaPageItem } = cinemaStore;

    if (cinemaPageItem === undefined) {
      return (
        <Loading />
      );
    }

    return (
      <div className="cinema-page-container">
        <CinemaPageDetails cinema={cinemaPageItem} />
        <ScheduleList cinema={cinemaPageItem} />
      </div>
    );
  }
}

export default CinemaPage;
