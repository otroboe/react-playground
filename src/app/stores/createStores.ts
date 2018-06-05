import { History } from 'history';

import { STORE_CINEMA, STORE_ROUTER, STORE_GEOLOC, STORE_TRANSLATION } from 'app/constants';
import { GeolocStore, CinemaStore, RouterStore, TranslationStore } from 'app/stores';
import { DataProvider, ToastManager, Config, Caching } from 'app/services';

export const createStores = (
  history: History, 
  dataProvider: DataProvider,
  toastManager: ToastManager,
  config: Config,
  caching: Caching,
) => {
  const routerStore = new RouterStore(history);
  const geolocStore = new GeolocStore(toastManager, config.geolocPositionOptions);
  const cinemaStore = new CinemaStore(dataProvider, geolocStore);
  const translationStore = new TranslationStore(caching);
  return {
    [STORE_CINEMA]: cinemaStore,
    [STORE_ROUTER]: routerStore,
    [STORE_GEOLOC]: geolocStore,
    [STORE_TRANSLATION]: translationStore,
  };
}
