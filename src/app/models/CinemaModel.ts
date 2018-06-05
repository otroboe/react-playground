import geolib from 'geolib';

import { ScheduleModel } from './ScheduleModel';
import { GeolocCoordinates } from 'app/stores';
import { observable, action } from 'mobx';

export interface Geoloc {
  lat?: number;
  long?: number;
};

export class CinemaModel {
  public readonly id: number;
  public readonly name: string;
  public readonly address?: string;
  public readonly phone?: string;
  private readonly latitude?: number;
  private readonly longitude?: number;
  private scheduleList: ScheduleModel[] = [];
  
  @observable
  public distance?: number;

  constructor(
    id: number, 
    name: string, 
    address?: string,
    phone?: string,
    latitude?: number,
    longitude?: number,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public get geoloc(): Geoloc {
    return {
      lat: this.latitude,
      long: this.longitude,
    };
  }

  public get gmapURL(): string {
    return `https://www.google.com/maps/search/?api=1&query=${this.latitude},${this.longitude}`
  }
  
  public addSchedule(schedule: ScheduleModel): this {
    this.scheduleList.push(schedule);

    return this;
  }

  public removeAllSchedules(): this {
    this.scheduleList = [];

    return this;
  }

  @action
  public computeDistance(userCoordinates?: GeolocCoordinates): void {
    if (userCoordinates === undefined) {
      return;
    }

    // Should not be there
    if (!this.latitude || !this.longitude) {
      throw new Error('CinemaModel#computeDistance - Internal Error.');
    }
  
    this.distance = geolib.getDistance({
      latitude: userCoordinates.latitude,
      longitude: userCoordinates.longitude,
    }, {
      latitude: this.latitude,
      longitude: this.longitude,
    });
  }
}

