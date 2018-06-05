import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Alignment,
  Button,
  Popover,
  Position,
} from '@blueprintjs/core';

import { STORE_TRANSLATION } from 'app/constants';
import { MenuLanguage } from 'app/components';
import { TranslationStore } from 'app/stores';

@inject(STORE_TRANSLATION)
@observer
export class Header extends React.Component<{}, {}> {
  public render() {
    const translationStore = this.props[STORE_TRANSLATION] as TranslationStore;
    const { translations } = translationStore;
  
    return (
      <Navbar className="pt-fixed-top pt-dark">
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>Playground</NavbarHeading>
          <NavbarDivider />
          <Link to="/" className="pt-button pt-minimal pt-icon pt-icon-home" role="button">{translations.menu.home}</Link>
          <Link to="/cinema" className="pt-button pt-minimal pt-icon pt-icon-film" role="button">{translations.menu.cinemas}</Link>
          <Link to="/map" className="pt-button pt-minimal pt-icon pt-icon-map" role="button">{translations.menu.map}</Link>
        </NavbarGroup>

        <NavbarGroup align={Alignment.RIGHT}>
          <Popover content={<MenuLanguage />} position={Position.BOTTOM_LEFT}>
            <Button icon="translate" minimal={true} />
          </Popover>
        </NavbarGroup>
      </Navbar>
    );
  }
}

export default Header;
