import { MovieModel, ScheduleModel } from 'app/models';

export interface MovieSchedulesInterface {
  movie: MovieModel;
  schedules: Array<ScheduleModel>;
}
