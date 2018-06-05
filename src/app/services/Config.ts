import { GEOLOC_DEFAULT_TIMEOUT, GEOLOC_DEFAULT_MAXIMUM_AGE, GEOLOC_DEFAULT_ACCURACY, API_DEFAULT_HOST } from 'app/constants';
import { GeolocOptions } from 'app/stores';

export class Config {

  public apiHost: string = API_DEFAULT_HOST;

  public geolocPositionOptions: GeolocOptions = {
    enableHighAccuracy: GEOLOC_DEFAULT_ACCURACY,
    timeout: GEOLOC_DEFAULT_TIMEOUT,
    maximumAge: GEOLOC_DEFAULT_MAXIMUM_AGE,
  };

  constructor() {
    this.parseEnv();
  }

  private parseEnv(): void {
    if (process.env.API_HOST) {
      this.apiHost = process.env.API_HOST;
    }

    this.geolocPositionOptions.enableHighAccuracy = process.env.GEOLOC_HIGH_ACCURACY === 'true';

    const envTimeout = process.env.GEOLOC_TIMEOUT ? parseInt(process.env.GEOLOC_TIMEOUT, 10) : Number.NaN;
    const envMaximumAge = process.env.GEOLOC_MAXIMUM_AGE ? parseInt(process.env.GEOLOC_MAXIMUM_AGE, 10) : Number.NaN;

    if (!Number.isNaN(envTimeout)) {
      this.geolocPositionOptions.timeout = envTimeout;
    }

    if (!Number.isNaN(envMaximumAge)) {
      this.geolocPositionOptions.maximumAge = envMaximumAge;
    }
  }
}

export default Config;

