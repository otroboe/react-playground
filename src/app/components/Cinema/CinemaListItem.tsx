import React from 'react';
import { inject, observer } from 'mobx-react';

import { CinemaModel } from 'app/models';
import { STORE_ROUTER } from 'app/constants';
import { RouterStore } from 'app/stores';

export interface CinemaListItemProps {
  cinema: CinemaModel;
}

@inject(STORE_ROUTER)
@observer
export class CinemaListItem extends React.Component<CinemaListItemProps, {}> {

  private onClickItem = (e: React.SyntheticEvent<any>) => {
    const { cinema } = this.props;
    const router = this.props[STORE_ROUTER] as RouterStore

    router.push(`/cinema/${cinema.id}`)
  };

  private renderDistance(cinema: CinemaModel): string {
    if (cinema.distance === undefined) {
      return '';
    }

    return `${(cinema.distance/1000).toFixed(2)} km`;
  }

  render() {
    const { cinema } = this.props;

    return (
      <tr onClick={this.onClickItem}>
        <td>{cinema.name}</td>
        <td>{this.renderDistance(cinema)}</td>
      </tr>
    );
  }
}

export default CinemaListItem;
