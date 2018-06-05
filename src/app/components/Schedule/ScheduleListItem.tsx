import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';

import { ScheduleModel, MovieModel } from 'app/models';

interface ScheduleListItemProps {
  movie: MovieModel;
  schedules: Array<ScheduleModel>;
}

export class ScheduleListItem extends React.Component<ScheduleListItemProps, {}> {
  private onClickLink = (): void => {
    const { movie } = this.props;

    window.open(movie.imdbLink, '_blank');
  }

  private renderSchedule(schedule: ScheduleModel, key: number): JSX.Element {
    return (
      <li key={key}>{schedule.startDay} {schedule.startTime} - {schedule.type}</li>
    );
  }

  public render() {
    const { movie, schedules } = this.props;

    return (
      <Card className="schedule-list-item" elevation={Elevation.TWO}>
        <img src={movie.poster} />
        <div>
          <h6>{movie.title}</h6>
          <Button icon="film" text="More details" onClick={this.onClickLink}/>
          <ul>
            {schedules.map((schedule: ScheduleModel, key: number) => this.renderSchedule(schedule, key))}
          </ul>
        </div>
      </Card>
    );
  }
}

export default ScheduleListItem;
