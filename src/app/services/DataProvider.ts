import axios from 'axios';

import { CinemaModel, ScheduleModel, MovieModel } from 'app/models';
import { API_CINEMA_BASENAME, API_MOVIE_BASENAME, API_CINEMA_PROPS } from 'app/constants';
import { Config } from 'app/services';

export class DataProvider {
  private apiHost: string;

  constructor(config: Config) {
    this.apiHost = config.apiHost;
  }

  private cinemaBaseUrl(suffix: string = ''): string {
    return `${this.apiHost}/${API_CINEMA_BASENAME}${suffix}/?props=${API_CINEMA_PROPS.join(',')}`;
  }

  private movieBaseUrl(suffix: string = ''): string {
    return `${this.apiHost}/${API_MOVIE_BASENAME}${suffix}`;
  }

  public getCinemaList(): Promise<CinemaModel[]> {
    return axios.get(this.cinemaBaseUrl())
      .then(response => {
        return this.buildCinemaList(response.data);
      });
  }

  public getCinema(id: string): Promise<CinemaModel> {
    return axios.get(this.cinemaBaseUrl(`/${id}`))
      .then(response => {
        return this.buildCinema(Object.assign({}, response.data, { id }));
      });
  }

  public getScheduleList(id: string): Promise<ScheduleModel[]> {
    return axios.get(this.cinemaBaseUrl(`/${id}/schedules`))
      .then(response => {
        return this.buildScheduleList(response.data);
      });
  }

  private getMovie(uuid: string): Promise<MovieModel> {
    return axios.get(this.movieBaseUrl(`/${uuid}`))
      .then(response => {
        return this.buildMovie(uuid, response.data);
      })
  }

  private buildCinemaList(data: any): CinemaModel[] {
    return data.map(item => this.buildCinema(item));
  }

  private buildCinema(data: any): CinemaModel {
    const { id, name, address, phone, latitude, longitude } = data;

    return new CinemaModel(id, name, address, phone, latitude, longitude);
  }

  private buildScheduleList(data: Array<any>): Promise<ScheduleModel[]> {
    return Promise.all(data.map(item => {
      return this.getMovie(item.movie.uuid)
      .then(movie => {
        return this.buildSchedule(item, movie);
      })
    }));
  }

  private buildSchedule(data: any, movie: MovieModel): ScheduleModel {
    const { startAt, type } = data;
    
    return new ScheduleModel(startAt, type, movie);
  }

  private buildMovie(uuid: string, data: any): MovieModel {
    const { title, imdb, poster } = data;

    return new MovieModel(uuid, title, imdb, poster);    
  }
}

export default DataProvider;
