import React from 'react';
import { Card, Icon, Button } from '@blueprintjs/core';

import { CinemaModel } from 'app/models';

export interface CinemaPageDetailsProps {
  cinema: CinemaModel;
}

export class CinemaPageDetails extends React.Component<CinemaPageDetailsProps, {}> {
  private onClickLink = (): void => {
    const { cinema } = this.props;

    window.open(cinema.gmapURL, '_blank');
  }

  render() {
    const { cinema } = this.props;

    const phoneLine = !cinema.phone ? '' : (
      <div className="cinema_detail">
        <Icon icon="phone" />
        <p>{cinema.phone}</p>
      </div>);

    return (
      <Card>
        <div className="cinema_headline">
          <h5>{cinema.name}</h5>
          <Button icon="geolocation" text="Map" onClick={this.onClickLink} />
        </div>
        <div className="cinema_detail">
          <Icon icon="map-marker" />
          <p>{cinema.address}</p>
        </div>
        {phoneLine}
      </Card>
    );
  }
}

export default CinemaPageDetails;
