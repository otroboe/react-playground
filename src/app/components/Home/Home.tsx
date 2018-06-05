import React from 'react';
import { inject, observer } from 'mobx-react';

import './style.less';
import { STORE_TRANSLATION } from 'app/constants';
import { TranslationStore } from 'app/stores';

@inject(STORE_TRANSLATION)
@observer
export class Home extends React.Component<{}, {}> {

  render() {
    const translationStore = this.props[STORE_TRANSLATION] as TranslationStore;
    const { translations } = translationStore;

    return (
      <div className="home">
        <h1>{translations.home.message}</h1>
      </div>
    );
  }
}

export default Home;
