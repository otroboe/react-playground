import React from 'react';
import { observer, inject } from 'mobx-react';
import { Menu, MenuItem } from '@blueprintjs/core';

import { STORE_TRANSLATION, LOCALE_EN, LOCALE_FR } from 'app/constants';
import { TranslationStore } from 'app/stores';

@inject(STORE_TRANSLATION)
@observer
export class MenuLanguage extends React.Component<{}, {}> {

  private onClickLang = (locale: string, e: Event): void => {
    const translationStore = this.props[STORE_TRANSLATION] as TranslationStore;

    e.preventDefault();

    translationStore.setLocale(locale);
  }

  public render() {
    const translationStore = this.props[STORE_TRANSLATION] as TranslationStore;
    const { translations } = translationStore;

    return (
      <Menu>
        <MenuItem
          text={translations.navbar.language.en} 
          disabled={translationStore.isEn} 
          onClick={this.onClickLang.bind(this, LOCALE_EN)}
        />
        <MenuItem
          text={translations.navbar.language.fr} 
          disabled={translationStore.isFr} 
          onClick={this.onClickLang.bind(this, LOCALE_FR)}
        />
      </Menu>
    );
  }
}

export default MenuLanguage;
