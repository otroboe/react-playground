// Based on https://developer.mozilla.org/en-US/docs/Web/API/PositionError
export enum GEOLOC_ERROR {
  PERMISSION_DENIED = 1,
  POSITION_UNAVAILABLE = 2,
  TIMEOUT = 3,
};

export const GEOLOC_DEFAULT_ACCURACY = true;
export const GEOLOC_DEFAULT_TIMEOUT = 30000;
export const GEOLOC_DEFAULT_MAXIMUM_AGE = 10000;
