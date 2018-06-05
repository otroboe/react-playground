import { observable, action, computed } from 'mobx';

import { GEOLOC_ERROR } from 'app/constants';
import { ToastManager } from 'app/services';

export interface GeolocCoordinates extends Coordinates {};
export interface GeolocPosition extends Position {};
export interface GeolocError extends PositionError {};
export interface GeolocOptions extends PositionOptions {
  enableHighAccuracy: boolean;
  maximumAge: number;
  timeout: number;
};

export class GeolocStore {
  private toastManager: ToastManager;
  private positionOptions: GeolocOptions;

  public isGeolocationAvailable: boolean = 'geolocation' in navigator;
  public geolocationWatchID?: number;

  @observable
  public coordinates?: GeolocCoordinates;

  /**
   * @param {ToastManager} toastManager 
   * @param {PositionOptions} positionOptions 
   */
  constructor(toastManager: ToastManager, positionOptions: GeolocOptions) {
    this.toastManager = toastManager;
    this.positionOptions = positionOptions;

    console.log(`GeolocStore#constructor:\n` +
      `\tenableHighAccuracy=${this.positionOptions.enableHighAccuracy}\n` +
      `\ttimeout=${this.positionOptions.timeout}\n` +
      `\tmaximumAge=${this.positionOptions.maximumAge}\n` +
      `\tisGeolocationAvailable=${this.isGeolocationAvailable}`
    );
  }

  @computed
  public get hasCoordinates(): boolean {
    return this.coordinates !== undefined;
  }
  
  public startWatch(): void {
    if (!this.isGeolocationAvailable) {
      this.toastManager.showError('Your browser is too old, we can\'t detect your location.');
      return;
    }
    
    this.geolocationWatchID = navigator.geolocation.watchPosition(
      (position: Position) => this.handleSuccess(position),
      (error: GeolocError) => this.handleError(error),
      this.positionOptions
    );
  }
  
  public clearWatch(): void {
    if (this.isGeolocationAvailable && this.geolocationWatchID) {
      navigator.geolocation.clearWatch(this.geolocationWatchID);
    }
  }

  @action.bound
  private handleSuccess(position: GeolocPosition): void {
    this.coordinates = position.coords;

    console.log('Coordinates found', this.coordinates);

    // this.toastManager.showSuccess(`Your position has been retrieved.`)
  }

  private handleError(error: GeolocError): void {
    let message: string;

    switch(error.code) {
      case GEOLOC_ERROR.PERMISSION_DENIED:
        message = 'You denied the permission to detect your location.'; break;
      case GEOLOC_ERROR.POSITION_UNAVAILABLE:
        message = 'An internal error has been detected while detecting your location.'; break;
      case GEOLOC_ERROR.TIMEOUT:
        message = `Your location was not detected after ${this.positionOptions.timeout / 1000} seconds.`; break;
      default:
        message = 'Unidentified error while trying to detect your position.';
    }
  
    this.toastManager.showError(message);
  }
}

export default GeolocStore;
