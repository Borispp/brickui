import React from 'react';
import { renderRoutes } from 'react-router-config';

import Block from 'components/atoms/Block';
import Notification from 'components/organismes/Notification';

const EmptyLayout = (
  { route }, // eslint-disable-line
) => (
  <Block>
    <Notification />
    <React.Fragment>{renderRoutes(route.routes)}</React.Fragment>
  </Block>
);

export default EmptyLayout;
