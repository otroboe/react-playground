import React from 'react';
import { ButtonGroup, Button } from '@blueprintjs/core';
import { inject, observer } from 'mobx-react';

import { STORE_GEOLOC, STORE_CINEMA } from 'app/constants';
import { GeolocStore, CinemaStore, cinemaDefaultSort } from 'app/stores';

export interface CinemaListActionsProps {}
export interface CinemaListActionsState {
  sortByName: boolean;
  sortByDistance: boolean;
}

@inject(STORE_GEOLOC)
@inject(STORE_CINEMA)
@observer
export class CinemaListActions extends React.Component<CinemaListActionsProps, CinemaListActionsState> {

  constructor(props: CinemaListActionsProps, context: any) {
    super(props, context)

    this.state = {
      sortByName: false,
      sortByDistance: false
    };
  }
  
  componentDidUpdate() {
    this.setSort();
  }
  
  componentWillUnmount() {
    const cinemaStore = this.props[STORE_CINEMA] as CinemaStore;
    
    cinemaStore.setFilter(cinemaDefaultSort);
  }

  private onClickName = (): void => {
    this.setState({
      sortByName: !this.state.sortByName,
      sortByDistance: false
    });
  }
  
  private onClickDistance = (): void => {
    this.setState({
      sortByName: false,
      sortByDistance: !this.state.sortByDistance
    });
  }

  private setSort(): void {
    const cinemaStore = this.props[STORE_CINEMA] as CinemaStore;
    const filterName = this.state.sortByName ? 'name' : (this.state.sortByDistance ? 'distance' : cinemaDefaultSort);

    cinemaStore.setFilter(filterName)
  }

  public render(): JSX.Element {
    const geolocStore = this.props[STORE_GEOLOC] as GeolocStore;
    
    return (
      <div className="cinema-list-actions">
        <ButtonGroup fill={true}>
          <Button 
            icon="sort-alphabetical" 
            active={this.state.sortByName}
            onClick={this.onClickName}
            text="Name"
          />
          <Button 
            icon="sort-asc" 
            disabled={!geolocStore.hasCoordinates}
            active={this.state.sortByDistance} 
            onClick={this.onClickDistance}
            text="Distance"
          />
        </ButtonGroup>
      </div>
    );
  }
}

export default CinemaListActions;
