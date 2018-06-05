import moment from 'moment';

import { MovieModel } from './MovieModel';

export enum ScheduleMovieType {
  regular = 'REGULAR',
  '3d' = '3D',
  imax = 'IMAX',
}

export class ScheduleModel {
  public readonly startAt: Date;
  public readonly type: ScheduleMovieType;
  public readonly movie: MovieModel;

  constructor(startAt: string, type: ScheduleMovieType, movie: MovieModel) {
    this.startAt = new Date(Date.parse(startAt));
    this.type = type;
    this.movie = movie;
  }

  public get startDay(): string {
    return moment(this.startAt).format('ddd (DD MMM)');
  }

  public get startTime(): string {
    return moment(this.startAt).format('HH:mm');
  }
}
