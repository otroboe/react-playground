import React from 'react';
import { inject, observer } from 'mobx-react';

import './style.less';
import { CinemaModel, MovieSchedulesInterface } from 'app/models';
import { STORE_CINEMA } from 'app/constants';
import { CinemaStore } from 'app/stores';
import { Loading } from 'app/components';
import { ScheduleListItem } from './ScheduleListItem';

export interface ScheduleListProps {
  cinema: CinemaModel;
}

@inject(STORE_CINEMA)
@observer
export class ScheduleList extends React.Component<ScheduleListProps, {}> {
  componentDidMount(): void {
    const { cinema } = this.props;
    const cinemaStore = this.props[STORE_CINEMA] as CinemaStore;
    
    cinemaStore.fetchScheduleList(cinema.id.toString());
  }
  
  componentWillUnmount(): void {
    const cinemaStore = this.props[STORE_CINEMA] as CinemaStore;

    cinemaStore.clearScheduleList();
  }

  renderScheduleItem(key: number, item: MovieSchedulesInterface) {
    const { movie, schedules } = item;
    
    return <ScheduleListItem key={key} movie={movie} schedules={schedules}/>;
  }
  
  render(): JSX.Element {
    const cinemaStore = this.props[STORE_CINEMA] as CinemaStore;
    const { schedulesByMovie } = cinemaStore;
    
    if (schedulesByMovie === undefined) {
      return (
        <Loading />
      );
    }
  
    return (
      <div className="schedule-list-container">
        {schedulesByMovie.map((item: MovieSchedulesInterface, key: number) => this.renderScheduleItem(key, item))}
      </div>
    );
  }
}

export default ScheduleList;
