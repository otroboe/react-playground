import React from 'react';

import './style.less';
import { Header } from 'app/components';

export class Root extends React.Component<any, any> {
  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;

      return <DevTools position={{bottom: 0, right: 0 }}/>;
    }
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          {this.props.children}
        </main>
        {this.renderDevTool()}
      </div>
    );
  }
}
