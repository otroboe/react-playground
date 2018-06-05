import { observable, computed, action } from 'mobx';

import { LOCALE_DEFAULT, LOCALE_EN, LOCALE_FR } from 'app/constants';
import { translations, ILocale } from 'app/locales';
import { Caching } from 'app/services';

export class TranslationStore {

  @observable
  public locale: string = LOCALE_DEFAULT;
  
  private en: ILocale;
  private fr: ILocale;
  private caching: Caching;
  private cachingLocaleKey: string = 'locale';

  constructor(caching: Caching) {
    const { en, fr } = translations;

    this.en = en;
    this.fr = fr;
    this.caching = caching;

    this.checkCachedLocale();
  }

  private checkCachedLocale(): void {
    const cached = this.caching.getItem(this.cachingLocaleKey);
  
    this.locale = cached !== null && [LOCALE_EN, LOCALE_FR].indexOf(cached) !== -1 ? cached : LOCALE_DEFAULT;
  }

  @computed
  public get translations(): ILocale {
    return this.locale === LOCALE_EN ? this.en : this.fr;
  }

  @computed
  public get isEn(): boolean {
    return this.locale === LOCALE_EN;
  }

  @computed
  public get isFr(): boolean {
    return this.locale === LOCALE_FR;
  }

  @action
  public setLocale(locale: string): void {
    this.locale = locale;

    // Save to local storage
    this.caching.setItem(this.cachingLocaleKey, locale);
  }
}

export default TranslationStore;
