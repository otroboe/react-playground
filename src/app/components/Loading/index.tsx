import React from 'react';
import { Spinner, Classes, Intent } from '@blueprintjs/core';

import './style.less';

interface LoadingProps {}

export class Loading extends React.Component<LoadingProps, {}> {
  public render() {
    return (
      <div className="loading">
        <Spinner className={Classes.LARGE} intent={Intent.NONE}/>
      </div>
    );
  }
}

export default Loading;
