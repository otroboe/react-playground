import sortBy from 'lodash.sortby';
import groupBy from 'lodash.groupby';
import { observable, action, computed, reaction } from 'mobx';

import { CinemaModel, ScheduleModel, MovieSchedulesInterface, MovieModel } from 'app/models';
import { DataProvider } from 'app/services';
import { GeolocStore, GeolocCoordinates } from 'app/stores';

export const cinemaDefaultSort: string = 'none';
export const cinemaAvailableSorts: Array<string> = [cinemaDefaultSort, 'name', 'distance'];

export class CinemaStore {
  private dataProvider: DataProvider;
  private geolocStore: GeolocStore;

  @observable
  public cinemaList?: Array<CinemaModel>;

  @observable
  public sortName: string = cinemaDefaultSort;

  @observable
  public cinemaPageItem?: CinemaModel;

  @observable
  public scheduleList?: Array<ScheduleModel>;

  constructor(dataProvider: DataProvider, geolocStore: GeolocStore) {
    this.dataProvider = dataProvider;
    this.geolocStore = geolocStore;

    reaction(
      () => this.geolocStore.coordinates,
      userCoordinates => this.onUpdateUserCoordinates(userCoordinates)
    );
  }

  private onUpdateUserCoordinates(userCoordinates?: GeolocCoordinates): void {
    if (userCoordinates && this.cinemaList && Array.isArray(this.cinemaList.slice())) {
      this.cinemaList.map((cinema: CinemaModel) => cinema.computeDistance(userCoordinates));
    }
  }

  @computed
  public get sortedList(): Array<CinemaModel> {
    if (this.cinemaList === undefined) {
      return [];
    }

    switch(this.sortName) {
      case 'name':
        return sortBy(this.cinemaList, ['name'])
        case 'distance':
        return sortBy(this.cinemaList, ['distance'])
      default:
        return this.cinemaList;
    }
  }

  @action
  public setFilter(sortName: string): void {
    this.sortName = cinemaAvailableSorts.indexOf(sortName) !== -1 ? sortName : cinemaDefaultSort;
  }

  @computed
  public get schedulesByMovie(): Array<MovieSchedulesInterface> {
    const grouped = groupBy(this.scheduleList, 'movie.uuid');

    let list: Array<MovieSchedulesInterface> = [];
    let uuid: string;
    let schedules: Array<ScheduleModel>;
    let movie: MovieModel;

    for (uuid in grouped) {
      schedules = grouped[uuid];
      movie = schedules[0].movie;

      list.push({ movie, schedules });
    }
    
    return sortBy(list, 'movie.title');
  }

  public fetchList(): void {
    this.dataProvider.getCinemaList()
      .then((list: Array<CinemaModel>) => this.onUpdateCinemaList(list));
  }

  public fetchOne(id: string): void {
    this.dataProvider.getCinema(id)
      .then((cinema: CinemaModel) => this.onUpdateCinemaPageItem(cinema));
  }

  public fetchScheduleList(id: string): void {
    this.dataProvider.getScheduleList(id)
      .then((list: ScheduleModel[]) => this.onUpdateScheduleList(list))
  }

  @action
  public clearCinemaPageItem(): void {
    this.cinemaPageItem = undefined;
  }

  @action
  public clearScheduleList(): void {
    this.scheduleList = [];
  }

  @action.bound
  private onUpdateCinemaList(list: Array<CinemaModel>): void {
    this.cinemaList = list;

    if (this.geolocStore.hasCoordinates) {
      this.cinemaList.map((cinema: CinemaModel) => cinema.computeDistance(this.geolocStore.coordinates));
    }
  }

  @action.bound
  private onUpdateCinemaPageItem(cinema: CinemaModel): void {
    this.cinemaPageItem = cinema;
  }

  @action.bound
  private onUpdateScheduleList(list: Array<ScheduleModel>): void {
    this.scheduleList = list;
  }
}

export default CinemaStore;
